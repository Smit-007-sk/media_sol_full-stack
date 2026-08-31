"use client";

import { useState } from "react";
import { Search, MapPin, Home, DollarSign, ArrowRight } from "lucide-react";

export default function ApexSearch() {
  const [location, setLocation] = useState("Beverly Hills, CA");
  const [propertyType, setPropertyType] = useState("Waterfront Villa");
  const [priceRange, setPriceRange] = useState("$5M - $15M");
  const [searchExecuted, setSearchExecuted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchExecuted(true);
    setTimeout(() => setSearchExecuted(false), 3000);
  };

  return (
    <div className="bg-[#1E293B]/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-4 sm:p-6 shadow-2xl text-left max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        
        {/* Location Select */}
        <div className="space-y-1 bg-[#0F172A] p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Location</span>
          </div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option className="bg-[#0F172A] text-white">Beverly Hills, CA</option>
            <option className="bg-[#0F172A] text-white">Manhattan, NY</option>
            <option className="bg-[#0F172A] text-white">Miami Beach, FL</option>
            <option className="bg-[#0F172A] text-white">Monaco & Riviera</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-1 bg-[#0F172A] p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            <span>Property Type</span>
          </div>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option className="bg-[#0F172A] text-white">Waterfront Villa</option>
            <option className="bg-[#0F172A] text-white">Sky Penthouse</option>
            <option className="bg-[#0F172A] text-white">Architectural Estate</option>
            <option className="bg-[#0F172A] text-white">Private Island</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-1 bg-[#0F172A] p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Price Range</span>
          </div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option className="bg-[#0F172A] text-white">$2M - $5M</option>
            <option className="bg-[#0F172A] text-white">$5M - $15M</option>
            <option className="bg-[#0F172A] text-white">$15M - $50M</option>
            <option className="bg-[#0F172A] text-white">$50M+</option>
          </select>
        </div>

        {/* Search Submit */}
        <div>
          <button
            type="submit"
            className="w-full h-full bg-[#D97706] hover:bg-[#B45309] text-white p-4 rounded-2xl font-bold text-sm shadow-lg shadow-amber-900/40 transition-all flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4" />
            <span>{searchExecuted ? "Searching..." : "Search Estates"}</span>
          </button>
        </div>

      </form>

      {searchExecuted && (
        <div className="mt-4 p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-bold text-center animate-in fade-in">
          Found 14 Luxury Estates in {location} ({propertyType}, {priceRange})
        </div>
      )}
    </div>
  );
}
