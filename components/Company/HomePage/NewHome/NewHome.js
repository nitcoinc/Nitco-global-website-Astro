import React from "react";
import Link from "next/link";
import styles from "./NewHome.module.css";

const NewHome = () => {
  const programs = [
    {
      iconClass: "",
      label: "01",
      title: "Working Capital & Spend Integrity Program",
      body:
        "Improve working capital, increase billing and payment accuracy, and strengthen financial execution.",
      href: "/services",
    },
    {
      iconClass: "alt1",
      label: "02",
      title: "Manual Work & Workflow Automation Program",
      body:
        "Reduce manual work, streamline approvals, and automate document-driven processes.",
      href: "/services",
    },
    {
      iconClass: "alt2",
      label: "03",
      title: "Data & Decision Acceleration Program",
      body:
        "Turn scattered data into trusted metrics and faster, evidence-based decisions across leadership teams.",
      href: "/services",
    },
  ];

  const whyItems = [
    {
      n: "1",
      title: "We focus on business outcomes - not just technology",
      body:
        "We start with where your business is losing money, time, or clarity — not with tools.",
    },
    {
      n: "2",
      title: "We operate in the “messy middle”",
      body:
        "Most real work happens between systems — in documents, emails, and exceptions. That’s where we specialize.",
    },
    {
      n: "3",
      title: "We combine AI with real-world execution",
      body:
        "We apply AI where it helps — and combine it with structured logic and human oversight where it matters.",
    },
    {
      n: "4",
      title: "We deliver progress quickly",
      body:
        "Our programs are designed to move from insight to actionable next steps in weeks, not months.",
    },
  ];

  const outcomes = [
    "Reduced manual processing effort across operations by 50%+",
    "Identified significant working capital improvement opportunities",
    "Accelerated document-driven workflows across shared services",
    "Reduced reporting and decision cycle times",
    "Improved trust in key business metrics across leadership teams",
  ];

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Fix what’s slowing your business down —{" "}
            <span className={styles.heroAccent}>
              money leakage, operational drag, and decision friction.
            </span>
          </h1>
          <p className={styles.heroSub}>
            NITCO helps enterprises improve working capital, accelerate
            operations, and make faster decisions with AI-enabled execution.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/services" className={styles.btnPrimary}>
              Explore Solutions
            </Link>
            <Link href="/platform" className={styles.btnSecondary}>
              See How It Works
            </Link>
            <Link href="/contact" className={styles.btnGhost}>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT NITCO DOES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>What NITCO Does</div>
          <h2 className={styles.sectionTitle}>
            We focus on where business performance actually breaks — and fix it.
          </h2>
          <div className={styles.whatGrid}>
            <div>
              <p className={styles.sectionLead}>
                NITCO works at the intersection of financial execution,
                operational workflows, and business decision-making. We don’t
                just analyze problems — we help you move toward working
                solutions quickly.
              </p>
            </div>
            <div className={styles.venn} aria-hidden="true">
              <div className={`${styles.vennCircle} ${styles.vennC1}`}>
                Financial
                <br />
                Execution
              </div>
              <div className={`${styles.vennCircle} ${styles.vennC2}`}>
                Operational
                <br />
                Workflows
              </div>
              <div className={`${styles.vennCircle} ${styles.vennC3}`}>
                Business
                <br />
                Decision-Making
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CORE PROGRAMS */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.programsHead}>
            <div>
              <div className={styles.eyebrow}>Three Core Programs</div>
              <h2 className={styles.sectionTitle}>
                Drive better performance across finance, operations, and data.
              </h2>
            </div>
            <p className={styles.sectionLead}>
              Targeted programs designed to identify high-impact opportunities
              and move you from insight to implementation in weeks — not months.
            </p>
          </div>
          <div className={styles.programsGrid}>
            {programs.map((p) => (
              <div key={p.title} className={styles.programCard}>
                <div className={`${styles.programIcon} ${styles[p.iconClass] || ""}`}>
                  {p.label}
                </div>
                <h3 className={styles.programTitle}>{p.title}</h3>
                <p className={styles.programBody}>{p.body}</p>
                <Link href={p.href} className={styles.programLink}>
                  Know more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NITCO */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>Why NITCO?</div>
          <h2 className={styles.sectionTitle}>
            Turning vision into high-impact technology solutions.
          </h2>
          <div className={styles.whyGrid}>
            {whyItems.map((item) => (
              <div key={item.title} className={styles.whyItem}>
                <div className={styles.whyDot}>{item.n}</div>
                <div>
                  <div className={styles.whyTitle}>{item.title}</div>
                  <div className={styles.whyBody}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>Outcomes</div>
          <h2 className={styles.sectionTitle}>
            Real outcomes, not just recommendations.
          </h2>
          <div className={styles.outcomesGrid}>
            {outcomes.map((o) => (
              <div key={o} className={styles.outcomeItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{o}</span>
              </div>
            ))}
          </div>
          <p className={styles.outcomesNote}>
            We focus on measurable improvements — not just analysis.
          </p>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.engagementInner}>
            <div className={styles.eyebrow}>Engagement Model</div>
            <h2 className={styles.sectionTitle}>
              Start focused. Scale with confidence.
            </h2>
            <p className={styles.sectionLead}>
              Each of our programs is designed to identify high-impact
              opportunities, define a clear path forward, and enable quick
              progress toward implementation. You don’t need a massive
              transformation to get started.
            </p>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNum}>STEP 01</div>
                <div className={styles.stepTitle}>Identify</div>
                <div className={styles.stepBody}>
                  Pinpoint high-impact opportunities across finance, operations,
                  and decisions.
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>STEP 02</div>
                <div className={styles.stepTitle}>Define</div>
                <div className={styles.stepBody}>
                  Map out a clear path forward with measurable outcomes and
                  guardrails.
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNum}>STEP 03</div>
                <div className={styles.stepTitle}>Enable</div>
                <div className={styles.stepBody}>
                  Move quickly toward implementation with AI-enabled execution
                  and human oversight.
                </div>
              </div>
            </div>
            <div className={styles.engagementCta}>
              <Link href="/contact" className={styles.btnPrimary}>
                Get In Touch
              </Link>
              <span className={styles.engagementMicro}>
                Talk to a NITCO expert about your first focused engagement.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewHome;
