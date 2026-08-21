import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Zap, 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown,
  Layers,
  HelpCircle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { ServiceProduct } from '../types';

interface TieredPricingProps {
  onOrderBatch: (product: ServiceProduct, quantity: number) => void;
}

export const TieredPricing: React.FC<TieredPricingProps> = ({ onOrderBatch }) => {
  const [selectedProduct, setSelectedProduct] = useState<ServiceProduct>(servicesData[0]);
  const [accountCount, setAccountCount] = useState<number>(50);

  const getTierDetails = (count: number) => {
    let discount = 0;
    let tierName = 'Starter';
    let badgeColor = 'bg-slate-100 text-slate-700';

    if (count >= 500) {
      discount = 0.30;
      tierName = 'Master Reseller (Enterprise)';
      badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
    } else if (count >= 250) {
      discount = 0.25;
      tierName = 'Wholesale Batch';
      badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    } else if (count >= 100) {
      discount = 0.20;
      tierName = 'Bulk Enterprise';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (count >= 50) {
      discount = 0.15;
      tierName = 'Outreach Pro';
      badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    } else if (count >= 25) {
      discount = 0.10;
      tierName = 'Agency Batch';
      badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    } else if (count >= 10) {
      discount = 0.05;
      tierName = 'Growth Pack';
      badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
    }

    const baseUnit = selectedProduct.unitPrice;
    const discountedUnit = baseUnit * (1 - discount);
    const total = discountedUnit * count;
    const originalTotal = baseUnit * count;
    const savings = originalTotal - total;

    return {
      discountPercent: Math.round(discount * 100),
      tierName,
      badgeColor,
      discountedUnit: discountedUnit.toFixed(2),
      total: total.toFixed(2),
      savings: savings.toFixed(2)
    };
  };

  const tier = getTierDetails(accountCount);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 mb-3">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>Volume Wholesale Discounts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Tiered Agency Rates
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Scale your cold email campaigns, Google Ads setups, and review networks with automated wholesale discounts up to 30% OFF.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Select Account Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {servicesData.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className={`p-3 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer ${
                        selectedProduct.id === p.id
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30 ring-2 ring-blue-400/30'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <span className="block truncate">{p.name}</span>
                      <span className="text-[11px] text-slate-400 font-normal mt-0.5 block">
                        Base: ${p.unitPrice.toFixed(2)}/pc
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Quantity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    2. Choose Account Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-amber-400">
                      {accountCount}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Accounts</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={2}
                  max={500}
                  step={2}
                  value={accountCount}
                  onChange={(e) => setAccountCount(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                {/* Preset Chips */}
                <div className="flex items-center justify-between gap-1.5 mt-3 flex-wrap">
                  {[2, 10, 25, 50, 100, 250, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAccountCount(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        accountCount === preset
                          ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {preset} pcs
                    </button>
                  ))}
                </div>
              </div>

              {/* Included Perks in Bulk */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant TXT / CSV Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>7-Day Replacement Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Recovery Emails & 2FA Keys</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Telegram Support</span>
                </div>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Calculation
                  </span>
                  <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-md border ${tier.badgeColor}`}>
                    {tier.tierName}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  {accountCount} Phone-Verified Accounts Ready for Instant Delivery
                </p>

                <div className="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-6">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Base Unit Rate:</span>
                    <span className="line-through">${selectedProduct.unitPrice.toFixed(2)}/pc</span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Discounted Unit Rate:</span>
                    <span className="font-bold text-emerald-400">${tier.discountedUnit}/pc</span>
                  </div>

                  {tier.discountPercent > 0 && (
                    <div className="flex justify-between text-xs text-amber-400 font-bold">
                      <span>Volume Savings:</span>
                      <span>-${tier.savings} ({tier.discountPercent}% OFF)</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Estimated Total:</span>
                    <span className="text-3xl font-black text-amber-400">${tier.total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOrderBatch(selectedProduct, accountCount)}
                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-5 h-5 fill-current text-amber-300" />
                <span>Order {accountCount} Accounts (${tier.total})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
