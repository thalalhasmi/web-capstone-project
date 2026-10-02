import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Github, Linkedin, CheckCircle2, ArrowUp, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const header = document.getElementById('site-header');
    if (header) {
      header.focus();
    }
  };

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      aria-label="Site footer and contact information"
      className="bg-[var(--surface-color)] text-[var(--muted-text-color)] border-t border-[var(--border-color)] transition-colors duration-200 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="portfolio-grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Identity & Summary */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg bg-[var(--primary-color)] text-white flex items-center justify-center font-bold text-sm tracking-wider"
                aria-hidden="true"
              >
                TH
              </div>
              <span className="font-bold text-base text-[var(--heading-color)]">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed mb-4">
              AI &amp; Data Science engineer at Velammal College of Engineering &amp; Technology (CGPA 8.84). Capstone Web Development application featuring modular React Router architecture, e-commerce catalog, and RESTful APIs.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Available for Summer 2026 Internships</span>
            </div>
          </div>

          {/* Column 2: Semantic Internal Navigation */}
          <div>
            <h2 id="footer-nav-heading" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-4">
              Navigation Index
            </h2>
            <nav aria-labelledby="footer-nav-heading">
              <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0">
                <li>
                  <Link
                    to="/"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    Home Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    About &amp; Education
                  </Link>
                </li>
                <li>
                  <Link
                    to="/skills"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    Skills Inventory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    Featured Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/experience"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    Internships &amp; Experience
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="text-[var(--primary-color)] font-semibold hover:underline transition-colors rounded-md py-0.5 inline-flex items-center gap-1"
                  >
                    <span>Developer E-Commerce Shop</span>
                    <Sparkles className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5 inline-flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shopping Cart</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/weather"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    Weather Dashboard (REST API)
                  </Link>
                </li>
                <li>
                  <Link
                    to="/todo"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    To-Do List (Vanilla JS)
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[var(--muted-text-color)] hover:text-[var(--primary-color)] transition-colors rounded-md py-0.5"
                  >
                    Accessible Contact Form
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Semantic Address Block */}
          <div>
            <h2 id="footer-contact-heading" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-4">
              Direct Contact
            </h2>
            <address className="not-italic text-xs sm:text-sm space-y-3" aria-labelledby="footer-contact-heading">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--primary-color)] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--primary-color)] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[var(--primary-color)] transition-colors font-medium break-all"
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--primary-color)] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-[var(--primary-color)] transition-colors font-mono"
                  aria-label={`Call phone number ${PERSONAL_INFO.phone}`}
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </address>

            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <h3 className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-2">
                External Profiles
              </h3>
              <div className="flex items-center gap-2" role="group" aria-label="Social and developer profiles">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[var(--surface-subtle)] hover:bg-[var(--border-color)] text-[var(--heading-color)] transition-colors"
                  aria-label="GitHub profile of Thalal Hasmi S"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[var(--surface-subtle)] hover:bg-[var(--border-color)] text-[var(--heading-color)] transition-colors"
                  aria-label="LinkedIn profile of Thalal Hasmi S"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Architectural Compliance */}
          <div>
            <h2 id="footer-arch-heading" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider mb-4">
              Architecture &amp; Standards
            </h2>
            <div className="space-y-3 text-xs leading-relaxed" aria-labelledby="footer-arch-heading">
              <p>
                Engineered with semantic HTML5 landmarks, CSS Grid two-dimensional layouts, and native WCAG 2.2 Level AA accessibility compliance.
              </p>
              <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-color)] space-y-1">
                <span className="font-bold text-[var(--heading-color)] block">Modular Tech Stack:</span>
                <span className="text-[11px] block font-mono">React 19 &bull; React Router &bull; TypeScript &bull; Tailwind CSS &bull; Fetch API</span>
              </div>
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[var(--heading-color)] bg-[var(--surface-subtle)] hover:bg-[var(--border-color)] rounded-xl border border-[var(--border-color)] transition-colors"
                aria-label="Scroll back to the top of the page"
              >
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved &bull; B.Tech Artificial Intelligence &amp; Data Science.
          </p>
          <p className="text-[var(--subtle-text-color)] text-center sm:text-right">
            Client-Side Routing &bull; Modular Architecture &bull; Vercel Production Ready
          </p>
        </div>
      </div>
    </footer>
  );
};
