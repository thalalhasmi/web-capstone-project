import React from 'react';

interface SkipLinkProps {
  onSkipToMain?: () => void;
  onSkipToNav?: () => void;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ onSkipToMain, onSkipToNav }) => {
  return (
    <div className="relative z-50">
      <a
        href="#main-content"
        id="skip-to-content"
        onClick={() => {
          if (onSkipToMain) {
            onSkipToMain();
          }
          const main = document.getElementById('main-content');
          if (main) {
            main.focus();
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:bg-[var(--primary-color)] focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
      >
        Skip to main content
      </a>
      <a
        href="#primary-navigation"
        id="skip-to-navigation"
        onClick={() => {
          if (onSkipToNav) {
            onSkipToNav();
          }
          const nav = document.getElementById('primary-navigation');
          if (nav) {
            nav.focus();
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-60 focus:z-50 focus:px-4 focus:py-3 focus:bg-[var(--surface-color)] focus:text-[var(--text-color)] focus:font-semibold focus:rounded-lg focus:shadow-xl focus:ring-4 focus:ring-slate-400 focus:outline-none transition-all border border-[var(--border-color)]"
      >
        Skip to primary navigation
      </a>
    </div>
  );
};
