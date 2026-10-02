export type PageId = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'certifications' | 'todo' | 'weather' | 'shop' | 'cart' | 'contact';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  reducedMotion: boolean;
  highlightFocus: boolean;
  showSemanticOutlines: boolean;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  degree: string;
  college: string;
  cgpa: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  languages: LanguageItem[];
  softSkills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  scoreLabel: string;
  scoreValue: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  dateISO: string;
  responsibilities: string[];
  skillsUsed: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'Production' | 'Active' | 'Prototype';
  type: string;
  summary: string;
  keyFeatures: string[];
  technologies: string[];
  repoUrl: string;
  liveUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  dateISO: string;
  type: string;
  award?: string;
  description: string;
}

export interface WCAGChecklistItem {
  id: string;
  name: string;
  standard: string;
  status: string;
  description: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  preferredContact: 'email' | 'phone';
  consent: boolean;
}

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;
