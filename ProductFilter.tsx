import React from 'react';
import { PRODUCT_CATEGORIES, ProductCategory } from '../../data/productsData';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export interface FilterState {
  category: ProductCategory;
  searchQuery: string;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';
}

interface ProductFilterProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalFilteredCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalFilteredCount,
}) => {
  return (
    <aside
      aria-label="Product filters and sorting"
      className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-xs space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
          <h2 className="text-sm font-bold text-[var(--heading-color)] uppercase tracking-wider">
            Refine Catalog
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-[var(--muted-text-color)] hover:text-rose-500 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded p-1"
          title="Reset all filter criteria"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Category Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)]">
          Department
        </label>
        <div className="space-y-1">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange({ category: cat })}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[var(--primary-subtle)] text-[var(--primary-color)] font-bold'
                    : 'text-[var(--muted-text-color)] hover:bg-[var(--surface-subtle)] hover:text-[var(--heading-color)]'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--primary-color)]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sort By */}
      <div className="space-y-2">
        <label htmlFor="shop-sort-select" className="block text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)]">
          Sort Order
        </label>
        <select
          id="shop-sort-select"
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-color)] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        >
          <option value="featured">Featured Recommendations</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Customer Rating</option>
          <option value="name">Alphabetical (A - Z)</option>
        </select>
      </div>

      {/* 3. Max Price Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-[var(--subtle-text-color)]">Max Budget</span>
          <span className="font-mono font-bold text-[var(--primary-color)]">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="40"
          max="600"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[var(--primary-color)] cursor-pointer"
          aria-label="Filter by maximum price"
        />
        <div className="flex justify-between text-[10px] text-[var(--subtle-text-color)] font-mono">
          <span>$40</span>
          <span>$300</span>
          <span>$600+</span>
        </div>
      </div>

      {/* 4. Minimum Rating */}
      <div className="space-y-2">
        <label htmlFor="rating-filter-select" className="block text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)]">
          Minimum Rating
        </label>
        <select
          id="rating-filter-select"
          value={filters.minRating}
          onChange={(e) => onChange({ minRating: Number(e.target.value) })}
          className="w-full px-3 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-color)] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        >
          <option value="0">All Ratings</option>
          <option value="4.5">★ 4.5 &amp; Above</option>
          <option value="4.8">★ 4.8 &amp; Above (Top Rated)</option>
        </select>
      </div>

      {/* 5. In-Stock Only Toggle */}
      <div className="pt-2 border-t border-[var(--border-color)]">
        <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-[var(--heading-color)]">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[var(--primary-color)] focus:ring-[var(--primary-color)] accent-[var(--primary-color)] cursor-pointer"
          />
          <span>In-Stock Items Only</span>
        </label>
      </div>

      {/* Active Count Badge */}
      <div className="pt-3 border-t border-[var(--border-color)] text-center text-xs text-[var(--muted-text-color)]">
        Showing <strong className="text-[var(--heading-color)]">{totalFilteredCount}</strong> matching items
      </div>
    </aside>
  );
};
