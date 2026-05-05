import Link from "next/link";
import styles from "./careersPage.module.css";

/* ── Inline SVG icons ── */
function Icon({ name, size = 20 }) {
  const p = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size, height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  const paths = {
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    externalLink: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    wallet: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    heartPulse: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    shieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4"/>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    mic: <><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    party: <><path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.24 2.24M16 8l1.17-1.17"/><path d="M15.77 11.64A9.98 9.98 0 0122 2s-10 0-10 10"/><path d="M10.66 14.28a9.99 9.99 0 01-1.43-5.28"/></>,
    bookOpen: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M20 2l.75 2.25L23 5l-2.25.75L20 8l-.75-2.25L17 5l2.25-.75z"/><path d="M4 16l.5 1.5L6 18l-1.5.5L4 20l-.5-1.5L2 18l1.5-.5z"/></>,
    usersRound: <><path d="M18 21a8 8 0 00-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 00-.45-8.3"/></>,
    network: <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M7 17l-2 2M17 17l2 2M12 11l-5 6M12 11l5 6"/></>,
    graduationCap: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
    brain: <path d="M12 5a7 7 0 017 7c0 2.5-1.5 5-3.5 6.5V20a1 1 0 01-2 0v-1.5A7 7 0 0112 5zm0 0V3m-4 9H5m14 0h-3M9.5 9.5l-2-2m7 2l2-2M9.5 14.5l-2 2m7-2l2 2"/>,
    workflow: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"/></>,
    cloud: <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    sparkle: <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>,
  };
  return <svg {...p}>{paths[name] || <circle cx="12" cy="12" r="9"/>}</svg>;
}

/* ── Data ── */
const BENEFITS = [
  { icon: "wallet",       title: "Competitive compensation" },
  { icon: "heartPulse",   title: "Flexible health benefits — medical, dental, and vision" },
  { icon: "shieldCheck",  title: "Life insurance" },
  { icon: "award",        title: "Technical certification reimbursement" },
  { icon: "calendar",     title: "Paid holidays and paid time off (PTO)" },
  { icon: "mic",          title: "Professional conference opportunities" },
  { icon: "trendingUp",   title: "Career development program" },
  { icon: "usersRound",   title: "Employee and sales referral programs" },
  { icon: "party",        title: "Employee activities and company-sponsored events" },
  { icon: "bookOpen",     title: "Training and development opportunities" },
];

const TRAINING = [
  {
    icon: "sparkles",
    title: "Blue Labs",
    description: "Our flagship program that develops highly talented members of NITCO's AI teams — accelerating individual skill in the artificial intelligence space.",
  },
  {
    icon: "users",
    title: "Mentoring",
    description: "We pair less-experienced employees with senior mentors, giving them the support to grow and flourish as professionals.",
  },
  {
    icon: "network",
    title: "Core Team",
    description: "Our core team designs and builds Center of Excellence models for technology implementation challenges, with hands-on learning from experts on emerging tech.",
  },
  {
    icon: "award",
    title: "Certification Reimbursement",
    description: "We encourage technical certifications and other professional designations — and in most cases, the fees are 100% reimbursable.",
  },
];

const HIRING_FOR = [
  { icon: "brain",    label: "AI / ML" },
  { icon: "workflow", label: "RPA" },
  { icon: "cloud",    label: "Cloud" },
  { icon: "database", label: "Data" },
];

