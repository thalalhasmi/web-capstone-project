import React from 'react';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';
import { Award, Trophy, CheckCircle, Calendar, BookOpen } from 'lucide-react';

export const CertificationsPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Header */}
      <section id="certifications-header" aria-labelledby="cert-page-title" className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-subtle)] border border-[var(--primary-light)] text-[var(--primary-color)] text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-[var(--primary-color)]" aria-hidden="true" />
          <span>Accredited Credentials &amp; Honors</span>
        </div>
        <h1
          id="cert-page-title"
          className="font-extrabold text-[var(--heading-color)] tracking-tight"
          style={{ fontSize: 'var(--font-size-section-title)' }}
        >
          Certifications, Honors &amp; Competitions
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text-color)] max-w-3xl leading-relaxed">
          Accredited coursework from Stanford Online &amp; DeepLearning.AI, competitive hackathon awards, and specialized cloud certifications.
        </p>
      </section>

      {/* Certifications Grid (CSS Grid: .portfolio-grid sm:grid-cols-2 lg:grid-cols-3) */}
      <section id="certifications-grid" aria-labelledby="certifications-list-title" className="space-y-6">
        <h2 id="certifications-list-title" className="sr-only">
          List of Verified Certifications
        </h2>

        <div className="portfolio-grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_LIST.map((cert) => (
            <article
              key={cert.id}
              id={`cert-item-${cert.id}`}
              aria-labelledby={`cert-title-${cert.id}`}
              className="portfolio-card flex-col-between"
            >
              <div>
                <div className="flex-between gap-2 mb-3">
                  <span className="tag-badge-neutral">
                    {cert.type}
                  </span>
                  {cert.award && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Trophy className="w-3 h-3" aria-hidden="true" />
                      <span>{cert.award}</span>
                    </span>
                  )}
                </div>

                <h3 id={`cert-title-${cert.id}`} className="text-lg font-bold text-[var(--heading-color)] tracking-tight">
                  {cert.title}
                </h3>

                <p className="text-xs font-semibold text-[var(--primary-color)] mt-1 mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] flex-between text-xs">
                <div className="flex items-center gap-1.5 text-[var(--subtle-text-color)] font-mono">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <time dateTime={cert.dateISO}>{cert.date}</time>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Verified</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lifelong Learning Commitment Aside */}
      <aside
        id="learning-dedication-aside"
        aria-labelledby="aside-dedication-title"
        className="portfolio-card bg-[var(--surface-subtle)] space-y-2"
      >
        <h3 id="aside-dedication-title" className="text-base font-bold text-[var(--heading-color)] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--primary-color)]" aria-hidden="true" />
          <span>Lifelong Learning &amp; Responsible AI Development</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
          I actively participate in national prompt engineering hackathons and algorithmic symposiums to challenge theoretical models against practical real-world constraints. My foundational coursework under Stanford Online (Coursera) deepens mathematical intuition for gradient descent dynamics, diagnostic regularization, and neural representation.
        </p>
      </aside>
    </div>
  );
};
