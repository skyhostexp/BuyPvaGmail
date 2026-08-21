import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Lock, 
  Users, 
  RefreshCw, 
  Globe2, 
  Mail,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onExplorePricing: () => void;
  onOpenChecker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExplorePricing, onOpenChecker }) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  const liveOrders = [
    { location: 'Austin, Texas', quantity: '50x USA Aged 2021 Gmails', time: '2 mins ago', use: 'Cold Outreach' },
    { location: 'London, UK', quantity: '25x Aged Review Accounts', time: '4 mins ago', use: 'Google Maps SEO' },
    { location: 'Toronto, Canada', quantity: '100x PVA USA Gmails', time: '7 mins ago', use: 'Instantly.ai Batch' },
    { location: 'Sydney, Australia', quantity: '10x Aged Google Ads Accounts', time: '11 mins ago', use: 'PPC Media Buying' },
    { location: 'Miami, Florida', quantity: '250x Mix Country Aged', time: '14 mins ago', use: 'Marketing Agency' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveOrders.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [liveOrders.length]);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Live Purchase Ticker Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs text-slate-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-900">Live Order:</span>
            <span className="text-slate-600 font-medium">
              {liveOrders[tickerIndex].quantity} delivered to {liveOrders[tickerIndex].location}
            </span>
            <span className="text-slate-400 text-[11px]">({liveOrders[tickerIndex].time})</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200/80 shadow-xs mb-5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>#1 USA Aged Gmail Accounts Marketplace • 100% Non-VoIP Verified</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] mb-6">
            "BuyPvaGmail" Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600">USA Aged Gmail Accounts</span> for Sale
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Buy 100% Phone-Verified (PVA), Aged from 2014–2024, created on clean USA Residential IPs. 
            Delivered instantly with recovery email, 2FA secret key, and a <strong>7-Day Free Replacement Guarantee</strong>. 
            Trusted by 6,940+ cold outreach agencies, SEO professionals, and Google Ads buyers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12">
            <button
              id="hero-order-cta"
              onClick={onOrderClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all cursor-pointer active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current text-amber-300" />
              <span>Order Accounts Now</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              id="hero-pricing-cta"
              onClick={onExplorePricing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-7 py-4 rounded-xl border border-slate-300 shadow-sm hover:border-slate-400 transition-all cursor-pointer"
            >
              <span>View Bulk Tier Rates</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              id="hero-checker-cta"
              onClick={onOpenChecker}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-slate-600 hover:text-blue-600 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-blue-50/60 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free Account Format Checker</span>
            </button>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Instant Delivery</h4>
                <p className="text-xs text-slate-500 mt-0.5">Automated delivery in &lt;60s via email & screen</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">100% Real Carrier SIMs</h4>
                <p className="text-xs text-slate-500 mt-0.5">Zero VoIP flags (Verizon, AT&T, T-Mobile)</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">7-Day Warranty</h4>
                <p className="text-xs text-slate-500 mt-0.5">Instant free replacements for any issues</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Full Ownership</h4>
                <p className="text-xs text-slate-500 mt-0.5">Recovery mail, 2FA secret & cookies attached</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
