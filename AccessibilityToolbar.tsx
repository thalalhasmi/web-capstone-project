import React from 'react';
import { AccessibilitySettings } from '../types';
import { WCAG_CHECKLIST } from '../data/portfolioData';
import {
  X,
  Eye,
  Type,
  Sparkles,
  Layers,
  CheckCircle2,
  Keyboard,
  Contrast,
  RotateCcw,
  Sun,
  Moon,
} from 'lucide-react';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onResetSettings: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
  isDark,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-dialog-title"
      aria-describedby="a11y-dialog-desc"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      {/* Accessibility Dialog Container */}
      <div
        className="relative w-full max-w-2xl bg-[var(--surface-color)] rounded-3xl shadow-2xl border border-[var(--border-color)] overflow-hidden text-[var(--text-color)] transition-all max-h-[90vh] flex flex-col"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
      >
        {/* Dialog Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--surface-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[var(--primary-subtle)] text-[var(--primary-color)] rounded-xl">
              <Eye className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="a11y-dialog-title" className="text-lg font-bold text-[var(--heading-color)]">
                Accessibility &amp; Design Architecture
              </h2>
              <p id="a11y-dialog-desc" className="text-xs text-[var(--muted-text-color)]">
                Custom viewing options conforming to WCAG 2.2 Level AA / AAA standards
              </p>
            </div>
          </div>
          <button
            id="a11y-dialog-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close accessibility options dialog"
            className="p-2 rounded-xl text-[var(--subtle-text-color)] hover:text-[var(--text-color)] hover:bg-[var(--background-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dialog Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Section 1: Color Theme (Light / Dark) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-[var(--heading-color)] flex items-center gap-2">
                {isDark ? <Moon className="w-4 h-4 text-indigo-400" aria-hidden="true" /> : <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" />}
                <span>Color Theme (CSS Variables)</span>
              </span>
              <span className="text-xs text-[var(--muted-text-color)] font-mono">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { if (isDark) onToggleTheme(); }}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  !isDark
                    ? 'bg-white text-slate-900 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'bg-[var(--surface-subtle)] text-[var(--muted-text-color)] border-[var(--border-color)] hover:bg-[var(--background-secondary)]'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Light Theme</div>
                  <div className="text-[11px] text-slate-500">Crisp high-contrast daylight</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { if (!isDark) onToggleTheme(); }}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  isDark
                    ? 'bg-slate-900 text-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'bg-[var(--surface-subtle)] text-[var(--muted-text-color)] border-[var(--border-color)] hover:bg-[var(--background-secondary)]'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-950 flex items-center justify-center text-indigo-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Dark Theme</div>
                  <div className="text-[11px] text-slate-400">Low-glare deep midnight</div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Typography & Scaling */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="font-size-group" className="font-semibold text-[var(--heading-color)] flex items-center gap-2">
                <Type className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
                <span>Text Resizing (WCAG 1.4.4 Resize Text)</span>
              </label>
              <span className="text-xs text-[var(--muted-text-color)] font-mono">
                {settings.fontSize === 'normal' ? '100%' : settings.fontSize === 'large' ? '115%' : '130%'}
              </span>
            </div>
            <div id="font-size-group" role="radiogroup" aria-label="Text Size Selection" className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'Default (100%)', sample: 'Aa' },
                { id: 'large', label: 'Large (115%)', sample: 'Aa+' },
                { id: 'xlarge', label: 'Extra (130%)', sample: 'Aa++' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={settings.fontSize === opt.id}
                  onClick={() => onUpdateSettings({ fontSize: opt.id as any })}
                  className={`p-3 text-center rounded-2xl border font-medium transition-all ${
                    settings.fontSize === opt.id
                      ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)] shadow-xs'
                      : 'bg-[var(--surface-subtle)] text-[var(--text-color)] border-[var(--border-color)] hover:bg-[var(--background-secondary)]'
                  } focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]`}
                >
                  <span className="block text-lg font-bold mb-1">{opt.sample}</span>
                  <span className="block text-xs">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Visual & Cognitive Toggles */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
            <h3 className="font-semibold text-[var(--heading-color)] mb-2">Display &amp; Contrast Enhancements</h3>

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-subtle)]">
              <div className="pr-4">
                <div className="font-medium text-[var(--heading-color)] flex items-center gap-2">
                  <Contrast className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
                  <span>High Contrast Mode (WCAG AAA &gt; 7:1)</span>
                </div>
                <p className="text-xs text-[var(--muted-text-color)] mt-0.5">
                  Maximizes contrast with stark monochromatic tones and high-visibility accents.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.highContrast}
                aria-label="Toggle High Contrast Mode"
                onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${
                  settings.highContrast ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Enhanced Focus Rings */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-subtle)]">
              <div className="pr-4">
                <div className="font-medium text-[var(--heading-color)] flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  <span>Enhanced High-Visibility Focus Rings</span>
                </div>
                <p className="text-xs text-[var(--muted-text-color)] mt-0.5">
                  Applies dual-contour 4px amber and black outline rings to active keyboard focus.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.highlightFocus}
                aria-label="Toggle Enhanced Focus Rings"
                onClick={() => onUpdateSettings({ highlightFocus: !settings.highlightFocus })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${
                  settings.highlightFocus ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.highlightFocus ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-subtle)]">
              <div className="pr-4">
                <div className="font-medium text-[var(--heading-color)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" aria-hidden="true" />
                  <span>Force Reduced Motion (WCAG 2.3.3)</span>
                </div>
                <p className="text-xs text-[var(--muted-text-color)] mt-0.5">
                  Suppresses UI animations, transitions, and hover transforms for vestibular safety.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.reducedMotion}
                aria-label="Toggle Reduced Motion"
                onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${
                  settings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Semantic Tags Visual Inspector */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div className="pr-4">
                <div className="font-medium text-[var(--heading-color)] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                  <span>Live HTML5 Semantic Outlines Inspector</span>
                </div>
                <p className="text-xs text-[var(--muted-text-color)] mt-0.5">
                  Visualizes containers: <span className="font-mono text-blue-600 dark:text-blue-400">&lt;header&gt;</span>, <span className="font-mono text-emerald-600 dark:text-emerald-400">&lt;nav&gt;</span>, <span className="font-mono text-purple-600 dark:text-purple-400">&lt;main&gt;</span>, <span className="font-mono text-amber-600 dark:text-amber-400">&lt;article&gt;</span>, <span className="font-mono text-sky-600 dark:text-sky-400">&lt;section&gt;</span>, <span className="font-mono text-rose-600 dark:text-rose-400">&lt;aside&gt;</span>, <span className="font-mono text-slate-600 dark:text-slate-400">&lt;footer&gt;</span>.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.showSemanticOutlines}
                aria-label="Toggle Semantic HTML Outlines Inspector"
                onClick={() => onUpdateSettings({ showSemanticOutlines: !settings.showSemanticOutlines })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] ${
                  settings.showSemanticOutlines ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.showSemanticOutlines ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Section 4: WCAG & Responsive Architecture Verification */}
          <div className="pt-4 border-t border-[var(--border-color)]">
            <h3 className="font-semibold text-[var(--heading-color)] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>WCAG 2.2 &amp; CSS3 Architecture Scorecard</span>
            </h3>
            <div className="space-y-2">
              {WCAG_CHECKLIST.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-color)] text-xs"
                >
                  <div className="pr-2">
                    <div className="font-semibold text-[var(--heading-color)]">{item.name}</div>
                    <div className="text-[var(--muted-text-color)] mt-0.5 leading-relaxed">{item.description}</div>
                    <div className="text-[var(--subtle-text-color)] font-mono text-[10px] mt-1">{item.standard}</div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-full text-[11px] border border-emerald-500/20">
                    100% {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Keyboard Navigation Quick Reference */}
          <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-color)] text-xs space-y-2">
            <div className="font-semibold text-[var(--heading-color)] flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-[var(--subtle-text-color)]" aria-hidden="true" />
              <span>Keyboard Navigation Guide</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-5 text-[var(--muted-text-color)]">
              <li>Use <kbd className="px-1.5 py-0.5 bg-[var(--surface-color)] rounded border border-[var(--border-color)] font-mono text-[10px]">Tab</kbd> and <kbd className="px-1.5 py-0.5 bg-[var(--surface-color)] rounded border border-[var(--border-color)] font-mono text-[10px]">Shift + Tab</kbd> to traverse interactive elements.</li>
              <li>Press <kbd className="px-1.5 py-0.5 bg-[var(--surface-color)] rounded border border-[var(--border-color)] font-mono text-[10px]">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-[var(--surface-color)] rounded border border-[var(--border-color)] font-mono text-[10px]">Space</kbd> to activate buttons and tabs.</li>
              <li>Press <kbd className="px-1.5 py-0.5 bg-[var(--surface-color)] rounded border border-[var(--border-color)] font-mono text-[10px]">Escape</kbd> to dismiss this dialog modal.</li>
            </ul>
          </div>
        </div>

        {/* Dialog Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-color)] bg-[var(--surface-subtle)]">
          <button
            type="button"
            onClick={onResetSettings}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted-text-color)] hover:text-[var(--heading-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-lg p-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset to Standard</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-primary"
          >
            Done &amp; Apply
          </button>
        </div>
      </div>
    </div>
  );
};
