import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, X, Menu, ChevronDown, Zap } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  {
    label: "Categories",
    path: "#",
    children: [
      { label: "Fashion", path: "/shop?category=fashion" },
      { label: "Gadgets", path: "/shop?category=gadgets" },
      { label: "Kitchenware", path: "/shop?category=kitchenware" },
      { label: "Beauty", path: "/shop?category=beauty" },
    ],
  },
  { label: "Orders", path: "/orders" },
];

// Mock cart items — replace with CartContext later
const mockCartItems = [
  { id: 1, name: "Wireless Earbuds Pro", price: 49.99, qty: 1 },
  { id: 2, name: "Linen Summer Dress", price: 34.99, qty: 2 },
];

function CartSheet() {
  const total = mockCartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 group">
          <ShoppingCart size={18} />
          {mockCartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
              {mockCartItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[420px] bg-white flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-gray-100">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <ShoppingCart size={20} className="text-blue-600" />
            Your Cart
            <span className="ml-auto text-sm font-normal text-gray-400">
              {mockCartItems.length} items
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {mockCartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <ShoppingCart size={48} className="text-gray-200" />
              <p className="text-gray-400 text-sm">Your cart is empty</p>
              <Link to="/shop" className="text-sm text-blue-600 font-medium hover:underline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            mockCartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 group">
                {/* Image placeholder */}
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center shrink-0 text-2xl">
                  🛍️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                  <p className="text-blue-600 font-bold text-sm mt-0.5">${item.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1">
                    <button className="text-gray-400 hover:text-gray-700 text-sm font-bold w-4 text-center">−</button>
                    <span className="text-sm font-semibold text-gray-800 w-4 text-center">{item.qty}</span>
                    <button className="text-gray-400 hover:text-gray-700 text-sm font-bold w-4 text-center">+</button>
                  </div>
                  <button className="text-gray-300 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {mockCartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-gray-900 text-lg">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3.5 rounded-xl text-center transition-colors duration-200"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              className="w-full border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 text-sm font-medium py-3 rounded-xl text-center transition-colors duration-200"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const location = useLocation();

  // TODO: replace with real auth
  const isAuthenticated = false;

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-blue-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        🎉 Free shipping on orders over ₦50,000 &nbsp;·&nbsp;
        <Link to="/shop" className="underline underline-offset-2 hover:text-orange-300 transition-colors">
          Shop Now
        </Link>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#0f172a] shadow-xl shadow-black/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 mr-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-black text-white text-xl tracking-tight">
              My<span className="text-orange-400">Store</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  {/* Dropdown */}
                  <div
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                    className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-200
                      ${categoriesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive
                      ? "text-white bg-white/15 border-b-2 border-orange-400"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Search bar */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? "flex-1 max-w-sm" : "w-auto"}`}>
            {searchOpen ? (
              <div className="flex items-center w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 gap-2">
                <Search size={15} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent text-white placeholder:text-slate-400 text-sm outline-none flex-1 min-w-0"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X size={14} className="text-slate-400 hover:text-white transition-colors" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all duration-200 text-sm"
              >
                <Search size={15} />
                <span className="text-xs">Search...</span>
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Mobile search */}
            <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
              <Search size={18} />
            </button>

            {/* Cart Sheet */}
            <CartSheet />

            {/* Auth */}
            {isAuthenticated ? (
              <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all">
                <User size={18} />
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors shadow-lg shadow-orange-500/25"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0f172a] border-t border-white/10 px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Categories
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                    ${isActive ? "text-white bg-white/15" : "text-slate-300 hover:text-white hover:bg-white/10"}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-medium text-slate-300 border border-white/20 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
