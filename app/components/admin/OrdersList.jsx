export default function OrdersList({ orders }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Orders</h2>

      {orders.map(order => (
        <div
          key={order.id}
          className="bg-white rounded-xl shadow p-4 text-lg font-semibold"
        >
          {order.id}
        </div>
      ))}
    </div>
  );
}