import { Link } from "react-router-dom";
import { Store, Mail, Phone, MapPin } from "lucide-react";

const shopLinks = [
  { label: "All Products", path: "/shop" },
  { label: "Fashion", path: "/shop?category=fashion" },
  { label: "Gadgets", path: "/shop?category=gadgets" },
  { label: "Kitchenware", path: "/shop?category=kitchenware" },
  { label: "Beauty", path: "/shop?category=beauty" },
];

const accountLinks = [
  { label: "My Profile", path: "/profile" },
  { label: "My Orders", path: "/orders" },
  { label: "Cart", path: "/cart" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
];

const socials = [
  { label: "FB", href: "#" },
  { label: "TW", href: "#" },
  { label: "IG", href: "#" },
  { label: "YT", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">

      {/* ── MAIN FOOTER CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Store size={22} className="text-orange-400" />
              MyStore
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your one-stop shop for Fashion, Gadgets, Kitchenware and more. Quality products, delivered fast.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5 mt-1">
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail size={14} className="text-orange-400 shrink-0" />
                support@mystore.com
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone size={14} className="text-orange-400 shrink-0" />
                +234 800 000 0000
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin size={14} className="text-orange-400 shrink-0" />
                Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest">
              Shop
            </h3>
            <ul className="flex flex-col gap-2.5">
              {shopLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest">
              Account
            </h3>
            <ul className="flex flex-col gap-2.5">
              {accountLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Get the latest deals and new arrivals straight to your inbox.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MyStore. Built for learning purposes.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
