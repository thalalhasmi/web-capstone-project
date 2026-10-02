import React, { useState, useRef } from 'react';
import { ContactFormData, FormErrors } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Check,
} from 'lucide-react';

interface ContactPageProps {
  onAnnounce?: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onAnnounce }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: 'internship',
    message: '',
    preferredContact: 'email',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successBannerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const consentInputRef = useRef<HTMLInputElement>(null);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Full Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g., name@domain.com).';
    }

    if (formData.phone.trim() && !/^[+0-9\s-]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid telephone format or leave blank.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject line must be at least 3 characters long.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Detailed message is required.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters to provide context.';
    }

    if (!formData.consent) {
      errs.consent = 'You must confirm consent to receive a reply.';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (onAnnounce) {
        onAnnounce(
          `Form validation failed with ${Object.keys(validationErrors).length} error${
            Object.keys(validationErrors).length > 1 ? 's' : ''
          }. Please review the issues highlighted.`
        );
      }

      setTimeout(() => {
        if (errorSummaryRef.current) {
          errorSummaryRef.current.focus();
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    if (onAnnounce) onAnnounce('Transmitting message, please wait...');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onAnnounce) {
        onAnnounce(
          'Thank you! Your message has been transmitted successfully. Thalal Hasmi will respond within 24-48 hours.'
        );
      }
      setTimeout(() => {
        if (successBannerRef.current) {
          successBannerRef.current.focus();
        }
      }, 50);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    if (onAnnounce) onAnnounce(`Email address ${PERSONAL_INFO.email} copied to clipboard.`);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      inquiryType: 'internship',
      message: '',
      preferredContact: 'email',
      consent: false,
    });
    setErrors({});
    setIsSubmitted(false);
    if (onAnnounce) onAnnounce('Contact form reset to initial empty state.');
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 50);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Heading Block */}
      <section id="contact-intro" aria-labelledby="contact-page-title" className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-subtle)] border border-[var(--primary-light)] text-[var(--primary-color)] text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-[var(--primary-color)]" aria-hidden="true" />
          <span>Direct Inquiries &amp; Collaboration</span>
        </div>
        <h1
          id="contact-page-title"
          className="font-extrabold text-[var(--heading-color)] tracking-tight"
          style={{ fontSize: 'var(--font-size-section-title)' }}
        >
          Contact &amp; Professional Inquiry
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted-text-color)] max-w-3xl leading-relaxed">
          Have an internship inquiry, collaborative research proposal, or software engineering opportunity? Reach out via this accessible form or contact me directly.
        </p>
      </section>

      {/* Main Grid (.portfolio-layout-grid) */}
      <div className="portfolio-layout-grid">
        {/* Form Container */}
        <section
          id="contact-form-section"
          aria-labelledby="contact-form-heading"
          className="portfolio-card"
        >
          <h2 id="contact-form-heading" className="text-xl font-bold text-[var(--heading-color)] mb-2">
            Send an Inquiry Message
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-text-color)] mb-6">
            Fields marked with an asterisk (<span className="text-rose-500 font-bold" aria-hidden="true">*</span>) are required.
          </p>

          {/* Accessible Error Summary (WCAG 3.3.1) */}
          {Object.keys(errors).length > 0 && (
            <div
              ref={errorSummaryRef}
              id="error-summary-box"
              role="alert"
              tabIndex={-1}
              aria-labelledby="error-summary-title"
              className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-200"
            >
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-rose-800 dark:text-rose-300" id="error-summary-title">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />
                <span>Please correct {Object.keys(errors).length} issue{Object.keys(errors).length > 1 ? 's' : ''} to proceed:</span>
              </div>
              <ul className="space-y-1 list-disc pl-5 text-xs text-rose-800 dark:text-rose-300">
                {errors.fullName && (
                  <li>
                    <a
                      href="#contact-full-name"
                      onClick={(e) => {
                        e.preventDefault();
                        nameInputRef.current?.focus();
                      }}
                      className="underline hover:text-rose-950 font-medium"
                    >
                      {errors.fullName}
                    </a>
                  </li>
                )}
                {errors.email && (
                  <li>
                    <a
                      href="#contact-email"
                      onClick={(e) => {
                        e.preventDefault();
                        emailInputRef.current?.focus();
                      }}
                      className="underline hover:text-rose-950 font-medium"
                    >
                      {errors.email}
                    </a>
                  </li>
                )}
                {errors.phone && (
                  <li>
                    <a href="#contact-phone" className="underline hover:text-rose-950 font-medium">
                      {errors.phone}
                    </a>
                  </li>
                )}
                {errors.subject && (
                  <li>
                    <a
                      href="#contact-subject"
                      onClick={(e) => {
                        e.preventDefault();
                        subjectInputRef.current?.focus();
                      }}
                      className="underline hover:text-rose-950 font-medium"
                    >
                      {errors.subject}
                    </a>
                  </li>
                )}
                {errors.message && (
                  <li>
                    <a
                      href="#contact-message"
                      onClick={(e) => {
                        e.preventDefault();
                        messageInputRef.current?.focus();
                      }}
                      className="underline hover:text-rose-950 font-medium"
                    >
                      {errors.message}
                    </a>
                  </li>
                )}
                {errors.consent && (
                  <li>
                    <a
                      href="#contact-consent"
                      onClick={(e) => {
                        e.preventDefault();
                        consentInputRef.current?.focus();
                      }}
                      className="underline hover:text-rose-950 font-medium"
                    >
                      {errors.consent}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Submission Success Notice */}
          {isSubmitted ? (
            <div
              ref={successBannerRef}
              role="status"
              tabIndex={-1}
              aria-live="polite"
              className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-4 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    Message Transmitted Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                    Thank you, <span className="font-bold">{formData.fullName}</span>. Your inquiry regarding "<strong>{formData.subject}</strong>" has been logged. Thalal Hasmi will respond to <span className="font-mono font-semibold">{formData.email}</span> shortly.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-secondary text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Contact Form with Flexbox and Grid inputs */
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
              aria-describedby="form-instructions"
            >
              <p id="form-instructions" className="sr-only">
                Complete this form to submit your inquiry. All inputs feature visible labels and keyboard navigation.
              </p>

              {/* Row 1: Name & Email (Grid on sm+) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-full-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)] mb-1.5"
                  >
                    Full Name <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={errors.fullName ? 'error-full-name' : 'desc-full-name'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.fullName
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                        : 'border-[var(--border-color)] bg-[var(--surface-subtle)] focus:bg-[var(--surface-color)]'
                    } text-[var(--text-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                    placeholder="e.g. Priyadharshini Raman"
                  />
                  <span id="desc-full-name" className="sr-only">Your first and last name</span>
                  {errors.fullName && (
                    <p id="error-full-name" role="alert" className="mt-1 text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)] mb-1.5"
                  >
                    Email Address <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    ref={emailInputRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'error-email' : 'desc-email'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.email
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                        : 'border-[var(--border-color)] bg-[var(--surface-subtle)] focus:bg-[var(--surface-color)]'
                    } text-[var(--text-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                    placeholder="name@organization.com"
                  />
                  <span id="desc-email" className="sr-only">Electronic mail address for reply</span>
                  {errors.email && (
                    <p id="error-email" role="alert" className="mt-1 text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)] mb-1.5"
                  >
                    Phone Number <span className="text-[var(--subtle-text-color)] font-normal text-xs">(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'error-phone' : 'desc-phone'}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.phone
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                        : 'border-[var(--border-color)] bg-[var(--surface-subtle)] focus:bg-[var(--surface-color)]'
                    } text-[var(--text-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                    placeholder="+91 99948 00000"
                  />
                  <span id="desc-phone" className="sr-only">Include country code if outside India</span>
                  {errors.phone && (
                    <p id="error-phone" role="alert" className="mt-1 text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Inquiry Category */}
                <div>
                  <label
                    htmlFor="contact-inquiry-type"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)] mb-1.5"
                  >
                    Inquiry Category <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-inquiry-type"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--surface-subtle)] text-[var(--text-color)] focus:bg-[var(--surface-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  >
                    <option value="internship">Summer 2026 Internship Opportunity</option>
                    <option value="project">Machine Learning &amp; Software Consulting</option>
                    <option value="collaboration">Research or Academic Collaboration</option>
                    <option value="general">General Professional Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)] mb-1.5"
                >
                  Subject Line <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  ref={subjectInputRef}
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'error-subject' : 'desc-subject'}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    errors.subject
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                      : 'border-[var(--border-color)] bg-[var(--surface-subtle)] focus:bg-[var(--surface-color)]'
                  } text-[var(--text-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                  placeholder="e.g. AI / Data Science Internship Candidate Interview"
                />
                <span id="desc-subject" className="sr-only">Brief topic of inquiry</span>
                {errors.subject && (
                  <p id="error-subject" role="alert" className="mt-1 text-xs font-medium text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Semantic Fieldset for Preferred Contact */}
              <fieldset className="border border-[var(--border-color)] rounded-2xl p-4 bg-[var(--surface-subtle)]">
                <legend className="text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)] px-2 bg-[var(--surface-color)] rounded-md border border-[var(--border-color)]">
                  Preferred Response Channel
                </legend>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <label className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--text-color)] cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--primary-color)] border-[var(--border-color)] focus:ring-[var(--primary-color)]"
                    />
                    <span>Email Response</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--text-color)] cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--primary-color)] border-[var(--border-color)] focus:ring-[var(--primary-color)]"
                    />
                    <span>Phone Call / WhatsApp</span>
                  </label>
                </div>
              </fieldset>

              {/* Message Textarea */}
              <div>
                <div className="flex-between mb-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-text-color)]"
                  >
                    Your Message <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <span className="text-xs text-[var(--subtle-text-color)] font-mono">
                    {formData.message.length} chars
                  </span>
                </div>
                <textarea
                  ref={messageInputRef}
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'error-message' : 'desc-message'}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    errors.message
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                      : 'border-[var(--border-color)] bg-[var(--surface-subtle)] focus:bg-[var(--surface-color)]'
                  } text-[var(--text-color)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                  placeholder="Please describe your organization, requirements, timeline, or meeting proposal..."
                />
                <span id="desc-message" className="sr-only">Detailed message content</span>
                {errors.message && (
                  <p id="error-message" role="alert" className="mt-1 text-xs font-medium text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    ref={consentInputRef}
                    id="contact-consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    aria-invalid={errors.consent ? 'true' : 'false'}
                    aria-describedby={errors.consent ? 'error-consent' : undefined}
                    className="mt-0.5 w-4 h-4 text-[var(--primary-color)] rounded border-[var(--border-color)] focus:ring-[var(--primary-color)]"
                  />
                  <span className="text-xs text-[var(--muted-text-color)] leading-relaxed">
                    I give permission for Thalal Hasmi S to use this information solely to review and respond to my inquiry. <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p id="error-consent" role="alert" className="mt-1 text-xs font-medium text-rose-500 flex items-center gap-1 pl-7">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex-cluster pt-2">
                <button
                  id="contact-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-secondary text-xs"
                >
                  Clear Form
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Supplementary Aside */}
        <aside
          id="contact-details-aside"
          aria-labelledby="aside-direct-contact-title"
          className="space-y-6"
        >
          {/* Coordinates Block */}
          <div className="portfolio-card space-y-5">
            <h3 id="aside-direct-contact-title" className="text-base font-bold text-[var(--heading-color)] border-b border-[var(--border-color)] pb-3">
              Direct Coordinates
            </h3>

            <address className="not-italic text-xs sm:text-sm space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[var(--primary-subtle)] text-[var(--primary-color)] shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-[var(--subtle-text-color)]">Direct Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-semibold text-[var(--primary-color)] hover:underline break-all focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-xs"
                    aria-label={`Send email directly to ${PERSONAL_INFO.email}`}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <div className="mt-1">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--subtle-text-color)] hover:text-[var(--text-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[var(--subtle-text-color)]" aria-hidden="true" />
                          <span>Copy email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[var(--primary-subtle)] text-[var(--primary-color)] shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-[var(--subtle-text-color)]">Telephone</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="font-semibold text-[var(--heading-color)] hover:text-[var(--primary-color)] focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-xs"
                    aria-label={`Call ${PERSONAL_INFO.phone}`}
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[var(--primary-subtle)] text-[var(--primary-color)] shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-[var(--subtle-text-color)]">Location</span>
                  <span className="font-semibold text-[var(--heading-color)]">{PERSONAL_INFO.location}</span>
                  <span className="block text-[11px] text-[var(--subtle-text-color)] mt-0.5">IST (UTC+05:30)</span>
                </div>
              </div>
            </address>
          </div>

          {/* Response Turnaround Card */}
          <div className="portfolio-card bg-[var(--surface-subtle)] space-y-3 text-xs text-[var(--muted-text-color)]">
            <div className="flex items-center gap-2 font-bold text-[var(--heading-color)] text-sm">
              <Clock className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
              <span>Turnaround Guarantee</span>
            </div>
            <p className="leading-relaxed">
              I respond to all professional internship inquiries, student collaborative proposals, and recruiter messages within <strong>24 to 48 business hours</strong>.
            </p>
            <div className="pt-2 border-t border-[var(--border-color)] flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Actively Interviewing for Summer 2026</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
