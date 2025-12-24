"use client";

export default function OrdersMobileCard({ orders = [], refresh }) {
  async function updateStatus(orderId, status) {
    await fetch("/api/admin/orders/update-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    refresh?.();
  }

  if (!orders.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No orders found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => {
        const key = order._id || order.orderId || index;

        return (
          <div
            key={key}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{order.orderId}</div>
                <div className="text-xs text-gray-500">
                  Patient: {order.patientName || order.patient?.name || "N/A"}
                </div>
              </div>

              {/* MOBILE DROPDOWN */}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <div>
                <span className="text-gray-500">Products:</span>{" "}
                {(order.items || []).map(i => i.name).join(", ")}
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold">
                  €
                  {order.amount ??
                    order.total ??
                    order.totals?.grandTotal ??
                    0}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}