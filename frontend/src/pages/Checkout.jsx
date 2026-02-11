import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderservice";
import { formatPrice } from "../utils/formatPrice";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();

  const shippingCharge = useMemo(() => (subtotal > 999 ? 0 : 99), [subtotal]);
  const totalAmount = useMemo(() => subtotal + shippingCharge, [subtotal, shippingCharge]);

  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod now

  const handleChange = (e) => {
    setShipping((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!shipping.fullName.trim()) return "Enter full name";
    if (!shipping.phone.trim()) return "Enter phone number";
    if (!shipping.address.trim()) return "Enter address";
    if (!shipping.city.trim()) return "Enter city";
    if (!shipping.state.trim()) return "Enter state";
    if (!shipping.pincode.trim()) return "Enter pincode";

    if (shipping.phone.length < 10) return "Enter valid phone number";
    if (shipping.pincode.length < 6) return "Enter valid pincode";

    if (cart.length === 0) return "Cart is empty";
    return null;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

     const payload = {
  items: cart.map((c) => ({
    product: c.productId,     // ✅ schema expects product
    title: c.title,
    image: c.image,
    qty: c.qty,
    price: c.price,
    size: c.size
  })),

  shippingAddress: {
    fullName: shipping.fullName,
    phone: shipping.phone,
    addressLine1: shipping.address, // ✅ schema expects addressLine1
    addressLine2: "",
    city: shipping.city,
    state: shipping.state,
    pincode: shipping.pincode,
    country: "India"
  },

  paymentMethod: "COD",   // ✅ must be "COD" not "cod"
  totalAmount: totalAmount
};

      await createOrder(payload);

      toast.success("Order placed ✅");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="text-gray-600 mt-4">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <p className="text-sm text-gray-600 mt-1">
        Fill shipping details and place your order.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Shipping Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="md:col-span-2 border rounded-2xl p-6 bg-white space-y-4"
        >
          <h2 className="text-lg font-semibold">Shipping Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                name="fullName"
                value={shipping.fullName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                name="phone"
                value={shipping.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="Enter phone"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={shipping.address}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
              placeholder="House no, street, area"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">City</label>
              <input
                name="city"
                value={shipping.city}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="City"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">State</label>
              <input
                name="state"
                value={shipping.state}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="State"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Pincode</label>
              <input
                name="pincode"
                value={shipping.pincode}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="Pincode"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="pt-3">
            <h2 className="text-lg font-semibold">Payment Method</h2>

            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`px-4 py-2 rounded-xl border text-sm ${
                  paymentMethod === "cod"
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-50"
                }`}
              >
                Cash on Delivery
              </button>

              <button
                type="button"
                disabled
                className="px-4 py-2 rounded-xl border text-sm opacity-50 cursor-not-allowed"
              >
                Razorpay (Next)
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full mt-4 py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>

        {/* Summary */}
        <div className="md:col-span-1 border rounded-2xl p-6 bg-white h-fit sticky top-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div key={item.productId + item.size} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded-xl border"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.qty} {item.size ? `• Size: ${item.size}` : ""}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  {formatPrice(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-700 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCharge === 0 ? "FREE" : formatPrice(shippingCharge)}</span>
            </div>

            <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
