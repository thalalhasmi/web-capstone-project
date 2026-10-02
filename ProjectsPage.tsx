import React, { useState } from 'react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { FolderGit2, Github, CheckCircle2, ExternalLink } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI/ML', 'Mobile & Full Stack', 'Architecture & Design'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Header */}
      <section id="projects-page-intro" aria-labelledby="projects-heading" className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-subtle)] border border-[var(--primary-light)] text-[var(--primary-color)] text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5 text-[var(--primary-color)]" aria-hidden="true" />
          <span>Engineering Portfolio</span>
        </div>
        <h1
          id="projects-heading"
          className="font-extrabold text-[var(--heading-color)] tracking-tight"
          style={{ fontSize: 'var(--font-size-section-title)' }}
        >
          Featured Projects &amp; Software Systems
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text-color)] max-w-3xl leading-relaxed">
          From citizen eligibility matching engines to multi-role campus grievance routing systems, here is an in-depth showcase of end-to-end software architectures.
        </p>

        {/* Accessible Category Filter Tablist (Flexbox) */}
        <div className="pt-2">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex-cluster p-1 bg-[var(--surface-subtle)] rounded-2xl w-fit border border-[var(--border-color)]"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  id={`tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  aria-selected={isSelected}
                  aria-controls="projects-grid-container"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[var(--surface-color)] text-[var(--primary-color)] shadow-xs border border-[var(--border-color)]'
                      : 'text-[var(--muted-text-color)] hover:text-[var(--heading-color)] hover:bg-[var(--background-secondary)]'
                  } focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid Container (CSS Grid) */}
      <section
        id="projects-grid-container"
        role="tabpanel"
        aria-labelledby={`tab-${selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        className="space-y-8"
      >
        <div className="portfolio-grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              aria-labelledby={`project-title-${project.id}`}
              className="portfolio-card flex-col-between"
            >
              <div>
                {/* Category & Status Badges */}
                <div className="flex-between gap-2 mb-3">
                  <span className="tag-badge">
                    {project.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md border ${
                      project.status === 'Production'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'Production' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{project.status}</span>
                  </span>
                </div>

                <h2 id={`project-title-${project.id}`} className="text-xl font-bold text-[var(--heading-color)] tracking-tight">
                  {project.title}
                </h2>
                <p className="text-xs font-semibold text-[var(--primary-color)] mt-0.5 mb-3">
                  {project.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle-text-color)]">
                    System Architecture
                  </h3>
                  <ul className="space-y-1.5 list-none p-0 m-0">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-[var(--muted-text-color)] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary-color)] mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Technologies Badges */}
                <div className="pt-4 border-t border-[var(--border-color)] mb-4">
                  <div className="flex-cluster" aria-label={`Technologies in ${project.title}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag-badge-neutral">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links / Action Bar */}
                <div className="flex-between text-xs pt-1">
                  <span className="font-mono text-[var(--subtle-text-color)]">{project.type}</span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-[var(--text-color)] bg-[var(--surface-subtle)] hover:bg-[var(--background-secondary)] rounded-xl border border-[var(--border-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] transition-colors"
                    aria-label={`View ${project.title} source code repository on GitHub (opens in a new tab)`}
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Repository</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
