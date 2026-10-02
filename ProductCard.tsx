import React, { useState } from 'react';
import { Product } from '../../data/productsData';
import { useCart } from '../../context/CartContext';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article
      className="group bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-xs hover:shadow-card hover:border-[var(--primary-color)]/40 transition-all duration-200 flex flex-col justify-between"
      aria-labelledby={`product-title-${product.id}`}
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                product.badge === 'Bestseller'
                  ? 'bg-amber-500 text-white'
                  : product.badge === 'Sale'
                  ? 'bg-rose-500 text-white'
                  : product.badge === 'Staff Pick'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Quick View Overlay on hover */}
          <Link
            to={`/shop/product/${product.id}`}
            className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-bold text-white backdrop-blur-[2px]"
            aria-label={`View full details of ${product.title}`}
          >
            <span className="px-3.5 py-1.5 rounded-xl bg-white/90 text-slate-900 shadow-md flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Quick View</span>
            </span>
          </Link>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          {/* Metadata line: Category & Brand */}
          <div className="flex items-center justify-between text-xs text-[var(--muted-text-color)]">
            <span className="font-medium text-[var(--primary-color)]">{product.category}</span>
            <span className="text-[var(--subtle-text-color)] font-mono text-[11px]">{product.brand}</span>
          </div>

          {/* Title */}
          <h3
            id={`product-title-${product.id}`}
            className="text-sm sm:text-base font-bold text-[var(--heading-color)] leading-snug line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors"
          >
            <Link to={`/shop/product/${product.id}`} className="focus-visible:outline-none focus-visible:underline">
              {product.title}
            </Link>
          </h3>

          {/* Subtitle / Key spec snippet */}
          <p className="text-xs text-[var(--muted-text-color)] line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-500" aria-label={`Rating: ${product.rating.rate} out of 5 stars`}>
              <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span className="ml-1 font-bold text-[var(--heading-color)]">{product.rating.rate.toFixed(1)}</span>
            </div>
            <span className="text-[var(--subtle-text-color)] text-[11px]">({product.rating.count})</span>
            <span className="text-[var(--subtle-text-color)] text-[10px]">&bull;</span>
            <span
              className={`text-[11px] font-medium ${
                product.stock <= 5 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {product.stock <= 5 ? `Only ${product.stock} left` : 'In Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Price & Add to Cart button */}
      <div className="p-4 sm:p-5 pt-0 mt-2 border-t border-[var(--border-color)]/60 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-xl font-extrabold text-[var(--heading-color)] font-mono">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--subtle-text-color)] line-through font-mono">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[var(--muted-text-color)] block">Free Shipping $100+</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to={`/shop/product/${product.id}`}
            className="p-2.5 rounded-xl border border-[var(--border-color)] hover:bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
            title="View Details"
            aria-label={`View full specifications for ${product.title}`}
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock || product.stock === 0}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-white'
            }`}
            aria-label={`Add ${product.title} to shopping cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
