import React from 'react';
import { PERSONAL_INFO, EDUCATION_LIST, SKILL_CATEGORIES } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, CheckCircle, Languages, HeartHandshake, Cpu, Code, Terminal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Page Header */}
      <section id="about-intro" aria-labelledby="about-page-title" className="space-y-4">
        <h1
          id="about-page-title"
          className="font-extrabold text-[var(--heading-color)] tracking-tight"
          style={{ fontSize: 'var(--font-size-section-title)' }}
        >
          About &amp; Academic Background
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text-color)] max-w-3xl leading-relaxed">
          Driven by a curiosity for how data-driven models augment human decision-making, I combine rigorous theoretical foundations in machine learning with practical software engineering and semantic web accessibility.
        </p>
      </section>

      {/* Main Grid: Bio Narrative & Supplementary Aside (.portfolio-layout-grid) */}
      <div className="portfolio-layout-grid">
        {/* Bio Narrative Section */}
        <section id="biography-narrative" aria-labelledby="bio-heading" className="space-y-6">
          <div className="portfolio-card space-y-4">
            <h2 id="bio-heading" className="text-xl font-bold text-[var(--heading-color)] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--primary-color)]" aria-hidden="true" />
              <span>Engineering Journey &amp; Focus</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-text-color)] leading-relaxed">
              I am a third-year undergraduate specializing in <strong>Artificial Intelligence and Data Science</strong> at Velammal College of Engineering and Technology in Madurai, India. My core coursework blends computational linear algebra, probability, data structures, neural architectures, and distributed systems.
            </p>
            <p className="text-sm sm:text-base text-[var(--muted-text-color)] leading-relaxed">
              Beyond university classrooms, I have gained industry experience through two internships at <strong>Pydun Technology</strong> and <strong>SK Tech Forage</strong>, applying Python, Power BI, and statistical pipelines to real commercial datasets. I also engineer end-to-end applications—such as <em>SchemeSathiAI</em> (citizen welfare assistance) and <em>Campus Echo</em> (grievance management).
            </p>
            <div className="pt-2">
              <span className="font-semibold text-[var(--heading-color)] text-sm block mb-2">Core Engineering Tenets:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--muted-text-color)] list-none p-0">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>Semantic, standards-first development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>Data integrity &amp; systematic preprocessing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>WCAG accessibility for all users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>Continuous learning &amp; prompt iteration</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Supplementary Aside: Languages & Soft Skills */}
        <aside id="aside-personal-skills" aria-labelledby="aside-skills-heading" className="space-y-6">
          {/* Languages Block */}
          <div className="portfolio-card space-y-4">
            <h3 id="aside-skills-heading" className="text-base font-bold text-[var(--heading-color)] flex items-center gap-2">
              <Languages className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
              <span>Languages</span>
            </h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {PERSONAL_INFO.languages.map((lang) => (
                <li key={lang.name} className="flex-between text-xs border-b border-[var(--border-color)] pb-2.5">
                  <span className="font-semibold text-[var(--heading-color)]">{lang.name}</span>
                  <span className="text-[var(--subtle-text-color)] font-medium">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soft Skills Block */}
          <div className="portfolio-card space-y-3">
            <h3 className="text-base font-bold text-[var(--heading-color)] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
              <span>Professional Strengths</span>
            </h3>
            <div className="flex-cluster" aria-label="Professional soft skills list">
              {PERSONAL_INFO.softSkills.map((skill) => (
                <span key={skill} className="tag-badge-neutral">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Education Timeline Section (<section> & <article>s) */}
      <section id="education-section" aria-labelledby="education-heading" className="space-y-6">
        <div className="space-y-1">
          <h2 id="education-heading" className="text-2xl font-bold text-[var(--heading-color)] tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-[var(--primary-color)]" aria-hidden="true" />
            <span>Formal Education</span>
          </h2>
          <p className="text-sm text-[var(--muted-text-color)]">
            Academic milestones and verifiable performance benchmarks.
          </p>
        </div>

        <div className="portfolio-grid-timeline">
          {EDUCATION_LIST.map((edu) => (
            <article
              key={edu.id}
              id={`education-item-${edu.id}`}
              aria-labelledby={`edu-title-${edu.id}`}
              className="portfolio-card"
            >
              <div className="flex-between flex-col sm:flex-row sm:items-start gap-3 mb-3">
                <div>
                  <h3 id={`edu-title-${edu.id}`} className="text-lg sm:text-xl font-bold text-[var(--heading-color)]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--primary-color)] mt-0.5">
                    {edu.institution} &bull; <span className="text-[var(--subtle-text-color)] font-normal">{edu.location}</span>
                  </p>
                </div>
                <div className="flex flex-col sm:items-end gap-1.5">
                  <span className="text-xs font-mono font-semibold text-[var(--muted-text-color)] bg-[var(--surface-subtle)] px-2.5 py-1 rounded-md border border-[var(--border-color)] w-fit">
                    <time dateTime={edu.startYear}>{edu.startYear}</time> &ndash; <time dateTime={edu.endYear}>{edu.endYear}</time>
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{edu.scoreLabel}: {edu.scoreValue}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
                {edu.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Technical Skills Section (CSS Grid: .portfolio-grid-skills) */}
      <section id="skills-section" aria-labelledby="technical-skills-heading" className="space-y-6">
        <div className="space-y-1">
          <h2 id="technical-skills-heading" className="text-2xl font-bold text-[var(--heading-color)] tracking-tight">
            Technical Skill Inventory
          </h2>
          <p className="text-sm text-[var(--muted-text-color)]">
            Categorized technical abilities across AI/ML pipelines, programming languages, and web frameworks.
          </p>
        </div>

        <div className="portfolio-grid-skills">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const icons = [Cpu, Code, Terminal];
            const Icon = icons[idx % icons.length];
            return (
              <figure
                key={cat.title}
                className="portfolio-card flex-col-between m-0"
              >
                <div>
                  <figcaption className="flex items-center gap-2.5 text-base font-bold text-[var(--heading-color)] mb-4 pb-2 border-b border-[var(--border-color)]">
                    <Icon className="w-5 h-5 text-[var(--primary-color)]" aria-hidden="true" />
                    <span>{cat.title}</span>
                  </figcaption>

                  <div className="space-y-3.5" role="list" aria-label={`${cat.title} skills`}>
                    {cat.skills.map((skill) => (
                      <div key={skill.name} role="listitem">
                        <div className="flex-between text-xs mb-1.5">
                          <span className="font-semibold text-[var(--heading-color)]">{skill.name}</span>
                          <span className="text-[var(--subtle-text-color)] font-mono">{skill.level}%</span>
                        </div>
                        {/* Semantic accessible progress meter */}
                        <div
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency`}
                          className="w-full h-2 bg-[var(--background-secondary)] rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full bg-[var(--primary-color)] rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
};
