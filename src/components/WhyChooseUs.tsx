import React from 'react';
import { 
  Smartphone, 
  Wifi, 
  Key, 
  History, 
  ShieldCheck, 
  FileSpreadsheet,
  CheckCircle2,
  Users,
  Award,
  Zap
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Smartphone,
      title: '100% Real Carrier SIM Cards (Non-VoIP)',
      description: 'Every account is SMS verified using physical USA & Tier-1 carrier SIM cards (T-Mobile, AT&T, Verizon). We strictly forbid virtual VoIP numbers (Google Voice, TextNow) that trigger Google checkpoint blocks.',
      badge: 'Physical SIM'
    },
    {
      icon: Wifi,
      title: 'Clean Static Residential ISP Creation',
      description: 'Created exclusively on clean residential IP subnets (Comcast, AT&T Fiber, Spectrum). Zero datacenter ASN footprints, ensuring high initial trust score and maximum inbox deliverability.',
      badge: 'ISP Residential'
    },
    {
      icon: Key,
      title: 'Recovery Email & 2FA Secret Key Included',
      description: 'You receive complete administrative control. Every account comes with an attached recovery email and 16-digit 2FA secret key for instant 1-click OTP generation via 2fa.live or Authenticator apps.',
      badge: 'Full Ownership'
    },
    {
      icon: History,
      title: 'True Organic Age & Browsing Telemetry',
      description: 'Our aged Gmails (2014–2024) carry real browsing cookies, YouTube history, and Google Pay profile telemetry that bypass fraud heuristics on Google Ads and Google Maps reviews.',
      badge: '2014-2024 Aged'
    },
    {
      icon: ShieldCheck,
      title: '7-Day Free Instant Replacement Policy',
      description: 'Zero friction warranty. If any account fails to log in, shows invalid credentials, or asks for initial phone verification with a clean proxy, our 24/7 team replaces it instantly.',
      badge: '100% Guarantee'
    },
    {
      icon: FileSpreadsheet,
      title: 'Multi-Format Export for Outreach Tools',
      description: 'Instant CSV / TXT download formatted perfectly for Instantly.ai, Smartlead, Lemlist, AdsPower, Dolphin{anty}, and custom automation scripts. Ready for instant plug-and-play.',
      badge: 'Instant TXT/CSV'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-3">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Market Leader in PVA Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why 6,940+ Agencies Choose BuyPvaGmail
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Don't waste thousands of dollars on burning cheap accounts. See why top cold emailers, Google Ads media buyers, and SEO agencies rely on our carrier-grade infrastructure.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-100/70 group-hover:bg-blue-600 text-blue-700 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-white group-hover:bg-blue-50 group-hover:text-blue-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 block">485K+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1 block">PVA Accounts Delivered</span>
          </div>
          <div className="p-4">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 block">99.8%</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1 block">Inbox Placement Rate</span>
          </div>
          <div className="p-4">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 block">&lt;60s</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1 block">Automated Delivery</span>
          </div>
          <div className="p-4">
            <span className="text-3xl sm:text-4xl font-black text-indigo-600 block">24/7/365</span>
            <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1 block">Live Human Support</span>
          </div>
        </div>

      </div>
    </section>
  );
};
