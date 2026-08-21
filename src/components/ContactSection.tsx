import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Headphones, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 mb-3">
            <Headphones className="w-3.5 h-3.5 text-blue-600" />
            <span>24/7 Agency Help Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact BuyPvaGmail Support & VIP Sales
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Whether you need custom account configurations, bulk volume discounts, or instant replacement assistance, we are ready 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Telegram Card */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-50/80 hover:bg-blue-100/80 p-5 rounded-2xl border border-blue-200 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <Send className="w-6 h-6 -rotate-12" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700">
                    Official Telegram Channel & Desk
                  </h4>
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Fastest response (&lt;5 mins) for bulk discounts & instant replacements.
                </p>
                <span className="inline-block text-xs font-black text-blue-700 mt-2">
                  @BuyPvaGmail_Help
                </span>
              </div>
            </a>

            {/* Email Support Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Direct Email Desk</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  For formal invoices, corporate bank transfer requests, and API access.
                </p>
                <a href="mailto:support@buypvagmail.com" className="inline-block text-xs font-bold text-blue-600 hover:underline mt-2">
                  support@buypvagmail.com
                </a>
              </div>
            </div>

            {/* Response Time SLA */}
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Our 24/7 SLA Guarantee:</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                All order replacement requests and inquiries are answered in under 15 minutes by human engineers who understand proxy rotation and email deliverability.
              </p>
            </div>

          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            {isSent ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                  Our team has received your message and will reply to <strong>{email || 'your email'}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-6 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name / Agency:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Apex Media"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Inquiry Topic:
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden"
                  >
                    <option value="Bulk Order Inquiry">Bulk Agency Order (500+ Accounts)</option>
                    <option value="Replacement Claim">Replacement Claim / Warranty Help</option>
                    <option value="Custom Country Accounts">Custom Country / Geo-Targeting Request</option>
                    <option value="Payment / Invoice">Payment Method / Corporate Invoice</option>
                    <option value="API Integration">Automated API Provisioning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message / Order Details:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what accounts or support you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to 24/7 Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
