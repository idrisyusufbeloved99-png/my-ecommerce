
import { ShoppingBag, Users, ClipboardList, TrendingUp, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$12,430", change: "+12%", up: true, icon: <TrendingUp size={20} />, color: "bg-blue-600" },
  { label: "Total Orders", value: "284", change: "+8%", up: true, icon: <ClipboardList size={20} />, color: "bg-orange-500" },
  { label: "Total Products", value: "128", change: "+3%", up: true, icon: <ShoppingBag size={20} />, color: "bg-green-500" },
  { label: "Total Users", value: "1,204", change: "-2%", up: false, icon: <Users size={20} />, color: "bg-purple-500" },
];

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", product: "Wireless Earbuds", amount: "$49.99", status: "delivered" },
  { id: "ORD-002", customer: "Jane Smith", product: "Smart Watch", amount: "$129.99", status: "shipping" },
  { id: "ORD-003", customer: "Bob Johnson", product: "Air Fryer XL", amount: "$89.99", status: "processing" },
  { id: "ORD-004", customer: "Alice Brown", product: "Linen Dress", amount: "$34.99", status: "delivered" },
];

const STATUS_COLORS = {
  delivered:  "bg-green-100 text-green-700",
  shipping:   "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full
                ${stat.up ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {stat.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-black text-gray-800 flex items-center gap-2">
            <Package size={17} className="text-blue-600" /> Recent Orders
          </h2>
          <button className="text-xs text-blue-600 font-bold hover:text-blue-700">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}