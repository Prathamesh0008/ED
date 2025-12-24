"use client";

const STATUSES = [
  "Order Placed",
  "Pending Review",
  "Approved",
  "Rejected",
  "Shipped",
];

export default function ActionMenu({ currentStatus, onChange }) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-2 py-1 text-sm"
    >
      {STATUSES.map((status) => (
        <option
          key={status}           // ✅ REQUIRED KEY
          value={status}
        >
          {status}
        </option>
      ))}
    </select>
  );
}