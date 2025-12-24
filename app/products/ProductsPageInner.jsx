"use client";

import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../data/products";
import { COMPOUNDS } from "../data/compounds";
import { useSearchParams } from "next/navigation";
import { useCart } from "../components/CartContext";

// BRAND THEMES
const BRAND_THEMES = {
  "ED Ajanta Pharma": {
    name: "Ajanta Pharma",
    logo: "/bg/ajanta.png",
    primary: "#0A2A73",
    secondary: "#2A7DB8",
    bgImage: "/bg/bg1.png",
    gradient: "linear-gradient(135deg, #0A2A73 0%, #2A7DB8 100%)",
  },
  "ED Centurion Remedies": {
    name: "Centurion Remedies",
    logo: "/bg/centurion.png",
    primary: "#B69A6B",
    secondary: "#D9C7A2",
    bgImage: "/bg/bg5.png",
    gradient: "linear-gradient(135deg, #B69A6B 0%, #D9C7A2 100%)",
  },
  "ED Sunrise Remedies": {
    name: "Sunrise Remedies",
    logo: "/bg/sunrise.png",
    primary: "#E86A0C",
    secondary: "#F6B15C",
    bgImage: "/bg/bg4.png",
    gradient: "linear-gradient(135deg, #E86A0C 0%, #F6B15C 100%)",
  },
  Nova: {
    name: "Nova",
    logo: "/bg/nova.png",
    primary: "#081A3E",
    secondary: "#1C4A8C",
    bgImage: "/bg/bg6.png",
    gradient: "linear-gradient(135deg, #081A3E 0%, #1C4A8C 100%)",
  },
};

const BRAND_ORDER = [
  "ED Ajanta Pharma",
  "ED Centurion Remedies",
  "ED Sunrise Remedies",
];

