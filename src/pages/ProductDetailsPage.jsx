
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, ShieldCheck, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const ALL_PRODUCTS = [
  { id: 1, name: "Wireless Earbuds Pro", price: 49.99, originalPrice: 79.99, category: "Gadgets", rating: 4.5, reviews: 128, badge: "Sale", description: "Premium sound quality with active noise cancellation, 30hr battery life, and IPX5 water resistance. Perfect for workouts and commutes." },
  { id: 2, name: "Linen Summer Dress", price: 34.99, originalPrice: null, category: "Fashion", rating: 4.8, reviews: 64, badge: "New", description: "Lightweight breathable linen fabric perfect for warm weather. Features a relaxed fit, adjustable straps and side pockets." },
  { id: 3, name: "Cast Iron Skillet", price: 29.99, originalPrice: null, category: "Kitchenware", rating: 4.7, reviews: 92, badge: null, description: "Pre-seasoned cast iron skillet perfect for searing, baking and frying. Compatible with all stovetops including induction." },
  { id: 4, name: "Smart Watch Series 5", price: 129.99, originalPrice: 159.99, category: "Gadgets", rating: 4.6, reviews: 210, badge: "Sale", description: "Track your health 24/7 with heart rate, SpO2, sleep monitoring. GPS, 5ATM waterproof, 7-day battery life." },
];

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size} className={s <= Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const product = ALL_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-2xl font-black text-gray-800">Product not found</h2>
        <Link to="/shop" className="text-blue-600 hover:underline font-medium">← Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Image */}
        <div className="flex-1">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
            <span className="text-9xl opacity-40">
              {product.category === "Gadgets" ? "📱" : product.category === "Fashion" ? "👗" : "🍳"}
            </span>
            {product.badge && (
              <span className={`absolute top-5 left-5 text-sm font-bold px-3 py-1.5 rounded-full
                ${product.badge === "Sale" ? "bg-orange-500 text-white" : "bg-blue-600 text-white"}`}>
                {product.badge} {discount && `−${discount}%`}
              </span>
            )}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
            >
              <Heart size={18} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{product.category}</span>
            <h1 className="text-3xl font-black text-gray-900 mt-2 leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size={16} />
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through mb-0.5">${product.originalPrice}</span>
                <span className="text-sm font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg mb-0.5">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-500 leading-relaxed">{product.description}</p>

          <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
            {/* Qty */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold">−</button>
                <span className="w-10 text-center font-bold text-gray-800">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold">+</button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-200"
              >
                <ShoppingCart size={17} /> Add to Cart
              </button>
              <Link
                to="/checkout"
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-200"
              >
                <Zap size={17} /> Buy Now
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { icon: <Truck size={15} />, text: "Free shipping over $50" },
              { icon: <ShieldCheck size={15} />, text: "Secure checkout" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2.5">
                <span className="text-blue-600">{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}