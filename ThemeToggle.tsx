import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle, className = '' }) => {
  return (
    <button
      id="theme-mode-toggle-button"
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light color theme' : 'Switch to dark color theme'}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-color)] hover:bg-[var(--background-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 rotate-0 hover:-rotate-12" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isDark ? 'Currently dark theme. Click for light theme.' : 'Currently light theme. Click for dark theme.'}
      </span>
    </button>
  );
};
