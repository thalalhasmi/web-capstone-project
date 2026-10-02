import React from 'react';

export const LoadingFallback: React.FC<{ label?: string }> = ({ label = 'Loading application component...' }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 space-y-4"
    >
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-3 border-[var(--primary-subtle)] border-t-[var(--primary-color)] animate-spin"></div>
      </div>
      <p className="text-xs font-semibold text-[var(--muted-text-color)] animate-pulse">
        {label}
      </p>
    </div>
  );
};
