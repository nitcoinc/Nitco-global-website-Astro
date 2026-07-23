import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./RevenueLeakageAssessment.module.css";

/* ── Inline SVG icons ── */
function Icon({ name, size = 20, className }) {
  const props = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className,
  };
  const paths = {
    fileBarChart: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 17v-3M12 17v-5M15 17v-2"/></>,
    scale: <><path d="M12 3v18"/><path d="M5 8l-3 6a4 4 0 008 0z"/><path d="M19 8l-3 6a4 4 0 008 0z"/><path d="M4 8h16"/></>,
    repeat: <><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></>,
    files: <><path d="M15 2H8a2 2 0 00-2 2v15a2 2 0 002 2h10a2 2 0 002-2V8z"/><polyline points="15 2 15 8 21 8"/><path d="M4 6v14a2 2 0 002 2h9"/></>,
    checkSquare: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    barChart4: <><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></>,
    layoutDashboard: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    playCircle: <><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    alertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    loader: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>,
  };
  return <svg {...props}>{paths[name] || <circle cx="12" cy="12" r="9"/>}</svg>;
}

/* ── Content data ── */
const IMPACT_CARDS = [
  { icon: "fileBarChart", title: "Billing Errors", description: "Recover lost revenue from invoice discrepancies." },
  { icon: "scale", title: "Pricing Compliance", description: "Ensure contracted pricing is consistently applied." },
  { icon: "repeat", title: "Duplicate Payments", description: "Identify duplicate invoices and payment errors." },
  { icon: "files", title: "Contract Leakage", description: "Detect missed renewals, rebates, and contractual obligations." },
  { icon: "checkSquare", title: "Revenue Recognition", description: "Validate revenue timing and compliance." },
  { icon: "zap", title: "Process Automation", description: "Reduce manual exceptions and operational risk." },
];

const DELIVERABLES = [
  "Revenue Leakage Opportunity Assessment",
  "Current-State Process Review",
  "AI Opportunity Analysis",
  "Estimated Financial Impact",
  "Prioritized Improvement Roadmap",
  "Executive Summary Presentation",
  "Recommended Quick Wins",
  "Technology & Automation Recommendations",
];

const ANALYSIS_AREAS = [
  { icon: "barChart4", title: "Finance", items: ["Accounts Receivable", "Accounts Payable", "Billing", "Revenue Recognition", "Cash Application"] },
  { icon: "layoutDashboard", title: "Operations", items: ["Order Management", "Procurement", "Inventory", "Logistics", "Supply Chain"] },
  { icon: "target", title: "Commercial", items: ["Pricing", "Contracts", "Rebates", "Customer Master", "Sales Operations"] },
];

const AUDIENCE = [
  "CFOs", "Controllers", "VP Finance", "Shared Services Leaders",
  "Revenue Operations", "Finance Transformation Leaders",
  "Internal Audit", "Procurement Leaders", "ERP Program Leaders",
];

const FAQS = [
  { q: "How long does the assessment take?", a: "Typically 1–2 weeks depending on scope." },
  { q: "Do you need access to our systems?", a: "No. Initial assessments can be completed through workshops and sample information." },
  { q: "Is there any obligation?", a: "No. The assessment is complimentary." },
  { q: "What industries do you support?", a: "Manufacturing, Distribution, Logistics, Healthcare, Financial Services, Retail, and more." },
  { q: "What systems do you work with?", a: "SAP, Oracle, Microsoft Dynamics, NetSuite, Salesforce, Workday, ServiceNow, and other enterprise platforms." },
];

const HUBSPOT_PORTAL_ID = "8158070";
const HUBSPOT_FORM_ID = "8483f076-dd19-4677-be03-0ee51194fbcc";
const HUBSPOT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

// Same video configured for the Revenue Leakage Agent in the AI Command Center (src/content/agents.json)
const RLA_VIDEO_URL = "https://player.vimeo.com/video/1204592337?h=e21d979a14&autoplay=1&muted=1";

