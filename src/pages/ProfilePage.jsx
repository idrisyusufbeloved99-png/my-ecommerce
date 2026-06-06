
import { User, Package, Heart, Settings, LogOut, Edit2, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+234 800 000 0000",
  address: "123 Main Street, Lagos, Nigeria",
  joined: "January 2026",
  orders: 3,
  wishlist: 5,
};

export default function ProfilePage() {
  function handleSave() {
    toast.success("Profile updated successfully!");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">My Profile</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Avatar card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-black">
                {mockUser.name.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-orange-600 transition-colors">
                <Camera size={12} />
              </button>
            </div>
            <h2 className="font-black text-gray-800">{mockUser.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{mockUser.email}</p>
            <p className="text-xs text-gray-400">Member since {mockUser.joined}</p>

            <div className="flex justify-around mt-5 pt-5 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xl font-black text-gray-800">{mockUser.orders}</p>
                <p className="text-xs text-gray-400">Orders</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-xl font-black text-gray-800">{mockUser.wishlist}</p>
                <p className="text-xs text-gray-400">Wishlist</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {[
              { icon: <User size={16} />, label: "Personal Info", active: true },
              { icon: <Package size={16} />, label: "My Orders", path: "/orders" },
              { icon: <Heart size={16} />, label: "Wishlist" },
              { icon: <Settings size={16} />, label: "Settings" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path || "#"}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-b border-gray-50 last:border-0
                  ${item.active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span className={item.active ? "text-blue-600" : "text-gray-400"}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => toast.error("Logged out!")}
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-400 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-gray-800">Personal Information</h2>
            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <Edit2 size={13} /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Full Name", value: mockUser.name, field: "name" },
              { label: "Email", value: mockUser.email, field: "email" },
              { label: "Phone", value: mockUser.phone, field: "phone" },
              { label: "Address", value: mockUser.address, field: "address" },
            ].map((f) => (
              <div key={f.field} className={f.field === "address" ? "sm:col-span-2" : ""}>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  {f.label}
                </label>
                <input
                  defaultValue={f.value}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-blue-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}