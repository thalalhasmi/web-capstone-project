import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AccessibilitySettings } from './types';
import { PERSONAL_INFO } from './data/portfolioData';
import { CartProvider } from './context/CartContext';
import { CartToast } from './components/shop/CartToast';
import { SkipLink } from './components/SkipLink';
import { AriaLiveRegion } from './components/AriaLiveRegion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { A11yAuditorBanner } from './components/A11yAuditorBanner';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { LoadingFallback } from './components/LoadingFallback';

// Performance Optimization: Route-level code splitting via React.lazy
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage').then((m) => ({ default: m.CertificationsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const TodoPage = lazy(() => import('./pages/TodoPage').then((m) => ({ default: m.TodoPage })));
const WeatherPage = lazy(() => import('./pages/WeatherPage').then((m) => ({ default: m.WeatherPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

/**
 * Inner Application Frame managing routes, theme, SEO title synchronization,
 * keyboard accessibility shortcuts, and WCAG live announcements.
 */
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-mode');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [liveAnnouncement, setLiveAnnouncement] = useState<string>(
    'Portfolio loaded. Use Tab to navigate or press Alt + A for accessibility settings.'
  );
  const [a11yModalOpen, setA11yModalOpen] = useState(false);

  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    reducedMotion: false,
    highlightFocus: false,
    showSemanticOutlines: false,
  });

  const mainContentRef = useRef<HTMLElement>(null);

  // Sync data-theme attribute on <html> element for CSS variable cascading
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      setLiveAnnouncement(`Color theme changed to ${next ? 'Dark Mode' : 'Light Mode'}.`);
      return next;
    });
  };

  // Backward compatibility: gracefully redirect legacy URL hash (#todo, #weather, #shop, etc.) to clean routes
  useEffect(() => {
    if (window.location.hash) {
      const cleanPath = window.location.hash.replace('#', '');
      const validPaths = ['about', 'skills', 'experience', 'projects', 'certifications', 'todo', 'weather', 'shop', 'cart', 'contact'];
      if (validPaths.includes(cleanPath)) {
        navigate(`/${cleanPath}`, { replace: true });
      }
    }
  }, [navigate]);

  // Synchronize dynamic document titles and meta descriptions for SEO & Screen Readers
  useEffect(() => {
    const path = location.pathname;
    const baseTitle = `${PERSONAL_INFO.name} — AI & Data Science Engineer`;

    let pageTitle = baseTitle;
    let pageDesc = 'Portfolio & Capstone Web Development System of Thalal Hasmi S.';

    if (path === '/') {
      pageTitle = `${PERSONAL_INFO.name} — AI & Data Science Engineer Portfolio`;
      pageDesc = `${PERSONAL_INFO.name} - AI & Data Science portfolio. B.Tech 3rd year at Velammal College of Engineering & Technology, CGPA 8.84. Advanced CSS3, React Router & Capstone E-Commerce.`;
    } else if (path === '/about') {
      pageTitle = `About & Education — ${PERSONAL_INFO.name}`;
      pageDesc = `Academic background, formal education milestones, and technical inventory for ${PERSONAL_INFO.name}.`;
    } else if (path === '/skills') {
      pageTitle = `Technical Skills & Domains — ${PERSONAL_INFO.name}`;
      pageDesc = `Machine learning, data analytics, programming languages, and web engineering competencies of ${PERSONAL_INFO.name}.`;
    } else if (path === '/experience') {
      pageTitle = `Internships & Practical Experience — ${PERSONAL_INFO.name}`;
      pageDesc = `Data science internships at Pydun Technology and SK Tech Forage. Machine learning, Power BI, and data pipelines.`;
    } else if (path === '/projects') {
      pageTitle = `Featured Software Projects — ${PERSONAL_INFO.name}`;
      pageDesc = `Civic AI and full-stack software architectures: SchemeSathiAI, Campus Echo, and accessible web systems.`;
    } else if (path === '/certifications') {
      pageTitle = `Certifications & Awards — ${PERSONAL_INFO.name}`;
      pageDesc = `Accredited certifications from Stanford Online, prompt engineering competition awards, and technical symposiums.`;
    } else if (path === '/shop') {
      pageTitle = `E-Commerce Developer Hardware Catalog — ${PERSONAL_INFO.name}`;
      pageDesc = `Production-ready e-commerce product catalog featuring developer hardware, AI coprocessors, filtering, and real-time cart state.`;
    } else if (path.startsWith('/shop/product/')) {
      pageTitle = `Product Details — Developer E-Commerce Shop | ${PERSONAL_INFO.name}`;
      pageDesc = `Detailed technical specifications, live inventory availability, and customer reviews.`;
    } else if (path === '/cart') {
      pageTitle = `Shopping Cart & Checkout — ${PERSONAL_INFO.name}`;
      pageDesc = `Review your items, apply academic coupons, and complete simulated checkout with persistent cart state.`;
    } else if (path === '/weather') {
      pageTitle = `Real-Time Weather Dashboard (REST API) — ${PERSONAL_INFO.name}`;
      pageDesc = `Live meteorological dashboard powered by asynchronous JavaScript, Fetch API, and Open-Meteo REST endpoints.`;
    } else if (path === '/todo') {
      pageTitle = `To-Do Application (Vanilla JS & LocalStorage) — ${PERSONAL_INFO.name}`;
      pageDesc = `Client-side task management featuring event delegation, structured JSON localStorage persistence, and dynamic DOM manipulation.`;
    } else if (path === '/contact') {
      pageTitle = `Contact & Professional Inquiries — ${PERSONAL_INFO.name}`;
      pageDesc = `Direct accessible contact form to reach ${PERSONAL_INFO.name} for Summer 2026 internships and collaboration.`;
    } else {
      pageTitle = `Page Not Found (404) — ${PERSONAL_INFO.name}`;
      pageDesc = `The requested route does not exist.`;
    }

    document.title = pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', pageDesc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);

    // Announce route transition for screen readers
    setLiveAnnouncement(`Navigated to ${pageTitle.split('—')[0].trim()}.`);

    // Reset scroll and focus main landmark
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.focus();
      }
    }, 120);
  }, [location.pathname, settings.reducedMotion]);

  // Global Keyboard Shortcuts (Alt + 1..9, Alt + S, Alt + C, Alt + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === '1') {
          e.preventDefault();
          navigate('/');
        } else if (e.key === '2') {
          e.preventDefault();
          navigate('/about');
        } else if (e.key === '3') {
          e.preventDefault();
          navigate('/skills');
        } else if (e.key === '4') {
          e.preventDefault();
          navigate('/projects');
        } else if (e.key === '5') {
          e.preventDefault();
          navigate('/experience');
        } else if (e.key === '6') {
          e.preventDefault();
          navigate('/shop');
        } else if (e.key === '7') {
          e.preventDefault();
          navigate('/weather');
        } else if (e.key === '8') {
          e.preventDefault();
          navigate('/todo');
        } else if (e.key === '9') {
          e.preventDefault();
          navigate('/contact');
        } else if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          navigate('/shop');
        } else if (e.key.toLowerCase() === 'c') {
          e.preventDefault();
          navigate('/cart');
        } else if (e.key.toLowerCase() === 'w') {
          e.preventDefault();
          navigate('/weather');
        } else if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          setA11yModalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      let notice = 'Accessibility preferences updated.';
      if (newSettings.highContrast !== undefined) {
        notice = `High contrast mode turned ${newSettings.highContrast ? 'ON' : 'OFF'}.`;
      } else if (newSettings.fontSize !== undefined) {
        notice = `Text size set to ${newSettings.fontSize}.`;
      } else if (newSettings.showSemanticOutlines !== undefined) {
        notice = `Semantic HTML outlines inspector turned ${newSettings.showSemanticOutlines ? 'ON' : 'OFF'}.`;
      }
      setLiveAnnouncement(notice);
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      fontSize: 'normal',
      reducedMotion: false,
      highlightFocus: false,
      showSemanticOutlines: false,
    });
    setLiveAnnouncement('Accessibility settings reset to default.');
  };

  const rootClasses = [
    'min-h-screen flex flex-col font-sans transition-colors duration-200',
    settings.highContrast ? 'theme-high-contrast' : '',
    settings.fontSize === 'large' ? 'font-size-large' : settings.fontSize === 'xlarge' ? 'font-size-xlarge' : '',
    settings.highlightFocus ? 'focus-enhanced' : '',
    settings.reducedMotion ? 'force-reduced-motion' : '',
    settings.showSemanticOutlines ? 'show-semantic-outlines' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div id="app-root-container" className={rootClasses}>
      {/* 1. Skip to Content Link (WCAG 2.4.1) */}
      <SkipLink
        onSkipToMain={() => {
          setLiveAnnouncement('Skipped to main content landmark.');
        }}
        onSkipToNav={() => {
          setLiveAnnouncement('Skipped to primary navigation landmark.');
        }}
      />

      {/* 2. ARIA Live Region for screen readers (WCAG 4.1.3) */}
      <AriaLiveRegion message={liveAnnouncement} />

      {/* 3. Top Auditor & Compliance Status Banner */}
      <A11yAuditorBanner
        settings={settings}
        onToggleSemanticOutlines={() =>
          updateSettings({ showSemanticOutlines: !settings.showSemanticOutlines })
        }
        onOpenSettings={() => setA11yModalOpen(true)}
      />

      {/* 4. Semantic <header> (role="banner") with <nav> */}
      <Header
        onToggleA11yModal={() => setA11yModalOpen(true)}
        accessibilitySettingsOpen={a11yModalOpen}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* 5. Main Content Area with Client-Side Routing */}
      <main
        id="main-content"
        ref={mainContentRef}
        role="main"
        tabIndex={-1}
        aria-label="Main content container"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 focus:outline-none"
      >
        <Suspense fallback={<LoadingFallback label="Loading view..." />}>
          <Routes>
            <Route path="/" element={<HomePage onAnnounce={setLiveAnnouncement} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/contact" element={<ContactPage onAnnounce={setLiveAnnouncement} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* 6. Semantic <footer> (role="contentinfo") */}
      <Footer />

      {/* 7. Accessibility Dialog Modal */}
      <AccessibilityToolbar
        isOpen={a11yModalOpen}
        onClose={() => setA11yModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSettings={resetSettings}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* 8. Global Shopping Cart Toast Notification */}
      <CartToast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
