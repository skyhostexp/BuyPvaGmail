import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { comparisonData } from '../data/comparisonData';

interface ComparisonSectionProps {
  onOrderClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Infrastructure Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            BuyPvaGmail.com vs Cheap VoIP Suppliers
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Understanding why cheap $0.50 VoIP accounts cost you thousands in burned domains, dropped Google reviews, and suspended ad accounts.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-6 items-center">
            <div className="col-span-12 sm:col-span-4 font-bold text-sm sm:text-base text-slate-300">
              Feature / Reliability Metric
            </div>
            <div className="col-span-6 sm:col-span-4 mt-2 sm:mt-0 flex items-center gap-2 text-emerald-400 font-extrabold text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>BuyPvaGmail.com (Verified)</span>
            </div>
            <div className="col-span-6 sm:col-span-4 mt-2 sm:mt-0 flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Cheap VoIP / Bot Sellers</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonData.map((row, idx) => (
              <div 
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-5 items-center transition-colors ${
                  row.highlight ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900 text-xs sm:text-sm mb-2 sm:mb-0">
                  {row.feature}
                </div>

                {/* BuyPvaGmail Result */}
                <div className="col-span-12 sm:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium pr-2 mb-2 sm:mb-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{row.buyPvaGmail}</span>
                </div>

                {/* Cheap VoIP Result */}
                <div className="col-span-12 sm:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-500">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.cheapVoip}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer CTA */}
          <div className="bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-slate-900 block">Protect your outreach reputation today</span>
              <span className="text-xs text-slate-500">Zero phone lockups, 100% verified real carrier numbers.</span>
            </div>
            <button
              onClick={onOrderClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>Get Premium Accounts Now</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
