import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Content */}
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
