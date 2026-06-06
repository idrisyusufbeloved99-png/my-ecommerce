
import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, Star, ChevronDown, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";

const ALL_PRODUCTS = [
  { id: 1, name: "Wireless Earbuds Pro", price: 49.99, originalPrice: 79.99, category: "gadgets", rating: 4.5, reviews: 128, badge: "Sale" },
  { id: 2, name: "Linen Summer Dress", price: 34.99, originalPrice: null, category: "fashion", rating: 4.8, reviews: 64, badge: "New" },
  { id: 3, name: "Cast Iron Skillet", price: 29.99, originalPrice: null, category: "kitchenware", rating: 4.7, reviews: 92, badge: null },
  { id: 4, name: "Smart Watch Series 5", price: 129.99, originalPrice: 159.99, category: "gadgets", rating: 4.6, reviews: 210, badge: "Sale" },
  { id: 5, name: "Leather Crossbody Bag", price: 59.99, originalPrice: null, category: "fashion", rating: 4.4, reviews: 45, badge: null },
  { id: 6, name: "Air Fryer XL", price: 89.99, originalPrice: 119.99, category: "kitchenware", rating: 4.8, reviews: 175, badge: "Sale" },
  { id: 7, name: "Moisturizing Face Cream", price: 24.99, originalPrice: null, category: "beauty", rating: 4.6, reviews: 88, badge: "New" },
  { id: 8, name: "Bluetooth Speaker", price: 39.99, originalPrice: 59.99, category: "gadgets", rating: 4.3, reviews: 156, badge: "Sale" },
  { id: 9, name: "Slim Fit Chinos", price: 44.99, originalPrice: null, category: "fashion", rating: 4.5, reviews: 32, badge: null },
  { id: 10, name: "Ceramic Non-Stick Pan", price: 34.99, originalPrice: null, category: "kitchenware", rating: 4.9, reviews: 204, badge: "New" },
  { id: 11, name: "Vitamin C Serum", price: 19.99, originalPrice: 29.99, category: "beauty", rating: 4.7, reviews: 310, badge: "Sale" },
  { id: 12, name: "Mechanical Keyboard", price: 79.99, originalPrice: null, category: "gadgets", rating: 4.4, reviews: 67, badge: null },
];

const CATEGORIES = [
  { slug: "all", label: "All", emoji: "🛍️" },
  { slug: "fashion", label: "Fashion", emoji: "👗" },
  { slug: "gadgets", label: "Gadgets", emoji: "📱" },
  { slug: "kitchenware", label: "Kitchenware", emoji: "🍳" },
  { slug: "beauty", label: "Beauty", emoji: "✨" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={s <= Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-500">
            {product.category === "gadgets" ? "📱" : product.category === "fashion" ? "👗" : product.category === "beauty" ? "✨" : "🍳"}
          </span>
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full
              ${product.badge === "Sale" ? "bg-orange-500 text-white" : "bg-blue-600 text-white"}`}>
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 text-sm mt-1 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="font-black text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart({ ...product, category: product.category.charAt(0).toUpperCase() + product.category.slice(1) })}
            className="text-xs bg-blue-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors shrink-0"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategory = searchParams.get("category") || "all";

  function setCategory(slug) {
    if (slug === "all") searchParams.delete("category");
    else searchParams.set("category", slug);
    setSearchParams(searchParams);
  }

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, search, sort, priceRange]);

  const activeCategoryData = CATEGORIES.find((c) => c.slug === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── CATEGORY HERO BANNER ── */}
      <div className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium capitalize">{activeCategory === "all" ? "All Products" : activeCategoryData?.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{activeCategoryData?.emoji}</span>
            <div>
              <h1 className="text-3xl font-black">
                {activeCategory === "all" ? "All Products" : activeCategoryData?.label}
              </h1>
              <p className="text-slate-400 mt-1">{filtered.length} products found</p>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategory(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all
                  ${activeCategory === cat.slug
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-400 transition-colors shadow-sm">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none cursor-pointer shadow-sm hover:border-blue-400 transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter toggle mobile */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:border-blue-400 transition-colors sm:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={`w-60 shrink-0 hidden sm:block`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
              <h3 className="font-black text-gray-800 mb-5 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-blue-600" /> Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">Price Range</p>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0</span>
                  <span className="font-bold text-blue-600">${priceRange[1]}</span>
                </div>
              </div>

              {/* Rating filter */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">Min Rating</p>
                <div className="flex flex-col gap-2">
                  {[4, 3, 2].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="rating" className="accent-blue-600" />
                      <div className="flex items-center gap-1">
                        {[...Array(r)].map((_, i) => (
                          <Star key={i} size={12} className="text-orange-400 fill-orange-400" />
                        ))}
                        <span className="text-xs text-gray-500">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Badge filter */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Offers</p>
                <div className="flex flex-col gap-2">
                  {["Sale", "New"].map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                      <input type="checkbox" className="accent-blue-600 rounded" />
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b === "Sale" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <span className="text-6xl">🔍</span>
                <h3 className="text-xl font-black text-gray-700">No products found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}