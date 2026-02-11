import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CART_KEY = "eco_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // ✅ Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size = "") => {
    if (product?.sizes?.length > 0 && !size) {
      toast.error("Please select a size");
      return;
    }

    setCart((prev) => {
      const existsIndex = prev.findIndex(
        (x) => x.productId === product._id && x.size === size
      );

      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex].qty += 1;
         toast.success("Quantity updated ✅");
        return updated;
      }

      toast.success("Added to cart ✅");
      return [
        ...prev,
        {
          productId: product._id,
          slug: product.slug,
          title: product.title,
          image: product.images?.[0]?.url,
          price: product.salePrice || product.price,
          size,
          qty: 1
        }
      ];
    });
  };

  const removeFromCart = (productId, size = "") => {
    setCart((prev) =>
      prev.filter((x) => !(x.productId === productId && x.size === size))
    );
    toast.success("Removed from cart");
  };

  const updateQty = (productId, size, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((x) =>
        x.productId === productId && x.size === size ? { ...x, qty } : x
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}