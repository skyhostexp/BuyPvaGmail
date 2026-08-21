import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  Search, 
  CheckCircle2,
  Lock,
  ArrowRight,
  Headphones,
  ChevronDown,
  Shield,
  Smartphone,
  Globe,
  Star,
  TrendingUp
} from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenOrderModal: (productId?: string) => void;
  onOpenCheckerModal: () => void;
  onOpenTrackingModal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onNavigateToPage?: (page: string, serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onOpenOrderModal,
  onOpenCheckerModal,
  onOpenTrackingModal,
  activeSection,
  setActiveSection,
  onNavigateToPage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const serviceSubmenuItems = [
    {
      id: 'usa-gmail-accounts',
      title: 'USA Gmail Accounts',
      price: '$6',
      subtitle: '🔥 Best Seller • USA IP',
      icon: Shield,
      iconBg: 'bg-red-50 text-red-600',
      priceBg: 'bg-red-50 text-red-600 border border-red-100'
    },
    {
      id: 'pva-gmail-accounts',
      title: 'PVA Gmail Accounts',
      price: '$6',
      subtitle: '🛡️ 100% Phone Verified',
      icon: Smartphone,
      iconBg: 'bg-blue-50 text-blue-600',
      priceBg: 'bg-red-50 text-red-600 border border-red-100'
    },
    {
      id: 'aged-mix-country-gmail',
      title: 'Aged Mix Country Gmail Accounts',
      price: '$5',
      subtitle: '🌍 Global Diversity • Best Value',
      icon: Globe,
      iconBg: 'bg-emerald-50 text-emerald-600',
      priceBg: 'bg-red-50 text-red-600 border border-red-100'
    },
    {
      id: 'aged-gmail-for-reviews',
      title: 'Aged Gmail Accounts For Reviews',
      price: '$6',
      subtitle: '⭐ 95%+ Stick Rate',
      icon: Star,
      iconBg: 'bg-amber-50 text-amber-600',
      priceBg: 'bg-red-50 text-red-600 border border-red-100'
    },
    {
      id: 'aged-gmail-for-google-ads',
      title: 'Aged Gmail Accounts For Google Ads',
      price: '$5',
      subtitle: '🎯 Ads Ready • Top Tier',
      icon: TrendingUp,
      iconBg: 'bg-purple-50 text-purple-600',
      priceBg: 'bg-red-50 text-red-600 border border-red-100'
    },
    {
      id: 'new-gmail-accounts',
      title: 'New Gmail Accounts',
      price: '$3',
      subtitle: '⚡ Lowest Price • High Volume',
      icon: Zap,
      iconBg: 'bg-amber-50 text-amber-600',
      priceBg: 'bg-red-50 text-red-600 border border-red-100'
    }
  ];

  const navItems: { label: string; id: string; badge?: string }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About Us', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    if (onNavigateToPage) {
      if (id === 'services') {
        onNavigateToPage('services-catalog');
      } else if (id === 'pricing') {
        onNavigateToPage('pricing');
      } else if (id === 'about') {
        onNavigateToPage('about');
      } else if (id === 'blog') {
        onNavigateToPage('blog');
      } else if (id === 'faq') {
        onNavigateToPage('faq');
      } else if (id === 'contact') {
        onNavigateToPage('contact');
      } else {
        onNavigateToPage('home');
      }
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSubmenuServiceClick = (serviceId: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveSection('services');
    
    if (onNavigateToPage) {
      onNavigateToPage('service-detail', serviceId);
    } else {
      const el = document.getElementById(serviceId) || document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium text-[11px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              14,820 USA Accounts Ready in Stock
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="text-slate-300">
              ⚡ Flash Discount: Use code <span className="text-amber-300 font-semibold underline decoration-amber-400/50">BUYUSA15</span> for 15% OFF bulk orders
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button 
              onClick={onOpenTrackingModal}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors text-xs font-medium cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={onOpenCheckerModal}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors text-xs font-medium cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Free PVA Checker Tool
            </button>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Headphones className="w-3.5 h-3.5 text-blue-400" />
              <span>24/7 Live Support: </span>
              <a href="https://t.me/Go2Rapid" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-semibold flex items-center gap-1">
                @Go2Rapid
              </a>
              <span className="text-slate-600">|</span>
              <a href="https://wa.me/12534080049" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-semibold flex items-center gap-1">
                WhatsApp: +1 (253) 408-0049
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200' 
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  BuyPva<span className="text-red-600">Gmail</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  100% Real SIM Verified Accounts
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                if (item.id === 'services') {
                  return (
                    <div 
                      key="services" 
                      className="relative"
                      ref={dropdownRef}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <button
                        onClick={() => {
                          handleNavClick('services');
                          setServicesDropdownOpen(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 relative flex items-center gap-1.5 cursor-pointer select-none ${
                          servicesDropdownOpen || activeSection === 'services'
                            ? 'text-red-600 bg-red-50/90 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>Services</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${servicesDropdownOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
                      </button>

                      {/* Dropdown Menu with Hover Bridge & Smooth Transitions */}
                      <div 
                        className={`absolute top-full left-0 pt-2 w-[370px] z-50 transition-all duration-200 ease-out origin-top-left transform ${
                          servicesDropdownOpen 
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible' 
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                        }`}
                      >
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 backdrop-blur-md">
                          {/* Header label */}
                          <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center justify-between">
                            <span>VERIFIED SERVICE DIRECTORY</span>
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              Instant Stock
                            </span>
                          </div>

                          {/* Submenu Items */}
                          <div className="space-y-1 mt-1">
                            {serviceSubmenuItems.map((subItem) => {
                              const IconComponent = subItem.icon;
                              return (
                                <div
                                  key={subItem.id}
                                  onClick={() => handleSubmenuServiceClick(subItem.id)}
                                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all duration-150 cursor-pointer group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl ${subItem.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-150 shadow-xs`}>
                                      <IconComponent className="w-4 h-4 stroke-[2.2]" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {subItem.title}
                                      </span>
                                      <span className="text-[11px] text-slate-500 font-medium line-clamp-1">
                                        {subItem.subtitle}
                                      </span>
                                    </div>
                                  </div>

                                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${subItem.priceBg} shrink-0 ml-2 group-hover:scale-105 transition-transform duration-150`}>
                                    {subItem.price}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* View All CTA */}
                          <div className="pt-2 mt-1.5 border-t border-slate-100">
                            <button
                              onClick={() => {
                                setServicesDropdownOpen(false);
                                handleNavClick('services');
                              }}
                              className="w-full py-2.5 text-center text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50/70 rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Explore All Services Catalog</span>
                              <span className="text-sm font-black transition-transform group-hover:translate-x-0.5">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative flex items-center gap-1.5 cursor-pointer ${
                      activeSection === item.id 
                        ? 'text-blue-600 bg-blue-50/80' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                id="cart-toggle-btn"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 transition-all cursor-pointer"
                title="View Cart"
                aria-label="View Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Order Accounts CTA Button */}
              <button
                id="header-order-btn"
                onClick={() => onOpenOrderModal()}
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>Order Accounts</span>
              </button>

              {/* Mobile menu button */}
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              {navItems.map((item) => {
                if (item.id === 'services') {
                  return (
                    <div key="mobile-services" className="space-y-1">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                          activeSection === 'services' || mobileServicesOpen
                            ? 'bg-red-50 text-red-600' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>Services</span>
                          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                            6 Types
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-2 pr-1 py-1 space-y-1 bg-slate-50/80 rounded-xl border border-slate-100">
                          {serviceSubmenuItems.map((subItem) => {
                            const IconComponent = subItem.icon;
                            return (
                              <div
                                key={`m-${subItem.id}`}
                                onClick={() => handleSubmenuServiceClick(subItem.id)}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-7 h-7 rounded-lg ${subItem.iconBg} flex items-center justify-center shrink-0`}>
                                    <IconComponent className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{subItem.title}</span>
                                    <span className="text-[10px] text-slate-500">{subItem.subtitle}</span>
                                  </div>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${subItem.priceBg}`}>
                                  {subItem.price}
                                </span>
                              </div>
                            );
                          })}
                          <button
                            onClick={() => handleNavClick('services')}
                            className="w-full text-center py-2 text-xs font-bold text-red-600 hover:underline"
                          >
                            View All Services Catalog →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                      activeSection === item.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>Order Accounts Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckerModal();
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Free PVA Format Checker</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
