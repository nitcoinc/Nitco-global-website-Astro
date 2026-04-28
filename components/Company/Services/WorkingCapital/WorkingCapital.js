import React from "react";
import Link from "next/link";
import styles from "./WorkingCapital.module.css";

const WorkingCapital = () => {
  const whatYouGet = [
    "Clear view of working capital improvement opportunities",
    "Insights into billing and payment accuracy gaps",
    "Identification of spend integrity and control breakdowns",
    "Visibility into exception patterns and inefficiencies",
    "A prioritized roadmap to improve financial execution",
  ];

  const businessOutcomes = [
    {
      title: "Improved working capital performance",
      body: "Free up cash trapped in misaligned billing, payment timing, and exception cycles.",
    },
    {
      title: "Increased billing & payment accuracy",
      body: "Align invoices, POs, and contracts so payments reflect what was actually agreed.",
    },
    {
      title: "Stronger financial controls",
      body: "Tighten execution discipline across finance and procurement workflows.",
    },
    {
      title: "Reduced manual effort",
      body: "Cut down on exception handling, reviews, and re-work across teams.",
    },
    {
      title: "Clear path to automation",
      body: "Build a foundation that supports continuous process improvement and scale.",
    },
  ];

  const useCases = [
    "Invoice vs. PO vs. contract misalignment",
    "Missed payment discounts and inconsistent payment timing",
    "Supplier billing inconsistencies",
    "High volume of manual reviews and exceptions",
    "Limited visibility into finance and procurement execution gaps",
  ];

  const steps = [
    "Assess financial execution gaps",
    "Quantify improvement opportunities",
    "Define a clear path forward",
    "Implement the solution",
  ];

  return (
    <>
      {/* HERO — DARK */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
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
      </section>

      {/* THE PROBLEM — LIGHT */}
      <section className={styles.sectionLight}>
        <div className={styles.container}>
          <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>The Problem</div>
          <h2 className={styles.h2}>
            Most organizations believe their financial processes are under control — but in reality:
          </h2>
          <ul className={styles.bulletList}>
            <li>Billing and payments don’t always align with agreed terms</li>
            <li>Invoices, POs, and contracts drift out of sync</li>
            <li>Payment timing and discount capture are inconsistent</li>
            <li>Manual reviews and exceptions hide inefficiencies</li>
            <li>Finance and procurement lack clear visibility into execution gaps</li>
          </ul>
          <p className={styles.lead} style={{ marginTop: 28 }}>
            The result: working capital drag, avoidable inefficiencies, and reduced financial control.
          </p>
        </div>
      </section>

      {/* WHAT NITCO DOES — DARK */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>What NITCO Does</div>
          <h2 className={`${styles.h2} ${styles.h2Light}`}>
            We pinpoint where execution breaks — then move fast to fix it.
          </h2>
          <p className={`${styles.lead} ${styles.leadLight}`} style={{ marginTop: 14 }}>
            Working alongside your finance and procurement teams, we trace billing, payment, and supplier workflows end-to-end, surface the breakdowns that hide in exception cycles, and translate the findings into a sequenced plan you can act on.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET — LIGHT */}
      <section className={styles.sectionLight}>
        <div className={styles.container}>
          <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>What You Get</div>
          <h2 className={styles.h2}>Outputs you can act on from day one.</h2>
          <div className={styles.cardGrid}>
            {whatYouGet.map((item, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.cardNum}>{`0${i + 1}`}</div>
                <h3 className={styles.cardTitle}>{item}</h3>
              </div>
            ))}
          </div>
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
                <div className={styles.cardNum}>{`0${i + 1}`}</div>
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
          <ul className={styles.bulletList}>
            {useCases.map((u, i) => (
              <li key={i}>{u}</li>
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
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <div className={styles.step} key={i}>
                <div className={styles.stepNum}>{i + 1}</div>
                <p className={styles.stepText}>{s}</p>
              </div>
            ))}
          </div>
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
