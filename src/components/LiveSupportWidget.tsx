import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Headphones, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const LiveSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hello! 👋 Welcome to BuyPvaGmail Support. Looking for USA aged accounts, bulk agency discounts, or need replacement help?',
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const quickQuestions = [
    'How fast is order delivery?',
    'What format are accounts delivered in?',
    'Do you offer replacement warranty?',
    'I want 500+ bulk discount'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'user' as const, text, time: userTime };
    
    setChatMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputMsg('');

    // Simulated automated smart reply
    setTimeout(() => {
      let replyText = 'Thanks for contacting us! All orders are delivered automatically within 60 seconds. For direct custom orders or instant replacements, reach our senior engineers directly on Telegram @Go2Rapid or WhatsApp +1 (253) 408-0049';
      
      if (text.toLowerCase().includes('delivery') || text.toLowerCase().includes('fast')) {
        replyText = '⚡ Orders are delivered automatically within 30–90 seconds after payment confirmation via on-screen download and email TXT/CSV files!';
      } else if (text.toLowerCase().includes('format')) {
        replyText = '📁 Standard delivery format: email:password:recovery_email:2FA_key:userAgent:cookies_json. Works 100% with Instantly, Smartlead & antidetect browsers!';
      } else if (text.toLowerCase().includes('warranty') || text.toLowerCase().includes('replace')) {
        replyText = '🛡️ We provide a 7-Day Free Replacement Guarantee on all phone-verified and aged accounts with zero hassle!';
      } else if (text.toLowerCase().includes('bulk') || text.toLowerCase().includes('discount')) {
        replyText = '🏷️ Bulk orders of 100+ accounts receive 20% to 30% OFF automatically in the checkout! Use promo code BUYUSA15 for extra 15% discount.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'agent' as const,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer group"
          aria-label="Open 24/7 Live Support Chat"
        >
          <div className="relative">
            <Headphones className="w-6 h-6" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-black block tracking-tight">24/7 Live Support</span>
            <span className="text-[10px] text-blue-200 block font-medium">Avg reply: &lt;2 mins</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[380px] h-[520px] flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center relative">
                <Headphones className="w-5 h-5" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -top-0.5 -right-0.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  BuyPvaGmail Specialist
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded font-semibold border border-emerald-500/30">Online</span>
                </h4>
                <p className="text-[11px] text-slate-400">PVA Verification & Agency Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Direct Channel Links */}
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-1 text-[11px]">
            <a
              href="https://t.me/Go2Rapid"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-blue-600 font-bold hover:underline"
            >
              <span>Telegram: @Go2Rapid</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="https://wa.me/12534080049"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-600 font-bold hover:underline"
            >
              <span>WhatsApp: +1 (253) 408-0049</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Messages Area */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Quick action chips */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Suggested questions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about our accounts..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
