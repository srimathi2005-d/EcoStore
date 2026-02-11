import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import {
  adminUpdateProduct,
  adminGetAllProducts
} from "../../services/productservice";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    price: "",
    salePrice: "",
    sizes: "",
    stock: "",
    isSale: false,
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const loadProduct = async () => {
    try {
      setLoading(true);

      // ✅ Using adminGetAllProducts to find product (works even if backend doesn't have /:id route)
      const res = await adminGetAllProducts();
      const items = res.items || res || [];

      const product = items.find((x) => x._id === id);
      if (!product) {
        toast.error("Product not found");
        navigate("/admin/products");
        return;
      }

      setForm({
        title: product.title || "",
        slug: product.slug || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price ?? "",
        salePrice: product.salePrice ?? "",
        sizes: (product.sizes || []).join(","),
        stock: product.stock ?? "",
        isSale: !!product.isSale,
        imageUrl: product.images?.[0]?.url || ""
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line
  }, [id]);

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
        sizes: form.sizes
          ? form.sizes.split(",").map((s) => s.trim())
          : [],
        stock: Number(form.stock),
        isSale: form.isSale,
        images: form.imageUrl ? [{ url: form.imageUrl }] : []
      };

      await adminUpdateProduct(id, payload);
      toast.success("Product updated ✅");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          <AdminTopbar title="Edit Product" subtitle={`Update product: ${id}`} />

          {loading ? (
            <p className="text-gray-600">Loading product...</p>
          ) : (
            <form
              onSubmit={submit}
              className="border rounded-2xl p-6 bg-white space-y-4"
            >
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
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Image URL</label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-xl outline-none"
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
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
