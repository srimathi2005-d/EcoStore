import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import {
  adminGetAllUsers,
  adminToggleUserRole
} from "../../services/userservice";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await adminGetAllUsers();
      setUsers(res.items || res || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRole = async (id) => {
    try {
      setUpdatingId(id);
      await adminToggleUserRole(id);
      toast.success("User role updated ✅");
      load();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        <div className="md:col-span-3 space-y-6">
          <AdminTopbar title="Users" subtitle="Manage store users" />

          {loading ? (
            <p className="text-gray-600">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-600">No users found</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="border rounded-2xl bg-white p-4 flex flex-col md:flex-row md:items-center gap-3"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-600">{u.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Role:{" "}
                      <span className="font-semibold">{u.role || "user"}</span>
                    </p>
                  </div>

                  <button
                    disabled={updatingId === u._id}
                    onClick={() => toggleRole(u._id)}
                    className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50 disabled:opacity-60"
                  >
                    {updatingId === u._id ? "Updating..." : "Toggle Admin/User"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
