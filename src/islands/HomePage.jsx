import { useState, useEffect, useRef } from "react";
import styles from "./HomePage.module.css";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const IC = { stroke: "#53eafd", strokeWidth: "2", fill: "none" };
const WalletIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" style={IC}/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" style={IC}/><circle cx="18" cy="12" r="2" style={IC}/>
  </svg>
);
const ActivityIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" style={IC}/>
  </svg>
);
const LineChartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18" style={IC}/><polyline points="18 9 13 14 9 10 5 14" style={IC}/>
  </svg>
);
const TrendingDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
  </svg>
);
const ShieldCheckIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const GaugeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 7 7"/><path d="M22 2 12 12"/>
  </svg>
);
const LightbulbIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>
);
const WorkflowIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/>
    <rect x="16" y="16" width="5" height="5" rx="1"/>
    <path d="M8 5.5h4a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2h0"/><path d="M11 19H5.5a2 2 0 0 1-2-2V10"/>
  </svg>
);
const BarChartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
);
const BookOpenIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const HeadsetIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11V7a9 9 0 0 1 18 0v4"/>
    <path d="M21 18a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 18a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const RocketIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const ZapIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const ClockIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const TargetIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const SearchCodeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m13 13.5 2-2.5-2-2.5"/><path d="m21 21-4.35-4.35"/>
    <path d="M11 13.5 9 11l2-2.5"/><circle cx="11" cy="11" r="8"/>
  </svg>
);
const CheckCircleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const QuoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);
const FileSearchIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <circle cx="11.5" cy="14.5" r="2.5"/><line x1="13.25" y1="16.25" x2="15" y2="18"/>
  </svg>
);

function scrollToId(id) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const pillars = [
  { accent: "#00FFFF", glow: "rgba(0,255,255,0.18)", Icon: WalletIcon,    label: "Financial Execution",      title: "Where money quietly leaks",         description: "Working capital release timing, payment accuracy, and spend integrity — fixed at the workflow level so the leakage stops, not just the report." },
  { accent: "#28BD5A", glow: "rgba(40,189,90,0.18)", Icon: GaugeIcon,     label: "Operations",                title: "Where work loses its speed",         description: "Cycle times across shared services and document-heavy workflows — compressed so operations move at the pace your business actually needs." },
  { accent: "#FFD700", glow: "rgba(255,215,0,0.18)", Icon: LightbulbIcon, label: "Business Decision Making",  title: "Where leaders lose conviction",      description: "Decision-grade signals delivered to leadership so reporting and forecasting cycles get faster, sharper, and more trusted." },
];

const programs = [
  { Icon: WalletIcon,      title: "Working Capital & Spend Integrity",  description: "Improve billing accuracy, payment execution, and working capital performance.", to: "/solutions/working-capital-spend-integrity" },
  { Icon: WorkflowIcon,    title: "Workflow Automation",                 description: "Eliminate manual effort and streamline exception-heavy processes.",             to: "/solutions/workflow-automation" },
  { Icon: BarChartIcon,    title: "Decision-Ready Data",                 description: "Turn fragmented data into trusted insight for faster decisions.",               to: "/solutions/decision-ready-data" },
  { Icon: BookOpenIcon,    title: "Employee Knowledge & Productivity",   description: "Instant, context-aware answers across systems and documents.",                  to: "/solutions/employee-knowledge-productivity" },
  { Icon: HeadsetIcon,     title: "Customer Support Optimization",       description: "Reduce support cost and improve resolution times.",                             to: "/solutions/customer-support-optimization" },
  { Icon: RocketIcon,      title: "AI Solution Delivery",                description: "Turn AI ideas into production-ready workflow solutions.",                       to: "/solutions/ai-solution-delivery" },
  { Icon: ShieldCheckIcon, title: "AI Risk, Cost & Governance",          description: "Ensure AI is secure, controlled, cost-effective, and scalable.",               to: "/solutions/ai-risk-cost-governance" },
];

const stats = [
  { Icon: ZapIcon,    value: "40–60%", label: "Less manual effort" },
  { Icon: WalletIcon, value: "2–4%",   label: "Working capital gain" },
  { Icon: ClockIcon,  value: "6–10 weeks", label: "To AI in production" },
];

const valueProps = [
  { Icon: TargetIcon,     title: "We focus on business outcomes — not just technology",   body: "We start with where your business is failing money, time, or clarity — not with tools." },
  { Icon: SearchCodeIcon, title: "We operate in the ‘messy middle’",             body: "Most real work happens between systems, in documents, emails, and exceptions. That’s where we specialize." },
  { Icon: ZapIcon,        title: "We combine AI with real-world execution",               body: "We apply AI where it helps — and combine it with structured logic and human oversight where it matters." },
  { Icon: ClockIcon,      title: "We deliver progress quickly",                           body: "Our programs are designed to move from insight to actionable next steps in weeks, not months." },
];

