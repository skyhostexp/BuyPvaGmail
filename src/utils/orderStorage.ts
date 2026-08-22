import { AdminOrder, OrderDetails } from '../types';

const STORAGE_KEY = 'buypvagmail_all_orders';

export const getStoredOrders = (): AdminOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => (b.createdAtTimestamp || 0) - (a.createdAtTimestamp || 0));
    }
    return [];
  } catch (err) {
    console.error('Error reading stored orders:', err);
    return [];
  }
};

export const saveStoredOrders = (orders: AdminOrder[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('buypva_orders_updated'));
    }
  } catch (err) {
    console.error('Error saving orders:', err);
  }
};

export const addOrderToStore = (order: OrderDetails | AdminOrder): AdminOrder => {
  const currentOrders = getStoredOrders();
  
  const adminOrder: AdminOrder = {
    ...order,
    status: order.status || 'delivered',
    paymentStatus: order.paymentStatus || 'confirmed',
    createdAtTimestamp: (order as AdminOrder).createdAtTimestamp || Date.now()
  };

  // Filter out duplicate orderId if exists
  const updated = [adminOrder, ...currentOrders.filter((o) => o.orderId !== adminOrder.orderId)];
  saveStoredOrders(updated);
  return adminOrder;
};

export const updateStoredOrder = (updatedOrder: AdminOrder): void => {
  const currentOrders = getStoredOrders();
  const index = currentOrders.findIndex((o) => o.orderId === updatedOrder.orderId);
  if (index !== -1) {
    currentOrders[index] = updatedOrder;
    saveStoredOrders(currentOrders);
  } else {
    saveStoredOrders([updatedOrder, ...currentOrders]);
  }
};

export const deleteStoredOrder = (orderId: string): void => {
  const currentOrders = getStoredOrders();
  const filtered = currentOrders.filter((o) => o.orderId !== orderId);
  saveStoredOrders(filtered);
};

export const clearAllStoredOrders = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('buypva_orders_updated'));
    }
  } catch (err) {
    console.error('Error clearing orders:', err);
  }
};

export const exportOrdersToCsv = (orders: AdminOrder[]): string => {
  const headers = [
    'Order ID',
    'Date',
    'Customer Name',
    'Email',
    'Telegram/WhatsApp',
    'Country',
    'Products',
    'Total Quantity',
    'Total USD',
    'Payment Method',
    'Payment Currency',
    'TxID / Hash',
    'Payment Status',
    'Fulfillment Status',
    'Delivered Accounts Count',
    'Order Notes'
  ];

  const rows = orders.map((o) => {
    const productsStr = (o.items || []).map((i) => `${i.product?.name || 'Product'} (x${i.quantity})`).join('; ');
    const totalQty = (o.items || []).reduce((acc, i) => acc + (i.quantity || 0), 0);
    const safeStr = (val?: string) => `"${(val || '').replace(/"/g, '""')}"`;
    const accountsCount = (o.deliveredAccounts || []).length;

    return [
      safeStr(o.orderId),
      safeStr(o.date),
      safeStr(o.customerName),
      safeStr(o.email),
      safeStr(o.telegramOrSkype || o.whatsapp),
      safeStr(o.country),
      safeStr(productsStr),
      totalQty,
      o.totalAmount,
      safeStr(o.paymentMethod),
      safeStr(o.cryptoCurrency),
      safeStr(o.txHash),
      safeStr(o.paymentStatus || 'confirmed'),
      safeStr(o.status),
      accountsCount,
      safeStr(o.orderNotes)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

