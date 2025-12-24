"use client";

import { useState } from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import Topbar from "@/app/components/admin/Topbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ✅ LEFT SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar onMenu={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}