import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const img1 = product?.images?.[0]?.url;
  const img2 = product?.images?.[1]?.url;

  const price = product?.salePrice || product?.price;
  const showStrike = product?.salePrice && product?.salePrice < product?.price;

  // ✅ FIX: Sale badge based on actual discount also
  const showSaleBadge =
    (product?.salePrice && product.salePrice < product.price) ||
    product?.isOnSale === true;

  return (
  
     <Link to={`/product/${product.slug}`}
     
      className="group block border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {showSaleBadge && (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-3 py-1 rounded-full">
            SALE
          </div>
        )}

        <img
          src={img1}
          alt={product?.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        />

        <img
          src={img2 || img1}
          alt={product?.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="p-3">
        <p className="text-sm text-gray-800 font-medium line-clamp-2">
          {product?.title}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{formatPrice(price)}</span>

          {showStrike && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product?.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