export default function CareersPage({ onContact }) {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true"/>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            <Icon name="arrowLeft" size={15}/> Back to home
          </Link>

          <div className={styles.heroLayout}>
            {/* Left: copy */}
            <div>
              <div className={styles.heroEyebrow}>
                <div className={styles.heroIconBox}>
                  <Icon name="briefcase" size={20}/>
                </div>
                <p className={styles.heroKicker}>Careers</p>
              </div>
              <h1 className={styles.heroTitle}>Grow with NITCO.</h1>
              <p className={styles.heroSubtitle}>
                As NITCO continues to grow, we're always seeking innovative and dedicated professionals for challenging positions across AI, automation, cloud, and data.
              </p>
              <div className={styles.heroCtas}>
                <a
                  href="https://www.dice.com/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                >
                  See all Dice job postings <Icon name="externalLink" size={15}/>
                </a>
                <button type="button" className={styles.ctaSecondary} onClick={onContact}>
                  Send us a note <Icon name="arrowRight" size={15}/>
                </button>
              </div>
            </div>

            {/* Right: hero card */}
            <div className={styles.heroVisual}>
              <div className={styles.heroVisualGlow} aria-hidden="true"/>

              {/* Top-left chip */}
              <div className={styles.chipTopLeft}>
                <div className={styles.chipRow}>
                  <div className={styles.chipIconBox}>
                    <Icon name="graduationCap" size={14}/>
                  </div>
                  <div>
                    <p className={styles.chipKicker}>College recruiting</p>
                    <p className={styles.chipTitle}>Open across degrees</p>
                  </div>
                </div>
              </div>

              {/* Bottom-right chip */}
              <div className={styles.chipBottomRight}>
                <div className={styles.chipRow}>
                  <div className={styles.chipIconBox}>
                    <Icon name="sparkle" size={14}/>
                  </div>
                  <div>
                    <p className={styles.chipKicker}>Blue Labs</p>
                    <p className={styles.chipTitle}>AI accelerator</p>
                  </div>
                </div>
              </div>

              {/* Main card */}
              <div className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                  <div className={styles.heroCardMeta}>
                    <div className={styles.heroCardIconBox}>
                      <Icon name="briefcase" size={18}/>
                    </div>
                    <div>
                      <p className={styles.heroCardLabel}>Now hiring</p>
                      <p className={styles.heroCardTitle}>Always growing the team</p>
                    </div>
                  </div>
                  <span className={styles.heroCardLive}>
                    <span className={styles.liveDot}/>
                    Live
                  </span>
                </div>

                <p className={styles.heroCardKicker}>Hiring across</p>
                <div className={styles.hiringGrid}>
                  {HIRING_FOR.map(({ icon, label }) => (
                    <div key={label} className={styles.hiringCell}>
                      <Icon name={icon} size={14}/>
                      <p className={styles.hiringCellLabel}>{label}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.heroCardFooter}>
                  <p className={styles.heroCardFooterLabel}>See live job postings on</p>
                  <a
                    href="https://www.dice.com/jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroCardFooterLink}
                  >
                    Dice <Icon name="externalLink" size={11}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERKS & BENEFITS ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} ${styles.sectionCenter}`}>
            <span className={styles.eyebrow}>Perks &amp; benefits</span>
            <h2 className={styles.sectionTitle}>A package built for the long run.</h2>
            <p className={styles.sectionSub}>
              NITCO offers a competitive benefits package to improve the health and quality of life for our employees and their families.
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b, i) => (
              <div key={b.title} className={styles.benefitCard}>
                <div className={styles.benefitTopBar} aria-hidden="true"/>
                <div className={styles.benefitHoverFill} aria-hidden="true"/>
                <div className={styles.benefitInner}>
                  <div className={styles.benefitIconBox}>
                    <Icon name={b.icon} size={19}/>
                  </div>
                  <div>
                    <p className={styles.benefitNum}>{String(i + 1).padStart(2, "0")}</p>
                    <p className={styles.benefitTitle}>{b.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} ${styles.sectionCenter}`}>
            <span className={styles.eyebrow}>Training</span>
            <h2 className={styles.sectionTitle}>Sharpen your skills, lead what&apos;s next.</h2>
            <p className={styles.sectionSub}>
              We encourage our people to advance their skills so we continue to lead in the technology solutions business.
            </p>
          </div>
          <div className={styles.trainingGrid}>
            {TRAINING.map((t) => (
              <div key={t.title} className={styles.trainingCard}>
                <div className={styles.trainingTopBar} aria-hidden="true"/>
                <div className={styles.trainingHoverFill} aria-hidden="true"/>
                <div className={styles.trainingIconBox}>
                  <Icon name={t.icon} size={22}/>
                </div>
                <h3 className={styles.trainingTitle}>{t.title}</h3>
                <p className={styles.trainingDesc}>{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLEGE RECRUITING ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.recruitLayout}>
            <div className={styles.recruitText}>
              <span className={styles.recruitEyebrow}>College recruiting</span>
              <h2 className={styles.recruitTitle}>A career path, whatever you studied.</h2>
              <p className={styles.recruitBody}>
                We have a gratifying career path no matter what degree you pursue. We&apos;re glad to put your knowledge to work designing and implementing solutions for our well-known clients.
              </p>
            </div>
            <div className={styles.recruitCard}>
              <div className={styles.recruitCardGlow} aria-hidden="true"/>
              <div className={styles.recruitCardHeader}>
                <div className={styles.recruitCardIconBox}>
                  <Icon name="graduationCap" size={20}/>
                </div>
                <div>
                  <p className={styles.recruitCardKicker}>New grad pathways</p>
                  <p className={styles.recruitCardTitle}>Designed for early-career talent</p>
                </div>
              </div>
              <ul className={styles.recruitList}>
                {[
                  "Hands-on work with senior engineers from day one",
                  "Mentorship paired with structured training",
                  "Exposure to real client problems across industries",
                  "Clear path into our Blue Labs AI accelerator",
                ].map((item) => (
                  <li key={item} className={styles.recruitListItem}>
                    <span className={styles.recruitBullet} aria-hidden="true"/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <h2 className={styles.ctaTitle}>Think you&apos;d be a fit?</h2>
            <p className={styles.ctaBody}>
              Browse open roles on Dice or send us a note about what you&apos;d like to work on — we&apos;ll start a conversation.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://www.dice.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                View Dice job postings <Icon name="externalLink" size={15}/>
              </a>
              <button type="button" className={styles.ctaSecondary} onClick={onContact}>
                Get in touch <Icon name="arrowRight" size={15}/>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
