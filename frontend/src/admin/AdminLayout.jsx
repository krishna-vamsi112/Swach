// src/admin/components/AdminLayout.jsx
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
