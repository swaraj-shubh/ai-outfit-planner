import { useEffect, useState } from "react";
import API from "../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function Wardrobe() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    category: "",
    name: "",
    color: "",
    style: "",
  });

  const fetchWardrobe = async () => {
    const res = await API.get("/wardrobe/me");
    setItems(res.data.wardrobe);
  };

  useEffect(() => {
    fetchWardrobe();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    await API.post("/wardrobe/add", form);
    setForm({ category: "", name: "", color: "", style: "" }); // Clear form after submit
    fetchWardrobe();
  };

  // Helper function to get color preview
  const getColorPreview = (color) => {
    const colorMap = {
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
      black: "bg-black",
      white: "bg-white border border-gray-200",
      gray: "bg-gray-500",
      brown: "bg-amber-800",
      orange: "bg-orange-500",
      navy: "bg-blue-900",
      beige: "bg-amber-100",
    };
    return colorMap[color?.toLowerCase()] || "bg-gradient-to-r from-purple-400 to-pink-400";
  };

  // Category icons mapping
  const getCategoryIcon = (category) => {
    const icons = {
      top: "👕",
      bottom: "👖",
      dress: "👗",
      shoes: "👟",
      accessory: "🕶️",
      outerwear: "🧥",
    };
    return icons[category?.toLowerCase()] || "👔";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-5" />
        <div className="relative py-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            My Wardrobe
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Organize and manage your clothing collection</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon="👕" 
          label="Total Items" 
          value={items.length}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard 
          icon="📊" 
          label="Categories" 
          value={new Set(items.map(i => i.category)).size}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard 
          icon="🎨" 
          label="Colors" 
          value={new Set(items.map(i => i.color)).size}
          gradient="from-pink-500 to-pink-600"
        />
        <StatCard 
          icon="✨" 
          label="Styles" 
          value={new Set(items.map(i => i.style)).size}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      {/* Add Item Form */}
      <Card className="mb-8 rounded-2xl border-0 shadow-xl bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>➕</span> Add New Item
          </h3>
        </div>
        <div className="p-6">
          <form onSubmit={addItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Category</label>
                <Input 
                  placeholder="e.g., Top, Bottom, Shoes" 
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Name</label>
                <Input 
                  placeholder="e.g., Blue Jeans" 
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Color</label>
                <Input 
                  placeholder="e.g., Blue, Black" 
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Style</label>
                <Input 
                  placeholder="e.g., Casual, Formal" 
                  value={form.style}
                  onChange={(e) => setForm({ ...form, style: e.target.value })}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full md:w-auto px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <span>➕</span> Add to Wardrobe
              </span>
            </Button>
          </form>
        </div>
      </Card>

      {/* Items Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <span>👚</span> Your Collection
          </h3>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 shadow-sm">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {items.length === 0 ? (
          <Card className="p-12 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50">
            <div className="text-center">
              <div className="text-6xl mb-4">👕</div>
              <h4 className="text-xl font-semibold text-slate-700 mb-2">Your wardrobe is empty</h4>
              <p className="text-slate-500 mb-6">Start adding items to build your digital wardrobe</p>
              <div className="text-sm text-slate-400">
                Use the form above to add your first item
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card 
                key={item._id} 
                className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
              >
                {/* Color accent bar */}
                <div className={`h-2 w-full ${getColorPreview(item.color)}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getCategoryIcon(item.category)}</span>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                        <p className="text-sm text-slate-500">{item.category}</p>
                      </div>
                    </div>
                    
                    {/* Color indicator */}
                    <div className={`w-8 h-8 rounded-full ${getColorPreview(item.color)} shadow-md border-2 border-white`} />
                  </div>

                  <div className="space-y-3">
                    {/* Color tag */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">Color:</span>
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        {item.color}
                      </span>
                    </div>

                    {/* Style tag */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">Style:</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full border border-blue-100">
                        {item.style}
                      </span>
                    </div>
                  </div>

                  {/* Decorative pattern */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent opacity-50 rounded-tl-3xl" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
const StatCard = ({ icon, label, value, gradient }) => (
  <Card className="relative overflow-hidden rounded-2xl border-0 shadow-lg bg-white">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
    <div className="relative p-6">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </Card>
);

export default Wardrobe;