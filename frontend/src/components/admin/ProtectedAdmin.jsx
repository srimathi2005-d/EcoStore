import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role !== "admin") {
    toast.error("Admin access only ❌");
    return <Navigate to="/" replace />;
  }

  return children;
}

