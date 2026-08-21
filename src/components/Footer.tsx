import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Coins, 
  CreditCard, 
  ArrowUp, 
  Send, 
  CheckCircle2,
  Mail,
  Headphones,
  MessageSquare
} from 'lucide-react';

interface FooterProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenCheckerModal: () => void;
  onOpenTrackingModal: () => void;
  onNavigateToPage?: (page: string, serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenOrderModal, 
  onOpenCheckerModal, 
  onOpenTrackingModal,
  onNavigateToPage 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    if (onNavigateToPage) {
      onNavigateToPage('service-detail', serviceId);
    } else {
      onOpenOrderModal(serviceId);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-850">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                BuyPva<span className="text-red-500">Gmail</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              BuyPvaGmail is the leading platform for 100% real carrier phone-verified (PVA) and aged USA Gmail accounts. 
              Built on clean static residential IPs, delivering maximum inbox deliverability for cold outreach, Google Ads, and local SEO.
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <a
                href="https://t.me/Go2Rapid"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram: @Go2Rapid
              </a>
              <a
                href="https://wa.me/12534080049"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-emerald-600 hover:text-white text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp: +1 (253) 408-0049
              </a>
              <button
                onClick={onOpenTrackingModal}
                className="bg-slate-900 hover:bg-amber-600 hover:text-white text-amber-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Track Order
              </button>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="?view=service-detail&service=usa-gmail-accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('usa-gmail-accounts');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  USA Gmail Accounts ($6 / 2pcs)
                </a>
              </li>
              <li>
                <a 
                  href="?view=service-detail&service=pva-gmail-accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('pva-gmail-accounts');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  PVA Gmail Accounts ($6 / 2pcs)
                </a>
              </li>
              <li>
                <a 
                  href="?view=service-detail&service=aged-mix-country-gmail"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('aged-mix-country-gmail');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Aged Mix Country ($5 / 2pcs)
                </a>
              </li>
              <li>
                <a 
                  href="?view=service-detail&service=aged-gmail-for-reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('aged-gmail-for-reviews');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Aged Accounts For Reviews ($6 / 2pcs)
                </a>
              </li>
              <li>
                <a 
                  href="?view=service-detail&service=aged-gmail-for-google-ads"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('aged-gmail-for-google-ads');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Google Ads Aged Gmails ($5 / 1pc)
                </a>
              </li>
              <li>
                <a 
                  href="?view=service-detail&service=new-gmail-accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('new-gmail-accounts');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  New Fresh PVA Gmails ($3 / 2pcs)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources & Guides */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Agency Guides
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="?view=blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Aged Gmail Cold Email Warmup
                </a>
              </li>
              <li>
                <a 
                  href="?view=blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  AdsPower &amp; Dolphin&#123;anty&#125; Setup
                </a>
              </li>
              <li>
                <a 
                  href="?view=blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Google Ads Suspension Bypass
                </a>
              </li>
              <li>
                <a 
                  href="?view=blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Google Maps Review Stick Protocol
                </a>
              </li>
              <li>
                <a 
                  href="?view=faq"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('faq');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  2FA TOTP Secret Key Guide
                </a>
              </li>
              <li>
                <a 
                  href="?view=faq"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('faq');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  7-Day Replacement Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Payments */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Crypto Gateway
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Automated 24/7 instant delivery on all crypto networks:
            </p>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>BSC (BEP20 / BNB / USDT)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>TRX (TRC20 / TRON / USDT)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>ETH (ERC20 / Ethereum)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>SOL (Solana Mainnet)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>BTC (Bitcoin)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>LTC (Litecoin)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>DOGE (Dogecoin)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-[11px]">
            &copy; {new Date().getFullYear()} BuyPvaGmail.com. All rights reserved. Follows industry standard PVA delivery protocols.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="?view=faq"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('faq');
              }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="?view=faq"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('faq');
              }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <span>•</span>
            <a 
              href="?view=faq"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('faq');
              }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Warranty Guidelines
            </a>
            <button
              onClick={scrollToTop}
              className="ml-4 p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
