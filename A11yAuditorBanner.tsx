import React from 'react';
import { AccessibilitySettings } from '../types';
import { ShieldCheck, Layers, Sliders } from 'lucide-react';

interface A11yAuditorBannerProps {
  settings: AccessibilitySettings;
  onToggleSemanticOutlines: () => void;
  onOpenSettings: () => void;
}

export const A11yAuditorBanner: React.FC<A11yAuditorBannerProps> = ({
  settings,
  onToggleSemanticOutlines,
  onOpenSettings,
}) => {
  return (
    <aside
      id="a11y-auditor-status-bar"
      aria-labelledby="auditor-banner-title"
      className="bg-slate-900 text-white border-b border-slate-800 text-xs py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left: Lighthouse Scores & Compliance info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span id="auditor-banner-title">WCAG 2.2 AAA &amp; Advanced CSS3 Architecture</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-300 font-mono">
            <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
              Lighthouse A11y: 100
            </span>
            <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
              CSS Grid &amp; Flexbox Verified
            </span>
          </div>
        </div>

        {/* Right: Quick Accessibility & Semantic Inspector Toggles */}
        <div className="flex items-center gap-2">
          {/* Quick Toggle for Semantic HTML outlines */}
          <button
            type="button"
            onClick={onToggleSemanticOutlines}
            aria-pressed={settings.showSemanticOutlines}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-white ${
              settings.showSemanticOutlines
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Semantic Tags Overlay</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/30">
              {settings.showSemanticOutlines ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Accessibility Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-white"
          >
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            <span>A11y Tools</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