const makeId = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function ProductsPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const brandFromUrl = searchParams.get("brand");

  const [selectedBrand, setSelectedBrand] = useState(
    BRAND_THEMES[brandFromUrl] ? brandFromUrl : "ED Ajanta Pharma"
  );
  const [search, setSearch] = useState("");
  const [selectedCompound, setSelectedCompound] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCompound, setActiveCompound] = useState(null);
  const sectionRefs = useRef({});
  const productsStartRef = useRef(null);


  const theme = BRAND_THEMES[selectedBrand];
  const brandCompounds = COMPOUNDS[selectedBrand] || {};
  const compoundNames = Object.keys(brandCompounds);
  const brandProducts = products.filter((p) => p.brand === selectedBrand);
  const brandCategories = ["All", ...new Set(brandProducts.map((p) => p.category))];

  // Initialize
  useEffect(() => {
    if (compoundNames.length > 0) {
      setSelectedCompound(compoundNames[0]);
      setActiveCompound(compoundNames[0]);
    }
  }, [selectedBrand]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (!compoundNames.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCompound(entry.target.dataset.compound);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    compoundNames.forEach((compound) => {
      const el = sectionRefs.current[compound];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedBrand]);

  // URL brand change
  useEffect(() => {
    if (brandFromUrl && BRAND_THEMES[brandFromUrl]) {
      setSelectedBrand(brandFromUrl);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [brandFromUrl]);

  // Scroll to compound
  const scrollToCompound = (compound) => {
    const el = document.getElementById(`compound-${makeId(compound)}`);
    if (el) {
      const offset = 120;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToProductsStart = () => {
  if (!productsStartRef.current) return;

  const offset = 140; // navbar + floating bar height
  const y =
    productsStartRef.current.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({ top: y, behavior: "smooth" });
};


  // Compound Navigation Tabs
  


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
     <Navbar />
      
{/* Background Pattern */}
<div className="fixed inset-0 -z-10">
  <div className="absolute inset-0 opacity-[0.03]"
       style={{
         backgroundImage: `radial-gradient(${theme.primary} 1px, transparent 1px)`,
         backgroundSize: '50px 50px'
       }}>
  </div>
</div>

{/* Floating Brand Selector */}
<div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
  isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
}`}>
  <div className="flex items-center gap-2 bg-white rounded-full shadow-xl px-4 py-3 border">
    {BRAND_ORDER.map((brandKey) => {
      const b = BRAND_THEMES[brandKey];
      const isActive = selectedBrand === brandKey;
      
      return (
        <button
          key={brandKey}
          onClick={() => {
  setSelectedBrand(brandKey);
  setSearch("");
  setCategoryFilter("All");

  setTimeout(() => {
    scrollToProductsStart();
  }, 50);
}}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
          style={{
            backgroundColor: isActive ? `${b.primary}10` : undefined,
          }}
        >
          <div className="relative w-6 h-6">
            <Image src={b.logo} alt={b.name} fill className="object-contain" />
          </div>
          {isActive && (
            <span className="text-sm font-medium whitespace-nowrap" style={{ color: b.primary }}>
              {b.name}
            </span>
          )}
        </button>
      );
    })}
  </div>
</div>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
{/* Brand Logos at the Top */}
{/* Brand Logos at the Top */}
<div className="mb-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {BRAND_ORDER.map((brandKey, index) => {
      const b = BRAND_THEMES[brandKey];
      const isActive = selectedBrand === brandKey;
      
      const isFirstLogo = index === 0; // Ajanta
      const isSecondLogo = index === 1; // Centurion
      const isThirdLogo = index === 2; // Sunrise

      return (
        <button
          key={brandKey}
          onClick={() => {
            setSelectedBrand(brandKey);
            setSearch("");
            setCategoryFilter("All");
          }}
          // Container size fixed at h-48
          className={`relative overflow-hidden rounded-2xl p-4 h-48 transition-all duration-500 transform hover:scale-[1.02] ${
            isActive ? 'ring-4 ring-offset-2 scale-[1.02]' : 'hover:shadow-xl'
          }`}
          style={{
            background: `linear-gradient(135deg, ${b.primary}15 0%, ${b.secondary}15 100%)`,
            border: `2px solid ${isActive ? b.primary : 'transparent'}`,
            outlineColor: b.primary,
          }}
        >
          {isActive && (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: b.primary }}></div>
            </div>
          )}
          
          <div className="flex items-center justify-center h-full w-full">
            {/* 
               FINAL SIZING LOGIC:
               1. Ajanta (1st): w-40 h-40 (Increased - Large Square)
               2. Centurion (2nd): w-36 h-36 (Maintained Large Size - Not Decreased)
               3. Sunrise (3rd): w-64 h-32 (Wide - Increased for Landscape Logo)
            */}
            <div className={`relative flex items-center justify-center transition-all duration-300 
              ${isFirstLogo ? "w-40 h-40 md:w-48 md:h-48" : ""}
              ${isSecondLogo ? "w-36 h-36 md:w-40 md:h-40" : ""}
              ${isThirdLogo ? "w-60 h-32 md:w-72 md:h-40" : ""}
            `}>
              <Image
                src={b.logo}
                alt={b.name}
                fill
                className="object-contain drop-shadow-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </button>
      );
    })}
  </div>
</div>



  {/* Hero Section Below Logos */}
  <div className="mb-12">
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: theme.gradient }}>
          {theme.name}
        </span> Products
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Browse through our comprehensive range of pharmaceutical products
      </p>
    </div>

          {/* Advanced Filters */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products by name, composition, or description..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': theme.primary }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <select
                    value={selectedCompound}
                    onChange={(e) => {
                      setSelectedCompound(e.target.value);
                      scrollToCompound(e.target.value);
                    }}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:border-transparent transition-all appearance-none bg-white min-w-[200px]"
                    style={{ '--tw-ring-color': theme.primary }}
                  >
                    <option value="">All Compounds</option>
                    {compoundNames.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l4 4 4-4" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:border-transparent transition-all appearance-none bg-white min-w-[180px]"
                    style={{ '--tw-ring-color': theme.primary }}
                  >
                    {brandCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l4 4 4-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       

       {/* Products Sections */}
<div ref={productsStartRef} className="pt-8">

          {compoundNames.map((compound) => {
            const slugs = brandCompounds[compound] || [];
            
            let items = brandProducts.filter((p) => {
              const slug = p.slug.toLowerCase();
              const name = p.name.toLowerCase();
              const belongsToCompound = slugs.some((key) => {
                const k = key.toLowerCase();
                return k === slug || k === name;
              });

              if (!belongsToCompound) return false;
              if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
              if (search.trim()) {
                const q = search.toLowerCase();
                const n = p.name?.toLowerCase() || "";
                const d = p.description?.toLowerCase() || "";
                return n.includes(q) || d.includes(q);
              }
              return true;
            });

            if (!items.length) return null;

            return (
              <section
                key={compound}
                id={`compound-${makeId(compound)}`}
                data-compound={compound}
                ref={(el) => (sectionRefs.current[compound] = el)}
                className="scroll-mt-32 mb-16"
              >
                {/* Compound Header */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{compound}</h2>
                      <p className="text-gray-600 mt-2">
                        {items.length} product{items.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-full text-sm font-semibold"
                         style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
                      {slugs.length} SKUs
                    </div>
                  </div>
                  <div className="h-1 w-24 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                </div>

                {/* Products List with Alternating Layout */}
                <div className="space-y-8">
                  {items.map((p, index) => {
                    const isEven = index % 2 === 0; // Even index: image left, Odd index: image right
                    
                    return (
                      <div
                        key={p.slug}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="p-6">
                          {/* MOBILE VIEW - Stacked layout */}
                          <div className="lg:hidden">
                            <div className="space-y-6">
                              {/* Product Image */}
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                                <div className="relative h-48">
                                  <Image
                                    src={p.image && p.image.trim() !== "" ? p.image : "/placeholder.jpg"}
                                    alt={p.name}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                  />
                                </div>
                              </div>

                              {/* Product Details */}
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded"
                                          style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
                                      {p.category}
                                    </span>
                                  </div>
                                </div>

                                {/* Specifications */}
                                <div className="space-y-2">
                                  {p.dosage && (
                                    <div className="flex items-start">
                                      <span className="text-sm font-medium text-gray-700 min-w-[80px]">Dosage:</span>
                                      <span className="text-sm text-gray-600 ml-2">{p.dosage}</span>
                                    </div>
                                  )}
                                  {p.composition && (
                                    <div className="flex items-start">
                                      <span className="text-sm font-medium text-gray-700 min-w-[80px]">Composition:</span>
                                      <span className="text-sm text-gray-600 ml-2">{p.composition}</span>
                                    </div>
                                  )}
                                  {p.pack_size && (
                                    <div className="flex items-start">
                                      <span className="text-sm font-medium text-gray-700 min-w-[80px]">Pack Size:</span>
                                      <span className="text-sm text-gray-600 ml-2">{p.pack_size}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {p.description && (
                                  <p className="text-gray-600 text-sm pt-3 border-t border-gray-100">
                                    {p.description}
                                  </p>
                                )}

                                {/* Action Buttons - Mobile */}
                                <div className="flex flex-col gap-3 pt-4">
                                  <Link
                                    href={`/product/${p.slug}`}
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg font-medium transition-all hover:bg-gray-50"
                                    style={{
                                      borderColor: theme.primary,
                                      color: theme.primary,
                                    }}
                                  >
                                    View Details
                                  </Link>

                                  <button
                                    onClick={() => addToCart(p, 50, false, true)}
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white transition-all hover:opacity-90"
                                    style={{ 
                                      backgroundColor: theme.primary,
                                    }}
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DESKTOP VIEW - Alternating layout */}
                          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                            {/* First product (index even): Image on left, details on right */}
                            {isEven ? (
                              <>
                                {/* Left Column - Image */}
                                <div className="flex items-center justify-center">
                                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 w-full">
                                    <div className="relative h-48">
                                      <Image
                                        src={p.image && p.image.trim() !== "" ? p.image : "/placeholder.jpg"}
                                        alt={p.name}
                                        fill
                                        className="object-contain"
                                        sizes="50vw"
                                      />
                                    </div>
                                    <div className="text-center mt-4">
                                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                            style={{ backgroundColor: theme.primary }}>
                                        {p.category}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Details */}
                                <div className="flex flex-col justify-center">
                                  <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                                    
                                    {/* Specifications List */}
                                    <div className="space-y-3">
                                      {p.dosage && (
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">Dosage:</span>
                                          <span className="text-sm text-gray-600 ml-3">{p.dosage}</span>
                                        </div>
                                      )}
                                      {p.composition && (
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">Composition:</span>
                                          <span className="text-sm text-gray-600 ml-3">{p.composition}</span>
                                        </div>
                                      )}
                                      {p.pack_size && (
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">Pack Size:</span>
                                          <span className="text-sm text-gray-600 ml-3">{p.pack_size}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {p.description && (
                                      <div className="pt-3 border-t border-gray-100">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                          {p.description}
                                        </p>
                                      </div>
                                    )}

                                    {/* Action Buttons - Desktop */}
                                    <div className="flex gap-4 pt-4">
                                      <Link
                                        href={`/product/${p.slug}`}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 border rounded-lg font-medium transition-all hover:bg-gray-50"
                                        style={{
                                          borderColor: theme.primary,
                                          color: theme.primary,
                                        }}
                                      >
                                        View Details
                                      </Link>

                                      <button
                                        onClick={() => addToCart(p, 50, false, true)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition-all hover:opacity-90"
                                        style={{ 
                                          backgroundColor: theme.primary,
                                        }}
                                      >
                                        Add to Cart
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {/* Second product (index odd): Details on left, image on right */}
                                {/* Left Column - Details */}
                                <div className="flex flex-col justify-center">
                                  <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                                    
                                    {/* Specifications List */}
                                    <div className="space-y-3">
                                      {p.dosage && (
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">Dosage:</span>
                                          <span className="text-sm text-gray-600 ml-3">{p.dosage}</span>
                                        </div>
                                      )}
                                      {p.composition && (
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">Composition:</span>
                                          <span className="text-sm text-gray-600 ml-3">{p.composition}</span>
                                        </div>
                                      )}
                                      {p.pack_size && (
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">Pack Size:</span>
                                          <span className="text-sm text-gray-600 ml-3">{p.pack_size}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {p.description && (
                                      <div className="pt-3 border-t border-gray-100">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                          {p.description}
                                        </p>
                                      </div>
                                    )}

                                    {/* Action Buttons - Desktop */}
                                    <div className="flex gap-4 pt-4">
                                      <Link
                                        href={`/product/${p.slug}`}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 border rounded-lg font-medium transition-all hover:bg-gray-50"
                                        style={{
                                          borderColor: theme.primary,
                                          color: theme.primary,
                                        }}
                                      >
                                        View Details
                                      </Link>

                                      <button
                                        onClick={() => addToCart(p, 50, false, true)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition-all hover:opacity-90"
                                        style={{ 
                                          backgroundColor: theme.primary,
                                        }}
                                      >
                                        Add to Cart
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Image */}
                                <div className="flex items-center justify-center">
                                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 w-full">
                                    <div className="relative h-48">
                                      <Image
                                        src={p.image && p.image.trim() !== "" ? p.image : "/placeholder.jpg"}
                                        alt={p.name}
                                        fill
                                        className="object-contain"
                                        sizes="50vw"
                                      />
                                    </div>
                                    <div className="text-center mt-4">
                                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                            style={{ backgroundColor: theme.primary }}>
                                        {p.category}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Empty State */}
          {compoundNames.length > 0 && compoundNames.every(compound => {
            const slugs = brandCompounds[compound] || [];
            const items = brandProducts.filter(p => slugs.includes(p.slug));
            return items.length === 0;
          }) && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                   style={{ 
                     background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary}15 100%)`,
                     border: `2px dashed ${theme.primary}40`
                   }}>
                <svg className="w-12 h-12" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                We couldn't find any products matching your search criteria.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSearch("")}
                  className="px-6 py-3 rounded-xl border font-medium transition-all hover:bg-gray-50"
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  Clear Search
                </button>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategoryFilter("All");
                    setSelectedCompound(compoundNames[0]);
                  }}
                  className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:shadow-lg"
                  style={{ background: theme.gradient }}
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-8 right-8 z-40 lg:hidden">
            <button
              onClick={() => scrollToCompound(activeCompound || compoundNames[0])}
              className="p-4 rounded-full shadow-2xl text-white animate-bounce"
              style={{ background: theme.gradient }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}