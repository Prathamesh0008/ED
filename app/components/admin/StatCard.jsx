"use client";

import {
  Package,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

export default function StatCard({ title, value, color }) {
  const styles = {
    blue: {
      bg: "bg-blue-100",
      icon: "text-blue-600",
      Icon: Package,
    },
    yellow: {
      bg: "bg-amber-100",
      icon: "text-amber-600",
      Icon: Clock,
    },
    green: {
      bg: "bg-green-100",
      icon: "text-green-600",
      Icon: CheckCircle,
    },
    purple: {
      bg: "bg-purple-100",
      icon: "text-purple-600",
      Icon: Truck,
    },
  };

  const { bg, icon, Icon } = styles[color] || styles.blue;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border border-slate-200">
      {/* ICON */}
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}
      >
        <Icon className={`w-6 h-6 ${icon}`} />
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}