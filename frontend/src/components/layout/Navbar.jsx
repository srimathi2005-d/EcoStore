

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";

const navClass = ({ isActive }) =>
  isActive
    ? "text-black font-semibold"
    : "text-gray-600 hover:text-black";

export default function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [open, setOpen] = useState(false); // profile dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu

  const menuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out ✅");
    navigate("/login");
  };

  // ✅ close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ close mobile menu on route click
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
          <img
            src="/images/logo.jpg"
            alt="EcoStore Logo"
            className="w-14 h-14 object-contain"
          />
          <span className="font-bold tracking-wide text-lg">EcoStore</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/sale" className={navClass}>
            Sale
          </NavLink>
          <NavLink to="/shop" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

          {token && (
            <NavLink to="/orders" className={navClass}>
              Orders
            </NavLink>
          )}

          {token && user?.role === "admin" && (
            <NavLink to="/admin" className={navClass}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            onClick={closeMobile}
            className="relative px-3 md:px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
            title="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={closeMobile}
            className="relative px-3 md:px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden px-3 py-2 rounded-xl border text-sm hover:bg-gray-50"
            onClick={() => setMobileOpen((p) => !p)}
          >
            <Menu size={20} />
          </button>

          {/* Auth Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:opacity-90"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen((p) => !p)}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border bg-white text-gray-900 text-sm font-semibold hover:bg-gray-50 transition shadow-sm"
                  title="Profile"
                >
                  <User size={20} />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-2xl shadow-md overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      My Orders
                    </Link>

                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm">
            <NavLink to="/" className={navClass} onClick={closeMobile}>
              Home
            </NavLink>
            <NavLink to="/sale" className={navClass} onClick={closeMobile}>
              Sale
            </NavLink>
            <NavLink to="/shop" className={navClass} onClick={closeMobile}>
              Shop
            </NavLink>
            <NavLink to="/about" className={navClass} onClick={closeMobile}>
              About
            </NavLink>

            {token && (
              <NavLink to="/orders" className={navClass} onClick={closeMobile}>
                Orders
              </NavLink>
            )}

            {token && user?.role === "admin" && (
              <NavLink to="/admin" className={navClass} onClick={closeMobile}>
                Admin
              </NavLink>
            )}

            {/* Mobile Auth */}
            <div className="pt-3 border-t flex flex-col gap-2">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="px-4 py-2 rounded-xl bg-black text-white text-sm text-center hover:opacity-90"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="px-4 py-2 rounded-xl border text-sm text-center hover:bg-gray-50"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      closeMobile();
                      logout();
                    }}
                    className="px-4 py-2 rounded-xl border text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
