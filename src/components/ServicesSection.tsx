import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Zap, 
  Check, 
  Star, 
  Sparkles, 
  Flame, 
  Globe, 
  Layers, 
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Award,
  Send,
  MessageSquare
} from 'lucide-react';
import { ServiceProduct } from '../types';
import { servicesData, quantityTiers } from '../data/servicesData';

interface ServicesSectionProps {
  onAddToCart: (product: ServiceProduct, quantity: number) => void;
  onQuickBuy: (product: ServiceProduct, quantity: number) => void;
  onExploreServicePage?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onAddToCart, onQuickBuy, onExploreServicePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    servicesData.forEach((p) => {
      initial[p.id] = p.baseQuantity;
    });
    return initial;
  });

  const categories = [
    { id: 'all', label: 'All Services (6)' },
    { id: 'usa', label: '🇺🇸 USA Residential' },
    { id: 'pva', label: '📱 PVA SIM Verified' },
    { id: 'aged', label: '⏳ Aged 2016-2022' },
    { id: 'reviews', label: '⭐ Google Reviews' },
    { id: 'google-ads', label: '🎯 Google Ads Ready' },
    { id: 'new', label: '⚡ Fresh PVA' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter((p) => p.category === selectedCategory);

  const handleQuantityChange = (productId: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty)
    }));
  };

  const calculatePrice = (product: ServiceProduct, qty: number) => {
    let discount = 0;
    if (qty >= 500) discount = 0.30;
    else if (qty >= 100) discount = 0.20;
    else if (qty >= 50) discount = 0.15;
    else if (qty >= 25) discount = 0.10;
    else if (qty >= 10) discount = 0.05;

    const baseUnitRate = product.unitPrice;
    const discountedUnitRate = baseUnitRate * (1 - discount);
    const total = discountedUnitRate * qty;
    return {
      total: total.toFixed(2),
      unit: discountedUnitRate.toFixed(2),
      discountPercent: Math.round(discount * 100)
    };
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 mb-3">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Guaranteed Non-VoIP Stock</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Premium Gmail Account Services & Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Choose from authentic USA residential, aged vintage, Google Ads conditioned, or Google Maps review Gmails. 
            All accounts are 100% phone-verified and backed by our replacement guarantee.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const currentQty = quantities[product.id] || product.baseQuantity;
            const priceInfo = calculatePrice(product, currentQty);

            return (
              <div
                key={product.id}
                id={`service-card-${product.id}`}
                className={`relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  product.popular 
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20' 
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular / Best Value Ribbon */}
                {product.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider py-1 text-center shadow-xs flex items-center justify-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-current text-amber-300" />
                    <span>Most Popular Agency Choice</span>
                  </div>
                )}
                {product.bestValue && !product.popular && (
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black uppercase tracking-wider py-1 text-center shadow-xs flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-current text-amber-300" />
                    <span>Best Value Pack</span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex-1">
                  
                  {/* Top Bar: Age badge & in-stock */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                      <Globe className="w-3 h-3 text-blue-600" />
                      {product.age}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {product.inStock.toLocaleString()} In Stock
                    </span>
                  </div>

                  {/* Product Title & Description */}
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {onExploreServicePage ? (
                      <a
                        href={`?view=service-detail&service=${encodeURIComponent(product.id)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onExploreServicePage(product.id);
                        }}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {product.name}
                      </a>
                    ) : (
                      product.name
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {product.shortDesc}
                  </p>

                  {/* Standard Base Price Tag */}
                  <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-medium text-slate-500">Base Pack: </span>
                        <span className="text-lg font-black text-slate-900">${product.basePrice}</span>
                        <span className="text-xs text-slate-600 font-semibold"> ({product.baseQuantity} pcs)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 block">Unit Rate:</span>
                        <span className="text-xs font-bold text-blue-600">${product.unitPrice.toFixed(2)}/each</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Quantity Selector */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>Select Quantity:</span>
                      <span className="text-blue-600 font-semibold">{currentQty} Accounts</span>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                      {[product.baseQuantity, 10, 25, 50, 100, 250, 500].slice(0, 4).map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => handleQuantityChange(product.id, qty)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            currentQty === qty
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {qty} pcs
                        </button>
                      ))}
                    </div>

                    {/* Custom Quantity Stepper */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, Math.max(product.baseQuantity, currentQty - (currentQty > 20 ? 10 : 2)))}
                        className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={product.baseQuantity}
                        max={5000}
                        value={currentQty}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || product.baseQuantity)}
                        className="w-full text-center py-1.5 font-bold text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, currentQty + (currentQty >= 20 ? 10 : 2))}
                        className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Calculated Price Box */}
                  <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-blue-900/70 font-semibold block">Total Price:</span>
                      <span className="text-2xl font-black text-blue-950">${priceInfo.total}</span>
                    </div>
                    {priceInfo.discountPercent > 0 ? (
                      <span className="bg-emerald-600 text-white text-[11px] font-black px-2 py-1 rounded-md shadow-xs animate-pulse">
                        {priceInfo.discountPercent}% OFF APPLIED
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">
                        ${priceInfo.unit}/pc
                      </span>
                    )}
                  </div>

                  {/* Key Specifications list */}
                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
                  {onExploreServicePage && (
                    <a
                      href={`?view=service-detail&service=${encodeURIComponent(product.id)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onExploreServicePage(product.id);
                      }}
                      className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer mb-0.5"
                    >
                      <span>View Packages & Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    id={`buy-now-${product.id}`}
                    onClick={() => onQuickBuy(product, currentQty)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-current text-amber-300" />
                    <span>Instant Order (${priceInfo.total})</span>
                  </button>

                  <button
                    id={`add-cart-${product.id}`}
                    onClick={() => onAddToCart(product, currentQty)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-500" />
                    <span>Add to Cart ({currentQty} pcs)</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Wholesale Notice Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Need 1,000+ Accounts per month or custom Geo-Locations?
              </h4>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                We provide dedicated API provisioning, custom email handle formats, aged YouTube channels, and volume pricing down to $1.20/pc for enterprise agency clients.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://t.me/Go2Rapid"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Telegram: @Go2Rapid</span>
            </a>
            <a
              href="https://wa.me/12534080049"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: +1 (253) 408-0049</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
