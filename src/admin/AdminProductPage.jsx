
import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Package } from "lucide-react";
import { toast } from "sonner";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Wireless Earbuds Pro", category: "Gadgets", price: 49.99, stock: 45, status: "active" },
  { id: 2, name: "Linen Summer Dress", category: "Fashion", price: 34.99, stock: 12, status: "active" },
  { id: 3, name: "Cast Iron Skillet", category: "Kitchenware", price: 29.99, stock: 0, status: "out_of_stock" },
  { id: 4, name: "Smart Watch Series 5", category: "Gadgets", price: 129.99, stock: 8, status: "active" },
];

export default function AdminProductPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");

  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.error("Product deleted");
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} total products</p>
        </div>
        <button
          onClick={() => toast.success("Add product modal coming soon!")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 max-w-sm shadow-sm focus-within:border-blue-400 transition-colors">
        <Search size={15} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                        {p.category === "Gadgets" ? "📱" : p.category === "Fashion" ? "👗" : "🍳"}
                      </div>
                      <span className="font-semibold text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{p.category}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">${p.price}</td>
                  <td className="px-6 py-4 text-gray-500">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                      ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
                      {p.status === "active" ? "Active" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toast.success(`Editing ${p.name}`)}
                        className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}