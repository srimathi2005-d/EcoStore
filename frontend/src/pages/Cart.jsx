import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, subtotal, removeFromCart, updateQty } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <p className="text-sm text-gray-600">{cart.length} items</p>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 mt-6">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.productId + item.size}
                item={item}
                onRemove={() => removeFromCart(item.productId, item.size)}
                onQtyChange={(qty) => updateQty(item.productId, item.size, qty)}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      )}
    </div>
  );
}
