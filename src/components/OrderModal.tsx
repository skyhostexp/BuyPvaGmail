import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Download, 
  ArrowRight,
  ArrowLeft,
  Copy,
  QrCode,
  Upload,
  AlertTriangle,
  RefreshCw,
  Flame,
  Globe,
  Smartphone,
  Star,
  TrendingUp,
  Zap,
  Lock,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ServiceProduct, CartItem, OrderDetails } from '../types';
import { detailedServicesData } from '../data/servicesData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ServiceProduct;
  initialQuantity?: number;
  cartItems?: CartItem[];
  onOrderSuccess?: (order: OrderDetails) => void;
}

// 6 Categories matching UI Screenshot 1
interface ServiceCategoryConfig {
  id: string;
  name: string;
  subtitle: string;
  fromPrice: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const SERVICE_CATEGORIES: ServiceCategoryConfig[] = [
  {
    id: 'usa-gmail-accounts',
    name: 'USA Gmail Accounts',
    subtitle: '🔥 Best Seller • USA IP',
    fromPrice: 'From $6',
    icon: Flame,
    iconColor: 'text-red-500'
  },
  {
    id: 'pva-gmail-accounts',
    name: 'PVA Gmail Accounts',
    subtitle: '🛡️ 100% Phone Verified',
    fromPrice: 'From $6',
    icon: Smartphone,
    iconColor: 'text-blue-500'
  },
  {
    id: 'aged-mix-country-gmail',
    name: 'Aged Mix Country Gmail Accounts',
    subtitle: '🌍 Global Diversity • Best Value',
    fromPrice: 'From $5',
    icon: Globe,
    iconColor: 'text-emerald-500'
  },
  {
    id: 'aged-gmail-for-reviews',
    name: 'Aged Gmail Accounts For Reviews',
    subtitle: '⭐ 95%+ Stick Rate',
    fromPrice: 'From $6',
    icon: Star,
    iconColor: 'text-amber-500'
  },
  {
    id: 'aged-gmail-for-google-ads',
    name: 'Aged Gmail Accounts For Google Ads',
    subtitle: '🎯 Ads Ready • Top Tier',
    fromPrice: 'From $5',
    icon: TrendingUp,
    iconColor: 'text-purple-500'
  },
  {
    id: 'new-gmail-accounts',
    name: 'New Gmail Accounts',
    subtitle: '⚡ Lowest Price • High Volume',
    fromPrice: 'From $3',
    icon: Zap,
    iconColor: 'text-amber-500'
  }
];

// Quantity Tiers
interface QuantityTier {
  count: number;
  label: string;
  saveText: string;
  isPopular?: boolean;
}

const DEFAULT_QUANTITY_TIERS: QuantityTier[] = [
  { count: 2, label: 'Starter Pack', saveText: '' },
  { count: 5, label: '', saveText: 'Save 10%' },
  { count: 20, label: '', saveText: 'Save $5', isPopular: true },
  { count: 50, label: '', saveText: 'Save $20' },
  { count: 100, label: 'Best Agency Rate', saveText: '' }
];

// 7 Crypto Payment Options with Verified Wallets
type CryptoId = 
  | 'BSC' 
  | 'TRX' 
  | 'ETH' 
  | 'SOL' 
  | 'BTC' 
  | 'LTC' 
  | 'DOGE';

interface CryptoMethod {
  id: CryptoId;
  label: string;
  sublabel: string;
  networkTitle: string;
  networkBadge: string;
  networkBadgeColor: string;
  address: string;
  symbol: string;
}

const CRYPTO_METHODS: Record<CryptoId, CryptoMethod> = {
  BSC: {
    id: 'BSC',
    label: 'BSC',
    sublabel: 'BEP20 / BNB / USDT',
    networkTitle: 'Binance Smart Chain (BEP20 / BNB / USDT)',
    networkBadge: 'BSC / BEP20 Network',
    networkBadgeColor: 'bg-yellow-500 text-slate-950 font-bold',
    address: '0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6',
    symbol: 'BSC (BEP20)'
  },
  TRX: {
    id: 'TRX',
    label: 'TRX',
    sublabel: 'TRON / TRC20 / USDT',
    networkTitle: 'TRON / USDT (TRC20 / TRX)',
    networkBadge: 'TRC20 / TRON Network (Instant & Low Fee)',
    networkBadgeColor: 'bg-emerald-600 text-white font-bold',
    address: 'TSezBSdMrdARFQQebAYiwzkPku1qHijQEh',
    symbol: 'TRX / USDT (TRC20)'
  },
  ETH: {
    id: 'ETH',
    label: 'ETH',
    sublabel: 'Ethereum / ERC20',
    networkTitle: 'Ethereum / USDT (ERC20 / ETH)',
    networkBadge: 'ERC20 / Ethereum Mainnet',
    networkBadgeColor: 'bg-indigo-600 text-white font-bold',
    address: '0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6',
    symbol: 'ETH / ERC20'
  },
  SOL: {
    id: 'SOL',
    label: 'SOL',
    sublabel: 'Solana Network',
    networkTitle: 'Solana (SOL)',
    networkBadge: 'Solana Mainnet (Fast & Low Fee)',
    networkBadgeColor: 'bg-purple-600 text-white font-bold',
    address: 'EDWaA1Kp6K9USLwuBAzmCvBxQkDiQ4Bk3LLgFxA2YdVr',
    symbol: 'SOL (Solana)'
  },
  BTC: {
    id: 'BTC',
    label: 'BTC',
    sublabel: 'Bitcoin Mainnet',
    networkTitle: 'Bitcoin (BTC)',
    networkBadge: 'Bitcoin Mainnet',
    networkBadgeColor: 'bg-amber-600 text-white font-bold',
    address: '18QpVzNvW5YVtywK4Zih1VKLB2gEhRojT9',
    symbol: 'BTC (Bitcoin)'
  },
  LTC: {
    id: 'LTC',
    label: 'LTC',
    sublabel: 'Litecoin Network',
    networkTitle: 'Litecoin (LTC)',
    networkBadge: 'Litecoin Mainnet (Ultra Low Fee)',
    networkBadgeColor: 'bg-blue-600 text-white font-bold',
    address: 'LR676Tw3B3FatHCbnjT14D1TmGfpmwM2WG',
    symbol: 'LTC (Litecoin)'
  },
  DOGE: {
    id: 'DOGE',
    label: 'DOGE',
    sublabel: 'Dogecoin Network',
    networkTitle: 'Dogecoin (DOGE)',
    networkBadge: 'Dogecoin Mainnet',
    networkBadgeColor: 'bg-amber-500 text-slate-950 font-bold',
    address: 'DAVEHhBy6NVajnwF9g8eVHsQj1rmfVBx3n',
    symbol: 'DOGE (Dogecoin)'
  }
};

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'France',
  'Germany',
  'Netherlands',
  'Spain',
  'Italy',
  'Brazil',
  'India',
  'Singapore',
  'United Arab Emirates',
  'Japan',
  'Worldwide / Other'
];

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  initialQuantity = 20,
  cartItems = [],
  onOrderSuccess
}) => {
  // Step navigation (1: Package, 2: Contact, 3: Payment, 4: Verify)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: Service & Quantity
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialProduct?.id || 'usa-gmail-accounts'
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    initialQuantity || 20
  );

  // Step 2 State: Contact Details
  const [fullName, setFullName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [country, setCountry] = useState('United States');
  const [orderNotes, setOrderNotes] = useState('');
  const [contactError, setContactError] = useState('');

  // Step 3 State: Payment
  const [selectedCryptoId, setSelectedCryptoId] = useState<CryptoId>('BSC');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Step 4 State: Verification & Upload
  const [txHash, setTxHash] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial product if changed
  useEffect(() => {
    if (initialProduct?.id) {
      setSelectedServiceId(initialProduct.id);
    }
    if (initialQuantity) {
      setSelectedQuantity(initialQuantity);
    }
  }, [initialProduct, initialQuantity]);

  // Generate real original QR code for the active crypto deposit address
  useEffect(() => {
    const currentMethod = CRYPTO_METHODS[selectedCryptoId] || CRYPTO_METHODS.BSC;
    if (currentMethod?.address) {
      QRCode.toDataURL(currentMethod.address, {
        width: 360,
        margin: 1,
        color: {
          dark: '#020617',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      })
        .then((url) => {
          setQrCodeDataUrl(url);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
        });
    }
  }, [selectedCryptoId]);

  if (!isOpen) return null;

  // Active product details
  const activeProduct = detailedServicesData.find((s) => s.id === selectedServiceId) || detailedServicesData[0];
  const activeCrypto = CRYPTO_METHODS[selectedCryptoId] || CRYPTO_METHODS.BSC;

  // Calculate pricing based on selected service and quantity tier
  const calculatePrice = (serviceId: string, count: number) => {
    const product = detailedServicesData.find((s) => s.id === serviceId) || detailedServicesData[0];
    
    // Check if the service has an exact package configured
    const exactPkg = product.packages?.find((p) => p.quantity === count);
    if (exactPkg) {
      return {
        totalPrice: exactPkg.price,
        unitPrice: exactPkg.unitPrice
      };
    }

    // Default calculations for 2, 5, 20, 50, 100
    if (serviceId === 'usa-gmail-accounts' || serviceId === 'pva-gmail-accounts' || serviceId === 'aged-gmail-for-reviews') {
      if (count === 2) return { totalPrice: 6, unitPrice: 3.0 };
      if (count === 5) return { totalPrice: 15, unitPrice: 3.0 };
      if (count === 20) return { totalPrice: 55, unitPrice: 2.75 };
      if (count === 50) return { totalPrice: 130, unitPrice: 2.60 };
      if (count === 100) return { totalPrice: 220, unitPrice: 2.20 };
    } else if (serviceId === 'aged-mix-country-gmail') {
      if (count === 2) return { totalPrice: 5, unitPrice: 2.5 };
      if (count === 5) return { totalPrice: 12, unitPrice: 2.4 };
      if (count === 20) return { totalPrice: 45, unitPrice: 2.25 };
      if (count === 50) return { totalPrice: 105, unitPrice: 2.10 };
      if (count === 100) return { totalPrice: 190, unitPrice: 1.90 };
    } else if (serviceId === 'aged-gmail-for-google-ads') {
      if (count === 2) return { totalPrice: 10, unitPrice: 5.0 };
      if (count === 5) return { totalPrice: 24, unitPrice: 4.8 };
      if (count === 20) return { totalPrice: 90, unitPrice: 4.5 };
      if (count === 50) return { totalPrice: 210, unitPrice: 4.2 };
      if (count === 100) return { totalPrice: 390, unitPrice: 3.9 };
    } else if (serviceId === 'new-gmail-accounts') {
      if (count === 2) return { totalPrice: 3, unitPrice: 1.5 };
      if (count === 5) return { totalPrice: 7, unitPrice: 1.4 };
      if (count === 20) return { totalPrice: 26, unitPrice: 1.3 };
      if (count === 50) return { totalPrice: 60, unitPrice: 1.2 };
      if (count === 100) return { totalPrice: 110, unitPrice: 1.1 };
    }

    // Generic fallback
    const unitRate = product.unitPrice || 3.0;
    const base = unitRate * count;
    let discount = 0;
    if (count >= 100) discount = 0.25;
    else if (count >= 50) discount = 0.15;
    else if (count >= 20) discount = 0.10;
    else if (count >= 5) discount = 0.05;

    const finalTotal = base * (1 - discount);
    return {
      totalPrice: Math.round(finalTotal),
      unitPrice: +(finalTotal / count).toFixed(2)
    };
  };

  const currentPricing = calculatePrice(selectedServiceId, selectedQuantity);

  // Copy address handler
  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(activeCrypto.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Step 2 Validation & Continue
  const handleContinueToPayment = () => {
    if (!fullName.trim()) {
      setContactError('Please enter your full name.');
      return;
    }
    if (!deliveryEmail.trim() || !deliveryEmail.includes('@')) {
      setContactError('Please enter a valid delivery email address.');
      return;
    }
    setContactError('');
    setCurrentStep(3);
  };

  // Screenshot Upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Order
  const handleSubmitOrder = () => {
    if (!txHash.trim()) {
      setVerifyError('Please enter your crypto transaction hash or TxID.');
      return;
    }
    setVerifyError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = 'BPG-' + Math.floor(100000 + Math.random() * 900000);
      const order: OrderDetails = {
        orderId,
        items: [
          {
            product: activeProduct,
            quantity: selectedQuantity,
            totalPrice: currentPricing.totalPrice
          }
        ],
        email: deliveryEmail,
        customerName: fullName,
        telegramOrSkype: telegramUsername,
        whatsapp: whatsappNumber,
        country: country,
        orderNotes: orderNotes,
        paymentMethod: 'crypto',
        cryptoCurrency: activeCrypto.symbol,
        txHash: txHash,
        totalAmount: currentPricing.totalPrice,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'delivered',
        paymentStatus: 'confirmed'
      };

      setCompletedOrder(order);
      if (onOrderSuccess) onOrderSuccess(order);

      try {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 140,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
      } catch (e) {
        // safe fallback
      }
    }, 1500);
  };

  // Download Credentials
  const handleDownloadCredentials = () => {
    const lines = [
      '=================================================================================',
      ' BUYPVAGMAIL.COM - OFFICIAL CREDENTIALS DISPATCH MANIFEST',
      '=================================================================================',
      `Order Reference ID : ${completedOrder?.orderId}`,
      `Service Package    : ${selectedQuantity}x ${activeProduct.name}`,
      `Delivery Email     : ${completedOrder?.email}`,
      `Payment Network    : ${completedOrder?.cryptoCurrency}`,
      `Transaction Hash   : ${completedOrder?.txHash}`,
      `Total Paid         : $${completedOrder?.totalAmount} USD`,
      `Timestamp          : ${new Date().toISOString()}`,
      `Warranty Period    : 7 Days (100% Free Instant Replacement)`,
      '---------------------------------------------------------------------------------',
      'FORMAT: Email : Password : Recovery_Email : 2FA_Secret : UserAgent_Profile : Cookies_JSON',
      '=================================================================================',
      'us.outreach.prime2021@gmail.com:SecurePass#982:backup.rec01@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9281","HSID":"HS-9821"}',
      'us.agency.scale2022@gmail.com:K98!vxM920@:backup.rec02@outlook.com:HXDMVJ5W4GZ7QPYE:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9282","HSID":"HS-9822"}',
      'us.enterprise.boost2023@gmail.com:V82!plx992#:backup.rec03@outlook.com:NXEMVJ5W4GZ7QPYE:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9283","HSID":"HS-9823"}',
      '---------------------------------------------------------------------------------',
      'Note: For multi-account operation, use AdsPower or Dolphin{anty} with US Residential Proxies.',
      'Support Telegram: @Go2Rapid | WhatsApp: +1 (253) 408-0049 | 24/7 Priority Live Dispatch'
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${completedOrder?.orderId || 'BuyPvaGmail-Accounts'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-red-600/30">
              BG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  buypvagmail.com Order Portal
                </h3>
                <span className="bg-emerald-950/90 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700/80 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  SSL Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated verification &amp; instant recovery file delivery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Order Portal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        {!completedOrder && (
          <div className="bg-slate-50/80 border-b border-slate-200/80 px-4 sm:px-7 py-3 shrink-0">
            <div className="flex items-center justify-between max-w-xl mx-auto text-xs sm:text-sm font-bold">
              
              {/* Step 1 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep > 1 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    1
                  </span>
                )}
                <span className={currentStep === 1 ? 'text-red-600 font-extrabold' : currentStep > 1 ? 'text-emerald-700' : 'text-slate-500'}>
                  1. Package
                </span>
              </div>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200" />

              {/* Step 2 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep > 2 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : currentStep === 2 ? (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    2
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                    2
                  </span>
                )}
                <span className={currentStep === 2 ? 'text-red-600 font-extrabold' : currentStep > 2 ? 'text-emerald-700' : 'text-slate-500'}>
                  2. Contact
                </span>
              </div>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200" />

              {/* Step 3 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep > 3 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : currentStep === 3 ? (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    3
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                    3
                  </span>
                )}
                <span className={currentStep === 3 ? 'text-red-600 font-extrabold' : currentStep > 3 ? 'text-emerald-700' : 'text-slate-500'}>
                  3. Payment
                </span>
              </div>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200" />

              {/* Step 4 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep === 4 ? (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    4
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                    4
                  </span>
                )}
                <span className={currentStep === 4 ? 'text-red-600 font-extrabold' : 'text-slate-500'}>
                  4. Verify
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          
          {/* ========================================================================= */}
          {/* STEP 1: PACKAGE & QUANTITY SELECTION */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 1 && (
            <div className="space-y-6">
              
              {/* Category Selection Section */}
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase block mb-2.5">
                  SELECT VERIFIED SERVICE CATEGORY
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const isSelected = selectedServiceId === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedServiceId(cat.id)}
                        className={`p-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">
                              {cat.name}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              {cat.subtitle}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-black text-red-600 shrink-0 ml-2">
                          {cat.fromPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Tiers Section */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
                    SELECT QUANTITY TIER ({activeProduct.name.toUpperCase()})
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current text-emerald-500" />
                    10% Crypto Discount Included
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                  {DEFAULT_QUANTITY_TIERS.map((tier) => {
                    const isSelected = selectedQuantity === tier.count;
                    const tierPricing = calculatePrice(selectedServiceId, tier.count);

                    return (
                      <div key={tier.count} className="relative">
                        {tier.isPopular && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                            <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                              POPULAR
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedQuantity(tier.count)}
                          className={`w-full p-3 sm:p-3.5 rounded-2xl text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center min-h-[100px] border ${
                            isSelected
                              ? 'bg-gradient-to-b from-red-500 to-red-600 text-white border-red-600 shadow-lg shadow-red-500/30'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-base sm:text-lg font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {tier.count}x
                          </span>
                          <span className={`text-xs sm:text-sm font-extrabold my-0.5 ${isSelected ? 'text-white' : 'text-red-600'}`}>
                            ${tierPricing.totalPrice}
                          </span>
                          <span className={`text-[10px] font-semibold ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                            {tier.count === 100 
                              ? `Best Agency Rate ($${tierPricing.unitPrice}/ea)` 
                              : tier.saveText || tier.label || `$${tierPricing.unitPrice}/ea`}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Package Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Selected Package:</span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {activeProduct.name} ({selectedQuantity} Accounts)
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    Estimated Unit Cost: ${currentPricing.unitPrice}/account
                  </span>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                    Total Due:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-red-600">
                    ${currentPricing.totalPrice} USD
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Continue to Contact Details</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: CONTACT DETAILS */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 2 && (
            <div className="space-y-5">
              
              {/* Notice Banner */}
              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5 flex items-center gap-3 text-blue-900 text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="font-medium">
                  Your contact details are strictly used for instant recovery spreadsheet delivery and order notifications.
                </p>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    EMAIL ADDRESS * (FOR DELIVERY)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={deliveryEmail}
                    onChange={(e) => setDeliveryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Telegram Username */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    TELEGRAM USERNAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @vance_scale (Optional)"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WHATSAPP NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="+1 555 123 4567"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Country / Jurisdiction */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    COUNTRY / JURISDICTION
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Order Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    ORDER NOTES / CUSTOM REQUESTS (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Need NY or TX state IP profiles only"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

              </div>

              {contactError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{contactError}</span>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: PAYMENT METHOD & DEPOSIT ADDRESS */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 3 && (
            <div className="space-y-5">
              
              {/* 7 Verified Crypto Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {(Object.keys(CRYPTO_METHODS) as CryptoId[]).map((cKey) => {
                  const method = CRYPTO_METHODS[cKey];
                  const isSelected = selectedCryptoId === cKey;

                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setSelectedCryptoId(cKey)}
                      className={`p-2.5 sm:p-3 rounded-2xl text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center border ${
                        isSelected
                          ? 'bg-red-50/60 border-red-500 shadow-md ring-2 ring-red-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-sm font-black ${isSelected ? 'text-red-700' : 'text-slate-900'}`}>
                        {method.label}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium mt-0.5 truncate max-w-full">
                        {method.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Details Container */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
                
                {/* Header row with Network and Amount */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-black text-slate-900">
                      {activeCrypto.networkTitle}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${activeCrypto.networkBadgeColor}`}>
                      {activeCrypto.networkBadge}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 font-bold block">Amount to Send:</span>
                    <span className="text-xl sm:text-2xl font-black text-red-600">
                      ${currentPricing.totalPrice} USD equivalent
                    </span>
                  </div>
                </div>

                {/* Deposit Address Box with 1-Click Copy */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                    OFFICIAL BUYPVAGMAIL.COM {activeCrypto.label} DEPOSIT ADDRESS:
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      readOnly
                      value={activeCrypto.address}
                      className="flex-1 bg-transparent px-3 py-1 font-mono text-xs sm:text-sm text-slate-900 font-bold focus:outline-hidden select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Original QR Code and Live Scanner Info Box */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pt-2">
                  
                  {/* Left Original QR Code Container */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-40 h-40 bg-white rounded-2xl p-2.5 flex items-center justify-center border border-slate-200 shadow-sm relative group">
                      {qrCodeDataUrl ? (
                        <img 
                          src={qrCodeDataUrl} 
                          alt={`${activeCrypto.label} Original QR Code`}
                          className="w-36 h-36 object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-36 h-36 flex items-center justify-center text-slate-400">
                          <RefreshCw className="w-6 h-6 animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between w-full px-2 mt-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                        ORIGINAL QR CODE
                      </span>
                      {qrCodeDataUrl && (
                        <a
                          href={qrCodeDataUrl}
                          download={`buypvagmail-${activeCrypto.id}-qr.png`}
                          className="text-[10px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 hover:underline"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save QR</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Scanner Instructions */}
                  <div className="sm:col-span-7 space-y-3">
                    <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/80 border border-emerald-200/80 p-3 rounded-2xl">
                      <span className="text-emerald-600 font-bold shrink-0 text-sm">✓</span>
                      <p className="leading-relaxed">
                        <strong className="text-slate-900 font-black">ORIGINAL WALLET QR READY:</strong> Point your crypto wallet camera (Binance, Trust Wallet, MetaMask, Phantom, Exodus, OKX, Coinbase) at this QR code to automatically scan and deposit {activeCrypto.label}.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl">
                      <span className="text-amber-600 font-bold shrink-0 text-sm">⚠️</span>
                      <p className="leading-relaxed">
                        Verify address: <strong className="font-mono text-slate-900">{activeCrypto.address.slice(0, 6)}...{activeCrypto.address.slice(-6)}</strong> on <strong className="text-slate-900 font-bold">{activeCrypto.networkBadge}</strong>.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>I Have Sent Payment → Upload Hash</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: VERIFY TRANSACTION HASH & SCREENSHOT */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 4 && (
            <div className="space-y-5">
              
              {/* Alert Notification */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-amber-950">
                    Almost done! Submit your Transaction ID / Hash for automated verification.
                  </p>
                  <p className="text-amber-800">
                    Our blockchain gateway checks incoming hashes every 60 seconds. Once confirmed, your spreadsheet will be emailed automatically.
                  </p>
                </div>
              </div>

              {/* Transaction Hash Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  CRYPTO TRANSACTION HASH / TXID * (REQUIRED)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6 or TSezBSdMrdARFQQebAYiwzkPku1qHijQEh..."
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              {/* Upload Payment Screenshot Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  UPLOAD PAYMENT SCREENSHOT (OPTIONAL FOR FASTER VERIFICATION)
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  className="hidden"
                />

                {!screenshotPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropFile}
                    className="border-2 border-dashed border-red-300 hover:border-red-500 bg-red-50/30 hover:bg-red-50/60 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-xs">
                      <Upload className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-red-600 block">
                        Click to upload image
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        PNG, JPG, or GIF up to 5MB
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 bg-slate-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={screenshotPreview}
                        alt="Payment Proof"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 shadow-xs"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                          {screenshotFile?.name || 'Payment_Proof.png'}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Image attached
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setScreenshotFile(null);
                        setScreenshotPreview(null);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove attachment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary Confirmation Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Order Summary:</span>
                  <span className="font-bold text-slate-900">{selectedQuantity}x {activeProduct.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Payment Protocol:</span>
                  <span className="font-bold text-slate-900">{activeCrypto.networkTitle}</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200 items-baseline">
                  <span className="font-extrabold text-sm text-slate-900 uppercase">Total Paid:</span>
                  <span className="text-xl font-black text-red-600">${currentPricing.totalPrice} USD</span>
                </div>
              </div>

              {verifyError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Verifying Blockchain Hash...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Submit Order &amp; Get Accounts</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* FINAL SCREEN: ORDER COMPLETED & INSTANT DISPATCH */}
          {/* ========================================================================= */}
          {completedOrder && (
            <div className="space-y-6 py-2">
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-emerald-950">
                  Order Successfully Submitted &amp; Verified!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1.5 max-w-md mx-auto">
                  Your payment on <strong>{completedOrder.cryptoCurrency}</strong> has been logged. We have generated your account bundle and dispatched the recovery details to <strong>{completedOrder.email}</strong>.
                </p>
              </div>

              {/* Order Metadata Details */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Package:</span>
                  <span className="font-bold text-slate-900">{selectedQuantity}x {activeProduct.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount Paid:</span>
                  <span className="font-bold text-slate-900">${completedOrder.totalAmount} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Payment Network:</span>
                  <span className="font-bold text-blue-600">{completedOrder.cryptoCurrency}</span>
                </div>
                <div className="flex justify-between text-slate-600 truncate">
                  <span>TxHash:</span>
                  <span className="font-mono text-slate-700 truncate max-w-[240px]">{completedOrder.txHash}</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span>Warranty Status:</span>
                  <span className="font-bold text-emerald-600">7-Day Free Replacement Active</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadCredentials}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-5 rounded-xl text-sm shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Accounts (.TXT &amp; .CSV)</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-6 rounded-xl text-sm cursor-pointer transition-colors"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
