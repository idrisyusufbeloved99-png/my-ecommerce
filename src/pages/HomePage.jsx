import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  HeadphonesIcon,
} from "lucide-react";
import earbuds from "../assets/air-pods.png";
import dress from "../assets/meadow-linen-dress.png";
import pan from "../assets/pan.png";
import watch from "../assets/watch.png";

// ── MOCK DATA (replace with API calls later) ──
const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    description: "Clothing, shoes & accessories",
    emoji: "👗",
    bg: "bg-blue-50",
    accent: "text-blue-600",
  },
  {
    name: "Gadgets",
    slug: "gadgets",
    description: "Tech & electronics",
    emoji: "📱",
    bg: "bg-orange-50",
    accent: "text-orange-500",
  },
  {
    name: "Kitchenware",
    slug: "kitchenware",
    description: "Cookware & appliances",
    emoji: "🍳",
    bg: "bg-blue-50",
    accent: "text-blue-600",
  },
  {
    name: "Beauty",
    slug: "beauty",
    description: "Skincare & cosmetics",
    emoji: "✨",
    bg: "bg-orange-50",
    accent: "text-orange-500",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 49.99,
    originalPrice: 79.99,
    category: "Gadgets",
    badge: "Sale",
    image: earbuds,
  },
  {
    id: 2,
    name: "Linen Summer Dress",
    price: 34.99,
    originalPrice: null,
    category: "Fashion",
    badge: "New",
    image: dress,
  },
  {
    id: 3,
    name: "Cast Iron Skillet",
    price: 29.99,
    originalPrice: null,
    category: "Kitchenware",
    badge: null,
    image: pan,
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 129.99,
    originalPrice: 159.99,
    category: "Gadgets",
    badge: "Sale",
    image: watch,
  },
];

const stats = [
  { value: "12K+", label: "Happy Customers" },
  { value: "3K+", label: "Products" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

const perks = [
  {
    icon: <Truck size={22} />,
    title: "Free Shipping",
    desc: "On orders over ₦50,000",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Payment",
    desc: "100% protected transactions",
  },
  {
    icon: <HeadphonesIcon size={22} />,
    title: "24/7 Support",
    desc: "We're always here to help",
  },
  {
    icon: <ShoppingBag size={22} />,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
];

// ── PRODUCT CARD ──
function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full
              ${product.badge === "Sale" ? "bg-orange-500 text-white" : "bg-blue-600 text-white"}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault(); // prevent Link navigation
              // TODO: add to cart
            }}
            className="text-xs bg-blue-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}

// ── HOME PAGE ──
export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-20 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase bg-orange-50 px-3 py-1.5 rounded-full">
            New arrivals every week
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Shop Smart, <span className="text-blue-600">Live Better.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md leading-relaxed">
            Discover thousands of products across Fashion, Gadgets, Kitchenware
            and more — all in one place.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/shop"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop?category=gadgets"
              className="flex items-center gap-2 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Browse Deals
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-blue-50 rounded-3xl rotate-6" />
            <div className="absolute inset-0 bg-orange-50 rounded-3xl -rotate-3" />
            <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center">
              <span className="text-8xl">🛍️</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-2">
              Browse by
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            All products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className={`${cat.bg} rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group`}
            >
              <span className="text-4xl block mb-4">{cat.emoji}</span>
              <h3
                className={`font-bold text-gray-800 mb-1 group-hover:${cat.accent} transition-colors`}
              >
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-2">
              Hand picked
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                {perk.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {perk.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