const metrics = [
  "Reduced manual processing effort across operations by 60%+",
  "Identified significant working capital improvement opportunities",
  "Accelerated document-driven workflows across shared services",
  "Reduced reporting and decision-cycle times",
  "Improved trust in key business metrics across leadership teams",
];

const kpiTiles = [
  { Icon: GaugeIcon,       value: "60%+", label: "Manual effort removed" },
  { Icon: WalletIcon,      value: "4x",   label: "Working capital opportunity" },
  { Icon: FileSearchIcon,  value: "5x",   label: "Faster document workflows" },
  { Icon: LineChartIcon,   value: "70%+", label: "Decision-cycle compression" },
  { Icon: ShieldCheckIcon, value: "95%",  label: "Leadership trust in metrics" },
];

const testimonials = [
  { quote: "NITCO did a tremendous job leading the integration and preparing us for go live. Their deep product knowledge, responsiveness, and commitment including weekend support were critical to the success of this highly visible implementation.", role: "Director of IT", company: "Industrial Equipment and Material Handling Company", tag: "Enterprise Integration" },
  { quote: "NITCO integrated our ERP and TMS platforms and automated our shipment workflows. We reduced manual effort, improved accuracy and now process global shipments faster than ever before.", role: "Sr. Director of Enterprise Applications", company: "Global Freight & Logistics Provider", tag: "Workflow Automation" },
  { quote: "What used to be a tedious, error-prone process is now fully automated. RPA and document intelligence transformed how we handle high-volume invoices — faster cycles, fewer mistakes and real-time insights.", role: "Finance Manager", company: "Global Food & Beverage Leader", tag: "Intelligent Automation" },
  { quote: "Their team helped us turn raw operational data into real insights. With tailored models and custom solutions, we've improved forecasting, reduced downtime and made faster, data-backed decisions.", role: "Program Manager", company: "Global Energy Company", tag: "Decision-Ready Data" },
  { quote: "Repetitive tasks that once slowed us down now run hands-free. With automation in place, our teams focus more on operations and less on paperwork.", role: "Automation Manager", company: "Global Chemicals Manufacturer", tag: "RPA" },
  { quote: "We brought together data from multiple systems into a single, reliable view. Integration simplified reporting, improved accuracy and gave our teams a clearer picture of performance across the business.", role: "IT Manager", company: "Leading Building Materials Provider", tag: "Enterprise Integration" },
  { quote: "The virtual assistant made resident support available 24/7. It answers questions, handles requests and creates a more responsive, connected experience for our communities.", role: "Sr Manager", company: "Property Management Company", tag: "Conversational AI" },
  { quote: "Our virtual assistant transformed onboard operations — streamlining staff tasks, handling requests and saving time across voyages. It’s like having a digital crew member that never sleeps.", role: "Manager", company: "Cruise Hospitality & Wellness", tag: "Conversational AI" },
];

const engagementSteps = [
  "Identify high-impact opportunities",
  "Define a clear path forward",
  "Enable quick progress toward implementation",
];

