import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Tag, 
  Plus, 
  Minus 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) => {
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'BUYUSA15') {
      setDiscountPercent(0.15);
    } else {
      alert('Invalid coupon. Try code "BUYUSA15" for 15% OFF!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Account Cart</h3>
                <span className="text-xs text-slate-500">{cart.length} distinct service(s)</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Browse our USA aged and PVA accounts above and choose your desired quantity.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Explore Services
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.product.name}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">{item.product.age}</span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(item.product.baseQuantity, item.quantity - 2))}
                          className="w-6 h-6 bg-white rounded border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900">{item.quantity} pcs</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 2)}
                          className="w-6 h-6 bg-white rounded border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900">${item.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (BUYUSA15)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-bold text-slate-900"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-600 font-bold">✓ 15% discount applied!</p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount (15% OFF):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>Proceed to Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant automated delivery after payment</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
