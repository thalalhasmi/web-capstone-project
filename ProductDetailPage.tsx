import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_CATALOG, Product } from '../data/productsData';
import { useCart } from '../context/CartContext';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  PackageOpen,
} from 'lucide-react';
import { ProductCard } from '../components/shop/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [justAdded, setJustAdded] = useState(false);

  // Find product by id
  const product: Product | undefined = PRODUCTS_CATALOG.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
      document.title = `${product.title} — E-Commerce Shop | Thalal Hasmi`;
    }
  }, [product, id]);

  // Handle product not found
  if (!product) {
    return (
      <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-12 text-center space-y-6 max-w-2xl mx-auto my-12 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
          <PackageOpen className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[var(--heading-color)]">Product Not Found</h1>
          <p className="text-sm text-[var(--muted-text-color)]">
            The requested item with identifier <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--primary-color)]">#{id}</code> does not exist in our current product catalog.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary-color)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Product Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related products from same category or general catalog
  const relatedProducts = PRODUCTS_CATALOG.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in" id="product-detail-view">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[var(--muted-text-color)]">
        <Link to="/" className="hover:text-[var(--primary-color)] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[var(--subtle-text-color)]" />
        <Link to="/shop" className="hover:text-[var(--primary-color)] transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[var(--subtle-text-color)]" />
        <span className="text-[var(--subtle-text-color)]">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-[var(--subtle-text-color)]" />
        <span className="font-semibold text-[var(--heading-color)] truncate max-w-[200px] sm:max-w-md">
          {product.title}
        </span>
      </nav>

      {/* 2. Main Product Showcase Grid */}
      <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Gallery Column */}
        <div className="space-y-4">
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-[var(--border-color)]">
            <img
              src={selectedImage || product.image}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-[var(--primary-color)] text-white shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2" role="group" aria-label="Image gallery thumbnails">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === imgUrl
                      ? 'border-[var(--primary-color)] shadow-xs scale-105'
                      : 'border-[var(--border-color)] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1} of ${product.title}`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Meta & Purchase Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-color)]">
                {product.category}
              </span>
              <span className="text-xs font-mono text-[var(--subtle-text-color)]">Brand: {product.brand}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--heading-color)] tracking-tight">
              {product.title}
            </h1>

            <p className="text-sm text-[var(--muted-text-color)] leading-relaxed">
              {product.subtitle}
            </p>

            {/* Rating & Availability */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span className="ml-1 font-bold text-[var(--heading-color)]">{product.rating.rate}</span>
                </div>
                <span className="text-[var(--muted-text-color)]">({product.rating.count} customer reviews)</span>
              </div>

              <span className="text-[var(--subtle-text-color)]">&bull;</span>

              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  product.stock > 0
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                }`}
              >
                {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-[var(--surface-subtle)] rounded-2xl border border-[var(--border-color)] flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-[var(--heading-color)] font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[var(--subtle-text-color)] line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)]">
              Overview
            </h2>
            <p className="text-sm text-[var(--muted-text-color)] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity & Purchase Action */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label htmlFor="product-qty-select" className="text-xs font-bold text-[var(--heading-color)]">
                Quantity:
              </label>
              <div className="inline-flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--background-color)]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-sm font-bold text-[var(--muted-text-color)] hover:text-[var(--heading-color)]"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="px-3 py-2 text-xs font-mono font-bold text-[var(--heading-color)] min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-sm font-bold text-[var(--muted-text-color)] hover:text-[var(--heading-color)]"
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>
              <span className="text-xs text-[var(--muted-text-color)]">
                Subtotal: <strong className="font-mono text-[var(--heading-color)]">${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock || product.stock === 0}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${
                  justAdded
                    ? 'bg-emerald-600'
                    : 'bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Shopping Cart</span>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-[var(--heading-color)] bg-[var(--surface-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] transition-colors"
              >
                <span>View Cart &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Guarantees & Perks */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--muted-text-color)]">
            <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)]">
              <Truck className="w-4 h-4 text-[var(--primary-color)] mx-auto mb-1" />
              <span className="font-semibold block text-[var(--heading-color)]">Fast Delivery</span>
              <span className="text-[10px]">2-4 business days</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)]">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="font-semibold block text-[var(--heading-color)]">1-Yr Warranty</span>
              <span className="text-[10px]">Direct manufacturer</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)]">
              <RotateCcw className="w-4 h-4 text-sky-500 mx-auto mb-1" />
              <span className="font-semibold block text-[var(--heading-color)]">30-Day Return</span>
              <span className="text-[10px]">Hassle-free refund</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Specifications & Features Tabs */}
      <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <h2 className="text-xl font-bold text-[var(--heading-color)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--primary-color)]" aria-hidden="true" />
            <span>Key Engineering Features</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--muted-text-color)]">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-color)]">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specs Table */}
        <div>
          <h2 className="text-xl font-bold text-[var(--heading-color)] mb-4">
            Hardware &amp; System Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse border border-[var(--border-color)] rounded-xl overflow-hidden">
              <tbody>
                {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                  <tr
                    key={specKey}
                    className={`border-b border-[var(--border-color)] ${
                      idx % 2 === 0 ? 'bg-[var(--surface-subtle)]/60' : 'bg-[var(--surface-color)]'
                    }`}
                  >
                    <th scope="row" className="px-4 py-3 font-semibold text-[var(--heading-color)] w-1/3">
                      {specKey}
                    </th>
                    <td className="px-4 py-3 text-[var(--muted-text-color)] font-mono">
                      {specVal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Related Recommendations */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-products-title" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="related-products-title" className="text-2xl font-bold text-[var(--heading-color)]">
              Frequently Explored Together
            </h2>
            <Link to="/shop" className="text-xs font-bold text-[var(--primary-color)] hover:underline">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Back button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </button>
      </div>
    </div>
  );
};
