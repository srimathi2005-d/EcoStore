import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function WishlistItem({ item, onRemove }) {
  const image = item?.image;

  return (
    <div className="flex gap-4 border rounded-2xl p-4 bg-white">
      <Link to={`/product/${item.slug}`}>
        <img
          src={image}
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

        <p className="text-sm text-gray-500 mt-1">{item.category}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">
            {formatPrice(item.salePrice || item.price)}
          </span>

          {item.salePrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(item.price)}
            </span>
          )}
        </div>

        <button
          onClick={onRemove}
          className="mt-3 text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
