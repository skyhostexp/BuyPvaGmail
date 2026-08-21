import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
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
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';
import { detailedServicesData, DetailedServiceInfo } from '../../data/servicesData';
import { ServiceProduct } from '../../types';

interface ServicesCatalogPageProps {
  onSelectServicePage: (serviceId: string) => void;
  onQuickBuy: (product: ServiceProduct, quantity: number) => void;
  onAddToCart: (product: ServiceProduct, quantity: number) => void;
  onNavigateHome?: () => void;
}

export const ServicesCatalogPage: React.FC<ServicesCatalogPageProps> = ({
  onSelectServicePage,
  onQuickBuy,
  onAddToCart,
  onNavigateHome
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories = [
    { id: 'all', label: 'All Services (6)' },
    { id: 'usa', label: 'USA Residential' },
    { id: 'pva', label: 'Phone Verified (PVA)' },
    { id: 'aged', label: 'Vintage Aged (3-8 Yrs)' },
    { id: 'reviews', label: 'Reviews & Local Guides' },
    { id: 'google-ads', label: 'Google Ads Ready' },
    { id: 'new', label: 'Fresh Budget Bulk' }
  ];

  const filteredServices = detailedServicesData.filter((service) => {
    const matchesFilter = selectedFilter === 'all' || service.category === selectedFilter;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'usa-gmail-accounts': return Shield;
      case 'pva-gmail-accounts': return Smartphone;
      case 'aged-mix-country-gmail': return Globe;
      case 'aged-gmail-for-reviews': return Star;
      case 'aged-gmail-for-google-ads': return TrendingUp;
      case 'new-gmail-accounts': return Zap;
      default: return ShieldCheck;
    }
  };

  const getServiceColor = (id: string) => {
    switch (id) {
      case 'usa-gmail-accounts': return { bg: 'bg-red-50 text-red-600 border-red-200', tag: 'bg-red-100 text-red-700' };
      case 'pva-gmail-accounts': return { bg: 'bg-blue-50 text-blue-600 border-blue-200', tag: 'bg-blue-100 text-blue-700' };
      case 'aged-mix-country-gmail': return { bg: 'bg-emerald-50 text-emerald-600 border-emerald-200', tag: 'bg-emerald-100 text-emerald-700' };
      case 'aged-gmail-for-reviews': return { bg: 'bg-amber-50 text-amber-600 border-amber-200', tag: 'bg-amber-100 text-amber-700' };
      case 'aged-gmail-for-google-ads': return { bg: 'bg-purple-50 text-purple-600 border-purple-200', tag: 'bg-purple-100 text-purple-700' };
      case 'new-gmail-accounts': return { bg: 'bg-orange-50 text-orange-600 border-orange-200', tag: 'bg-orange-100 text-orange-700' };
      default: return { bg: 'bg-blue-50 text-blue-600 border-blue-200', tag: 'bg-blue-100 text-blue-700' };
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Services Catalog</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>SEO Verified Account Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Premium PVA & Aged Gmail Accounts <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-indigo-600 to-blue-600">Built for Scale</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Explore our 6 dedicated account categories. 100% verified with physical SIM cards, clean residential IPs, and covered by our 7-day instant replacement policy.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xl font-black text-slate-900">14,820+</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Ready in Stock</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xl font-black text-emerald-600">100%</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Physical SIM PVA</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xl font-black text-blue-600">&lt; 60s</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Instant Automated Delivery</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xl font-black text-red-600">7 Days</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Replacement Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComp = getServiceIcon(service.id);
            const colors = getServiceColor(service.id);

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${colors.tag} border`}>
                        {service.age}
                      </span>
                      {service.popular && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          🔥 Best Seller
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Rating */}
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1.5 mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{service.rating}</span>
                    <span className="text-xs text-slate-400">({service.reviewsCount} verified reviews)</span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Key Features Bullets */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Pill Summary */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 mb-6 text-[11px]">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold">SIM Verification:</span>
                      <span className="font-bold text-slate-900">{service.specs.phoneType}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold">IP Origin:</span>
                      <span className="font-bold text-slate-900">{service.specs.ipOrigin}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold">Stock In Hand:</span>
                      <span className="font-bold text-emerald-600">{service.inStock.toLocaleString()} Available</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Actions */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold block">Starts from</span>
                      <span className="text-2xl font-black text-slate-900">
                        ${service.unitPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium ml-1">/ account</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Up to 30% Bulk OFF
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`/services/${encodeURIComponent(service.id)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectServicePage(service.id);
                      }}
                      className="w-full py-2.5 px-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-blue-500/25"
                    >
                      <span>View Packages</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onQuickBuy(service, service.baseQuantity)}
                      className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-blue-600 fill-current" />
                      <span>Quick Buy (${service.basePrice})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comprehensive Account Types Comparison Matrix */}
        <div className="mt-20 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Technical Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Compare All PVA & Aged Gmail Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose the exact architecture suited for your software, bots, or marketing campaigns.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Account Type</th>
                  <th className="py-3 px-4">SIM Carrier Type</th>
                  <th className="py-3 px-4">IP Registration</th>
                  <th className="py-3 px-4">Account Age</th>
                  <th className="py-3 px-4">2FA / Recovery</th>
                  <th className="py-3 px-4">Starting Rate</th>
                  <th className="py-3 px-4 text-right">Dedicated Page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {detailedServicesData.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>{svc.name}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {svc.specs.phoneType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{svc.specs.ipOrigin}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{svc.age}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-800 font-semibold">Configured</span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      ${svc.unitPrice.toFixed(2)}/ea
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`/services/${encodeURIComponent(svc.id)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectServicePage(svc.id);
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Buy from BuyPvaGmail Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Zero VoIP Policy</h4>
            <p className="text-xs text-slate-600">Every single account is SMS validated with real physical carrier SIM cards.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Instant Delivery</h4>
            <p className="text-xs text-slate-600">Automated dispatch delivers credentials to your screen and email within 60 seconds.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">7-Day Replacement</h4>
            <p className="text-xs text-slate-600">Any defective login is swapped instantly with zero questions asked.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Crypto Only</h4>
            <p className="text-xs text-slate-600">Fast, anonymous checkout via USDT (TRC20/BEP20/ERC20), Bitcoin, and Litecoin.</p>
          </div>
        </div>

      </section>
    </div>
  );
};
