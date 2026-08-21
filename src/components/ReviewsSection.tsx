import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Quote, 
  Building2, 
  TrendingUp, 
  Award 
} from 'lucide-react';
import { agencyTestimonials, platformStats, clientLogos } from '../data/reviewsData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 text-xs font-bold px-3.5 py-1 rounded-full border border-blue-500/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Agency Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trusted by Leaders in Digital Growth
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-3">
            Over 6,940+ cold outreach agencies, Google Ads media buyers, and local SEO teams rely on BuyPvaGmail daily.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {platformStats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-lg text-center"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 mt-1 block">
                {stat.label}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Agency Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agencyTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 hover:border-slate-600 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top: Stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Agency Order
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              {/* Author & Usage Details */}
              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-slate-400">{t.role} • {t.company}</span>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[11px] text-blue-400 font-bold block">{t.accountsBought}</span>
                  <span className="text-[10px] text-slate-500">{t.useCase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration / Tool Compatibility Badge row */}
        <div className="mt-14 pt-10 border-t border-slate-800 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-4">
            Tested & 100% Compatible with Industry Standard Antidetect & Outreach Tools
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            {clientLogos.map((tool, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/70 text-xs font-semibold text-slate-300 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{tool.name}</span>
                <span className="text-[10px] text-slate-500">({tool.tag})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
