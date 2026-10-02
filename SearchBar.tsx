import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by keyword, product name, brand, or specifications...',
  totalResults,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--subtle-text-color)]">
        <Search className="w-4 h-4" aria-hidden="true" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-24 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-color)] placeholder-[var(--placeholder-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-sm shadow-xs transition-all"
        aria-label="Search product catalog"
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 rounded-md text-[var(--subtle-text-color)] hover:text-[var(--heading-color)] transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <span className="hidden sm:inline-block text-[11px] font-mono text-[var(--subtle-text-color)] bg-[var(--surface-subtle)] px-2 py-0.5 rounded border border-[var(--border-color)]">
          {totalResults} results
        </span>
      </div>
    </div>
  );
};
