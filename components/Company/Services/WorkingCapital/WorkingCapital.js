import React from "react";
import Link from "next/link";
import styles from "./WorkingCapital.module.css";

/* ===== Inline SVG icon set (consistent stroke style) ===== */
const Icon = ({ name, size = 22 }) => {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const props = { width: size, height: size, viewBox: "0 0 24 24", ...stroke };
  switch (name) {
    case "alert":
      return (
        <svg {...props}>
          <path d="M12 3 2 20h20L12 3z" />
          <path d="M12 10v5" />
          <circle cx="12" cy="18" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18" />
          <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "shieldCheck":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "magnifier":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...props}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
          <path d="M9 3v16M15 5v16" />
        </svg>
      );
    case "chartUp":
      return (
        <svg {...props}>
          <path d="M3 20h18" />
          <path d="m4 16 5-5 4 3 7-8" />
          <path d="M16 6h4v4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
        </svg>
      );
    case "cogs":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09c0 .66.39 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.26.61.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h6" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M5 19c2-1 4-2 5-3 3-3 6-9 12-13-1 6-3 9-6 12-1 1-2 3-3 5l-3-1z" />
          <path d="M9 15a3 3 0 0 0-3 3l-2 2 4-1a3 3 0 0 0 3-3" />
          <circle cx="15" cy="9" r="1.2" />
        </svg>
      );
    case "image":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m4 18 5-5 4 4 3-3 4 4" />
        </svg>
      );
    default:
      return null;
  }
};

