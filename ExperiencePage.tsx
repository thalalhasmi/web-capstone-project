import React from 'react';
import { INTERNSHIPS_LIST } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Header */}
      <section id="experience-header" aria-labelledby="experience-title" className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-subtle)] border border-[var(--primary-light)] text-[var(--primary-color)] text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5 text-[var(--primary-color)]" aria-hidden="true" />
          <span>Industry Engagement &amp; Training</span>
        </div>
        <h1
          id="experience-title"
          className="font-extrabold text-[var(--heading-color)] tracking-tight"
          style={{ fontSize: 'var(--font-size-section-title)' }}
        >
          Internships &amp; Practical Experience
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text-color)] max-w-3xl leading-relaxed">
          Detailed breakdown of responsibilities held, data pipelines developed, exploratory modeling performed, and stakeholder dashboards presented during industry internships.
        </p>
      </section>

      {/* Experience Timeline Section */}
      <section id="internships-timeline" aria-labelledby="timeline-heading" className="space-y-8">
        <h2 id="timeline-heading" className="sr-only">
          Internship Positions Timeline
        </h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:h-full before:w-0.5 before:bg-[var(--border-color)]">
          {INTERNSHIPS_LIST.map((item, index) => (
            <article
              key={item.id}
              id={`internship-article-${item.id}`}
              aria-labelledby={`role-title-${item.id}`}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Marker Dot */}
              <div
                className="absolute left-1.5 sm:left-2.5 top-3 w-3.5 h-3.5 rounded-full bg-[var(--primary-color)] ring-4 ring-[var(--surface-color)] shadow-sm"
                aria-hidden="true"
              />

              <div className="portfolio-card space-y-6">
                {/* Header Information */}
                <div className="flex-between flex-col sm:flex-row sm:items-start gap-4 border-b border-[var(--border-color)] pb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-color)] block mb-1">
                      {index === 0 ? 'Upcoming / Recent Engagement' : 'Completed Internship'}
                    </span>
                    <h3 id={`role-title-${item.id}`} className="text-xl sm:text-2xl font-bold text-[var(--heading-color)]">
                      {item.role}
                    </h3>
                    <div className="text-sm sm:text-base font-semibold text-[var(--muted-text-color)] mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[var(--primary-color)]">{item.company}</span>
                      <span className="text-[var(--subtle-text-color)]" aria-hidden="true">&bull;</span>
                      <span className="text-[var(--subtle-text-color)] font-normal flex items-center gap-1 text-sm">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--subtle-text-color)]" aria-hidden="true" />
                    <time
                      dateTime={item.dateISO}
                      className="text-xs font-bold font-mono text-[var(--muted-text-color)] bg-[var(--surface-subtle)] px-3 py-1.5 rounded-xl border border-[var(--border-color)]"
                    >
                      {item.date}
                    </time>
                  </div>
                </div>

                {/* Core Responsibilities & Contributions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)] mb-3">
                    Key Deliverables &amp; Applied Workflows
                  </h4>
                  <ul className="space-y-3 list-none p-0 m-0">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills & Technologies Utilized */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)] mb-2.5">
                    Technologies &amp; Domain Tools Applied
                  </h4>
                  <div className="flex-cluster" aria-label={`Skills utilized during ${item.role} at ${item.company}`}>
                    {item.skillsUsed.map((skill) => (
                      <span key={skill} className="tag-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Supplementary Internship Takeaways Card */}
      <aside
        id="internship-methodology-aside"
        aria-labelledby="methodology-title"
        className="portfolio-card bg-[var(--surface-subtle)] space-y-3"
      >
        <h3 id="methodology-title" className="text-base font-bold text-[var(--heading-color)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
          <span>Industry Delivery Standard &amp; Engineering Rigor</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
          Through both data science internships, rigorous emphasis was placed on reproducible data pipelines, version control via Git &amp; GitHub, strict data governance, and executive-ready data visualization in Microsoft Power BI and Python notebook environments.
        </p>
      </aside>
    </div>
  );
};
