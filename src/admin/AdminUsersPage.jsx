import { useState } from "react";
import { Search, Shield, User, Ban, ChevronDown, Mail, Phone, MapPin, XCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const INITIAL_USERS = [
  { id: 1, name: "John Doe",    email: "john@example.com",  phone: "+234 801 111 1111", role: "customer", status: "active",  joined: "Jan 12, 2026", orders: 5,  spent: 284.95, address: "123 Main St, Lagos" },
  { id: 2, name: "Jane Smith",  email: "jane@example.com",  phone: "+234 802 222 2222", role: "customer", status: "active",  joined: "Feb 3, 2026",  orders: 12, spent: 743.88, address: "45 Park Ave, Abuja" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com",   phone: "+234 803 333 3333", role: "admin",    status: "active",  joined: "Jan 1, 2026",  orders: 0,  spent: 0,      address: "78 Beach Rd, Lagos" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", phone: "+234 804 444 4444", role: "customer", status: "banned",  joined: "Mar 20, 2026", orders: 2,  spent: 89.98,  address: "12 Hill Str, Kano" },
  { id: 5, name: "Mike Wilson", email: "mike@example.com",  phone: "+234 805 555 5555", role: "customer", status: "active",  joined: "Apr 7, 2026",  orders: 8,  spent: 512.40, address: "90 Ring Rd, Ibadan" },
  { id: 6, name: "Sara Connor", email: "sara@example.com",  phone: "+234 806 666 6666", role: "customer", status: "active",  joined: "May 14, 2026", orders: 3,  spent: 134.97, address: "33 Palm Ave, PH" },
];

const ROLE_CONFIG = {
  admin:    { label: "Admin",    color: "bg-purple-100 text-purple-700", icon: <Shield size={11} /> },
  customer: { label: "Customer", color: "bg-blue-100 text-blue-700",    icon: <User size={11} /> },
};

const STATUS_CONFIG = {
  active: { label: "Active", color: "bg-green-100 text-green-700", dot: "bg-green-400" },
  banned: { label: "Banned", color: "bg-red-100 text-red-500",     dot: "bg-red-400" },
};

export default function AdminUsersPage() {
  const [users, setUsers]         = useState(INITIAL_USERS);
  const [search, setSearch]       = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selected, setSelected]   = useState(null);

  function toggleBan(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "banned" : "active" } : u
      )
    );
    const user = users.find((u) => u.id === id);
    const next = user.status === "active" ? "banned" : "active";
    toast[next === "banned" ? "error" : "success"](
      `${user.name} has been ${next === "banned" ? "banned" : "unbanned"}`
    );
    if (selected?.id === id) setSelected((s) => ({ ...s, status: next }));
  }

  function toggleRole(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === "admin" ? "customer" : "admin" } : u
      )
    );
    const user = users.find((u) => u.id === id);
    const next = user.role === "admin" ? "customer" : "admin";
    toast.success(`${user.name} is now ${next}`);
    if (selected?.id === id) setSelected((s) => ({ ...s, role: next }));
  }

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalCustomers = users.filter((u) => u.role === "customer").length;
  const totalAdmins    = users.filter((u) => u.role === "admin").length;
  const totalBanned    = users.filter((u) => u.status === "banned").length;
  const totalRevenue   = users.reduce((s, u) => s + u.spent, 0);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Users</h1>
        <p className="text-gray-400 text-sm mt-1">{users.length} registered users</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Customers",     value: totalCustomers, color: "bg-blue-600",   icon: <User size={18} /> },
          { label: "Admins",        value: totalAdmins,    color: "bg-purple-600", icon: <Shield size={18} /> },
          { label: "Banned",        value: totalBanned,    color: "bg-red-500",    icon: <Ban size={18} /> },
          { label: "Total Spent",   value: `$${totalRevenue.toFixed(0)}`, color: "bg-orange-500", icon: <ShoppingBag size={18} /> },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 ${card.color} rounded-xl flex items-center justify-center text-white mb-3`}>
              {card.icon}
            </div>
            <p className="text-2xl font-black text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:border-blue-400 transition-colors">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none cursor-pointer shadow-sm hover:border-blue-400 transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="admin">Admins</option>
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
                  {["User", "Role", "Status", "Orders", "Spent", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No users found</td>
                  </tr>
                ) : filtered.map((user) => {
                  const roleCfg   = ROLE_CONFIG[user.role];
                  const statusCfg = STATUS_CONFIG[user.status];
                  return (
                    <tr
                      key={user.id}
                      onClick={() => setSelected(user)}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === user.id ? "bg-blue-50" : ""}`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1.5 w-fit text-xs font-bold px-2.5 py-1 rounded-full ${roleCfg.color}`}>
                          {roleCfg.icon} {roleCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1.5 w-fit text-xs font-bold px-2.5 py-1 rounded-full ${statusCfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600 text-center">{user.orders}</td>
                      <td className="px-5 py-4 font-bold text-gray-800">${user.spent.toFixed(2)}</td>
                      <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{user.joined}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleBan(user.id); }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors
                              ${user.status === "active"
                                ? "bg-red-50 hover:bg-red-100 text-red-500"
                                : "bg-green-50 hover:bg-green-100 text-green-600"}`}
                          >
                            {user.status === "active" ? "Ban" : "Unban"}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleRole(user.id); }}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors"
                          >
                            {user.role === "admin" ? "→ Customer" : "→ Admin"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* User detail panel */}
        {selected && (
          <div className="w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 self-start sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-800 text-sm">User Detail</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={15} />
              </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-xl">
                {selected.name.charAt(0)}
              </div>
              <p className="font-black text-gray-800">{selected.name}</p>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${ROLE_CONFIG[selected.role].color}`}>
                  {ROLE_CONFIG[selected.role].icon} {ROLE_CONFIG[selected.role].label}
                </span>
                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_CONFIG[selected.status].color}`}>
                  {STATUS_CONFIG[selected.status].label}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4 text-xs">
              {[
                { icon: <Mail size={12} />,     text: selected.email },
                { icon: <Phone size={12} />,    text: selected.phone },
                { icon: <MapPin size={12} />,   text: selected.address },
                { icon: <ShoppingBag size={12} />, text: `${selected.orders} orders · $${selected.spent.toFixed(2)} spent` },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2 text-gray-500">
                  <span className="text-blue-500 mt-0.5 shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Quick Actions</p>
              <button
                onClick={() => toggleBan(selected.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-colors
                  ${selected.status === "active"
                    ? "bg-red-50 hover:bg-red-100 text-red-500"
                    : "bg-green-50 hover:bg-green-100 text-green-600"}`}
              >
                {selected.status === "active" ? "Ban User" : "Unban User"}
              </button>
              <button
                onClick={() => toggleRole(selected.id)}
                className="w-full py-2 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors"
              >
                Make {selected.role === "admin" ? "Customer" : "Admin"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