const WorkingCapital = () => {
  const problems = [
    { icon: "alert", text: "Billing and payments don’t always align with agreed terms" },
    { icon: "doc", text: "Invoices, POs, and contracts drift out of sync" },
    { icon: "wallet", text: "Payment timing and discount capture are inconsistent" },
    { icon: "cogs", text: "Manual reviews and exceptions hide inefficiencies" },
    { icon: "eye", text: "Finance and procurement lack clear visibility into execution gaps" },
  ];

  const whatYouGet = [
    { icon: "magnifier", title: "Working capital improvement opportunities", body: "A clear view of where cash is trapped and how to release it." },
    { icon: "shieldCheck", title: "Billing & payment accuracy gaps", body: "Pinpoint where invoices, POs, and contracts fall out of sync." },
    { icon: "lock", title: "Spend integrity & control breakdowns", body: "Identify where execution discipline weakens across procurement." },
    { icon: "eye", title: "Exception patterns & inefficiencies", body: "Surface the recurring issues that quietly drain finance teams." },
    { icon: "map", title: "Prioritized roadmap", body: "A sequenced plan to fix execution and lift financial performance." },
  ];

  const businessOutcomes = [
    { icon: "chartUp", title: "Improved working capital performance", body: "Free up cash trapped in misaligned billing, payment timing, and exception cycles." },
    { icon: "shieldCheck", title: "Increased billing & payment accuracy", body: "Align invoices, POs, and contracts so payments reflect what was actually agreed." },
    { icon: "lock", title: "Stronger financial controls", body: "Tighten execution discipline across finance and procurement workflows." },
    { icon: "spark", title: "Reduced manual effort", body: "Cut down on exception handling, reviews, and re-work across teams." },
    { icon: "cogs", title: "Clear path to automation", body: "Build a foundation that supports continuous process improvement and scale." },
  ];

  const useCases = [
    { icon: "doc", text: "Invoice vs. PO vs. contract misalignment" },
    { icon: "wallet", text: "Missed payment discounts and inconsistent payment timing" },
    { icon: "alert", text: "Supplier billing inconsistencies" },
    { icon: "cogs", text: "High volume of manual reviews and exceptions" },
    { icon: "eye", text: "Limited visibility into finance and procurement execution gaps" },
  ];

  const steps = [
    { icon: "magnifier", text: "Assess financial execution gaps" },
    { icon: "chartUp", text: "Quantify improvement opportunities" },
    { icon: "map", text: "Define a clear path forward" },
    { icon: "rocket", text: "Implement the solution" },
  ];

  return (
    <>
      {/* HERO — DARK */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>Working Capital &amp; Spend Integrity Program</div>
              <h1 className={styles.heroTitle}>
                Improve working capital, increase billing and payment accuracy, and strengthen financial execution.
              </h1>
              <p className={styles.heroSub}>
                A focused engagement that helps finance and procurement leaders fix where billing, payment execution, and supplier interactions aren’t operating as intended — and define a clear path to fix it.
              </p>
              <Link href="/contact" className={`${styles.btn} ${styles.btnPink}`}>
                Get In Touch
              </Link>
            </div>
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.heroOrb} />
              <div className={styles.heroRing} />
              <div className={styles.heroCard}>
                <div className={styles.heroCardRow}>
                  <span className={styles.heroCardIcon}><Icon name="wallet" size={18} /></span>
                  <div>
                    <div className={styles.heroCardLabel}>Working Capital</div>
                    <div className={styles.heroCardValue}>+18% released</div>
                  </div>
                </div>
                <div className={styles.heroCardRow}>
                  <span className={styles.heroCardIcon}><Icon name="shieldCheck" size={18} /></span>
                  <div>
                    <div className={styles.heroCardLabel}>Billing Accuracy</div>
                    <div className={styles.heroCardValue}>99.2%</div>
                  </div>
                </div>
                <div className={styles.heroCardRow}>
                  <span className={styles.heroCardIcon}><Icon name="spark" size={18} /></span>
                  <div>
                    <div className={styles.heroCardLabel}>Manual Exceptions</div>
                    <div className={styles.heroCardValue}>−42%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM — LAVENDER */}
      <section className={styles.sectionLavender}>
        <div className={styles.container}>
          <div className={styles.problemGrid}>
            <div className={styles.problemCopy}>
              <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>The Problem</div>
              <h2 className={styles.h2}>
                Most organizations believe their financial processes are under control — but in reality, they aren’t.
              </h2>
              <p className={styles.lead}>
                Hidden execution gaps quietly drag on working capital, accuracy, and control across finance and procurement.
              </p>
              <div className={styles.problemFooter}>
                <span className={styles.problemFooterIcon}><Icon name="alert" size={18} /></span>
                <span className={styles.problemFooterText}>
                  The result: working capital drag, avoidable inefficiencies, and reduced financial control.
                </span>
              </div>
            </div>
            <div className={styles.problemStack}>
              {problems.map((p, i) => (
                <div className={styles.problemCard} key={i}>
                  <span className={styles.problemCardIcon}><Icon name={p.icon} size={20} /></span>
                  <div className={styles.problemCardBody}>
                    <div className={styles.problemCardKicker}>{`Issue 0${i + 1}`}</div>
                    <p className={styles.problemCardText}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT NITCO DOES — DARK, 2-col with illustration */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div className={styles.splitCopy}>
              <div className={styles.eyebrow}>What NITCO Does</div>
              <h2 className={`${styles.h2} ${styles.h2Light}`}>
                We pinpoint where execution breaks — then move fast to fix it.
              </h2>
              <p className={`${styles.lead} ${styles.leadLight}`} style={{ marginTop: 14 }}>
                Working alongside your finance and procurement teams, we trace billing, payment, and supplier workflows end-to-end, surface the breakdowns that hide in exception cycles, and translate the findings into a sequenced plan you can act on.
              </p>
              <ul className={`${styles.iconList} ${styles.iconListLight}`} style={{ marginTop: 8 }}>
                <li>
                  <span className={styles.iconListIcon}><Icon name="magnifier" size={18} /></span>
                  <span>End-to-end workflow tracing across finance &amp; procurement</span>
                </li>
                <li>
                  <span className={styles.iconListIcon}><Icon name="chartUp" size={18} /></span>
                  <span>Quantified opportunities tied to working capital impact</span>
                </li>
                <li>
                  <span className={styles.iconListIcon}><Icon name="rocket" size={18} /></span>
                  <span>Fast path from insight to implemented solution</span>
                </li>
              </ul>
            </div>
            <div className={styles.splitVisual} aria-hidden="true">
              <div className={styles.imagePlaceholder}>
                <Icon name="image" size={36} />
                <span className={styles.imagePlaceholderLabel}>Image placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET — LAVENDER, numbered editorial rows */}
      <section className={styles.sectionLavender}>
        <div className={styles.container}>
          <div className={styles.getHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>What You Get</div>
            <h2 className={styles.h2}>Outputs you can act on from day one.</h2>
          </div>
          <ol className={styles.getList}>
            {whatYouGet.map((item, i) => (
              <li className={styles.getRow} key={i}>
                <div className={styles.getNum}>{`0${i + 1}`}</div>
                <div className={styles.getIconWrap}>
                  <span className={styles.getIcon}><Icon name={item.icon} size={22} /></span>
                </div>
                <div className={styles.getContent}>
                  <h3 className={styles.getTitle}>{item.title}</h3>
                  <p className={styles.getBody}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BUSINESS OUTCOMES — DARK */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>Business Outcomes</div>
          <h2 className={`${styles.h2} ${styles.h2Light}`}>
            Measurable impact across finance and procurement.
          </h2>
          <div className={styles.cardGrid}>
            {businessOutcomes.map((o, i) => (
              <div className={styles.cardDark} key={i}>
                <span className={`${styles.cardIcon} ${styles.cardIconDark}`}><Icon name={o.icon} size={22} /></span>
                <h3 className={styles.cardTitle}>{o.title}</h3>
                <p className={styles.cardBody}>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPICAL USE CASES — LIGHT */}
      <section className={styles.sectionLight}>
        <div className={styles.container}>
          <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>Typical Use Cases</div>
          <h2 className={styles.h2}>Where this engagement delivers the most value.</h2>
          <ul className={`${styles.iconList} ${styles.iconListTwoCol}`}>
            {useCases.map((u, i) => (
              <li key={i}>
                <span className={styles.iconListIcon}><Icon name={u.icon} size={18} /></span>
                <span>{u.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT STARTS — DARK */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>How It Starts</div>
          <h2 className={`${styles.h2} ${styles.h2Light}`}>
            A focused engagement — not a massive transformation.
          </h2>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li className={styles.step} key={i}>
                <div className={styles.stepHead}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span className={styles.stepIcon}><Icon name={s.icon} size={20} /></span>
                </div>
                <p className={styles.stepText}>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className={styles.startsFooter}>
            <p className={styles.startsNote}>
              No large transformation required to begin. Start focused. Scale with confidence.
            </p>
            <Link href="/contact" className={`${styles.btn} ${styles.btnPink}`}>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkingCapital;
