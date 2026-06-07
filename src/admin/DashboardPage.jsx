import { useState } from "react";
import { ShoppingBag, Users, ClipboardList, TrendingUp, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// ── MOCK DATA ──
const visitorData = [
  { date: "May 1",  desktop: 420, mobile: 240 },
  { date: "May 5",  desktop: 380, mobile: 310 },
  { date: "May 10", desktop: 510, mobile: 290 },
  { date: "May 15", desktop: 670, mobile: 410 },
  { date: "May 20", desktop: 490, mobile: 360 },
  { date: "May 25", desktop: 720, mobile: 480 },
  { date: "May 30", desktop: 580, mobile: 390 },
  { date: "Jun 4",  desktop: 640, mobile: 420 },
  { date: "Jun 9",  desktop: 530, mobile: 350 },
  { date: "Jun 14", desktop: 760, mobile: 510 },
  { date: "Jun 19", desktop: 690, mobile: 440 },
  { date: "Jun 24", desktop: 810, mobile: 560 },
  { date: "Jun 30", desktop: 740, mobile: 490 },
];

const revenueData = [
  { month: "Jan", revenue: 2400, orders: 34 },
  { month: "Feb", revenue: 3200, orders: 45 },
  { month: "Mar", revenue: 2800, orders: 38 },
  { month: "Apr", revenue: 4100, orders: 57 },
  { month: "May", revenue: 3700, orders: 52 },
  { month: "Jun", revenue: 4800, orders: 68 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile:  { label: "Mobile",  color: "#60a5fa" },
  revenue: { label: "Revenue", color: "#2563eb" },
  orders:  { label: "Orders",  color: "#f97316" },
};

const stats = [
  { label: "Total Revenue", value: "$12,430", change: "+12%", up: true,  icon: <TrendingUp size={20} />,   color: "bg-blue-600" },
  { label: "Total Orders",  value: "284",     change: "+8%",  up: true,  icon: <ClipboardList size={20} />, color: "bg-orange-500" },
  { label: "Total Products",value: "128",     change: "+3%",  up: true,  icon: <ShoppingBag size={20} />,   color: "bg-green-500" },
  { label: "Total Users",   value: "1,204",   change: "-2%",  up: false, icon: <Users size={20} />,         color: "bg-purple-500" },
];

const recentOrders = [
  { id: "ORD-001", customer: "John Doe",     product: "Wireless Earbuds", amount: "$49.99",  status: "delivered" },
  { id: "ORD-002", customer: "Jane Smith",   product: "Smart Watch",      amount: "$129.99", status: "shipping" },
  { id: "ORD-003", customer: "Bob Johnson",  product: "Air Fryer XL",     amount: "$89.99",  status: "processing" },
  { id: "ORD-004", customer: "Alice Brown",  product: "Linen Dress",      amount: "$34.99",  status: "delivered" },
];

const STATUS_COLORS = {
  delivered:  "bg-green-100 text-green-700",
  shipping:   "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
};

const RANGE_OPTIONS = ["Last 30 days", "Last 3 months", "Last 6 months"];

// Custom tooltip for area chart
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="text-slate-400 text-xs mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white font-semibold capitalize">{p.name}:</span>
          <span className="text-slate-300">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [range, setRange] = useState("Last 3 months");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* ── STAT CARDS ── */}
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

      {/* ── AREA CHART — Visitors ── */}
      <div className="bg-[#0f172a] rounded-2xl border border-white/10 p-6 shadow-xl">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-white font-black text-lg">Site Visitors</h2>
            <p className="text-slate-400 text-sm mt-0.5">Showing total visitors — Desktop vs Mobile</p>
          </div>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-2 rounded-lg outline-none cursor-pointer hover:bg-white/20 transition-colors"
          >
            {RANGE_OPTIONS.map((r) => <option key={r} value={r} className="bg-[#1e293b]">{r}</option>)}
          </select>
        </div>

        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visitorData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="desktopGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "16px" }}
                formatter={(value) => (
                  <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600, textTransform: "capitalize" }}>
                    {value}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="desktop"
                stroke="#2563eb"
                strokeWidth={2}
                fill="url(#desktopGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#2563eb", strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stroke="#60a5fa"
                strokeWidth={2}
                fill="url(#mobileGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#60a5fa", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BAR CHART — Revenue ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-black text-gray-800 mb-1">Monthly Revenue</h2>
          <p className="text-gray-400 text-sm mb-6">Revenue vs Orders over 6 months</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "12px" }}
                  cursor={{ fill: "rgba(37,99,235,0.05)" }}
                />
                <Legend formatter={(v) => <span style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 600 }}>{v}</span>} />
                <Bar dataKey="revenue" fill="#2563eb" radius={[6, 6, 0, 0]} name="Revenue ($)" />
                <Bar dataKey="orders"  fill="#f97316" radius={[6, 6, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── RECENT ORDERS ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="font-black text-gray-800 flex items-center gap-2">
              <Package size={17} className="text-blue-600" /> Recent Orders
            </h2>
            <button className="text-xs text-blue-600 font-bold hover:text-blue-700">View all</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{order.id}</p>
                  <p className="text-xs text-gray-400 truncate">{order.customer} · {order.product}</p>
                </div>
                <span className="font-black text-gray-800 text-sm shrink-0">{order.amount}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 capitalize ${STATUS_COLORS[order.status]}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}