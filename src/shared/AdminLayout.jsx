// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import SideBar from "../admin/SideBar"

// const AdminLayout = () => {
//   return (
//     <div>
//         <main>
//             <Outlet />
//         </main>
//         <SideBar />
//     </div>
//   )
// }

// export default AdminLayout



import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  LogOut,
  Store,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <LayoutDashboard size={18} />,
    end: true, // only highlight when exactly on /admin
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBag size={18} />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ClipboardList size={18} />,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <Users size={18} />,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: clear auth state when backend is ready
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-base-200">

      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-base-300">
          <Store size={22} className="text-primary" />
          <span className="font-bold text-lg tracking-tight">Admin Panel</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-200"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout at bottom */}
        <div className="px-3 py-4 border-t border-base-300">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-error hover:bg-error hover:text-error-content transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <header className="h-14 bg-base-100 border-b border-base-300 flex items-center px-6">
          <h1 className="text-sm text-base-content/60">
            Welcome back, <span className="font-semibold text-base-content">Admin</span>
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}