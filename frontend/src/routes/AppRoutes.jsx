import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Sale from "../pages/Sale";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdmin from "../components/admin/ProtectedAdmin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminAddProduct from "../pages/admin/AdminAddProduct";
import AdminEditProduct from "../pages/admin/AdminEditProduct";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import About from "../pages/About";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:slug" element={<ProductDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/admin"

  element={
    <ProtectedAdmin>
      <AdminDashboard />
    </ProtectedAdmin>
  }
/>

<Route
  path="/admin/products"
  element={
    <ProtectedAdmin>
      <AdminProducts />
    </ProtectedAdmin>
  }
/>

<Route
  path="/admin/products/add"
  element={
    <ProtectedAdmin>
      <AdminAddProduct />
    </ProtectedAdmin>
  }
/>

<Route
  path="/admin/products/edit/:id"
  element={
    <ProtectedAdmin>
      <AdminEditProduct />
    </ProtectedAdmin>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedAdmin>
      <AdminOrders />
    </ProtectedAdmin>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedAdmin>
      <AdminUsers />
    </ProtectedAdmin>
  }
/>

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
    <Route path="/about" element={<About />} />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
