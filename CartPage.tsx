import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CreditCard,
  X,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
    appliedPromo,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback({ message: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    clearCart();
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-10 sm:p-16 text-center space-y-6 max-w-xl mx-auto my-8 shadow-xs animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-[var(--surface-subtle)] text-[var(--subtle-text-color)] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--heading-color)]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-[var(--muted-text-color)] max-w-md mx-auto">
            You haven&apos;t added any developer hardware, AI coprocessors, or engineering equipment to your cart yet.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary-color)] text-white text-sm font-bold hover:bg-[var(--primary-hover)] transition-all shadow-md"
          >
            <span>Explore Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in" id="cart-view-container">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--heading-color)] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-text-color)] mt-1">
            Review your selected developer items, update quantities, or apply academic promotional discounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-color)] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-[var(--subtle-text-color)] hover:text-rose-500 transition-colors p-1"
          >
            Clear Entire Cart
          </button>
        </div>
      </div>

      {/* 2. Main Cart Layout: Items List (2/3) + Order Summary (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Cart Items List */}
        <section aria-label="Cart items" className="lg:col-span-2 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <Link to={`/shop/product/${product.id}`} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 border border-[var(--border-color)]"
                    loading="lazy"
                  />
                </Link>

                <div className="min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary-color)]">
                    {product.category}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-[var(--heading-color)] leading-snug truncate">
                    <Link to={`/shop/product/${product.id}`} className="hover:underline">
                      {product.title}
                    </Link>
                  </h2>
                  <p className="text-xs font-mono font-bold text-[var(--heading-color)]">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              {/* Quantity controls and item total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--border-color)]">
                {/* Quantity picker */}
                <div className="inline-flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--background-color)]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-2.5 py-1 text-sm font-bold text-[var(--muted-text-color)] hover:text-[var(--heading-color)]"
                    aria-label={`Decrease quantity of ${product.title}`}
                  >
                    &minus;
                  </button>
                  <span className="px-2 py-1 text-xs font-mono font-bold text-[var(--heading-color)] min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-2.5 py-1 text-sm font-bold text-[var(--muted-text-color)] hover:text-[var(--heading-color)]"
                    disabled={quantity >= product.stock}
                    aria-label={`Increase quantity of ${product.title}`}
                  >
                    &#43;
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[5rem]">
                  <span className="text-sm font-mono font-bold text-[var(--heading-color)] block">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-[var(--subtle-text-color)] hover:text-rose-500 rounded-lg transition-colors"
                  aria-label={`Remove ${product.title} from cart`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}

          {/* Academic / Student Promo Callout */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3 text-xs text-[var(--muted-text-color)]">
            <Sparkles className="w-4 h-4 text-[var(--primary-color)] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[var(--heading-color)]">Educational Discount Coupons Available:</span>
              <p className="mt-0.5">
                Use code <code className="font-mono font-bold text-[var(--primary-color)]">CAPSTONE20</code> for 20% off, <code className="font-mono font-bold text-[var(--primary-color)]">STUDENT</code> for 15% off, or <code className="font-mono font-bold text-[var(--primary-color)]">DEAL10</code> for 10% off.
              </p>
            </div>
          </div>
        </section>

        {/* Order Summary Column */}
        <aside aria-label="Order Summary" className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-[var(--heading-color)] border-b border-[var(--border-color)] pb-3">
            Order Summary ({totalItems} item{totalItems === 1 ? '' : 's'})
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-[var(--muted-text-color)]">
              <span>Items Subtotal</span>
              <span className="font-mono font-medium text-[var(--heading-color)]">${subtotal.toFixed(2)}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Promo ({appliedPromo})
                </span>
                <span className="font-mono">-${promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-[var(--muted-text-color)]">
              <span>Estimated Shipping</span>
              <span className="font-mono font-medium text-[var(--heading-color)]">
                {shipping === 0 ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-[var(--muted-text-color)]">
              <span>Sales Tax (8.25%)</span>
              <span className="font-mono font-medium text-[var(--heading-color)]">${tax.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-between text-base font-extrabold text-[var(--heading-color)]">
              <span>Estimated Total</span>
              <span className="font-mono text-xl text-[var(--primary-color)]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-[var(--border-color)]">
            <label htmlFor="promo-input" className="block text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider">
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                id="promo-input"
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="e.g. CAPSTONE20"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--background-color)] uppercase tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--surface-subtle)] hover:bg-[var(--border-color)] text-[var(--heading-color)] font-bold text-xs rounded-xl border border-[var(--border-color)] transition-colors"
              >
                Apply
              </button>
            </div>
            {promoFeedback && (
              <p className={`text-xs ${promoFeedback.isError ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400 font-semibold'}`}>
                {promoFeedback.message}
              </p>
            )}
            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 pt-1">
                <span>Code active: <strong>{appliedPromo}</strong></span>
                <button type="button" onClick={removePromoCode} className="text-xs text-rose-500 hover:underline">
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Checkout CTA */}
          <button
            type="button"
            onClick={() => setCheckoutModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
          >
            <CreditCard className="w-4 h-4" />
            <span>Proceed to Checkout &bull; ${total.toFixed(2)}</span>
          </button>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[var(--subtle-text-color)]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              256-Bit SSL
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              Dispatched in 24h
            </span>
          </div>
        </aside>
      </div>

      {/* 3. Checkout Simulation Modal */}
      {checkoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
        >
          <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 id="checkout-modal-title" className="text-lg font-bold text-[var(--heading-color)] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--primary-color)]" />
                <span>Simulated Express Checkout</span>
              </h3>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1 rounded-lg text-[var(--muted-text-color)] hover:text-[var(--heading-color)]"
                aria-label="Close checkout modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--heading-color)] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Alex"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--background-color)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--heading-color)] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Vance"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--background-color)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--heading-color)] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  defaultValue="developer@engineering.edu"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--background-color)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--heading-color)] mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  defaultValue="742 Evergreen Terrace, Innovation Park"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--background-color)]"
                />
              </div>

              <div className="p-3 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-color)] text-xs space-y-1">
                <div className="flex justify-between text-[var(--muted-text-color)]">
                  <span>Grand Total to Authorize:</span>
                  <strong className="text-[var(--heading-color)] font-mono text-sm">${total.toFixed(2)}</strong>
                </div>
                <p className="text-[11px] text-[var(--subtle-text-color)]">
                  Demo sandbox mode &bull; No actual credit card charge will occur.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-[var(--border-color)] text-xs font-bold text-[var(--muted-text-color)] hover:bg-[var(--surface-subtle)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[var(--primary-color)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] shadow-xs"
                >
                  Confirm &amp; Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Order Confirmation State */}
      {orderComplete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
        >
          <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[var(--heading-color)]">Order Confirmed!</h2>
              <p className="text-xs text-[var(--muted-text-color)]">
                Thank you for your purchase. Your developer hardware has been scheduled for dispatch.
              </p>
              <div className="p-3 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-color)] font-mono text-xs text-[var(--heading-color)]">
                Order ID: #ENG-{(Math.random() * 900000 + 100000).toFixed(0)}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/shop"
                onClick={() => setOrderComplete(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[var(--primary-color)] text-white text-xs font-bold hover:bg-[var(--primary-hover)]"
              >
                <span>Return to Shop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
