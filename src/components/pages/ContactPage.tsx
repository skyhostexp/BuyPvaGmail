import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Headphones, 
  Building, 
  ChevronRight,
  PhoneCall,
  Globe,
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigateHome?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Bulk Agency Order',
    telegram: '',
    orderId: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

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
          <span className="text-slate-900 font-bold">Contact Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Headphones className="w-3.5 h-3.5 text-blue-600" />
            <span>24/7/365 Dedicated Agency Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            We're Here to Help You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600">Scale Seamlessly</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Have a question regarding custom bulk orders, proxy setup, or warranty replacements? Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our priority support team will review your inquiry and get back to you at <strong>{formData.email}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      inquiryType: 'Bulk Agency Order',
                      telegram: '',
                      orderId: '',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Send an Inquiry</h2>
                  <p className="text-xs text-slate-500 mt-1">Average human response time is under 15 minutes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Bulk Agency Order">Bulk Agency Order (500+)</option>
                      <option value="Warranty & Replacement">Warranty & Replacement Claim</option>
                      <option value="Custom Account Request">Custom Account Request</option>
                      <option value="Proxy & Anti-Detect Help">Proxy & Anti-Detect Help</option>
                      <option value="Billing & Invoicing">Billing & Crypto Invoicing</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Telegram Username (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="@yourtelegram"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Order ID (if applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BPV-89241"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Detailed Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your requirements, quantity needed, or warranty details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Priority Ticket</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct VIP Channels & SLA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Telegram VIP Desk Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Instant Telegram Desk</h3>
                  <p className="text-xs text-slate-400 font-semibold">Direct 1-on-1 agent messaging</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                For urgent warranty replacements, custom bulk discounts, or proxy recommendations, message our Telegram VIP desk for fastest response.
              </p>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <Send className="w-4 h-4" />
                <span>Open Telegram Support</span>
              </a>
            </div>

            {/* Support Metrics & SLA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Support Response Guarantees</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Average Response Time:</span>
                  <span className="font-bold text-emerald-600">&lt; 15 Minutes</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Warranty Replacement SLA:</span>
                  <span className="font-bold text-blue-600">Under 2 Hours</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Availability:</span>
                  <span className="font-bold text-slate-900">24/7/365 Non-Stop</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-semibold text-slate-700">Email:</span>
                  <span className="font-bold text-slate-900">support@buypvagmail.com</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
