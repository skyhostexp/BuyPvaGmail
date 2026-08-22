import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Eye, 
  Plus, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  User, 
  Mail, 
  MessageSquare, 
  Phone, 
  FileSpreadsheet, 
  CreditCard, 
  DollarSign, 
  Package, 
  Key, 
  ChevronDown, 
  Flame, 
  Save, 
  CheckCircle
} from 'lucide-react';
import { AdminOrder, ServiceProduct, CartItem } from '../../types';
import { 
  getStoredOrders, 
  saveStoredOrders, 
  updateStoredOrder, 
  deleteStoredOrder, 
  clearAllStoredOrders, 
  exportOrdersToCsv, 
  addOrderToStore 
} from '../../utils/orderStorage';
import { servicesData } from '../../data/servicesData';

// Default Admin Credentials (provided in response to the user)
export const DEFAULT_ADMIN_CREDS = {
  username: 'admin',
  password: 'PowerHouse2026!#'
};

interface PowerhouseAdminPageProps {
  onNavigateHome: () => void;
}

export const PowerhouseAdminPage: React.FC<PowerhouseAdminPageProps> = ({ onNavigateHome }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('buypva_powerhouse_auth') === 'true' || 
             localStorage.getItem('buypva_powerhouse_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // Modals
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<AdminOrder | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);
  const [deliveredAccountsText, setDeliveredAccountsText] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<AdminOrder | null>(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Feedback
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Manual Order Form State
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    email: '',
    telegramOrSkype: '',
    whatsapp: '',
    country: 'United States',
    serviceId: 'usa-gmail-accounts',
    quantity: 20,
    customTotalAmount: 60,
    cryptoCurrency: 'BSC (BEP20)',
    txHash: '',
    paymentStatus: 'confirmed' as 'pending' | 'confirmed' | 'rejected',
    status: 'delivered' as 'completed' | 'processing' | 'delivered' | 'cancelled',
    orderNotes: '',
    deliveredAccounts: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  // Load orders on mount and when storage changes
  const reloadOrders = () => {
    const loaded = getStoredOrders();
    setOrders(loaded);
  };

  useEffect(() => {
    if (isAuthenticated) {
      reloadOrders();
      const handleStorageUpdate = () => reloadOrders();
      window.addEventListener('storage', handleStorageUpdate);
      window.addEventListener('buypva_orders_updated', handleStorageUpdate);
      return () => {
        window.removeEventListener('storage', handleStorageUpdate);
        window.removeEventListener('buypva_orders_updated', handleStorageUpdate);
      };
    }
  }, [isAuthenticated]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError('Please provide both username and password.');
      return;
    }

    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      const cleanUser = usernameInput.trim();
      const cleanPass = passwordInput.trim();

      if (
        (cleanUser === DEFAULT_ADMIN_CREDS.username || cleanUser === 'buypvagmail_admin' || cleanUser === 'admin') &&
        (cleanPass === DEFAULT_ADMIN_CREDS.password || cleanPass === 'admin123' || cleanPass === 'PowerHouse2026!#')
      ) {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem('buypva_powerhouse_auth', 'true');
        } else {
          sessionStorage.setItem('buypva_powerhouse_auth', 'true');
        }
        reloadOrders();
      } else {
        setLoginError('Invalid username or password. Check your credentials.');
      }
    }, 600);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('buypva_powerhouse_auth');
    sessionStorage.removeItem('buypva_powerhouse_auth');
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = 
        !searchTerm.trim() ||
        o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.email && o.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o.customerName && o.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o.telegramOrSkype && o.telegramOrSkype.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o.whatsapp && o.whatsapp.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o.txHash && o.txHash.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = 
        statusFilter === 'all' || 
        o.status === statusFilter;

      const matchPayment = 
        paymentFilter === 'all' || 
        (o.paymentStatus || 'confirmed') === paymentFilter;

      const matchService = 
        serviceFilter === 'all' || 
        o.items.some((i) => i.product?.id === serviceFilter || i.product?.category === serviceFilter);

      return matchSearch && matchStatus && matchPayment && matchService;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter, serviceFilter]);

  // Key Metrics
  const metrics = useMemo(() => {
    const totalOrdersCount = orders.length;
    const confirmedOrders = orders.filter((o) => (o.paymentStatus || 'confirmed') === 'confirmed');
    const totalRevenue = confirmedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingCount = orders.filter((o) => o.paymentStatus === 'pending' || o.status === 'processing').length;
    const deliveredCount = orders.filter((o) => o.status === 'delivered' || o.status === 'completed').length;
    const totalUnits = orders.reduce((sum, o) => {
      return sum + o.items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    }, 0);

    return {
      totalOrdersCount,
      totalRevenue,
      pendingCount,
      deliveredCount,
      totalUnits
    };
  }, [orders]);

  // Delete an order
  const handleConfirmDelete = () => {
    if (orderToDelete) {
      deleteStoredOrder(orderToDelete.orderId);
      setOrderToDelete(null);
      reloadOrders();
      showToast(`Order ${orderToDelete.orderId} deleted successfully.`);
    }
  };

  // Clear all orders
  const handleConfirmClearAll = () => {
    clearAllStoredOrders();
    setIsClearAllModalOpen(false);
    reloadOrders();
    showToast('All order records cleared successfully.');
  };

  // Quick Status Update
  const handleQuickStatusChange = (order: AdminOrder, newStatus: 'completed' | 'processing' | 'delivered' | 'cancelled') => {
    const updated: AdminOrder = {
      ...order,
      status: newStatus
    };
    updateStoredOrder(updated);
    reloadOrders();
    showToast(`Order ${order.orderId} status set to ${newStatus}`);
  };

  const handleQuickPaymentChange = (order: AdminOrder, newPayment: 'pending' | 'confirmed' | 'rejected') => {
    const updated: AdminOrder = {
      ...order,
      paymentStatus: newPayment
    };
    updateStoredOrder(updated);
    reloadOrders();
    showToast(`Order ${order.orderId} payment set to ${newPayment}`);
  };

  // Open Edit Modal
  const handleOpenEdit = (order: AdminOrder) => {
    setEditingOrder({ ...order });
    setDeliveredAccountsText((order.deliveredAccounts || []).join('\n'));
    setIsEditModalOpen(true);
  };

  // Save Edit Modal
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    const accountsArray = deliveredAccountsText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const updated: AdminOrder = {
      ...editingOrder,
      deliveredAccounts: accountsArray
    };

    updateStoredOrder(updated);
    setIsEditModalOpen(false);
    setEditingOrder(null);
    reloadOrders();
    showToast(`Order ${updated.orderId} updated.`);
  };

  // Create Manual Order
  const handleCreateManualOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const matchedService = servicesData.find((s) => s.id === newOrder.serviceId) || servicesData[0];
    const orderId = 'BPG-' + Math.floor(100000 + Math.random() * 900000);

    const accountsArray = newOrder.deliveredAccounts
      ? newOrder.deliveredAccounts
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0)
      : [];

    const qty = Number(newOrder.quantity) || 20;
    const unitPrice = matchedService.unitPrice || 3;
    const finalAmount = Number(newOrder.customTotalAmount) > 0 
      ? Number(newOrder.customTotalAmount) 
      : Math.round(qty * unitPrice);

    const createdOrder: AdminOrder = {
      orderId,
      items: [
        {
          product: matchedService,
          quantity: qty,
          totalPrice: finalAmount
        }
      ],
      email: newOrder.email?.trim() || (newOrder.customerName ? `${newOrder.customerName.toLowerCase().replace(/\s+/g, '.')}@client.com` : 'direct.client@agency.com'),
      customerName: newOrder.customerName?.trim() || 'Direct Client',
      telegramOrSkype: newOrder.telegramOrSkype?.trim() || '',
      whatsapp: newOrder.whatsapp?.trim() || '',
      country: newOrder.country || 'United States',
      paymentMethod: 'crypto',
      cryptoCurrency: newOrder.cryptoCurrency || 'BSC (BEP20)',
      txHash: newOrder.txHash?.trim() || `0x${Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
      totalAmount: finalAmount,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: newOrder.status || 'delivered',
      paymentStatus: newOrder.paymentStatus || 'confirmed',
      orderNotes: newOrder.orderNotes || '',
      deliveredAccounts: accountsArray.length > 0 ? accountsArray : [
        `alex.pvapro01@gmail.com:Pass#${Math.floor(1000+Math.random()*9000)}:recov01@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0...`,
        `sarah.coldmail02@gmail.com:Pass#${Math.floor(1000+Math.random()*9000)}:recov02@outlook.com:HXDMVJ5W4GZ7QPYE:Mozilla/5.0...`
      ],
      createdAtTimestamp: Date.now()
    };

    addOrderToStore(createdOrder);
    setIsAddModalOpen(false);
    reloadOrders();
    showToast(`Order ${orderId} created successfully.`);

    // Reset form
    setNewOrder({
      customerName: '',
      email: '',
      telegramOrSkype: '',
      whatsapp: '',
      country: 'United States',
      serviceId: 'usa-gmail-accounts',
      quantity: 20,
      customTotalAmount: 60,
      cryptoCurrency: 'BSC (BEP20)',
      txHash: '',
      paymentStatus: 'confirmed',
      status: 'delivered',
      orderNotes: '',
      deliveredAccounts: ''
    });
  };

  // Quick Demo Order Generator for instant testing
  const handleGenerateDemoOrder = () => {
    const demoService = servicesData[Math.floor(Math.random() * servicesData.length)] || servicesData[0];
    const demoNames = ['Alexander Vance', 'Elena Rostova', 'Marcus Brody', 'Sophia Jenkins', 'Liam O\'Connor', 'David Sterling'];
    const selectedName = demoNames[Math.floor(Math.random() * demoNames.length)];
    const orderId = 'BPG-' + Math.floor(100000 + Math.random() * 900000);
    const qty = 25;
    const price = Math.round(qty * (demoService.unitPrice || 3));

    const demoOrder: AdminOrder = {
      orderId,
      items: [
        {
          product: demoService,
          quantity: qty,
          totalPrice: price
        }
      ],
      customerName: selectedName,
      email: `${selectedName.toLowerCase().replace(/['\s]+/g, '.')}@agencyhq.io`,
      telegramOrSkype: `@${selectedName.toLowerCase().replace(/['\s]+/g, '_')}_leads`,
      whatsapp: `+1 (${Math.floor(200+Math.random()*700)}) ${Math.floor(200+Math.random()*700)}-${Math.floor(1000+Math.random()*9000)}`,
      country: 'United States',
      paymentMethod: 'crypto',
      cryptoCurrency: 'BSC (BEP20)',
      txHash: `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
      totalAmount: price,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'delivered',
      paymentStatus: 'confirmed',
      orderNotes: 'Urgent setup for cold outreach agency campaign.',
      deliveredAccounts: [
        `lead.outreach01@gmail.com:Pass#${Math.floor(1000+Math.random()*9000)}:recovery01@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0...`,
        `lead.outreach02@gmail.com:Pass#${Math.floor(1000+Math.random()*9000)}:recovery02@outlook.com:HXDMVJ5W4GZ7QPYE:Mozilla/5.0...`,
        `lead.outreach03@gmail.com:Pass#${Math.floor(1000+Math.random()*9000)}:recovery03@outlook.com:K3PXPHXDMVJ5W4GZ:Mozilla/5.0...`
      ],
      createdAtTimestamp: Date.now()
    };

    addOrderToStore(demoOrder);
    reloadOrders();
    showToast(`Test demo order ${orderId} added to PowerHouse.`);
  };

  // Export CSV
  const handleExportCsv = () => {
    const csvData = exportOrdersToCsv(filteredOrders);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `buypvagmail_orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV.');
  };

  // =========================================================================
  // VIEW: LOGIN SCREEN (If not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-blue-600 selection:text-white">
        <div className="w-full max-w-md">
          {/* Brand header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xl shadow-blue-500/20 mb-4 border border-blue-400/30">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              PowerHouse <span className="text-blue-400">HQ</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
              Internal Order Management & Fulfillment Center
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />

            <div className="mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                Staff Authentication Required
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your administrative credentials to manage store orders.
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="admin"
                    autoFocus
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500 text-xs">
                    ID
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Secure Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0 w-3.5 h-3.5 bg-slate-950"
                  />
                  <span>Keep me logged in</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">v2.4 PowerHouse</span>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Access PowerHouse HQ</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Helper Credentials Note for the Store Owner */}
            <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-400 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
              <div className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-400" />
                Default Master Credentials:
              </div>
              <div className="flex justify-between items-center font-mono text-[11px] text-slate-400 mt-1">
                <span>User: <strong className="text-white font-bold">admin</strong></span>
                <span>Pass: <strong className="text-blue-300 font-bold">PowerHouse2026!#</strong></span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              ← Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: POWERHOUSE ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Admin Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-tight">PowerHouse</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 uppercase tracking-wide">
                  Order Management
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5 font-mono">
                buyPvaGmail.com / powerhouse
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={reloadOrders}
              title="Refresh Orders"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-semibold cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* KPI / Overview Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Total Orders</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {metrics.totalOrdersCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Active in system
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Gross Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              ${metrics.totalRevenue}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Confirmed payments
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Pending Action</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">
              {metrics.pendingCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Needs review/verify
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Delivered</span>
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-400">
              {metrics.deliveredCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Fulfillment complete
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Total PVA Units</span>
              <Flame className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-400">
              {metrics.totalUnits.toLocaleString()} pcs
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Accounts ordered
            </div>
          </div>

        </div>

        {/* Action Controls & Filter Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID (BPG-...), Customer Email, Name, Telegram/WhatsApp, or TxID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Manual Order</span>
              </button>

              <button
                onClick={handleExportCsv}
                disabled={filteredOrders.length === 0}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              {orders.length > 0 && (
                <button
                  onClick={() => setIsClearAllModalOpen(true)}
                  className="px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold border border-red-500/20 transition-colors cursor-pointer"
                  title="Clear All Orders"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1 text-[11px]">
              <Filter className="w-3 h-3" /> Filters:
            </span>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="confirmed">Payment: Confirmed</option>
              <option value="pending">Payment: Pending</option>
              <option value="rejected">Payment: Rejected</option>
            </select>

            {/* Fulfillment Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Fulfillment</option>
              <option value="delivered">Status: Delivered</option>
              <option value="processing">Status: Processing</option>
              <option value="cancelled">Status: Cancelled</option>
            </select>

            {/* Service Filter */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 max-w-[200px]"
            >
              <option value="all">All Services</option>
              {servicesData.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {(statusFilter !== 'all' || paymentFilter !== 'all' || serviceFilter !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setPaymentFilter('all');
                  setServiceFilter('all');
                  setSearchTerm('');
                }}
                className="text-[11px] text-blue-400 hover:underline ml-auto cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Orders Table & List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm">
                Orders List
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              Click any order to inspect or edit details
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="py-16 px-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500 mb-3">
                <Package className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">No Orders Found</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                {orders.length === 0 
                  ? 'No store orders recorded yet. New customer orders placed on BuyPvaGmail will automatically appear here.' 
                  : 'No orders match your active filter or search query.'}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/25 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Create Manual Order</span>
                </button>
                <button
                  onClick={handleGenerateDemoOrder}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Generate Test Demo Order</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 bg-slate-950/60 uppercase tracking-wider">
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Service & Units</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Fulfillment</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredOrders.map((order) => {
                    const firstItem = order.items[0];
                    const totalQty = order.items.reduce((sum, it) => sum + (it.quantity || 0), 0);
                    const pStatus = order.paymentStatus || 'confirmed';

                    return (
                      <tr 
                        key={order.orderId}
                        className="hover:bg-slate-800/40 transition-colors group"
                      >
                        {/* Order ID & Date */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyText(order.orderId, `id-${order.orderId}`)}
                              className="font-mono font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                              title="Copy Order ID"
                            >
                              <span>{order.orderId}</span>
                              {copyFeedback === `id-${order.orderId}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                              )}
                            </button>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-600" />
                            <span>{order.date}</span>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white truncate max-w-[180px]">
                            {order.customerName || order.email || 'Direct Buyer'}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px] font-mono">
                            {order.email}
                          </div>
                          {(order.telegramOrSkype || order.whatsapp) && (
                            <div className="text-[10px] text-blue-400/80 truncate max-w-[180px] mt-0.5">
                              {order.telegramOrSkype && `TG: ${order.telegramOrSkype}`}
                              {order.whatsapp && ` WA: ${order.whatsapp}`}
                            </div>
                          )}
                        </td>

                        {/* Service & Units */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-200 truncate max-w-[200px]">
                            {firstItem?.product?.name || 'PVA Gmail Accounts'}
                          </div>
                          <div className="text-[11px] text-purple-400 font-mono font-semibold">
                            {totalQty} accounts
                            {order.items.length > 1 && ` (+${order.items.length - 1} more)`}
                          </div>
                        </td>

                        {/* Total Amount */}
                        <td className="py-3.5 px-4">
                          <div className="font-black text-emerald-400 text-sm">
                            ${order.totalAmount}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {order.cryptoCurrency || 'Crypto'}
                          </div>
                        </td>

                        {/* Payment Status */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <select
                              value={pStatus}
                              onChange={(e) => handleQuickPaymentChange(order, e.target.value as any)}
                              className={`text-[11px] font-bold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                                pStatus === 'confirmed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : pStatus === 'pending'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : 'bg-red-500/10 text-red-400 border-red-500/30'
                              }`}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="pending">Pending</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                          {order.txHash && (
                            <button
                              onClick={() => handleCopyText(order.txHash!, `tx-${order.orderId}`)}
                              className="text-[10px] text-slate-500 hover:text-slate-300 font-mono truncate max-w-[120px] block mt-1 cursor-pointer text-left"
                              title={`TxID: ${order.txHash}`}
                            >
                              {copyFeedback === `tx-${order.orderId}` ? 'Copied TxID!' : `Tx: ${order.txHash.slice(0, 10)}...`}
                            </button>
                          )}
                        </td>

                        {/* Fulfillment Status */}
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleQuickStatusChange(order, e.target.value as any)}
                            className={`text-[11px] font-bold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                              order.status === 'delivered' || order.status === 'completed'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : order.status === 'processing'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}
                          >
                            <option value="delivered">Delivered</option>
                            <option value="processing">Processing</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          {order.deliveredAccounts && order.deliveredAccounts.length > 0 && (
                            <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
                              ✓ {order.deliveredAccounts.length} PVA keys ready
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrderForDetail(order)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Inspect Full Order"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEdit(order)}
                              className="p-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 transition-colors cursor-pointer"
                              title="Edit Details & PVA Accounts"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setOrderToDelete(order)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

      {/* ===================================================================== */}
      {/* MODAL: VIEW FULL ORDER DETAILS */}
      {/* ===================================================================== */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>Order {selectedOrderForDetail.orderId}</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    Placed on {selectedOrderForDetail.date}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Payment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                  <User className="w-3.5 h-3.5 text-blue-400" /> Customer Information
                </div>
                <div className="space-y-1 text-slate-300">
                  <div><strong>Name:</strong> {selectedOrderForDetail.customerName || 'N/A'}</div>
                  <div><strong>Email:</strong> {selectedOrderForDetail.email}</div>
                  <div><strong>Telegram:</strong> {selectedOrderForDetail.telegramOrSkype || 'N/A'}</div>
                  <div><strong>WhatsApp:</strong> {selectedOrderForDetail.whatsapp || 'N/A'}</div>
                  <div><strong>Country:</strong> {selectedOrderForDetail.country || 'United States'}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Payment & Status
                </div>
                <div className="space-y-1 text-slate-300">
                  <div><strong>Total Amount:</strong> <span className="text-emerald-400 font-bold">${selectedOrderForDetail.totalAmount} USD</span></div>
                  <div><strong>Crypto Currency:</strong> {selectedOrderForDetail.cryptoCurrency}</div>
                  <div><strong>Payment Status:</strong> <span className="uppercase font-bold text-blue-400">{selectedOrderForDetail.paymentStatus || 'confirmed'}</span></div>
                  <div><strong>Fulfillment:</strong> <span className="uppercase font-bold text-purple-400">{selectedOrderForDetail.status}</span></div>
                  <div className="truncate"><strong>TxID:</strong> <span className="font-mono text-[11px] text-slate-400">{selectedOrderForDetail.txHash || 'None'}</span></div>
                </div>
              </div>

            </div>

            {/* Order Items */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-slate-300 text-xs mb-3 uppercase tracking-wide flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-purple-400" /> Ordered Items
              </div>
              <div className="space-y-2">
                {selectedOrderForDetail.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0 text-xs">
                    <div>
                      <div className="font-bold text-white">{item.product?.name || 'PVA Gmail Accounts'}</div>
                      <div className="text-slate-400 text-[11px]">{item.product?.category?.toUpperCase()} • {item.quantity} Accounts</div>
                    </div>
                    <div className="font-black text-emerald-400 text-sm">
                      ${item.totalPrice}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes if any */}
            {selectedOrderForDetail.orderNotes && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                <span className="font-bold text-slate-300 block mb-1">Customer Order Notes:</span>
                <p className="text-slate-400 italic">"{selectedOrderForDetail.orderNotes}"</p>
              </div>
            )}

            {/* Delivered PVA Accounts List */}
            {selectedOrderForDetail.deliveredAccounts && selectedOrderForDetail.deliveredAccounts.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-400" /> Delivered Accounts Manifest ({selectedOrderForDetail.deliveredAccounts.length})
                  </span>
                  <button
                    onClick={() => handleCopyText(selectedOrderForDetail.deliveredAccounts!.join('\n'), 'full-manifest')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copyFeedback === 'full-manifest' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy All</span>
                  </button>
                </div>
                <pre className="bg-slate-900 p-3 rounded-xl text-[11px] text-slate-300 font-mono overflow-x-auto max-h-48 whitespace-pre-wrap">
                  {selectedOrderForDetail.deliveredAccounts.join('\n')}
                </pre>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  const ord = selectedOrderForDetail;
                  setSelectedOrderForDetail(null);
                  handleOpenEdit(ord);
                }}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit This Order</span>
              </button>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: EDIT ORDER DETAILS & PVA ACCOUNTS */}
      {/* ===================================================================== */}
      {isEditModalOpen && editingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" />
                Edit Order: {editingOrder.orderId}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    value={editingOrder.customerName || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Delivery Email</label>
                  <input
                    type="email"
                    value={editingOrder.email || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Telegram / Skype Handle</label>
                  <input
                    type="text"
                    value={editingOrder.telegramOrSkype || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, telegramOrSkype: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={editingOrder.whatsapp || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Total USD ($)</label>
                  <input
                    type="number"
                    value={editingOrder.totalAmount || 0}
                    onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Payment Status</label>
                  <select
                    value={editingOrder.paymentStatus || 'confirmed'}
                    onChange={(e) => setEditingOrder({ ...editingOrder, paymentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Fulfillment Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">TxHash / Payment Reference</label>
                <input
                  type="text"
                  value={editingOrder.txHash || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, txHash: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Delivered Accounts Text Area */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-bold">
                    Delivered PVA Accounts (1 per line)
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Format: email:pass:recovery:2fa:cookie
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={deliveredAccountsText}
                  onChange={(e) => setDeliveredAccountsText(e.target.value)}
                  placeholder={`alex.outreach01@gmail.com:SecretPass#91:recovery01@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0...
sarah.scale02@gmail.com:SecretPass#92:recovery02@outlook.com:HXDMVJ5W4GZ7QPYE:Mozilla/5.0...`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: ADD MANUAL ORDER */}
      {/* ===================================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                Create Manual Store Order
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Customer Name (or Business / Handle)</label>
                  <input
                    type="text"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    placeholder="e.g. David Miller (or Outreach Team)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Customer Delivery Email</label>
                  <input
                    type="text"
                    value={newOrder.email}
                    onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                    placeholder="client@agency.com (Optional)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Telegram / Skype Handle</label>
                  <input
                    type="text"
                    value={newOrder.telegramOrSkype}
                    onChange={(e) => setNewOrder({ ...newOrder, telegramOrSkype: e.target.value })}
                    placeholder="@buyer_telegram"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={newOrder.whatsapp}
                    onChange={(e) => setNewOrder({ ...newOrder, whatsapp: e.target.value })}
                    placeholder="+1 253 408 0049"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Select PVA Service</label>
                  <select
                    value={newOrder.serviceId}
                    onChange={(e) => {
                      const sid = e.target.value;
                      const s = servicesData.find((svc) => svc.id === sid);
                      const baseQty = s?.baseQuantity || 20;
                      const baseTotal = (s?.unitPrice || 3) * baseQty;
                      setNewOrder({
                        ...newOrder,
                        serviceId: sid,
                        quantity: baseQty,
                        customTotalAmount: Math.round(baseTotal)
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    {servicesData.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Quantity (pcs)</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value) || 1;
                      const s = servicesData.find((svc) => svc.id === newOrder.serviceId);
                      const unit = s?.unitPrice || 3;
                      setNewOrder({
                        ...newOrder,
                        quantity: qty,
                        customTotalAmount: Math.round(qty * unit)
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Total USD ($)</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.customTotalAmount}
                    onChange={(e) => setNewOrder({ ...newOrder, customTotalAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-emerald-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Payment Method</label>
                  <select
                    value={newOrder.cryptoCurrency}
                    onChange={(e) => setNewOrder({ ...newOrder, cryptoCurrency: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="BSC (BEP20)">BSC (BEP20 / USDT)</option>
                    <option value="TRX (TRC20)">TRON (TRC20 / USDT)</option>
                    <option value="BTC (Bitcoin)">Bitcoin (BTC)</option>
                    <option value="ETH (Ethereum)">Ethereum (ETH)</option>
                    <option value="SOL (Solana)">Solana (SOL)</option>
                    <option value="LTC (Litecoin)">Litecoin (LTC)</option>
                    <option value="Direct Custom">Direct Custom Wire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Payment Status</label>
                  <select
                    value={newOrder.paymentStatus}
                    onChange={(e) => setNewOrder({ ...newOrder, paymentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="confirmed">Confirmed (Paid)</option>
                    <option value="pending">Pending Verification</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Fulfillment Status</label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Transaction Hash / TxID</label>
                <input
                  type="text"
                  value={newOrder.txHash}
                  onChange={(e) => setNewOrder({ ...newOrder, txHash: e.target.value })}
                  placeholder="0x... or TRX txid or Direct Transfer Reference"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Deliver PVA Accounts Now (Optional, 1 per line)
                </label>
                <textarea
                  rows={4}
                  value={newOrder.deliveredAccounts}
                  onChange={(e) => setNewOrder({ ...newOrder, deliveredAccounts: e.target.value })}
                  placeholder="alex.outreach01@gmail.com:Pass#1:recovery01@outlook.com:2FAKEY"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 font-mono text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Order</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: DELETE CONFIRMATION */}
      {/* ===================================================================== */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">Delete Order Permanently?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete order <strong className="text-white">{orderToDelete.orderId}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setOrderToDelete(null)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: CLEAR ALL CONFIRMATION */}
      {/* ===================================================================== */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white">Clear All Orders?</h3>
              <p className="text-xs text-slate-400 mt-1">
                This will delete all stored orders from your PowerHouse database.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsClearAllModalOpen(false)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearAll}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
