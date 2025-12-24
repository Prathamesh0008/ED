"use client";

export default function OrdersTable({ orders = [], refresh }) {
  async function updateStatus(orderId, status) {
    try {
      await fetch("/api/admin/orders/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      refresh?.();
    } catch (err) {
      console.error("Status update failed", err);
    }
  }

  // Allowed actions
  const ACTIONS = ["Order Placed", "Rejected", "Shipped"];

  return (
    <div className="bg-white rounded-2xl shadow overflow-x-auto">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Patient</th>
            <th className="p-3 text-left">Products</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr key="empty">
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}

          {orders.map((order, index) => {
            const rowKey = order._id || order.orderId || index;
            const currentStatus = order.status || "Order Placed";

            return (
              <tr key={rowKey} className="border-t">
                {/* ORDER */}
                <td className="p-3 font-semibold">
                  {order.orderId}
                </td>

                {/* PATIENT */}
                <td className="p-3">
                  {order.patientName ||
                    order.patient?.name ||
                    "N/A"}
                </td>

                {/* PRODUCTS */}
                <td className="p-3 text-xs text-gray-600">
                  {(order.items || []).map((item, i) => (
                    <div key={`${rowKey}-item-${i}`}>
                      {item.name}
                    </div>
                  ))}
                </td>

                {/* STATUS LABEL */}
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-gray-100">
                    {currentStatus}
                  </span>
                </td>

                {/* AMOUNT */}
                <td className="p-3 text-right font-semibold">
                  €
                  {order.amount ??
                    order.total ??
                    order.totals?.grandTotal ??
                    0}
                </td>

                {/* ACTION COLUMN (LEFT STATUS + RIGHT DROPDOWN) */}
                <td className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    {/* LEFT: CURRENT ACTION */}
                    <span className="text-sm font-medium text-gray-700">
                      {currentStatus}
                    </span>

                    {/* RIGHT: DROPDOWN */}
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="
                        border rounded px-2 py-1 text-sm
                        bg-white
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-500
                      "
                    >
                      {/* Show current status if not allowed action */}
                      {!ACTIONS.includes(currentStatus) && (
                        <option value={currentStatus}>
                          {currentStatus}
                        </option>
                      )}

                      {ACTIONS.map((action) => (
                        <option key={action} value={action}>
                          {action}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}