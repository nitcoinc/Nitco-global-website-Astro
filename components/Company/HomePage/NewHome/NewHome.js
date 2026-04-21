import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./NewHome.module.css";

const NewHome = () => {
  const programCardRefs = useRef([]);
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const cards = programCardRefs.current.filter(Boolean);
      if (!cards.length) return;
      // Pick the card whose center is closest to viewport center
      const viewportMid = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - viewportMid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      setActiveProgram((prev) => (prev === bestIdx ? prev : bestIdx));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const programs = [
    {
      img: "/images/HomePage/AIBanner02.webp",
      title: "Working Capital & Spend Integrity Program",
      body:
        "Improve working capital, increase billing and payment accuracy, and strengthen financial execution.",
    },
    {
      img: "/images/HomePage/automationHomePlatform.webp",
      title: "Manual Work & Workflow Automation Program",
      body:
        "Reduce manual work, streamline approvals, and automate document-driven processes.",
    },
    {
      img: "/images/HomePage/Discover_AI.webp",
      title: "Data & Decision Acceleration Program",
      body:
        "Turn scattered data into trusted metrics and faster, evidence-based decisions across teams.",
    },
  ];

  const why = [
    {
      cls: "whyC1",
      iconColor: "#6C6CD3",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="6" />
          <circle cx="11" cy="11" r="2" fill="currentColor" stroke="none" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
      ),
      title: "We focus on business outcomes - not just technology",
      body:
        "We start with where your business is losing money, time, or clarity — not with tools.",
    },
    {
      cls: "whyC2",
      iconColor: "#18C4BF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h4l3 4" />
          <path d="M14 17h4" />
          <path d="M14 7h4l-3 4-3 4-3-4" />
          <path d="M18 4l3 3-3 3" />
          <path d="M18 14l3 3-3 3" />
        </svg>
      ),
      title: "We operate in the “messy middle”",
      body:
        "Most real work happens between systems — in documents, emails, and exceptions. That’s where we specialize.",
    },
    {
      cls: "whyC3",
      iconColor: "#18C4BF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.6 2.2 2.7-.4.4 2.7L19 8l-1.3 2.4 1.3 2.4-2.3 1.5-.4 2.7-2.7-.4L12 19l-1.6-2.4-2.7.4-.4-2.7L5 13.2 6.3 10.8 5 8.4l2.3-1.5L7.7 4.2l2.7.4z" />
          <text x="12" y="13.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" stroke="none">AI</text>
        </svg>
      ),
      title: "We combine AI with real-world execution",
      body:
        "We apply AI where it helps — and combine it with structured logic and human oversight where it matters.",
    },
    {
      cls: "whyC4",
      iconColor: "#6C6CD3",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
        </svg>
      ),
      title: "We deliver progress quickly",
      body:
        "Our programs are designed to move from insight to actionable next steps in weeks, not months.",
    },
  ];

  const outcomes = [
    { text: "Reduced manual processing effort across operations by 50%+", highlight: true },
    { text: "Identified significant working capital improvement opportunities" },
    { text: "Accelerated document-driven workflows across shared services" },
    { text: "Reduced reporting and decision cycle times" },
    { text: "Improved trust in key business metrics across leadership teams" },
  ];

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>
            Fix what’s slowing your business down — money leakage, operational
            drag, and decision friction.
          </h1>
          <p className={styles.heroSub}>
            NITCO helps enterprises improve working capital, accelerate
            operations, and make faster decisions with AI-enabled execution.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/services" className={`${styles.btn} ${styles.btnPink}`}>
              Explore Solutions
            </Link>
            <Link href="/platform" className={`${styles.btn} ${styles.btnDark}`}>
              See How It Works
            </Link>
            <Link href="/contact" className={`${styles.btn} ${styles.btnOutlinePink}`}>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT NITCO DOES */}
      <section className={styles.what}>
        <div className={styles.container}>
          <div className={styles.whatHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              What NITCO Does
            </div>
            <h2 className={styles.h2}>
              We focus on where business performance actually breaks — and fix it.
            </h2>
            <p className={styles.whatLead}>NITCO works at the intersection of:</p>
          </div>

          <div className={styles.vennWrap}>
            <img
              src="/images/HomePage/venn-diagram-v2.png"
              alt="NITCO works at the intersection of Financial Execution, Operational Workflows, and Business Decision-Making"
              className={styles.vennImg}
            />
          </div>

          <p className={styles.whatFootNote}>
            We don’t just analyze problems — we help you move toward working
            solutions quickly.
          </p>
        </div>
      </section>

      {/* THREE CORE PROGRAMS — sticky heading, stacked cards */}
      <section className={styles.programs}>
        <div className={styles.container}>
          <div className={styles.programsGrid}>
            <div className={styles.programsHeadCol}>
              <div className={styles.programsHeadInner}>
                <div className={styles.programsEyebrow}>
                  Three Core Programs
                </div>
                <h2 className={styles.h2}>
                  Drive better performance across finance, operations, and
                  data with these targeted programs.
                </h2>
              </div>
            </div>
            <div className={styles.progressCol}>
              <div className={styles.progressBar} aria-hidden="true">
                {programs.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.progressDot} ${
                      i === activeProgram ? styles.progressDotActive : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.programsList}>
              {programs.map((p, i) => (
                <div
                  key={p.title}
                  ref={(el) => (programCardRefs.current[i] = el)}
                  className={`${styles.programCard} ${
                    i === activeProgram ? styles.programCardActive : ""
                  }`}
                >
                  <div
                    className={styles.programImg}
                    style={{ backgroundImage: `url(${p.img})` }}
                    aria-hidden="true"
                  />
                  <div className={styles.programBody}>
                    <h3 className={styles.programTitle}>{p.title}</h3>
                    <p className={styles.programDesc}>{p.body}</p>
                    <Link href="/services" className={styles.programBtn}>
                      Know more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY NITCO */}
      <section className={styles.why}>
        <div className={styles.container}>
          <div className={styles.whyHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
              Why NITCO?
            </div>
            <h2 className={styles.h2}>
              Turning Vision into High-Impact Technology Solutions
            </h2>
          </div>
          <div className={styles.whyGrid}>
            {why.map((w) => (
              <div key={w.title} className={`${styles.whyCard} ${styles[w.cls]}`}>
                <div className={styles.whyIcon} style={{ color: w.iconColor }}>{w.icon}</div>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className={styles.outcomes}>
        <div className={styles.container}>
          <div className={styles.outcomesGrid}>
            <div className={styles.outcomesHead}>
              <div className={styles.eyebrow}>Outcomes</div>
              <h2 className={`${styles.h2} ${styles.h2Light}`}>
                Real outcomes,<br />not just recommendations
              </h2>
              <ul className={styles.outcomesList}>
                {outcomes.map((o) => (
                  <li
                    key={o.text}
                    className={o.highlight ? styles.outcomesHighlight : ""}
                  >
                    {o.text}
                  </li>
                ))}
              </ul>
              <p className={styles.outcomesNote}>
                We focus on measurable improvements — not just analysis.
              </p>
            </div>
            <div className={styles.videoBox}>
              <button className={styles.playBtn} aria-label="Play video">▶</button>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className={styles.engagement}>
        <div className={styles.container}>
          <div className={styles.engagementGrid}>
            <div className={styles.engagementHead}>
              <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
                Engagement Model
              </div>
              <h2 className={styles.h2}>Start focused. Scale with confidence.</h2>
              <p className={styles.engagementMicro}>
                Each of our programs is designed to:
              </p>
              <ul className={styles.engagementList}>
                <li>Identify high-impact opportunities</li>
                <li>Define a clear path forward</li>
                <li>And enable quick progress toward implementation</li>
              </ul>
              <p className={styles.engagementMicro}>
                You don’t need a massive transformation to get started.
              </p>
              <Link href="/contact" className={`${styles.btn} ${styles.btnPink}`}>
                Get In Touch
              </Link>
            </div>
            <div className={styles.starsPanel} aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
};

export default NewHome;