function ImpactCard({ icon, title, description }) {
  return (
    <div className={styles.impactCard}>
      <div className={styles.impactIcon}><Icon name={icon} size={18} /></div>
      <h3 className={styles.impactTitle}>{title}</h3>
      <p className={styles.impactDescription}>{description}</p>
    </div>
  );
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={styles.faqItem}>
      <button type="button" className={styles.faqQuestion} onClick={onToggle} aria-expanded={isOpen}>
        <span>{q}</span>
        <Icon name="chevronDown" size={18} className={`${styles.faqChevron} ${isOpen ? styles.open : ""}`} />
      </button>
      <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ""}`}>
        <p className={styles.faqAnswerText}>{a}</p>
      </div>
    </div>
  );
}

function LeadCaptureForm({ theme }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [status, setStatus] = useState(null); // "success" | "error" | "captcha" | null
  const [submitting, setSubmitting] = useState(false);
  // react-google-recaptcha isn't SSR-safe (this island renders on the server
  // for SEO via client:load), so only mount it once we're in the browser.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      setStatus("captcha");
      return;
    }
    setSubmitting(true);
    setStatus(null);

    const body = {
      fields: [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
        { name: "company", value: formData.company },
        { name: "jobtitle", value: formData.jobTitle },
      ],
    };

    try {
      const response = await fetch(HUBSPOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setStatus("error");
      } else {
        setStatus("success");
        setCaptchaValue(null);
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className={styles.formCard}>
        <div className={styles.formCardBar} />
        <div className={styles.successCard}>
          <div className={styles.successIcon}><Icon name="checkCircle" size={28} /></div>
          <h3 className={styles.successTitle}>Assessment Requested</h3>
          <p className={styles.successText}>
            Thank you. One of our enterprise leakage specialists will contact you shortly at{" "}
            <strong>{formData.email}</strong> to schedule your complimentary assessment.
          </p>
          <button type="button" className={styles.secondaryBtn} onClick={() => setStatus(null)}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard} id="lead-form">
      <div className={styles.formCardBar} />
      <h3 className={styles.formTitle}>Schedule Your Complimentary Assessment</h3>
      <p className={styles.formSub}>
        Find where revenue is leaking and receive a prioritized roadmap to improve financial performance.
      </p>

      {status === "error" && (
        <div className={styles.errorMsg}>
          <span className={styles.msgIcon}><Icon name="alertCircle" size={16} /></span>
          <span>An unexpected error occurred. Please try again.</span>
        </div>
      )}
      {status === "captcha" && (
        <div className={styles.errorMsg}>
          <span className={styles.msgIcon}><Icon name="alertCircle" size={16} /></span>
          <span>Please complete the CAPTCHA before submitting.</span>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="firstName">
              First Name<span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              placeholder="Jane"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lastName">
              Last Name<span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Business Email<span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="jane.doe@enterprise.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company">
            Company<span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            id="company"
            placeholder="Acme Corporation"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="jobTitle">
            Job Title<span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            id="jobTitle"
            placeholder="Chief Financial Officer"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        {mounted && (
          <div className={styles.captcha}>
            <ReCAPTCHA
              sitekey="6LeOGVctAAAAAPcWLXswr99PCEVIcB7TLHHRv959"
              onChange={(val) => setCaptchaValue(val)}
              theme={theme === "dark" ? "dark" : "light"}
            />
          </div>
        )}

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? (
            <><Icon name="loader" size={18} className={styles.spin} /> Submitting Request...</>
          ) : (
            <>Request Assessment <Icon name="arrowRight" size={18} /></>
          )}
        </button>

        <p className={styles.formFootnote}>Your information is secure. We never share your data.</p>
      </form>
    </div>
  );
}

const THEME_STORAGE_KEY = "revenue-leakage-theme";

const THEME_VARS = {
  light: {
    "--rla-bg": "hsl(244, 51%, 98%)",
    "--rla-fg": "hsl(244, 51%, 6%)",
    "--rla-muted": "hsl(244, 10%, 40%)",
    "--rla-border": "hsl(244, 20%, 90%)",
    "--rla-border-strong": "hsl(244, 20%, 86%)",
    "--rla-card": "#fff",
    "--rla-input-bg": "hsl(244, 51%, 98%)",
    "--rla-focus-bg": "#fff",
    "--rla-chip-bg": "rgba(0, 0, 0, 0.02)",
    "--rla-shadow": "rgba(20, 20, 60, 0.04)",
    "--rla-shadow-strong": "rgba(20, 20, 60, 0.1)",
  },
  dark: {
    "--rla-bg": "hsl(236, 56%, 6%)",
    "--rla-fg": "#fff",
    "--rla-muted": "hsl(236, 20%, 65%)",
    "--rla-border": "hsl(236, 30%, 16%)",
    "--rla-border-strong": "hsl(236, 30%, 20%)",
    "--rla-card": "hsl(236, 40%, 10%)",
    "--rla-input-bg": "hsl(236, 30%, 20%)",
    "--rla-focus-bg": "hsl(236, 40%, 13%)",
    "--rla-chip-bg": "rgba(255, 255, 255, 0.04)",
    "--rla-shadow": "rgba(0, 0, 0, 0.3)",
    "--rla-shadow-strong": "rgba(0, 0, 0, 0.45)",
  },
};

export default function RevenueLeakageAssessment() {
  const [openFaq, setOpenFaq] = useState(0);
  const [theme, setTheme] = useState("light");
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const logoSrc = theme === "dark" ? "/images/nitco-images/LogoWhite.svg" : "/images/nitco-images/Logo.svg";

  return (
    <div className={styles.page} data-theme={theme} style={THEME_VARS[theme]}>
      {/* ══ HEADER ══ */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.logo}>
            <img src={logoSrc} alt="NITCO Inc." width={180} height={48} />
          </a>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
            </button>
            <a href="#lead-form" className={styles.headerCta} onClick={scrollToForm}>
              Request Assessment
            </a>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}>
          <div className={styles.heroGlowA} />
          <div className={styles.heroGlowB} />
        </div>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              Identify Hidden
              <span className={styles.heroHighlight}>Revenue Leakage</span>
              Before It Impacts Your Bottom Line
            </h1>
            <p className={styles.heroSub}>
              AI-powered assessment that uncovers billing errors, pricing discrepancies, contract leakage,
              duplicate payments, revenue recognition gaps, and process inefficiencies across your enterprise.
            </p>
            <button
              type="button"
              className={styles.watchVideoBtn}
              onClick={() => setVideoOpen(true)}
            >
              <Icon name="playCircle" size={18} /> Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT + STICKY FORM ══ */}
      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* LEFT COLUMN */}
            <div className={styles.content}>
              {/* Problem */}
              <div>
                <span className={styles.sectionEyebrow}>The Problem</span>
                <h2 className={styles.sectionTitle}>Is Revenue Leakage Costing Your Organization Millions?</h2>
                <p className={styles.sectionText}>
                  Every enterprise experiences revenue leakage—but most organizations don't know where it's
                  happening. Common sources include: billing inaccuracies, pricing inconsistencies, duplicate
                  supplier payments, missed rebates and discounts, contract non-compliance, revenue recognition
                  gaps, manual approval bottlenecks, and data synchronization issues across ERP, CRM, billing,
                  and finance systems.
                </p>
                <div className={styles.impactGrid}>
                  {IMPACT_CARDS.map((card) => (
                    <ImpactCard key={card.title} {...card} />
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className={styles.deliverablesCard}>
                <div className={styles.deliverablesGlow} />
                <span className={styles.sectionEyebrow}>What You'll Receive</span>
                <h2 className={styles.sectionTitle}>Complimentary Revenue Leakage Assessment</h2>
                <p className={styles.sectionText}>
                  Our experts evaluate your current environment and provide an executive-ready assessment.
                </p>
                <div className={styles.deliverablesList}>
                  {DELIVERABLES.map((item) => (
                    <div key={item} className={styles.deliverableItem}>
                      <span className={styles.deliverableIcon}><Icon name="checkCircle" size={16} /></span>
                      <span className={styles.deliverableText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Areas */}
              <div>
                <span className={styles.sectionEyebrow}>Scope</span>
                <h2 className={styles.sectionTitle}>Typical Areas We Analyze</h2>
                <div className={styles.areasGrid}>
                  {ANALYSIS_AREAS.map((area) => (
                    <div key={area.title} className={styles.areaCard}>
                      <div className={styles.areaIcon}><Icon name={area.icon} size={20} /></div>
                      <h3 className={styles.areaTitle}>{area.title}</h3>
                      <ul className={styles.areaList}>
                        {area.items.map((item) => (
                          <li key={item} className={styles.areaListItem}>
                            <span className={styles.areaDot} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who is this for */}
              <div>
                <span className={styles.sectionEyebrow}>Audience</span>
                <h2 className={styles.sectionTitle}>Who Should Request This Assessment?</h2>
                <p className={styles.sectionText}>This assessment is ideal for:</p>
                <div className={styles.audienceChips}>
                  {AUDIENCE.map((title) => (
                    <span key={title} className={styles.audienceChip}>{title}</span>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <span className={styles.sectionEyebrow}>FAQ</span>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                  {FAQS.map((faq, i) => (
                    <FaqItem
                      key={faq.q}
                      q={faq.q}
                      a={faq.a}
                      isOpen={openFaq === i}
                      onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Form */}
            <div className={styles.formWrap}>
              <LeadCaptureForm theme={theme} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a href="/" className={styles.footerLogo}>
            <img src={logoSrc} alt="NITCO Inc." width={160} height={42} />
          </a>
          <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} NITCO Inc. All rights reserved.</p>
        </div>
      </footer>

      {videoOpen && (
        <div className={styles.modalOverlay} onClick={() => setVideoOpen(false)}>
          <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeModal}
              onClick={() => setVideoOpen(false)}
            >
              ✕
            </button>
            <div className={styles.iframeWrapper}>
              <iframe
                src={RLA_VIDEO_URL}
                className={styles.videoIframe}
                allow="autoplay; fullscreen"
                title="Revenue Leakage Agent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
