import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS_CATALOG, Product, ProductCategory } from '../data/productsData';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductFilter, FilterState } from '../components/shop/ProductFilter';
import { SearchBar } from '../components/shop/SearchBar';
import {
  ShoppingBag,
  SlidersHorizontal,
  X,
  PackageSearch,
  Sparkles,
  RefreshCw,
  ArrowUpDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_CATALOG);
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const initialFilters: FilterState = {
    category: 'All Categories',
    searchQuery: '',
    maxPrice: 600,
    minRating: 0,
    inStockOnly: false,
    sortBy: 'featured',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (filters.category !== 'All Categories' && product.category !== filters.category) {
          return false;
        }
        // Price
        if (product.price > filters.maxPrice) {
          return false;
        }
        // Rating
        if (product.rating.rate < filters.minRating) {
          return false;
        }
        // In-stock
        if (filters.inStockOnly && (!product.inStock || product.stock === 0)) {
          return false;
        }
        // Search Query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchSubtitle = product.subtitle.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          return matchTitle || matchSubtitle || matchDesc || matchBrand || matchCategory;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating.rate - a.rating.rate;
        if (filters.sortBy === 'name') return a.title.localeCompare(b.title);
        // default featured: preserve original catalog priority
        return Number(a.id) - Number(b.id);
      });
  }, [products, filters]);

  const updateFilters = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in" id="shop-catalog-main">
      {/* 1. Header Banner */}
      <section className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary-subtle)] text-[var(--primary-color)] border border-[var(--primary-light)]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Web Development Capstone Project &bull; E-Commerce Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--heading-color)] tracking-tight">
            Developer Hardware &amp; AI Gear
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted-text-color)] leading-relaxed">
            A production-ready e-commerce catalog featuring modular architecture, client-side React Router navigation, real-time cart state management with <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--primary-color)]">localStorage</code> persistence, multi-criteria filtering, and accessible UI.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-[var(--muted-text-color)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
              12 Curated Engineering Products
            </span>
            <span>&bull;</span>
            <span>Instant Client-Side Filtering</span>
            <span>&bull;</span>
            <Link to="/cart" className="text-[var(--primary-color)] hover:underline font-bold inline-flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart &amp; Checkout System &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Search & Mobile Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:flex-1">
          <SearchBar
            value={filters.searchQuery}
            onChange={(q) => updateFilters({ searchQuery: q })}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-xs font-bold text-[var(--heading-color)] shadow-xs hover:bg-[var(--surface-subtle)] transition-colors"
            aria-label="Open filter menu"
          >
            <SlidersHorizontal className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Filters ({filters.category !== 'All Categories' || filters.inStockOnly || filters.minRating > 0 ? 'Active' : 'All'})</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--muted-text-color)] bg-[var(--surface-color)] px-3 py-2.5 rounded-xl border border-[var(--border-color)] shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--subtle-text-color)]" />
            <select
              aria-label="Sort product catalog"
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="bg-transparent border-none text-xs font-medium text-[var(--heading-color)] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Catalog Layout: Sidebar Filters + 2D CSS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filter (Sticky) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <ProductFilter
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            totalFilteredCount={filteredProducts.length}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips / Reset indicators */}
          {(filters.category !== 'All Categories' || filters.searchQuery || filters.inStockOnly || filters.minRating > 0) && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-color)] text-xs">
              <span className="font-bold text-[var(--muted-text-color)]">Active Filters:</span>
              {filters.category !== 'All Categories' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--heading-color)] font-medium">
                  {filters.category}
                  <button type="button" onClick={() => updateFilters({ category: 'All Categories' })} aria-label="Remove category filter">
                    <X className="w-3 h-3 hover:text-rose-500" />
                  </button>
                </span>
              )}
              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--heading-color)] font-medium">
                  Search: &ldquo;{filters.searchQuery}&rdquo;
                  <button type="button" onClick={() => updateFilters({ searchQuery: '' })} aria-label="Clear search term">
                    <X className="w-3 h-3 hover:text-rose-500" />
                  </button>
                </span>
              )}
              {filters.inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--heading-color)] font-medium">
                  In-Stock Only
                  <button type="button" onClick={() => updateFilters({ inStockOnly: false })} aria-label="Allow out of stock">
                    <X className="w-3 h-3 hover:text-rose-500" />
                  </button>
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--heading-color)] font-medium">
                  ★ {filters.minRating}+
                  <button type="button" onClick={() => updateFilters({ minRating: 0 })} aria-label="Reset rating filter">
                    <X className="w-3 h-3 hover:text-rose-500" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[var(--primary-color)] hover:underline font-bold ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-[var(--surface-subtle)] text-[var(--subtle-text-color)] flex items-center justify-center mx-auto">
                <PackageSearch className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-[var(--heading-color)]">No Products Match Your Criteria</h3>
              <p className="text-sm text-[var(--muted-text-color)] max-w-md mx-auto">
                We could not find any products matching your current combination of search terms, category filters, and price limits.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-color)] text-white text-xs font-bold rounded-xl hover:bg-[var(--primary-hover)] transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Mobile Filter Modal / Drawer */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-md bg-[var(--surface-color)] h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <h3 id="mobile-filter-title" className="text-base font-bold text-[var(--heading-color)]">
                  Filter Catalog
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-[var(--muted-text-color)] hover:text-[var(--heading-color)]"
                  aria-label="Close filter menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilter
                filters={filters}
                onChange={updateFilters}
                onReset={resetFilters}
                totalFilteredCount={filteredProducts.length}
              />
            </div>

            <div className="pt-6 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[var(--primary-color)] text-white text-sm font-bold rounded-xl shadow-xs"
              >
                View {filteredProducts.length} Matching Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
