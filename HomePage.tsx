import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO, PROJECTS_LIST, INTERNSHIPS_LIST } from '../data/portfolioData';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  Sparkles,
  Award,
  Mail,
  FolderGit2,
  CloudSun,
  CheckSquare,
  ShoppingBag,
  BrainCircuit,
} from 'lucide-react';

interface HomePageProps {
  onNavigate?: (page: PageId) => void;
  onAnnounce?: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onAnnounce }) => {
  const navigate = useNavigate();
  const featuredProjects = PROJECTS_LIST.slice(0, 2);

  const handleNav = (path: string, announcement: string) => {
    if (onAnnounce) onAnnounce(announcement);
    navigate(path);
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {/* 1. Hero Introduction Header Block (CSS Grid & Flexbox) */}
      <section
        id="hero-section"
        aria-labelledby="hero-title"
        className="relative pt-4 pb-12 border-b border-[var(--border-color)]"
      >
        <div className="portfolio-layout-grid items-center">
          <div className="space-y-6">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-subtle)] border border-[var(--primary-light)] text-[var(--primary-color)] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[var(--primary-color)]" aria-hidden="true" />
              <span>Seeking Summer 2026 AI &amp; Data Science Internships</span>
            </div>

            {/* Main H1 with clamp() typography */}
            <h1
              id="hero-title"
              className="text-[var(--heading-color)] font-extrabold tracking-tight leading-[1.15]"
              style={{ fontSize: 'var(--font-size-hero-title)' }}
            >
              Hi, I’m <span className="text-[var(--primary-color)]">{PERSONAL_INFO.name}</span>.
              <span className="block mt-2 font-bold text-[var(--muted-text-color)]" style={{ fontSize: 'var(--font-size-subheading)' }}>
                Building Scalable AI Systems &amp; Accessible Full-Stack Solutions.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted-text-color)] max-w-2xl leading-relaxed">
              3rd Year B.Tech student in <strong>Artificial Intelligence &amp; Data Science</strong> at Velammal College of Engineering &amp; Technology (CGPA: 8.84). Passionate about turning complex datasets into robust machine learning models and intuitive digital systems.
            </p>

            {/* Action CTAs (Flexbox component) */}
            <div className="flex-cluster-lg pt-2">
              <Link
                to="/shop"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Explore E-Commerce Shop</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                to="/projects"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4 text-[var(--subtle-text-color)]" aria-hidden="true" />
                <span>Featured Projects</span>
              </Link>

              <Link
                to="/skills"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[var(--muted-text-color)] hover:text-[var(--heading-color)] rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                <BrainCircuit className="w-4 h-4 text-[var(--primary-color)]" />
                <span>Skills &amp; Capabilities</span>
              </Link>
            </div>
          </div>

          {/* Hero Aside / Quick Metric Summary Card */}
          <aside
            id="hero-quick-summary-aside"
            aria-labelledby="aside-quick-summary-title"
            className="portfolio-card space-y-5"
          >
            <div className="flex-between border-b border-[var(--border-color)] pb-3">
              <h2 id="aside-quick-summary-title" className="text-xs font-bold text-[var(--heading-color)] uppercase tracking-wider">
                Profile Highlights
              </h2>
              <span className="text-xs font-mono text-[var(--primary-color)] bg-[var(--primary-subtle)] px-2 py-0.5 rounded border border-[var(--primary-light)]">
                B.Tech AI &amp; DS
              </span>
            </div>

            <div className="space-y-3 text-xs text-[var(--muted-text-color)]">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[var(--primary-color)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-[var(--heading-color)] block">Velammal College of Engineering &amp; Tech</span>
                  <span>B.Tech Artificial Intelligence &amp; Data Science</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-[var(--heading-color)]">Academic Merit: </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">8.84 CGPA</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-[var(--primary-color)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-[var(--heading-color)] block">Industry Experience</span>
                  <span>Pydun Technology &bull; SK Tech Forage</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--subtle-text-color)] shrink-0" aria-hidden="true" />
                <span>Madurai, Tamil Nadu, India</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)]">
              <div className="text-[11px] font-semibold text-[var(--subtle-text-color)] uppercase tracking-wider mb-2">
                Core Domains
              </div>
              <div className="flex-cluster" aria-label="Core Domains List">
                <span className="tag-badge">Machine Learning</span>
                <span className="tag-badge">Data Science</span>
                <span className="tag-badge">Power BI</span>
                <span className="tag-badge">React &amp; TypeScript</span>
                <span className="tag-badge">Web Accessibility</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. Key Academic & Professional Metrics Grid */}
      <section id="metrics-overview" aria-labelledby="metrics-overview-title" className="space-y-4">
        <h2 id="metrics-overview-title" className="sr-only">Academic and Professional Metrics</h2>
        <div className="portfolio-grid-stats">
          <div className="portfolio-card text-center p-6 space-y-1">
            <span className="stat-number text-3xl sm:text-4xl font-black text-[var(--primary-color)] font-mono">8.84</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--heading-color)]">Cumulative GPA</span>
            <span className="block text-[11px] text-[var(--muted-text-color)]">Anna University Autonomous</span>
          </div>

          <div className="portfolio-card text-center p-6 space-y-1">
            <span className="stat-number text-3xl sm:text-4xl font-black text-[var(--primary-color)] font-mono">2</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--heading-color)]">Data Internships</span>
            <span className="block text-[11px] text-[var(--muted-text-color)]">Pydun Tech &bull; SK Tech Forage</span>
          </div>

          <div className="portfolio-card text-center p-6 space-y-1">
            <span className="stat-number text-3xl sm:text-4xl font-black text-[var(--primary-color)] font-mono">1st</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--heading-color)]">Prompt Engineering</span>
            <span className="block text-[11px] text-[var(--muted-text-color)]">GBS Hackathon Laureate</span>
          </div>

          <div className="portfolio-card text-center p-6 space-y-1">
            <span className="stat-number text-3xl sm:text-4xl font-black text-[var(--primary-color)] font-mono">100%</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-[var(--heading-color)]">WCAG 2.2 AA</span>
            <span className="block text-[11px] text-[var(--muted-text-color)]">Accessible Architecture</span>
          </div>
        </div>
      </section>

      {/* 3. Featured Software & Machine Learning Projects Preview */}
      <section id="featured-projects-preview" aria-labelledby="featured-projects-title" className="space-y-6">
        <div className="flex-between flex-col sm:flex-row items-start sm:items-end gap-3">
          <div>
            <h2 id="featured-projects-title" className="text-2xl font-bold text-[var(--heading-color)] tracking-tight">
              Featured Software Engineering Systems
            </h2>
            <p className="text-sm text-[var(--muted-text-color)] mt-1">
              Production-oriented applications focused on civic accessibility, AI agent pipelines, and full-stack UX.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary-color)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md"
          >
            <span>View all engineering projects</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="portfolio-grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              aria-labelledby={`project-title-${project.id}`}
              className="portfolio-card flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex-between">
                  <span className="text-xs font-mono font-semibold text-[var(--primary-color)] bg-[var(--primary-subtle)] px-2.5 py-0.5 rounded-full border border-[var(--primary-light)]">
                    {project.category}
                  </span>
                  <span className="text-xs text-[var(--subtle-text-color)] font-medium">
                    {project.type}
                  </span>
                </div>
                <h3 id={`project-title-${project.id}`} className="text-lg font-bold text-[var(--heading-color)]">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex-cluster" aria-label={`Tech stack for ${project.title}`}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex-between text-xs font-semibold">
                <Link
                  to="/projects"
                  className="text-[var(--primary-color)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Project details &amp; impact</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--subtle-text-color)] hover:text-[var(--heading-color)] inline-flex items-center gap-1"
                    aria-label={`View ${project.title} source repository on GitHub`}
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Recent Internship Highlights Preview */}
      <section id="recent-internships-preview" aria-labelledby="internships-preview-title" className="space-y-6">
        <div className="flex-between flex-col sm:flex-row items-start sm:items-end gap-3">
          <div>
            <h2 id="internships-preview-title" className="text-2xl font-bold text-[var(--heading-color)] tracking-tight">
              Practical Internship Engagements
            </h2>
            <p className="text-sm text-[var(--muted-text-color)] mt-1">
              Data cleaning pipelines, exploratory statistical modeling, and Power BI dashboards.
            </p>
          </div>
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary-color)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-md"
          >
            <span>Complete timeline</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="portfolio-grid-timeline">
          {INTERNSHIPS_LIST.map((item) => (
            <article
              key={item.id}
              aria-labelledby={`internship-heading-${item.id}`}
              className="portfolio-card"
            >
              <div className="flex-between flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div>
                  <h3 id={`internship-heading-${item.id}`} className="text-base sm:text-lg font-bold text-[var(--heading-color)]">
                    {item.role} &mdash; <span className="text-[var(--primary-color)]">{item.company}</span>
                  </h3>
                  <span className="text-xs text-[var(--subtle-text-color)]">{item.location}</span>
                </div>
                <time dateTime={item.dateISO} className="text-xs font-bold font-mono text-[var(--muted-text-color)] bg-[var(--surface-subtle)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                  {item.date}
                </time>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed mb-4">
                {item.responsibilities[0]}
              </p>
              <div className="flex-cluster" aria-label={`Skills utilized at ${item.company}`}>
                {item.skillsUsed.map((skill) => (
                  <span key={skill} className="tag-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Interactive JavaScript & RESTful API Applications Showcase */}
      <section id="interactive-labs" aria-labelledby="interactive-labs-title" className="space-y-6">
        <div className="flex-between flex-col sm:flex-row items-start sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Web Development Capstone &amp; Engineering Labs</span>
            </div>
            <h2 id="interactive-labs-title" className="text-2xl font-bold text-[var(--heading-color)] tracking-tight">
              Interactive Applications &amp; RESTful APIs
            </h2>
            <p className="text-sm text-[var(--muted-text-color)] mt-1">
              Fully interactive web applications demonstrating client-side routing, state management, REST APIs, and modern UI architecture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: E-Commerce Capstone */}
          <article className="portfolio-card flex flex-col justify-between group hover:border-[var(--primary-color)] transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-[var(--primary-color)] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--primary-subtle)] text-[var(--primary-color)] border border-[var(--primary-light)]">
                  Capstone Feature
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--heading-color)] group-hover:text-[var(--primary-color)] transition-colors">
                Developer Hardware &amp; AI Gear
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
                Full-featured E-Commerce catalog with multi-criteria filtering, search, dedicated product detail pages, and dynamic cart state management with persistent storage.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="tag-badge">React Router</span>
                <span className="tag-badge">Cart State</span>
                <span className="tag-badge">Product Catalog</span>
                <span className="tag-badge">LocalStorage</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--primary-color)] hover:underline"
              >
                <span>Launch E-Commerce Shop</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Card 2: Weather Dashboard */}
          <article className="portfolio-card flex flex-col justify-between group hover:border-sky-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <CloudSun className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-subtle)] text-[var(--muted-text-color)] border border-[var(--border-color)]">
                  Fetch API &bull; REST
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--heading-color)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Global Real-Time Weather Dashboard
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
                Connects to meteorological observation stations via Open-Meteo REST APIs using modern <code className="font-mono text-xs">async/await</code> and native <code className="font-mono text-xs">fetch()</code> with 7-day forecast.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="tag-badge">Async / Await</span>
                <span className="tag-badge">Fetch API</span>
                <span className="tag-badge">REST Web Services</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between">
              <Link
                to="/weather"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--primary-color)] hover:underline"
              >
                <span>Launch Weather</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="/weather.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--subtle-text-color)] hover:text-[var(--heading-color)] transition-colors inline-flex items-center gap-1"
                title="View standalone HTML page"
              >
                <span>Standalone</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* Card 3: To-Do Application */}
          <article className="portfolio-card flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-subtle)] text-[var(--muted-text-color)] border border-[var(--border-color)]">
                  Vanilla JS &bull; LocalStorage
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--heading-color)] group-hover:text-emerald-600 transition-colors">
                Task Management &amp; State System
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-text-color)] leading-relaxed">
                Client-side task management engine built with event delegation, structured JSON localStorage persistence, active/completed filtering, and in-place DOM editing.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="tag-badge">Event Delegation</span>
                <span className="tag-badge">LocalStorage</span>
                <span className="tag-badge">CRUD Operations</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between">
              <Link
                to="/todo"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--primary-color)] hover:underline"
              >
                <span>Launch To-Do</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="/todo.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--subtle-text-color)] hover:text-[var(--heading-color)] transition-colors inline-flex items-center gap-1"
                title="View standalone HTML page"
              >
                <span>Standalone</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* 6. Call to Action Banner (Full-Width Responsive Card) */}
      <section
        id="cta-section"
        aria-labelledby="cta-heading"
        className="relative overflow-hidden rounded-3xl p-8 sm:p-10 border border-[var(--border-color)] bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-xl space-y-6"
      >
        <div className="max-w-2xl space-y-3">
          <h2 id="cta-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Looking for a Data Science &amp; AI Engineering Intern?
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
            I am actively interviewing for Summer 2026 internships across Machine Learning, Data Analytics, and Full-Stack Engineering roles. Let’s connect and discuss how I can contribute to your team.
          </p>
        </div>

        <div className="flex-cluster-lg pt-2">
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 shadow-md transition-all focus-visible:ring-2 focus-visible:ring-white"
          >
            Open Accessible Contact Form
          </Link>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-indigo-300/40 hover:border-white text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Send direct email to ${PERSONAL_INFO.email}`}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Send Direct Email</span>
          </a>
        </div>
      </section>
    </div>
  );
};
