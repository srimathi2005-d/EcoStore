import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderservice";
import { createRazorpayOrder, verifyRazorpayPayment } from "../services/paymentservice";
import { formatPrice } from "../utils/formatPrice";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();

  const shippingCharge = useMemo(() => (subtotal > 999 ? 0 : 99), [subtotal]);
  const totalAmount = useMemo(() => subtotal + shippingCharge, [subtotal, shippingCharge]);

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) =>
    setShipping((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!shipping.fullName) return "Enter full name";
    if (!shipping.phone || shipping.phone.length < 10) return "Enter valid phone";
    if (!shipping.address) return "Enter address";
    if (!shipping.city) return "Enter city";
    if (!shipping.state) return "Enter state";
    if (!shipping.pincode || shipping.pincode.length < 6) return "Enter valid pincode";
    if (cart.length === 0) return "Cart is empty";
    return null;
  };

  const basePayload = () => ({
    items: cart.map((c) => ({
      product: c.productId,
      title: c.title,
      image: c.image,
      qty: c.qty,
      price: c.price,
      size: c.size
    })),
    shippingAddress: {
      fullName: shipping.fullName,
      phone: shipping.phone,
      addressLine1: shipping.address,
      addressLine2: "",
      city: shipping.city,
      state: shipping.state,
      pincode: shipping.pincode,
      country: "India"
    },
    totalAmount
  });

  // ---------------- COD ----------------
  const placeCODOrder = async () => {
    await createOrder({
      ...basePayload(),
      paymentMethod: "COD",
      paymentStatus: "pending"
    });
  };

  // 🎯 Handle successful payment and cleanup
  const handlePaymentSuccess = useCallback(() => {
    clearCart();
    navigate("/orders");
  }, [clearCart, navigate]);

  // ---------------- RAZORPAY ----------------
  const placeRazorpayOrder = async () => {
    try {
      // Step 1: Create MongoDB order FIRST with pending payment status
      const dbOrder = await createOrder({
        ...basePayload(),
        paymentMethod: "RAZORPAY",
        paymentStatus: "pending"
      });

      // Step 2: Create Razorpay order
      const razorpayOrder = await createRazorpayOrder(totalAmount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "EcoStore",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            // Step 3: Verify payment and pass MongoDB order ID
            const verify = await verifyRazorpayPayment({
              ...response,
              orderId: dbOrder._id  // ✅ Pass the MongoDB order ID
            });

            if (!verify.success) {
              toast.error("Payment verification failed");
              return;
            }

            toast.success("Payment successful ✅");
            // Defer state updates to next tick to avoid React warning
            setTimeout(() => {
              handlePaymentSuccess();
            }, 0);
          } catch (err) {
            console.log("Verification error:", err);
            toast.error("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled. Order remains pending.");
          }
        },
        theme: { color: "#000000" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  // ---------------- SUBMIT ----------------
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    try {
      setLoading(true);

      if (paymentMethod === "cod") {
        await placeCODOrder();
        toast.success("Order placed ✅");
        clearCart();
        navigate("/orders");
      } else {
        await placeRazorpayOrder();
      }
    } catch (err) {
      toast.error("Order failed");
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* FORM */}
        <form
          onSubmit={handlePlaceOrder}
          className="md:col-span-2 border rounded-2xl p-6 bg-white space-y-4"
        >
          <h2 className="text-lg font-semibold">Shipping Address</h2>

          <input name="fullName" placeholder="Full Name" onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl" />
          <input name="phone" placeholder="Phone" onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl" />
          <textarea name="address" placeholder="Address" rows="3"
            onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" />
          <div className="grid grid-cols-3 gap-3">
            <input name="city" placeholder="City" onChange={handleChange}
              className="px-4 py-3 border rounded-xl" />
            <input name="state" placeholder="State" onChange={handleChange}
              className="px-4 py-3 border rounded-xl" />
            <input name="pincode" placeholder="Pincode" onChange={handleChange}
              className="px-4 py-3 border rounded-xl" />
          </div>

          <h2 className="text-lg font-semibold pt-3">Payment Method</h2>
          <div className="flex gap-3">
            <button type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`px-4 py-2 rounded-xl border ${
                paymentMethod === "cod" ? "bg-black text-white" : ""
              }`}>
              Cash on Delivery
            </button>

            <button type="button"
              onClick={() => setPaymentMethod("razorpay")}
              className={`px-4 py-2 rounded-xl border ${
                paymentMethod === "razorpay" ? "bg-black text-white" : ""
              }`}>
              Razorpay
            </button>
          </div>

          <button disabled={loading}
            className="w-full mt-4 py-3 rounded-2xl bg-black text-white">
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* SUMMARY */}
        <div className="border rounded-2xl p-6 bg-white h-fit">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {cart.map((i) => (
              <div key={i.productId} className="flex justify-between text-sm">
                <span>{i.title} × {i.qty}</span>
                <span>{formatPrice(i.price * i.qty)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCharge === 0 ? "FREE" : formatPrice(shippingCharge)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span><span>{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
