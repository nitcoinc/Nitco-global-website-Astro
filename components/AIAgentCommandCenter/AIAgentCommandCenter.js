import Link from "next/link";
import styles from "./AIAgentCommandCenter.module.css";

/* ── Inline SVG icons ── */
function Icon({ name, size = 20 }) {
  const base = {
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
  };
  const icons = {
    bot: <><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 15h.01M16 15h.01"/></>,
    shieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4"/>,
    messageSquare: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
    fileText: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    network: <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M7 17l-2 2M17 17l2 2M12 11l-5 6M12 11l5 6"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    play: <><polygon points="5 3 19 12 5 21 5 3"/></>,
    playCircle: <><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M20 2l.75 2.25L23 5l-2.25.75L20 8l-.75-2.25L17 5l2.25-.75z"/><path d="M4 16l.5 1.5L6 18l-1.5.5L4 20l-.5-1.5L2 18l1.5-.5z"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
  };
  return <svg {...base}>{icons[name] || <circle cx="12" cy="12" r="9"/>}</svg>;
}

/* ── data ── */
const ALL_AGENTS = [
  {
    icon: "shieldCheck",
    category: "Decision-Ready Data",
    title: "Data Quality Monitoring",
    description: "An agent for governed data quality scoring, trends, and root-cause insights.",
  },
  {
    icon: "messageSquare",
    category: "Decision-Ready Data",
    title: "Ask Your Data",
    description: "An agent for natural language data exploration that generates SQL, visualizes insights, and explains query logic.",
  },
  {
    icon: "fileText",
    category: "Working Capital & Spend Integrity",
    title: "Intelligent Document Mapping Agent",
    description: "An intelligent agent that extracts, maps, and standardizes data from documents, helping teams streamline workflows and improve data accuracy.",
  },
];

const HOW_IT_WORKS = [
  {
    icon: "target",
    step: "Select",
    title: "Identify the right AI agents",
    description: "Define objectives and select production-ready AI agents.",
  },
  {
    icon: "settings",
    step: "Configure",
    title: "Apply governance & controls",
    description: "Configure rules, workflows, and guardrails.",
  },
  {
    icon: "play",
    step: "Operate",
    title: "Run and scale",
    description: "Execute AI agents with real-time visibility.",
  },
];

const HERO_AGENTS = [
  { icon: "shieldCheck", name: "Data Quality Monitoring", state: "Running" },
  { icon: "messageSquare", name: "Ask Your Data", state: "Running" },
  { icon: "fileText", name: "Document Mapping", state: "Queued" },
];

const FOOTER_METRICS = [
  { label: "Governed", icon: "shieldCheck" },
  { label: "Observed", icon: "eye" },
  { label: "Scaled", icon: "network" },
];

