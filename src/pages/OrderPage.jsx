
import { Package, Truck, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_ORDERS = [
  {
    id: "ORD-001",
    date: "Jun 2, 2026",
    status: "delivered",
    total: 84.98,
    items: [
      { name: "Wireless Earbuds Pro", qty: 1, price: 49.99 },
      { name: "Linen Summer Dress", qty: 1, price: 34.99 },
    ],
  },
  {
    id: "ORD-002",
    date: "Jun 5, 2026",
    status: "shipping",
    total: 129.99,
    items: [{ name: "Smart Watch Series 5", qty: 1, price: 129.99 }],
  },
  {
    id: "ORD-003",
    date: "Jun 6, 2026",
    status: "processing",
    total: 29.99,
    items: [{ name: "Cast Iron Skillet", qty: 1, price: 29.99 }],
  },
];

const STATUS = {
  processing: { label: "Processing", icon: <Clock size={13} />, color: "bg-yellow-100 text-yellow-700" },
  shipping:   { label: "Shipping",   icon: <Truck size={13} />, color: "bg-blue-100 text-blue-700" },
  delivered:  { label: "Delivered",  icon: <CheckCircle2 size={13} />, color: "bg-green-100 text-green-700" },
};

export default function OrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">My Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{MOCK_ORDERS.length} orders placed</p>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
            <Package size={36} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-black text-gray-700">No orders yet</h2>
          <Link to="/shop" className="text-blue-600 hover:underline text-sm font-medium">Start shopping →</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((order) => {
            const status = STATUS[order.status];
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-gray-800">{order.id}</h3>
                      <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Placed on {order.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{order.items.length} item(s)</p>
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-2 border-t border-gray-50 pt-4">
                  {order.items.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} <span className="text-gray-400">x{item.qty}</span></span>
                      <span className="font-semibold text-gray-800">${item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Progress tracker */}
                <div className="mt-5 flex items-center gap-2">
                  {["processing", "shipping", "delivered"].map((step, i, arr) => {
                    const steps = ["processing", "shipping", "delivered"];
                    const currentIdx = steps.indexOf(order.status);
                    const stepIdx = steps.indexOf(step);
                    const done = stepIdx <= currentIdx;
                    return (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div className={`w-full flex flex-col items-center gap-1 ${i > 0 ? "" : ""}`}>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white transition-colors
                            ${done ? "bg-blue-600" : "bg-gray-200"}`}>
                            {done && <CheckCircle2 size={10} />}
                          </div>
                          <span className={`text-[10px] font-semibold capitalize ${done ? "text-blue-600" : "text-gray-400"}`}>
                            {step}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`h-0.5 flex-1 mb-4 rounded-full transition-colors ${stepIdx < currentIdx ? "bg-blue-600" : "bg-gray-200"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}