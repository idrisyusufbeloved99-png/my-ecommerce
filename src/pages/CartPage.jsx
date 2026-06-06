
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart, cartTotal } = useCart();
  const [coupon, setCoupon] = useState("");

  function handleCoupon() {
    if (coupon.trim().toLowerCase() === "save10") {
      toast.success("Coupon applied! 10% off your order 🎉");
    } else {
      toast.error("Invalid coupon code");
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 gap-5">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
          <ShoppingBag size={40} className="text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
        </div>
        <Link
          to="/shop"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
        >
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.075;
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Your Cart</h1>
          <p className="text-gray-400 text-sm mt-1">{cartItems.reduce((s, i) => s + i.qty, 0)} items</p>
        </div>
        <button
          onClick={() => { clearCart(); }}
          className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center text-3xl shrink-0">
                {item.category === "Gadgets" ? "📱" : item.category === "Fashion" ? "👗" : "🍳"}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">{item.category}</p>
                <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                <p className="text-orange-500 font-black mt-1">${item.price}</p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center font-bold text-gray-800">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right shrink-0 w-20">
                <p className="font-black text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}

          {/* Coupon */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-400 transition-colors">
              <Tag size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder='Coupon code (try "SAVE10")'
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={handleCoupon}
              className="bg-gray-900 hover:bg-blue-600 text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-black text-gray-900 mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? "text-green-500" : "text-gray-800"}`}>
                  {shipping === 0 ? "FREE" : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (7.5%)</span>
                <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <div className="bg-blue-50 text-blue-600 text-xs font-medium rounded-xl px-4 py-2.5 text-center">
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <div className="border-t border-gray-100 pt-3 mt-1 flex justify-between">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-xl text-gray-900">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              className="mt-3 w-full flex items-center justify-center text-sm text-gray-400 hover:text-blue-600 transition-colors py-2"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}