/* ── Agent card ── */
function AgentCard({ agent, onContact }) {
  return (
    <div className={styles.agentCard}>
      <div className={styles.agentCardTopBar} aria-hidden="true" />
      <div className={styles.agentCardHoverFill} aria-hidden="true" />
      <div className={styles.agentCardSpotlight} aria-hidden="true" />

      <div className={styles.agentCardHead}>
        <div className={styles.agentIconBox}>
          <Icon name={agent.icon} size={22} />
        </div>
        <div>
          <p className={styles.agentCategory}>{agent.category}</p>
          <h3 className={styles.agentTitle}>{agent.title}</h3>
        </div>
      </div>

      <p className={styles.agentDesc}>{agent.description}</p>

      <div className={styles.agentActions}>
        <button type="button" className={styles.agentActionExplore} onClick={onContact}>
          Explore
          <Icon name="arrowRight" size={14} />
        </button>
        <span className={styles.agentActionDivider}>|</span>
        <button type="button" className={styles.agentActionLink} onClick={onContact}>
          <Icon name="playCircle" size={15} />
          Watch Video
        </button>
        <span className={styles.agentActionDivider}>|</span>
        <button type="button" className={styles.agentActionLink} onClick={onContact}>
          Talk to an Expert
        </button>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function AIAgentCommandCenter({ onContact }) {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlowTR} aria-hidden="true" />
        <div className={styles.heroGlowBL} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.heroInner}>
            <Link href="/" className={styles.backLink}>
              <Icon name="arrowLeft" size={16} />
              Back to home
            </Link>

            <div className={styles.heroLayout}>
              {/* Left: text */}
              <div>
                <div className={styles.heroEyebrow}>
                  <div className={styles.heroIconBox}>
                    <Icon name="bot" size={22} />
                  </div>
                  <p className={styles.heroLabel}>AI Agent Command Center</p>
                </div>
                <h1 className={styles.heroTitle}>
                  Operate AI Agents at Enterprise Scale
                </h1>
                <p className={styles.heroSubtitle}>
                  Centralized visibility, governance, and execution for
                  production-ready AI agents that drive real business outcomes.
                </p>
                <div className={styles.heroCtas}>
                  <button type="button" className={styles.ctaPrimary} onClick={onContact}>
                    Talk to an Expert
                    <Icon name="arrowRight" size={16} />
                  </button>
                  <a href="#all-agents" className={styles.ctaOutline}>
                    Explore agents
                  </a>
                </div>
              </div>

              {/* Right: hero command-center card */}
              <div className={styles.heroVisual}>
                <div className={styles.heroGlow} aria-hidden="true" />

                <div className={styles.heroCard}>
                  {/* Header */}
                  <div className={styles.heroCardHeader}>
                    <div className={styles.heroCardMeta}>
                      <div className={styles.heroCardIconBox}>
                        <Icon name="bot" size={18} />
                      </div>
                      <div>
                        <p className={styles.heroCardSub}>Command center</p>
                        <p className={styles.heroCardTitle}>Active agents</p>
                      </div>
                    </div>
                    <span className={styles.heroCardLive}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <circle cx="6" cy="6" r="4" fill="#53eafd" opacity="0.4"/>
                        <circle cx="6" cy="6" r="2" fill="#53eafd"/>
                      </svg>
                      live
                    </span>
                  </div>

                  {/* Agent rows */}
                  {HERO_AGENTS.map(({ icon, name, state }) => (
                    <div key={name} className={styles.agentRow}>
                      <div className={styles.agentRowLeft}>
                        <div className={styles.agentRowIcon}>
                          <Icon name={icon} size={13} />
                        </div>
                        <p className={styles.agentRowName}>{name}</p>
                      </div>
                      <span className={state === "Running" ? styles.agentStateRunning : styles.agentStateQueued}>
                        {state}
                      </span>
                    </div>
                  ))}

                  {/* Footer metrics */}
                  <div className={styles.heroCardFooter}>
                    {FOOTER_METRICS.map(({ label, icon }) => (
                      <div key={label} className={styles.footerMetric}>
                        <div style={{ color: "#53eafd", display: "flex", justifyContent: "center" }}>
                          <Icon name={icon} size={15} />
                        </div>
                        <p>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating top-right chip: Guardrails */}
                <div className={styles.chipTopRight}>
                  <div className={styles.chipHeader}>
                    <div style={{ color: "#53eafd" }}><Icon name="shieldCheck" size={13} /></div>
                    <p className={styles.chipLabel}>Guardrails</p>
                  </div>
                  <div className={styles.chipBar}>
                    <div className={styles.chipBarFill} style={{ width: "94%" }} />
                  </div>
                </div>

                {/* Floating bottom-left chip: Execution */}
                <div className={styles.chipBottomLeft}>
                  <div className={styles.chipRow}>
                    <div style={{ color: "#fde68a" }}><Icon name="activity" size={13} /></div>
                    <div>
                      <p className={styles.chipValueLabel}>Execution</p>
                      <p className={styles.chipValue}>Real-time visibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL AGENTS ── */}
      <section id="all-agents" className={styles.agentsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Explore Our AI Agents</p>
            <h2 className={styles.sectionTitle}>
              Production-ready AI agents designed for governed, enterprise-scale execution.
            </h2>
          </div>
          <div className={styles.agentsGrid}>
            {ALL_AGENTS.map((agent) => (
              <AgentCard key={agent.title} agent={agent} onContact={onContact} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS + CTA ── */}
      <section id="how-it-works" className={styles.howSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>How Agent Command Center Works</p>
            <h2 className={styles.sectionTitle}>
              From configuration to execution — managed through a single governed control layer.
            </h2>
          </div>

          <div className={styles.stepsRow}>
            <div className={styles.stepConnector} aria-hidden="true" />
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className={styles.stepCard}>
                <div className={styles.stepIconWrap}>
                  <div className={styles.stepIconCircle}>
                    <Icon name={step.icon} size={22} />
                  </div>
                  <span className={styles.stepNum}>{i + 1}</span>
                </div>
                <p className={styles.stepEyebrow}>{step.step}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerGlow} aria-hidden="true" />
            <div className={styles.ctaBannerLayout}>
              <div>
                <div className={styles.ctaKickerRow}>
                  <div style={{ color: "#53eafd" }}><Icon name="sparkles" size={14} /></div>
                  <p className={styles.ctaKickerText}>Start Automating Now</p>
                </div>
                <h3 className={styles.ctaTitle}>
                  Let&apos;s collaborate and co-create the future of AI-driven operations.
                </h3>
              </div>
              <div className={styles.ctaActions}>
                <button type="button" className={styles.ctaPrimary} onClick={onContact}>
                  Get In Touch
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
