"use client";

import { useState } from "react";
import { orders } from "../data/order";
import StatCard from "../components/admin/StatCard";
import OrdersFilters from "../components/admin/OrdersFilters";
import OrdersTable from "../components/admin/OrdersTable";
import OrdersMobileCard from "../components/admin/OrdersMobileCard";


export default function AdminPage() {
  const [active, setActive] = useState("All");

  /* ===== STATS ===== */
  const total = orders.length;
  const pending = orders.filter(
    o => o.status === "Pending Doctor Review"
  ).length;
  // const approved = orders.filter(o => o.status === "Approved").length;
  const shipped = orders.filter(o => o.status === "Shipped").length;

  /* ===== FILTER ===== */
  const filteredOrders =
    active === "All"
      ? orders
      : orders.filter(o => o.status === active);

  return (
    <div className="p-4 md:p-6 space-y-6 ">

      {/* TITLE
      <h1 className="text-2xl font-bold">
        EdPharma Order Console
      </h1> */}

      {/* STATS
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={total} color="blue" />
        <StatCard title="Pending Review" value={pending} color="yellow" />
        <StatCard title="Approved" value={approved} color="green" />
        <StatCard title="Shipped" value={shipped} color="purple" />
      </div> */}

      {/* FILTERS */}
      <OrdersFilters active={active} setActive={setActive} />

      {/* DESKTOP TABLE */}
      <OrdersTable orders={filteredOrders} />

      {/* MOBILE CARDS */}
      <OrdersMobileCard orders={filteredOrders} />

    </div>
  );
}