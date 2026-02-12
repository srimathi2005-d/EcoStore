import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id || user?.id || "guest";

  const STORAGE_KEY = `wishlist_${userId}`;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setWishlist(saved);
    } catch {
      setWishlist([]);
    }
  }, [STORAGE_KEY]);

  const isWishlisted = (productId) =>
    wishlist.some((x) => x.productId === productId);

  const addToWishlist = (product) => {
    const pid = product?._id;
    if (!pid) return;

    if (isWishlisted(pid)) return toast("Already in wishlist");

    const item = {
      productId: pid,
      title: product.title,
      slug: product.slug,
      category: product.category,
      image: product.images?.[0]?.url,
      price: product.price,
      salePrice: product.salePrice,
    };

    const updated = [item, ...wishlist];
    setWishlist(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((x) => x.productId !== productId);
    setWishlist(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success("Removed ✅");
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    toast.success("Wishlist cleared ✅");
  };

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
