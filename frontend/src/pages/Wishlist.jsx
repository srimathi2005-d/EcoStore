import WishlistItem from "../components/wishlist/WishlistItem";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Wishlist</h1>
          <p className="text-sm text-gray-600 mt-1">
            Saved items: {wishlist.length}
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="mt-10 text-gray-600">
          <p>Your wishlist is empty 💛</p>
          <p className="text-sm mt-2">
            Go to <b>Shop</b> and click wishlist button.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <WishlistItem
              key={item.productId}
              item={item}
              onRemove={() => removeFromWishlist(item.productId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
