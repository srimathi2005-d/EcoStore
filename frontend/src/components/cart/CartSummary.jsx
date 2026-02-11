import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

export default function CartSummary({ subtotal }) {
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="border rounded-2xl p-5 bg-white sticky top-6">
      <h3 className="text-lg font-semibold">Summary</h3>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
        </div>

        <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="block text-center mt-5 px-4 py-3 rounded-2xl bg-black text-white hover:opacity-90"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
