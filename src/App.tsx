import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ComparisonSection } from './components/ComparisonSection';
import { TieredPricing } from './components/TieredPricing';
import { ReviewsSection } from './components/ReviewsSection';
import { GuidesSection } from './components/GuidesSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { CartDrawer } from './components/CartDrawer';
import { AccountCheckerModal } from './components/AccountCheckerModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { LiveSupportWidget } from './components/LiveSupportWidget';

// Standalone dedicated pages
import { ServicesCatalogPage } from './components/pages/ServicesCatalogPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { PricingPage } from './components/pages/PricingPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { BlogPage } from './components/pages/BlogPage';
import { FaqPage } from './components/pages/FaqPage';
import { ContactPage } from './components/pages/ContactPage';
import { PowerhouseAdminPage } from './components/admin/PowerhouseAdminPage';

import { ServiceProduct, CartItem, OrderDetails } from './types';
import { servicesData, detailedServicesData } from './data/servicesData';
import { addOrderToStore } from './utils/orderStorage';
import { Check, ShoppingBag } from 'lucide-react';

export type AppView = 
  | 'home' 
  | 'services-catalog' 
  | 'service-detail' 
  | 'pricing' 
  | 'about' 
  | 'blog' 
  | 'faq' 
  | 'contact'
  | 'powerhouse';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('buypvagmail_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('usa-gmail-accounts');

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalProduct, setOrderModalProduct] = useState<ServiceProduct>(servicesData[0]);
  const [orderModalQuantity, setOrderModalQuantity] = useState<number>(2);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckerModalOpen, setIsCheckerModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clean URL and View Synchronization with standard pathnames (/contact, /blog, /services, etc.)
  useEffect(() => {
    const handleUrlRouting = () => {
      try {
        const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
        const searchParams = new URLSearchParams(window.location.search);
        const viewParam = searchParams.get('view');
        const serviceParam = searchParams.get('service');
        const rawHash = (window.location.hash || '').replace('#', '').trim();

        // Clean up any remaining '#' from the address bar if present
        if (window.location.hash) {
          try {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          } catch {
            // Ignore iframe security error
          }
        }

        // Match service detail: /services/:id or /service/:id or ?view=service-detail&service=:id
        let targetServiceId: string | null = null;
        if (pathname.startsWith('/services/') || pathname.startsWith('/service/')) {
          const parts = pathname.split('/');
          if (parts[2]) {
            targetServiceId = decodeURIComponent(parts[2]);
          }
        } else if (viewParam === 'service-detail' && serviceParam) {
          targetServiceId = serviceParam;
        }

        if (targetServiceId) {
          const exists = detailedServicesData.some((s) => s.id === targetServiceId);
          if (exists) {
            setSelectedServiceId(targetServiceId);
            setCurrentView('service-detail');
            setActiveSection('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
        }

        // Services Catalog
        if (
          pathname === '/services' ||
          pathname === '/services-catalog' ||
          viewParam === 'services' ||
          viewParam === 'services-catalog' ||
          rawHash === 'services'
        ) {
          setCurrentView('services-catalog');
          setActiveSection('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Pricing
        if (pathname === '/pricing' || viewParam === 'pricing' || rawHash === 'pricing') {
          setCurrentView('pricing');
          setActiveSection('pricing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // About
        if (
          pathname === '/about' ||
          pathname === '/about-us' ||
          viewParam === 'about' ||
          rawHash === 'about' ||
          rawHash === 'about-us'
        ) {
          setCurrentView('about');
          setActiveSection('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Blog
        if (
          pathname === '/blog' ||
          pathname === '/guides' ||
          viewParam === 'blog' ||
          rawHash === 'blog' ||
          rawHash === 'guides'
        ) {
          setCurrentView('blog');
          setActiveSection('blog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // FAQ
        if (pathname === '/faq' || viewParam === 'faq' || rawHash === 'faq') {
          setCurrentView('faq');
          setActiveSection('faq');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Contact
        if (pathname === '/contact' || viewParam === 'contact' || rawHash === 'contact') {
          setCurrentView('contact');
          setActiveSection('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // PowerHouse Secret Admin Portal (/powerhouse)
        if (
          pathname === '/powerhouse' ||
          pathname === '/admin' ||
          viewParam === 'powerhouse' ||
          viewParam === 'admin' ||
          rawHash === 'powerhouse'
        ) {
          setCurrentView('powerhouse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Default or Home (/)
        setCurrentView('home');
        setActiveSection('home');
      } catch (err) {
        console.error('URL Routing error:', err);
        setCurrentView('home');
      }
    };

    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    return () => window.removeEventListener('popstate', handleUrlRouting);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('buypvagmail_cart', JSON.stringify(cart));
    } catch (e) {
      // Ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navigateToPage = (view: AppView, serviceId?: string, skipHistoryPush?: boolean) => {
    let targetUrl = '/';

    if (view === 'service-detail' && serviceId) {
      targetUrl = `/services/${encodeURIComponent(serviceId)}`;
      setSelectedServiceId(serviceId);
      setCurrentView('service-detail');
      setActiveSection('services');
    } else if (view === 'services-catalog') {
      targetUrl = '/services';
      setCurrentView('services-catalog');
      setActiveSection('services');
    } else if (view === 'pricing') {
      targetUrl = '/pricing';
      setCurrentView('pricing');
      setActiveSection('pricing');
    } else if (view === 'about') {
      targetUrl = '/about';
      setCurrentView('about');
      setActiveSection('about');
    } else if (view === 'blog') {
      targetUrl = '/blog';
      setCurrentView('blog');
      setActiveSection('blog');
    } else if (view === 'faq') {
      targetUrl = '/faq';
      setCurrentView('faq');
      setActiveSection('faq');
    } else if (view === 'contact') {
      targetUrl = '/contact';
      setCurrentView('contact');
      setActiveSection('contact');
    } else if (view === 'powerhouse') {
      targetUrl = '/powerhouse';
      setCurrentView('powerhouse');
    } else {
      targetUrl = '/';
      setCurrentView('home');
      setActiveSection('home');
    }

    if (!skipHistoryPush) {
      try {
        window.history.pushState({ view, serviceId }, '', targetUrl);
      } catch {
        // Ignore iframe security restriction if cross-origin
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: ServiceProduct, quantity: number) => {
    let discount = 0;
    if (quantity >= 500) discount = 0.30;
    else if (quantity >= 100) discount = 0.20;
    else if (quantity >= 50) discount = 0.15;
    else if (quantity >= 25) discount = 0.10;
    else if (quantity >= 10) discount = 0.05;

    const totalPrice = product.unitPrice * (1 - discount) * quantity;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        let newDiscount = 0;
        if (newQty >= 500) newDiscount = 0.30;
        else if (newQty >= 100) newDiscount = 0.20;
        else if (newQty >= 50) newDiscount = 0.15;
        else if (newQty >= 25) newDiscount = 0.10;
        else if (newQty >= 10) newDiscount = 0.05;

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: product.unitPrice * (1 - newDiscount) * newQty
        };
        return updated;
      } else {
        return [...prev, { product, quantity, totalPrice }];
      }
    });

    showToast(`Added ${quantity}x ${product.name} to your cart!`);
  };

  const handleQuickBuy = (product: ServiceProduct, quantity: number) => {
    setOrderModalProduct(product);
    setOrderModalQuantity(quantity);
    setIsOrderModalOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          let discount = 0;
          if (qty >= 500) discount = 0.30;
          else if (qty >= 100) discount = 0.20;
          else if (qty >= 50) discount = 0.15;
          else if (qty >= 25) discount = 0.10;
          else if (qty >= 10) discount = 0.05;

          return {
            ...item,
            quantity: qty,
            totalPrice: item.product.unitPrice * (1 - discount) * qty
          };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenOrderModal = (productId?: string) => {
    if (productId) {
      const found = servicesData.find((p) => p.id === productId);
      if (found) {
        setOrderModalProduct(found);
        setOrderModalQuantity(found.baseQuantity);
      }
    }
    setIsOrderModalOpen(true);
  };

  // If current view is Powerhouse Admin, render the dedicated secret admin panel without public headers/footers
  if (currentView === 'powerhouse') {
    return (
      <PowerhouseAdminPage 
        onNavigateHome={() => navigateToPage('home')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Top Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderModal={() => handleOpenOrderModal()}
        onOpenCheckerModal={() => setIsCheckerModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onNavigateToPage={(page, serviceId) => {
          navigateToPage(page as AppView, serviceId);
        }}
      />

      {/* Dynamic Page Router */}
      <main>
        {currentView === 'services-catalog' && (
          <ServicesCatalogPage
            onSelectServicePage={(id) => navigateToPage('service-detail', id)}
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onBackToCatalog={() => navigateToPage('services-catalog')}
            onSelectOtherService={(id) => navigateToPage('service-detail', id)}
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'pricing' && (
          <PricingPage
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onSelectServicePage={(id) => navigateToPage('service-detail', id)}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'about' && (
          <AboutUsPage
            onNavigateToServices={() => navigateToPage('services-catalog')}
            onNavigateToContact={() => navigateToPage('contact')}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage 
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'faq' && (
          <FaqPage
            onNavigateToContact={() => navigateToPage('contact')}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage 
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* Hero Banner */}
            <Hero
              onOrderClick={() => handleOpenOrderModal()}
              onExplorePricing={() => navigateToPage('pricing')}
              onOpenChecker={() => setIsCheckerModalOpen(true)}
            />

            {/* 6 Services Grid with Tier Calculators */}
            <ServicesSection
              onAddToCart={handleAddToCart}
              onQuickBuy={handleQuickBuy}
              onExploreServicePage={(serviceId) => navigateToPage('service-detail', serviceId)}
            />

            {/* Why 6,940+ Agencies Choose BuyPvaGmail */}
            <WhyChooseUs />

            {/* BuyPvaGmail.com vs Cheap VoIP Suppliers */}
            <ComparisonSection
              onOrderClick={() => handleOpenOrderModal()}
            />

            {/* Transparent Tiered Agency Rates */}
            <TieredPricing
              onOrderBatch={(product, qty) => {
                setOrderModalProduct(product);
                setOrderModalQuantity(qty);
                setIsOrderModalOpen(true);
              }}
            />

            {/* Trusted by Leaders in Digital Growth (Testimonials & Proof) */}
            <ReviewsSection />

            {/* Blog & 50+ Guides */}
            <GuidesSection />

            {/* FAQ */}
            <FaqSection />

            {/* Contact Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenOrderModal={handleOpenOrderModal}
        onOpenCheckerModal={() => setIsCheckerModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        onNavigateToPage={(page, serviceId) => {
          navigateToPage(page as AppView, serviceId);
        }}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Order & Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialProduct={orderModalProduct}
        initialQuantity={orderModalQuantity}
        cartItems={cart.length > 0 ? cart : []}
        onOrderSuccess={(order) => {
          setCart([]);
          try {
            localStorage.setItem('buypvagmail_last_order', JSON.stringify(order));
            addOrderToStore(order);
          } catch (e) {
            // ignore
          }
        }}
      />

      {/* Order Tracking & Delivery Progress Modal */}
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        onOpenChecker={() => {
          setIsTrackingModalOpen(false);
          setIsCheckerModalOpen(true);
        }}
      />

      {/* Account Syntax & 2FA Validator Modal */}
      <AccountCheckerModal
        isOpen={isCheckerModalOpen}
        onClose={() => setIsCheckerModalOpen(false)}
      />

      {/* 24/7 Live Support Bubble */}
      <LiveSupportWidget />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
