import { useState } from "react";
import { Search, Eye, ChevronDown, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

const INITIAL_ORDERS = [
  { id: "ORD-001", customer: "John Doe",     email: "john@example.com",  date: "Jun 2, 2026",  total: 84.98,  items: 2, status: "delivered",  address: "123 Main St, Lagos" },
  { id: "ORD-002", customer: "Jane Smith",   email: "jane@example.com",  date: "Jun 5, 2026",  total: 129.99, items: 1, status: "shipping",   address: "45 Park Ave, Abuja" },
  { id: "ORD-003", customer: "Bob Johnson",  email: "bob@example.com",   date: "Jun 6, 2026",  total: 29.99,  items: 1, status: "processing", address: "78 Beach Rd, Lagos" },
  { id: "ORD-004", customer: "Alice Brown",  email: "alice@example.com", date: "Jun 7, 2026",  total: 59.99,  items: 3, status: "delivered",  address: "12 Hill Str, Kano" },
  { id: "ORD-005", customer: "Mike Wilson",  email: "mike@example.com",  date: "Jun 8, 2026",  total: 214.97, items: 4, status: "processing", address: "90 Ring Rd, Ibadan" },
  { id: "ORD-006", customer: "Sara Connor",  email: "sara@example.com",  date: "Jun 8, 2026",  total: 39.99,  items: 1, status: "cancelled",  address: "33 Palm Ave, PH" },
];

const STATUS_CONFIG = {
  processing: { label: "Processing", icon: <Clock size={12} />,        color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  shipping:   { label: "Shipping",   icon: <Truck size={12} />,        color: "bg-blue-100 text-blue-700",    dot: "bg-blue-400" },
  delivered:  { label: "Delivered",  icon: <CheckCircle2 size={12} />, color: "bg-green-100 text-green-700",  dot: "bg-green-400" },
  cancelled:  { label: "Cancelled",  icon: <XCircle size={12} />,      color: "bg-red-100 text-red-500",      dot: "bg-red-400" },
};

const STATUS_OPTIONS = ["processing", "shipping", "delivered", "cancelled"];

export default function AdminOrderPage() {
  const [orders, setOrders]           = useState(INITIAL_ORDERS);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected]       = useState(null);

  function updateStatus(id, newStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order ${id} marked as ${newStatus}`);
    if (selected?.id === id) setSelected((s) => ({ ...s, status: newStatus }));
  }

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Summary counts
  const counts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
            className={`bg-white rounded-2xl border p-4 text-left hover:shadow-md transition-all
              ${filterStatus === key ? "border-blue-300 shadow-md" : "border-gray-100"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{cfg.label}</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{counts[key] || 0}</p>
          </button>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-blue-400 transition-colors">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none cursor-pointer shadow-sm hover:border-blue-400 transition-colors"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="capitalize">{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Order", "Customer", "Date", "Items", "Total", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No orders found</td>
                  </tr>
                ) : filtered.map((order) => {
                  const cfg = STATUS_CONFIG[order.status];
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === order.id ? "bg-blue-50" : ""}`}
                      onClick={() => setSelected(order)}
                    >
                      <td className="px-5 py-4 font-black text-blue-600 text-xs">{order.id}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">{order.customer}</p>
                        <p className="text-xs text-gray-400">{order.email}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{order.date}</td>
                      <td className="px-5 py-4 text-gray-600 text-center">{order.items}</td>
                      <td className="px-5 py-4 font-black text-gray-800">${order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1.5 w-fit text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelected(order); }}
                          className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                        >
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order detail panel */}
        {selected && (
          <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5 self-start sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-800">{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Customer</span>
                <span className="font-semibold text-gray-700 text-right">{selected.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email</span>
                <span className="font-semibold text-gray-700 text-right text-xs">{selected.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="font-semibold text-gray-700">{selected.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Items</span>
                <span className="font-semibold text-gray-700">{selected.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="font-black text-gray-900">${selected.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Address</span>
                <span className="font-semibold text-gray-700 text-right text-xs">{selected.address}</span>
              </div>
            </div>

            {/* Status updater */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Update Status</p>
              <div className="flex flex-col gap-2">
                {STATUS_OPTIONS.map((s) => {
                  const cfg = STATUS_CONFIG[s];
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all
                        ${selected.status === s
                          ? `${cfg.color} ring-2 ring-offset-1 ring-current`
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    >
                      {cfg.icon} {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
