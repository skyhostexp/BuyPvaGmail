import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle,
  FileText,
  KeyRound,
  Mail,
  Coins
} from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChecker?: () => void;
}

interface TrackedOrderResult {
  orderId: string;
  packageTitle: string;
  quantity: number;
  deliveryEmail: string;
  date: string;
  status: 'delivered' | 'processing' | 'verifying_payment';
  progressStep: number; // 1 to 4
  cryptoNetwork: string;
  txHash: string;
  totalUSD: number;
  accounts: string[];
  warrantyValidUntil: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  onOpenChecker
}) => {
  const [orderInput, setOrderInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<TrackedOrderResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedAccounts, setCopiedAccounts] = useState(false);

  if (!isOpen) return null;

  const handleSearchOrder = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const query = (customId || orderInput).trim().toUpperCase();

    if (!query) {
      setErrorMessage('Please enter an Order ID (e.g. BPG-849201)');
      return;
    }

    setErrorMessage('');
    setIsSearching(true);
    setSearchedOrder(null);

    setTimeout(() => {
      setIsSearching(false);

      // Check if user had created a local order in localStorage
      let foundLocalOrder: OrderDetails | null = null;
      try {
        const savedRaw = localStorage.getItem('buypvagmail_last_order');
        if (savedRaw) {
          const parsed: OrderDetails = JSON.parse(savedRaw);
          if (parsed.orderId.toUpperCase() === query) {
            foundLocalOrder = parsed;
          }
        }
      } catch (err) {
        // ignore
      }

      const orderNumberDigits = query.replace(/\D/g, '') || '748291';
      const cleanOrderId = query.startsWith('BPG-') ? query : `BPG-${orderNumberDigits.slice(0, 6) || '748291'}`;

      // Generate accurate sample accounts
      const sampleList = [
        `us.outreach.agency${orderNumberDigits.slice(0, 3)}@gmail.com:PassSecure#982:backup.recovery01@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9281","HSID":"HS-9821"}`,
        `us.scale.lead${orderNumberDigits.slice(3, 6)}@gmail.com:K98!vxM920@:backup.recovery02@outlook.com:HXDMVJ5W4GZ7QPYE:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9282","HSID":"HS-9822"}`
      ];

      const deliveryDate = new Date();
      const warrantyDate = new Date();
      warrantyDate.setDate(deliveryDate.getDate() + 7);

      setSearchedOrder({
        orderId: cleanOrderId,
        packageTitle: foundLocalOrder ? foundLocalOrder.items[0]?.product.name : 'USA Aged (2021) PVA Gmail Accounts',
        quantity: foundLocalOrder ? foundLocalOrder.items[0]?.quantity : 25,
        deliveryEmail: foundLocalOrder ? foundLocalOrder.email : 'buyer.agency@gmail.com',
        date: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'delivered',
        progressStep: 4,
        cryptoNetwork: foundLocalOrder?.cryptoCurrency || 'USDT (TRC20)',
        txHash: foundLocalOrder?.txHash || '0x4f8a9b2c7e1d5a8f9c0e3b6a2d7f8c1e4a7b9c0e3d2f1a6b8c9d0e1f2a3b4c5d',
        totalUSD: foundLocalOrder ? foundLocalOrder.totalAmount : 75.00,
        accounts: sampleList,
        warrantyValidUntil: warrantyDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }, 600);
  };

  const handleDownloadTxt = () => {
    if (!searchedOrder) return;
    const lines = [
      '# BuyPvaGmail Order Dispatch',
      `# Order ID: ${searchedOrder.orderId}`,
      `# Package: ${searchedOrder.packageTitle}`,
      `# Quantity: ${searchedOrder.quantity} Accounts`,
      `# Date: ${searchedOrder.date}`,
      `# 7-Day Warranty Active Until: ${searchedOrder.warrantyValidUntil}`,
      '# Format: email:password:recovery_email:2FA_secret:user_agent:cookies_json',
      '---------------------------------------------------------------------------------',
      ...searchedOrder.accounts
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${searchedOrder.orderId}-Accounts.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAccounts = () => {
    if (!searchedOrder) return;
    navigator.clipboard?.writeText(searchedOrder.accounts.join('\n'));
    setCopiedAccounts(true);
    setTimeout(() => setCopiedAccounts(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-6 p-5 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Order Tracking & Live Status
              </h3>
              <p className="text-xs text-slate-500">
                Check delivery progress, download credentials, or verify replacement warranty
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={(e) => handleSearchOrder(e)} className="space-y-2 mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Enter Your Order ID (from checkout or email):
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. BPG-748291"
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 uppercase font-bold"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-75"
            >
              {isSearching ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Track Order</span>
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMessage}
            </p>
          )}

          {/* Quick Demo Search Chips */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
            <span>Quick lookup sample:</span>
            <button
              type="button"
              onClick={() => {
                setOrderInput('BPG-948201');
                handleSearchOrder(undefined, 'BPG-948201');
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              #BPG-948201
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setOrderInput('BPG-108492');
                handleSearchOrder(undefined, 'BPG-108492');
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              #BPG-108492
            </button>
          </div>
        </form>

        {/* Searched Order Details */}
        {searchedOrder && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Status Header Badge */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-emerald-950">
                      {searchedOrder.orderId}
                    </span>
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Delivered & Active
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Credentials successfully generated and dispatched to <strong>{searchedOrder.deliveryEmail}</strong>
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] text-emerald-700 block font-medium">Warranty Valid Until:</span>
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1 sm:justify-end">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {searchedOrder.warrantyValidUntil}
                </span>
              </div>
            </div>

            {/* 4-Step Progress Indicator */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block mb-3">
                Live Delivery Milestones:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-300 flex items-center gap-2 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate">1. Crypto Paid</span>
                    <span className="text-[10px] text-slate-400 block truncate">Confirmed</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-emerald-300 flex items-center gap-2 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate">2. Carrier SIM</span>
                    <span className="text-[10px] text-slate-400 block truncate">PVA Verified</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-emerald-300 flex items-center gap-2 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate">3. 2FA Keys</span>
                    <span className="text-[10px] text-slate-400 block truncate">Attached</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-emerald-300 flex items-center gap-2 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate">4. Dispatched</span>
                    <span className="text-[10px] text-emerald-600 font-bold block truncate">Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Specification Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Details:</span>
                <p className="font-bold text-slate-900">{searchedOrder.packageTitle}</p>
                <p className="text-slate-600">Quantity: <strong>{searchedOrder.quantity} Accounts</strong></p>
                <p className="text-slate-600">Order Date: <strong>{searchedOrder.date}</strong></p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment & Blockchain:</span>
                <p className="font-bold text-blue-600 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  {searchedOrder.cryptoNetwork}
                </p>
                <p className="text-slate-600">Total: <strong>${searchedOrder.totalUSD.toFixed(2)} USD</strong></p>
                <p className="text-slate-500 font-mono text-[10px] truncate">Tx: {searchedOrder.txHash}</p>
              </div>
            </div>

            {/* Sample Credentials Preview Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Account Credentials Preview:
                </span>
                <button
                  onClick={handleCopyAccounts}
                  className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedAccounts ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccounts ? 'Copied' : 'Copy All'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-slate-300 font-mono text-[11px] p-3 rounded-xl border border-slate-800 space-y-1 overflow-x-auto max-h-36">
                {searchedOrder.accounts.map((acc, idx) => (
                  <div key={idx} className="whitespace-nowrap text-slate-300 select-all hover:text-white">
                    {acc}
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block">
                Format: <code>email:password:recovery_email:2FA_secret:user_agent:cookies_json</code>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleDownloadTxt}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Credentials (.TXT)</span>
              </button>

              {onOpenChecker && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenChecker();
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Verify in 2FA Inspector</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
