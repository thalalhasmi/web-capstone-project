import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-8 sm:p-16 text-center space-y-6 max-w-2xl mx-auto my-12 shadow-card animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 text-[var(--primary-color)] flex items-center justify-center mx-auto">
        <HelpCircle className="w-10 h-10" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--primary-color)]">
          HTTP 404 &bull; Route Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-[var(--muted-text-color)] max-w-md mx-auto leading-relaxed">
          The requested path <code className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--primary-color)] font-semibold">{location.pathname}</code> does not correspond to an active route in this application.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary-color)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--surface-subtle)] text-[var(--heading-color)] text-xs font-bold border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-[var(--primary-color)]" />
          <span>Explore Shop</span>
        </Link>
      </div>

      <div className="pt-6 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--subtle-text-color)] mb-3">Popular Navigation Destinations:</p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <Link to="/about" className="px-3 py-1.5 rounded-lg bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)]">
            About &amp; Education
          </Link>
          <Link to="/projects" className="px-3 py-1.5 rounded-lg bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)]">
            Featured Projects
          </Link>
          <Link to="/skills" className="px-3 py-1.5 rounded-lg bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)]">
            Skills Inventory
          </Link>
          <Link to="/weather" className="px-3 py-1.5 rounded-lg bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)]">
            Weather API
          </Link>
          <Link to="/todo" className="px-3 py-1.5 rounded-lg bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)]">
            To-Do List
          </Link>
          <Link to="/cart" className="px-3 py-1.5 rounded-lg bg-[var(--surface-subtle)] text-[var(--muted-text-color)] hover:text-[var(--heading-color)]">
            Shopping Cart
          </Link>
        </div>
      </div>
    </div>
  );
};
