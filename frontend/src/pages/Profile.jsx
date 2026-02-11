import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMe, updateProfile } from "../services/authservice";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userData = await getMe();
      setUser(userData);

      setForm({
        name: userData.name || "",
        email: userData.email || "",
        password: ""
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email
      };

      // update password only if typed
      if (form.password.trim().length >= 6) {
        payload.password = form.password;
      }

      const updated = await updateProfile(payload);

      const userData = updated.user || updated;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Profile updated ✅");
      setForm((p) => ({ ...p, password: "" }));
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out ✅");
    window.location.href = "/login";
  };

  if (loading) return <div className="p-10">Loading profile...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage your account information.
          </p>
        </div>

        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setForm({
                  name: user?.name || "",
                  email: user?.email || "",
                  password: ""
                });
              }}
              className="px-5 py-2 rounded-xl border text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

          <button
            onClick={() => !isEditing && setIsEditing(true)}
            className={`px-5 py-2 rounded-xl text-sm ${
              isEditing
                ? "bg-gray-200 text-gray-500 cursor-default"
                : "border hover:bg-gray-50"
            }`}
            disabled={isEditing}
          >
            Edit
          </button>

          <button
            onClick={logout}
            className="px-5 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Left box */}
        <div className="border rounded-2xl p-6 bg-white">
          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <h2 className="mt-4 font-semibold text-lg">{user?.name}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>

          <div className="mt-4">
            <p className="text-xs text-gray-500">Role</p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full border text-sm">
              {user?.role || "user"}
            </span>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>✅ Secure payments</p>
            <p className="mt-1">🚚 Order tracking</p>
            <p className="mt-1">💛 Wishlist support</p>
          </div>
        </div>

        {/* Form or Display */}
        <div className="md:col-span-2 border rounded-2xl p-6 bg-white">
          {!isEditing ? (
            // Display Mode
            <div>
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="mt-1 text-base font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="mt-1 text-base font-medium">{user?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <>
              <h3 className="text-lg font-semibold">Update Profile</h3>

              <form onSubmit={handleUpdate} className="mt-5 space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                    placeholder="Min 6 characters"
                  />
                </div>

                <button className="w-full px-5 py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90">
                  Save Changes
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
