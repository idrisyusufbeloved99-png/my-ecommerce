import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Store, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Cart", path: "/cart" },
];

export default function Navbar() {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const linkRefs = useRef({});

  // TODO: replace with real cart count from CartContext
  const cartCount = 0;

  // TODO: replace with real auth state from AuthContext
  const isAuthenticated = false;

  // Move the indicator to the active link
  useEffect(() => {
    const activeLink = navLinks.find((link) =>
      link.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(link.path)
    );

    if (activeLink && linkRefs.current[activeLink.path] && navRef.current) {
      const linkEl = linkRefs.current[activeLink.path];
      const navEl = navRef.current;
      const linkRect = linkEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-800"
        >
          <Store size={22} className="text-blue-600" />
          MyStore
        </Link>

        {/* Nav Links with sliding indicator */}
        <nav ref={navRef} className="hidden md:flex items-center relative">
          {/* Sliding blue indicator */}
          <span
            className="absolute bottom-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              ref={(el) => (linkRefs.current[link.path] = el)}
              className={({ isActive }) =>
                `px-4 py-5 text-sm font-medium transition-colors duration-200
                ${isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Cart icon (desktop, since it's also in nav links you can remove from here) */}
          <Link to="/cart" className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <User size={20} />
              </button>
              <ul className="dropdown-content menu bg-white rounded-xl shadow-lg border border-gray-100 w-48 mt-2 p-1 z-50">
                <li><Link to="/profile" className="text-sm text-gray-700 hover:text-blue-600">Profile</Link></li>
                <li><Link to="/orders" className="text-sm text-gray-700 hover:text-blue-600">My Orders</Link></li>
                <li><hr className="border-gray-100 my-1" /></li>
                <li><button className="text-sm text-red-500 w-full text-left px-2 py-1.5">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-1.5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