// ─── Hero Right-Panel Visual ───────────────────────────────────────────────────
function HeroVisual() {
  const lanes = [
    { label: "Money leakage",     Icon: WalletIcon,    value: 88 },
    { label: "Operational drag",  Icon: ActivityIcon,  value: 72 },
    { label: "Decision friction", Icon: LineChartIcon, value: 95 },
  ];
  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroCard}>
        <div className={styles.heroCardHeader}>
          <div className={styles.heroCardTitleRow}>
            <span className={styles.heroCardIconWrap}><ActivityIcon size={20} color="#53eafd" /></span>
            <div>
              <p className={styles.heroCardMeta}>Execution</p>
              <p className={styles.heroCardTitle}>Health overview</p>
            </div>
          </div>
          <span className={styles.heroCardBadge}><TrendingDownIcon /> drag</span>
        </div>
        <div className={styles.heroLanes}>
          {lanes.map(({ label, Icon, value }, i) => (
            <div key={label} className={styles.heroLane}>
              <div className={styles.heroLaneTop}>
                <div className={styles.heroLaneLabel}>
                  <div className={styles.heroLaneIcon}><Icon size={14} color="#53eafd" /></div>
                  <span>{label}</span>
                </div>
                <span className={styles.heroLanePct}>{value}%</span>
              </div>
              <div className={styles.heroBarBg}>
                <div className={styles.heroBarFill} style={{ "--bar-w": `${value}%`, animationDelay: `${0.4 + i * 0.15}s` }} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.heroCardFooter}>
          <span className={styles.heroCardFooterLabel}>Live signal</span>
          <span className={styles.heroCardFooterStatus}>
            <span className={styles.heroPingOuter} aria-hidden="true" />
            <span className={styles.heroPingInner} aria-hidden="true" />
            Active
          </span>
        </div>
      </div>
      <div className={styles.heroChipTopRight}>
        <div className={styles.heroChipRow}><TrendingDownIcon /><span className={styles.heroChipMeta}>Cycle time</span></div>
        <div className={styles.heroChipValue}>-42%<span className={styles.heroChipUnit}> qoq</span></div>
      </div>
      <div className={styles.heroChipBottomLeft}>
        <ShieldCheckIcon size={14} />
        <div>
          <p className={styles.heroChipMeta}>Leakage recovered</p>
          <p className={styles.heroChipTitle}>Quarter to date</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialTop}>
        <span className={styles.testimonialQuoteIcon}><QuoteIcon /></span>
        <span className={styles.testimonialTag}>{t.tag}</span>
      </div>
      <p className={styles.testimonialText}>{t.quote}</p>
      <div className={styles.testimonialFooter}>
        <p className={styles.testimonialRole}>{t.role}</p>
        <p className={styles.testimonialCompany}>{t.company}</p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function NewHome() {
  return (
    <div className={styles.root}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.gridTexture} aria-hidden="true" />
        <div className={styles.glowTopRight} aria-hidden="true" />
        <div className={styles.glowBottomLeft} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroH1}>Fix what&apos;s slowing your business down.</h1>
              <p className={styles.heroSub}>
                We help mid-market and enterprise companies eliminate{" "}
                <strong>money leakage</strong>,{" "}
                <strong>operational drag</strong>, and{" "}
                <strong>decision friction</strong>{" "}
                with targeted AI execution.
              </p>
              <div className={styles.heroCtas}>
                <button className={styles.ctaPrimary} onClick={() => scrollToId("command-center")}>
                  Explore Solutions <ArrowRight />
                </button>
                <button className={styles.ctaOutline} onClick={() => scrollToId("what-we-do")}>
                  See How It Works <ArrowRight />
                </button>
                <a href="/contact" className={styles.ctaCyan}>
                  Talk to an Expert <ArrowRight />
                </a>
              </div>
            </div>
            <div className={styles.heroVisualCol}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT NITCO DOES ── */}
      <section id="what-we-do" className={styles.what}>
        <div className={styles.gridTexture} aria-hidden="true" />
        <div className={styles.glowTopRight} aria-hidden="true" />
        <div className={styles.glowBottomLeft} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.whatHeader}>
            <div className={styles.whatHeadLeft}>
              <p className={styles.eyebrow}>What NITCO Does</p>
              <h2 className={styles.whatH2}>
                We focus on where business performance{" "}
                <span className={styles.gradientText}>actually breaks</span>{" "}
                — and fix it.
              </h2>
            </div>
            <p className={styles.whatSub}>
              NITCO works at three execution surfaces where mid-market and
              enterprise companies bleed value the fastest.
            </p>
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map(({ accent, glow, Icon, label, title, description }, idx) => (
              <article key={label} className={styles.pillarCard}>
                <div className={styles.pillarAccentLine} style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                <div className={styles.pillarHoverGlow} style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className={styles.pillarTop}>
                  <div className={styles.pillarIconWrap} style={{ borderColor: `${accent}33` }}>
                    <span style={{ color: accent }}><Icon size={24} /></span>
                  </div>
                  <span className={styles.pillarNum} style={{ color: accent }}>0{idx + 1}</span>
                </div>
                <p className={styles.pillarLabel}>{label}</p>
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p className={styles.pillarDesc}>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.synthBar}>
            <div className={styles.synthAccentLine} aria-hidden="true" />
            <div className={styles.synthText}>
              <p className={styles.eyebrowCyan}>The intersection</p>
              <p className={styles.synthHeadline}>
                We don&apos;t just analyze problems — we help you move toward working solutions quickly.
              </p>
            </div>
            <a href="#command-center" className={styles.synthCta}
              onClick={(e) => { e.preventDefault(); scrollToId("command-center"); }}>
              See the programs <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── CORE PROGRAMS ── */}
      <section id="command-center" className={styles.programs}>
        <div className={styles.container}>
          <div className={styles.programsHeader}>
            <p className={styles.eyebrowCyan}>Our Programs</p>
            <h2 className={styles.programsH2}>
              Targeted programs across finance, operations, data, knowledge, and AI.
            </h2>
          </div>
          <div className={styles.programsGrid}>
            {programs.map(({ Icon, title, description, to }, i) => (
              <a key={i} href={to} className={styles.programCard}>
                <span className={styles.programTopLine} aria-hidden="true" />
                <div className={styles.programIconWrap}><Icon size={28} /></div>
                <h3 className={styles.programTitle}>{title}</h3>
                <p className={styles.programDesc}>{description}</p>
                <span className={styles.programLearnMore}>Learn more <ArrowRight /></span>
              </a>
            ))}
            {/* Stats panel — spans 2 columns */}
            <div className={styles.statsPanel}>
              <div className={styles.statsGlow} aria-hidden="true" />
              <div className={styles.statsGrid}>
                {stats.map(({ Icon, value, label }) => (
                  <div key={label} className={styles.statItem}>
                    <span className={styles.statIconWrap}><Icon size={20} /></span>
                    <p className={styles.statValue}>{value}</p>
                    <p className={styles.statLabel}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NITCO ── */}
      <section id="solutions" className={styles.why}>
        <div className={styles.container}>
          <div className={styles.whyHeaderWrap}>
            <p className={styles.eyebrowCyan}>Why NITCO?</p>
            <h2 className={styles.whyH2}>Turning Vision into High-Impact Technology Solutions.</h2>
          </div>
          <div className={styles.whyGrid}>
            {valueProps.map(({ Icon, title, body }, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyIconWrap}><Icon size={24} /></div>
                <h3 className={styles.whyCardTitle}>{title}</h3>
                <p className={styles.whyCardBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section id="resources" className={styles.outcomes}>
        <div className={styles.outcomesBgWrap} aria-hidden="true">
          <img src="/images/HomePage/outcomes-image.png" alt="" className={styles.outcomesBgImg} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div className={styles.outcomesBgOverlay} />
        </div>
        <div className={styles.container}>
          <div className={styles.outcomesInner}>
            <div className={styles.outcomesLeft}>
              <p className={styles.eyebrowCyan}>Outcomes</p>
              <h2 className={styles.outcomesH2}>Real outcomes, not just recommendations.</h2>
              <ul className={styles.metricsList}>
                {metrics.map((m, i) => (
                  <li key={i} className={styles.metricItem}>
                    <span className={styles.metricIcon}><CheckCircleIcon size={22} /></span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.outcomesPull}>We focus on measurable improvements — not just analysis.</p>
            </div>
            <div className={styles.outcomesRight}>
              <div className={styles.kpiHeader}>
                <span className={styles.eyebrowCyan}>Engagement KPIs</span>
                <div className={styles.kpiDivider} />
                <span className={styles.kpiIndicative}>Indicative</span>
              </div>
              <div className={styles.kpiGrid}>
                {kpiTiles.map(({ Icon, value, label }, i) => (
                  <div key={i} className={`${styles.kpiTile}${i === kpiTiles.length - 1 ? " " + styles.kpiTileWide : ""}`}>
                    <div className={styles.kpiTileGlow} aria-hidden="true" />
                    <div className={styles.kpiTileTop}>
                      <div className={styles.kpiIconWrap}><Icon size={16} /></div>
                      <span className={styles.kpiTileNum}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className={styles.kpiValue}>{value}</div>
                    <div className={styles.kpiLabel}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialsEdgeLeft} aria-hidden="true" />
        <div className={styles.testimonialsEdgeRight} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.eyebrowCyan}>Client Stories</p>
          <h2 className={styles.testimonialsH2}>Trusted by Industry Leaders</h2>
        </div>
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeLeft}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard key={`r1-${i}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODEL ── */}
      <section id="engagement" className={styles.engagement}>
        <div className={styles.engagementBgWrap} aria-hidden="true">
          <img src="/images/HomePage/engagement-bg.jpg" alt="" className={styles.engagementBgImg} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div className={styles.engagementBgOverlay} />
        </div>
        <div className={styles.container}>
          <div className={styles.engagementCenter}>
            <p className={styles.eyebrowCyan}>Engagement Model</p>
            <h2 className={styles.engagementH2}>
              Start focused.<br />
              Scale with confidence.
            </h2>
            <p className={styles.engagementSub}>Each of our programs is designed to:</p>
            <div className={styles.stepsRow}>
              {engagementSteps.map((step, i) => (
                <div key={i} className={styles.stepCard}>
                  <span className={styles.stepNum} aria-hidden="true">0{i + 1}</span>
                  <h3 className={styles.stepTitle}>{step}</h3>
                </div>
              ))}
            </div>
            <p className={styles.engagementTagline}>You don&apos;t need a massive transformation to get started.</p>
            <a href="/contact" className={styles.engagementCta}>Get in Touch</a>
          </div>
        </div>
      </section>

    </div>
  );
}
