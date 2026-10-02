import React, { useState } from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Sliders,
  ShieldCheck,
  User,
  Briefcase,
  FolderGit2,
  Award,
  Mail,
  Home,
  CheckSquare,
  CloudSun,
  ShoppingBag,
  BrainCircuit,
} from 'lucide-react';

interface HeaderProps {
  onToggleA11yModal: () => void;
  accessibilitySettingsOpen: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleA11yModal,
  accessibilitySettingsOpen,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const navItems: { path: string; id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { path: '/', id: 'home', label: 'Overview', icon: Home },
    { path: '/about', id: 'about', label: 'About', icon: User },
    { path: '/skills', id: 'skills', label: 'Skills', icon: BrainCircuit },
    { path: '/projects', id: 'projects', label: 'Projects', icon: FolderGit2 },
    { path: '/experience', id: 'experience', label: 'Experience', icon: Briefcase },
    { path: '/certifications', id: 'certifications', label: 'Certifications', icon: Award },
    { path: '/shop', id: 'shop', label: 'Shop', icon: ShoppingBag },
    { path: '/weather', id: 'weather', label: 'Weather', icon: CloudSun },
    { path: '/todo', id: 'todo', label: 'To-Do', icon: CheckSquare },
    { path: '/contact', id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      id="site-header"
      role="banner"
      className="sticky top-0 z-40 bg-[var(--surface-color)]/95 backdrop-blur-md border-b border-[var(--border-color)] shadow-xs transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Identity / Personal Name */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              id="brand-logo-button"
              className="group flex items-center gap-3 text-left focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-xl p-1"
              aria-label={`${PERSONAL_INFO.name}, return to home overview`}
            >
              <div
                className="w-10 h-10 rounded-xl bg-[var(--primary-color)] text-white flex items-center justify-center font-bold text-base tracking-wider shadow-sm transition-transform duration-200 group-hover:scale-105"
                aria-hidden="true"
              >
                TH
              </div>
              <div>
                <span className="block text-base font-bold text-[var(--heading-color)] group-hover:text-[var(--primary-color)] tracking-tight transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-xs font-medium text-[var(--muted-text-color)]">
                  AI &amp; Data Science &bull; Velammal
                </span>
              </div>
            </Link>
            <span
              className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              aria-label="Status: Available for Summer 2026 Internships"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span>Seeking Summer &apos;26 Internships</span>
            </span>
          </div>

          {/* Desktop Semantic Navigation */}
          <nav
            id="primary-navigation"
            role="navigation"
            aria-label="Main navigation"
            tabIndex={-1}
            className="hidden xl:flex items-center gap-0.5"
          >
            <ul className="flex items-center gap-0.5 list-none p-0 m-0" role="menubar">
              {navItems.map((item) => {
                const isActive = isCurrentActive(item.path);
                const Icon = item.icon;
                return (
                  <li key={item.id} role="none">
                    <button
                      id={`nav-link-${item.id}`}
                      type="button"
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--primary-subtle)] text-[var(--primary-color)] font-bold border border-[var(--primary-light)] shadow-xs'
                          : 'text-[var(--text-color)] hover:text-[var(--heading-color)] hover:bg-[var(--background-secondary)]'
                      } focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] cursor-pointer`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--primary-color)]' : 'text-[var(--subtle-text-color)]'}`} aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Tools: Shopping Cart, Theme Toggle, Accessibility Settings & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Dynamic Cart Link with Counter Badge */}
            <Link
              to="/cart"
              id="header-cart-button"
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[var(--heading-color)] bg-[var(--surface-color)] hover:bg-[var(--background-secondary)] rounded-xl border border-[var(--border-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] transition-colors shadow-xs"
              aria-label={`Shopping cart with ${totalItems} item${totalItems === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-mono font-extrabold bg-[var(--primary-color)] text-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Theme Toggle (Light / Dark Mode) */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Accessibility Settings Trigger */}
            <button
              id="a11y-settings-toggle-button"
              type="button"
              onClick={onToggleA11yModal}
              aria-label="Open accessibility tools and WCAG inspector settings"
              aria-haspopup="dialog"
              aria-expanded={accessibilitySettingsOpen}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[var(--text-color)] bg-[var(--surface-color)] hover:bg-[var(--background-secondary)] active:bg-[var(--background-secondary)] rounded-xl border border-[var(--border-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-[var(--subtle-text-color)]" aria-hidden="true" />
              <span className="hidden sm:inline">A11y</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle-button"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden p-2 rounded-xl text-[var(--text-color)] hover:bg-[var(--background-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Semantic Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="region"
          aria-label="Mobile Navigation Menu"
          className="xl:hidden border-t border-[var(--border-color)] bg-[var(--surface-color)] px-4 pt-3 pb-6 shadow-xl animate-fade-in"
        >
          <nav aria-label="Mobile main navigation">
            <ul className="space-y-1.5 list-none p-0 m-0">
              {navItems.map((item) => {
                const isActive = isCurrentActive(item.path);
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      id={`mobile-nav-${item.id}`}
                      type="button"
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors ${
                        isActive
                          ? 'bg-[var(--primary-color)] text-white shadow-xs'
                          : 'text-[var(--text-color)] hover:bg-[var(--background-secondary)]'
                      } focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--subtle-text-color)]'}`} aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
