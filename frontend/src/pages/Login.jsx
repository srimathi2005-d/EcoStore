import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authservice";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      // ✅ store token + user in localStorage HERE
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login successful ✅");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="border rounded-2xl p-6 bg-white">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="text-gray-600 text-sm mt-1">
          Welcome back! Please login to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
