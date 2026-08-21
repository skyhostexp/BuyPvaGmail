import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Terminal,
  Copy,
  Check
} from 'lucide-react';

interface AccountCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountCheckerModal: React.FC<AccountCheckerModalProps> = ({ isOpen, onClose }) => {
  const [inputFormat, setInputFormat] = useState(
    'outreach.agency.us2021@gmail.com:PassSecure#2026:recovery.backup@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  );
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  const parts = inputFormat.split(':').map((p) => p.trim());
  const email = parts[0] || '';
  const password = parts[1] || '';
  const recovery = parts[2] || '';
  const twoFAKey = parts[3] || '';
  const userAgent = parts[4] || '';

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.includes('@gmail.com');
  const hasPassword = password.length >= 6;
  const isRecoveryValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recovery);
  const is2FAValid = twoFAKey.length >= 16;

  // Simple simulated 6-digit TOTP generator for demo
  const sampleToken = '849 203';

  const handleCopyToken = () => {
    navigator.clipboard?.writeText('849203');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                PVA Credential & Format Validator
              </h3>
              <p className="text-xs text-slate-500">
                Verify syntax, 2FA secret keys, and outreach tool compatibility
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input box */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Paste Account Credential String:
            </label>
            <textarea
              rows={3}
              value={inputFormat}
              onChange={(e) => setInputFormat(e.target.value)}
              placeholder="email:password:recovery_email:2FA_secret:user_agent"
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Standard Format: <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded">email:password:recovery:2FA:userAgent</code>
            </span>
          </div>

          {/* Real-time Parsed Diagnostics */}
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Syntax Diagnostics:
            </h4>

            {/* Email Check */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Gmail Address:
              </span>
              <div className="flex items-center gap-1 font-bold">
                {isEmailValid ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid Gmail
                  </span>
                ) : (
                  <span className="text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Missing/Invalid Gmail
                  </span>
                )}
              </div>
            </div>

            {/* Password Check */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-600 font-medium">Primary Password:</span>
              <span className="font-bold text-slate-800">
                {hasPassword ? (
                  <span className="text-emerald-600">●●●●●●●● (Present)</span>
                ) : (
                  <span className="text-rose-500">Missing</span>
                )}
              </span>
            </div>

            {/* Recovery Check */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-600 font-medium">Recovery Email:</span>
              <span className="font-bold text-slate-800">
                {isRecoveryValid ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Configured ({recovery})
                  </span>
                ) : (
                  <span className="text-amber-600">Optional / Missing</span>
                )}
              </span>
            </div>

            {/* 2FA Key Check */}
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-500" />
                2FA TOTP Secret Key:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold text-[11px]">
                  {is2FAValid ? '16-Char Valid' : 'Not Detected'}
                </span>
                {is2FAValid && (
                  <button
                    onClick={handleCopyToken}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                  >
                    {copiedToken ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    OTP: {sampleToken}
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Antidetect / Proxy Guideline */}
          <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950">
            <h5 className="font-bold flex items-center gap-1.5 text-blue-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Recommended Proxy Match:
            </h5>
            <p className="text-blue-800/90 leading-relaxed">
              Use a <strong>Static Residential USA ISP proxy</strong> (Comcast/AT&T) when logging into USA accounts. For best longevity, launch with <strong>AdsPower</strong> or <strong>Dolphin&#123;anty&#125;</strong> and paste the session cookies included in your delivery file.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
