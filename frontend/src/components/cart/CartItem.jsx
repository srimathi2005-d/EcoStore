import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="flex gap-4 border rounded-2xl p-4 bg-white">
      <Link to={`/product/${item.slug}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-28 h-28 object-cover rounded-xl border"
        />
      </Link>

      <div className="flex-1">
        <Link
          to={`/product/${item.slug}`}
          className="font-medium text-gray-800 hover:underline"
        >
          {item.title}
        </Link>

        {item.size && (
          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
        )}

        <p className="mt-2 font-semibold">{formatPrice(item.price)}</p>

        <div className="mt-3 flex gap-3 items-center">
          <button
            onClick={() => onQtyChange(item.qty - 1)}
            disabled={item.qty <= 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            -
          </button>

          <span className="min-w-[30px] text-center">{item.qty}</span>

          <button
            onClick={() => onQtyChange(item.qty + 1)}
            className="px-3 py-1 border rounded-lg"
          >
            +
          </button>

          <button
            onClick={onRemove}
            className="ml-auto text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
