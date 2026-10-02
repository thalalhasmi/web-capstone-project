import React from 'react';
import { SKILL_CATEGORIES, PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, Code2, Database, Layout, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SkillsPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in" id="skills-page-container">
      {/* 1. Header */}
      <section className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary-subtle)] text-[var(--primary-color)] border border-[var(--primary-light)]">
            <BrainCircuit className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Technical Capabilities &bull; Engineering Inventory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--heading-color)] tracking-tight">
            Technical Skills &amp; Domain Expertise
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted-text-color)] leading-relaxed">
            Proficiencies honed through formal engineering coursework in <strong>Artificial Intelligence &amp; Data Science</strong>, practical industry internships at Pydun Technology and SK Tech Forage, and production software projects.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              <span>View Applied Projects &rarr;</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--surface-subtle)] text-[var(--heading-color)] border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors"
            >
              <span>Education &amp; Background &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Categorized Skill Cards (CSS Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = idx === 0 ? BrainCircuit : idx === 1 ? Database : Layout;
          return (
            <section
              key={cat.title}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs flex flex-col justify-between"
              aria-labelledby={`cat-title-${idx}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary-subtle)] text-[var(--primary-color)] flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h2 id={`cat-title-${idx}`} className="text-base font-bold text-[var(--heading-color)]">
                    {cat.title}
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[var(--heading-color)]">{skill.name}</span>
                        <span className="font-mono text-[var(--subtle-text-color)]">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--primary-color)] rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. Soft Skills & Engineering Disciplines */}
      <section className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[var(--heading-color)] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <span>Professional Practices &amp; Engineering Disciplines</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PERSONAL_INFO.softSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--heading-color)]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
