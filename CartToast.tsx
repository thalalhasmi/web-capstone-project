import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartToast: React.FC = () => {
  const { lastAddedProduct, dismissToast, totalItems } = useCart();

  useEffect(() => {
    if (!lastAddedProduct) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [lastAddedProduct, dismissToast]);

  if (!lastAddedProduct) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl shadow-xl p-4 animate-fade-in flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--heading-color)]">Added to Cart</p>
            <p className="text-[11px] text-[var(--muted-text-color)]">{totalItems} item{totalItems === 1 ? '' : 's'} currently in cart</p>
          </div>
        </div>

        <button
          type="button"
          onClick={dismissToast}
          className="text-[var(--subtle-text-color)] hover:text-[var(--heading-color)] p-1 rounded-lg transition-colors"
          aria-label="Dismiss cart notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 p-2 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-color)]">
        <img
          src={lastAddedProduct.image}
          alt={lastAddedProduct.title}
          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-[var(--heading-color)] truncate">{lastAddedProduct.title}</h4>
          <p className="text-xs font-mono font-semibold text-[var(--primary-color)] mt-0.5">
            ${lastAddedProduct.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Link
          to="/cart"
          onClick={dismissToast}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] rounded-xl transition-colors shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={dismissToast}
          className="py-2 px-3 text-xs font-medium text-[var(--muted-text-color)] hover:text-[var(--heading-color)] rounded-xl border border-[var(--border-color)] hover:bg-[var(--surface-subtle)] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </aside>
  );
};
