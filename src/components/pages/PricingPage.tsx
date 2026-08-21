import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Shield, 
  Smartphone, 
  Globe, 
  TrendingUp, 
  ShoppingCart,
  Lock,
  Layers,
  HelpCircle,
  Award,
  ChevronRight,
  Calculator,
  Coins,
  Percent
} from 'lucide-react';
import { detailedServicesData, DetailedServiceInfo, quantityTiers } from '../../data/servicesData';
import { ServiceProduct } from '../../types';

interface PricingPageProps {
  onQuickBuy: (product: ServiceProduct, quantity: number) => void;
  onAddToCart: (product: ServiceProduct, quantity: number) => void;
  onSelectServicePage: (serviceId: string) => void;
  onNavigateHome?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onQuickBuy,
  onAddToCart,
  onSelectServicePage,
  onNavigateHome
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('usa-gmail-accounts');
  const [calculatorQty, setCalculatorQty] = useState<number>(25);

  const activeService = detailedServicesData.find((s) => s.id === selectedServiceId) || detailedServicesData[0];

  const calculateDiscount = (qty: number) => {
    if (qty >= 500) return 0.30;
    if (qty >= 100) return 0.20;
    if (qty >= 50) return 0.15;
    if (qty >= 25) return 0.10;
    if (qty >= 10) return 0.05;
    return 0;
  };

  const discount = calculateDiscount(calculatorQty);
  const unitPrice = activeService.unitPrice * (1 - discount);
  const totalPrice = unitPrice * calculatorQty;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button 
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Pricing & Bulk Rates</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Percent className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Wholesale Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Simple, Transparent Rates with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600">Volume Discounts</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Save up to 30% on bulk packages. Every order includes physical SIM validation, clean residential IPs, and an instant 7-day replacement guarantee.
          </p>
        </div>
      </section>

      {/* Main Pricing Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* Interactive Volume & Pricing Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  Interactive Rate Estimator
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Calculate Your Custom Order Price
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Select your desired account type and move the volume slider to see automated volume discounts.
                </p>
              </div>

              {/* Service Selector Tabs */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">1. Choose Account Category:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {detailedServicesData.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedServiceId(svc.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                        selectedServiceId === svc.id
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <span className="line-clamp-1">{svc.name}</span>
                      <span className="text-[10px] opacity-80 block font-normal mt-0.5">
                        Starts ${svc.unitPrice.toFixed(2)}/ea
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>2. Select Volume: {calculatorQty} Accounts</span>
                  <span className="text-amber-400 font-extrabold">
                    {discount > 0 ? `${(discount * 100).toFixed(0)}% Bulk Discount Applied` : 'Standard Unit Rate'}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="500"
                  step="1"
                  value={calculatorQty}
                  onChange={(e) => setCalculatorQty(parseInt(e.target.value) || 2)}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {[2, 10, 25, 50, 100, 250, 500].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCalculatorQty(num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        calculatorQty === num 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {num} pcs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Pricing Summary Block */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">
                  Estimated Total ({calculatorQty} {activeService.name})
                </span>
                
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">USD</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    ${unitPrice.toFixed(2)} per account
                  </span>
                  {discount > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      ${activeService.unitPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 mt-6 pt-6 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant automated crypto delivery (&lt; 60s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>7-Day 100% replacement warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>TXT & CSV batch format included</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  onClick={() => onQuickBuy(activeService, calculatorQty)}
                  className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 cursor-pointer active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current text-amber-300" />
                  <span>Order {calculatorQty} Accounts Now</span>
                </button>

                <button
                  onClick={() => onAddToCart(activeService, calculatorQty)}
                  className="w-full py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-slate-200" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 6 Category Rate Cards Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Complete Service Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Base Rates for All Account Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any category to view tailored packages, deep specifications, and configuration guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedServicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.age}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        🔥 Best Seller
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Starts from</span>
                      <span className="text-2xl font-black text-slate-900">
                        ${service.unitPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">/ account</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Up to 30% OFF
                    </span>
                  </div>

                  {/* Pre-packaged list preview */}
                  <div className="space-y-1.5 mt-4 pt-3 border-t border-slate-100">
                    {service.packages.slice(0, 3).map((pkg) => (
                      <div key={pkg.id} className="flex items-center justify-between text-xs py-1">
                        <span className="text-slate-700 font-medium">{pkg.name} ({pkg.quantity}x)</span>
                        <span className="font-bold text-slate-900">${pkg.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServicePage(service.id)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onQuickBuy(service, service.baseQuantity)}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current text-blue-600" />
                    <span>Order (${service.basePrice})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Volume Tier Matrix Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Wholesale Discount Tiers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Tiered Rates for Scaling Agencies
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Automated volume discounts applied directly at checkout on all orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {quantityTiers.map((tier) => (
              <div key={tier.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 inline-block mb-2">
                    {tier.badge}
                  </span>
                  <h4 className="text-sm font-black text-slate-900">{tier.label}</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">{tier.count}+ Accounts</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-lg font-black text-emerald-600">
                    {(tier.discount * 100).toFixed(0)}% OFF
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};
