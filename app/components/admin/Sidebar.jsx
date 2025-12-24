"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  X,
} from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition
     ${pathname === path
       ? "bg-blue-50 text-blue-700 font-semibold"
       : "hover:bg-slate-100 text-slate-700"}`;

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-40
          top-0 left-0
          h-screen w-64
          bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          -mt-22
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-between px-4 border-b ">
          <div className="font-bold">EdPharma Admin</div>
          <button className="md:hidden" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1">
          <Link href="/admin" className={linkClass("/admin")}>
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <Link href="/admin/orders" className={linkClass("/admin/orders")}>
            <ShoppingCart className="w-5 h-5" />
            Orders
          </Link>

          <Link href="/admin/products" className={linkClass("/admin/products")}>
            <Package className="w-5 h-5" />
            Products
          </Link>

          <Link href="/admin/users" className={linkClass("/admin/users")}>
            <Users className="w-5 h-5" />
            Users
          </Link>
        </nav>
      </aside>
    </>
  );
}