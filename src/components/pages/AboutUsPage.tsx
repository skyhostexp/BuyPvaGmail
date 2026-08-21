import React from 'react';
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
  Lock,
  Layers,
  Award,
  ChevronRight,
  Users,
  Building,
  Server,
  HeartHandshake,
  Send
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
  onNavigateHome?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateToServices,
  onNavigateToContact,
  onNavigateHome
}) => {
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
          <span className="text-slate-900 font-bold">About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Trusted Infrastructure Since 2020</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Building the World's Most Reliable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600">PVA & Aged Gmail</span> Supply Chain
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Empowering 6,940+ cold outreach agencies, media buyers, and software teams with authentic, non-VoIP verified Google accounts that never drop.
          </p>

          {/* Stats Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-3xl font-black text-slate-900">6,940+</span>
              <p className="text-xs text-slate-500 font-semibold mt-1">Agencies Powered</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-3xl font-black text-emerald-600">3.2M+</span>
              <p className="text-xs text-slate-500 font-semibold mt-1">Delivered Accounts</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-3xl font-black text-blue-600">99.4%</span>
              <p className="text-xs text-slate-500 font-semibold mt-1">Inbox Placement Rate</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-3xl font-black text-red-600">24/7/365</span>
              <p className="text-xs text-slate-500 font-semibold mt-1">Live Human Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">

        {/* Our Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Our Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why We Founded BuyPvaGmail
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In 2020, cold email outreach and digital advertising underwent a seismic shift. Google deployed advanced machine learning models to detect VoIP virtual phone numbers, data center proxy fingerprints, and unnatural registration spikes.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Marketers buying accounts on shady forums were losing hundreds of dollars overnight as entire account batches were disabled within hours.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We built <strong>BuyPvaGmail</strong> to fix this industry problem permanently. We established dedicated SIM hardware hubs in the United States and Europe, partnered with residential ISP networks, and created an automated dispatch system delivering verified accounts in clean formats within 60 seconds.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>The BuyPvaGmail Standard</span>
            </h3>

            <div className="space-y-3 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero VoIP Policy:</strong> Every account is validated with a physical carrier SIM card.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Static Residential IPs:</strong> Created via Tier-1 residential ISPs (Comcast, AT&T).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Session Cookies Included:</strong> Pre-packaged JSON cookies for 1-click login.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>7-Day Replacement:</strong> Instant replacement guarantee for any defective credentials.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Engineered for Enterprise Stability
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How our infrastructure guarantees high trust scores and zero login lockouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Physical SIM Farms</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct partnerships with major mobile carriers provide real physical SIM numbers with unique MSISDN routing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Clean IP Registration</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accounts are provisioned across clean static residential ISP subnets with pristine Spamhaus scores.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Automated Dispatch</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proprietary order routing engine dispenses login credentials, recovery emails, and 2FA tokens in under 60s.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Guaranteed Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our support team is active 24/7 on live chat and Telegram to resolve issues and provide custom orders.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to Scale Your Cold Outreach & Ad Operations?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Join thousands of growth agencies and media buyers who rely on BuyPvaGmail every single day.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateToServices}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
            >
              <span>Explore Services Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};
