import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-3 rounded-2xl text-sm transition ${
    isActive
      ? "bg-black text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`;

export default function AdminSidebar() {
  return (
    <aside className="border rounded-3xl p-6 bg-white h-fit sticky top-28">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
      <p className="text-xs text-gray-500 mt-1">Manage store</p>

      <nav className="mt-6 space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
}
