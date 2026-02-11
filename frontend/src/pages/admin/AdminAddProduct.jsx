import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { adminCreateProduct } from "../../services/productservice";

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    price: "",
    salePrice: "",
    sizes: "S,M,L,XL",
    stock: "10",
    isSale: true,
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        salePrice: form.salePrice ? Number(form.salePrice) : undefined,
        sizes: form.sizes.split(",").map((s) => s.trim()),
        stock: Number(form.stock),
        isSale: form.isSale,
        images: form.imageUrl ? [{ url: form.imageUrl }] : []
      };

      await adminCreateProduct(payload);
      toast.success("Product created ✅");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        <div className="md:col-span-3 space-y-6">
          <AdminTopbar title="Add Product" subtitle="Create new product" />

          <form onSubmit={submit} className="border rounded-2xl p-6 bg-white space-y-4">
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="example-product-slug"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Image URL</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Stock</label>
                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Price</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Sale Price</label>
                <input
                  name="salePrice"
                  value={form.salePrice}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Sizes (comma)</label>
              <input
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isSale"
                checked={form.isSale}
                onChange={handleChange}
              />
              Mark as Sale Product
            </label>

            <button className="w-full py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
