import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

export default function AdminLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />

        <main className="flex-1 p-5">
          <AdminTopbar title={title} />
          <div className="pt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
