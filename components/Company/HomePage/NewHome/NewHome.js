import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./NewHome.module.css";

const NewHome = () => {
  const programsRef = useRef(null);
  const [activeProgram, setActiveProgram] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = programsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      // progress: 0 when section just hits top of viewport, 1 when bottom passes
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const next = Math.min(2, Math.floor(progress * 3));
      setActiveProgram((prev) => (prev === next ? prev : next));
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
      icon: "★",
      title: "We focus on business outcomes — not just technology",
      body:
        "We start with where your business is losing money, time, or clarity — not with tools.",
    },
    {
      cls: "whyC2",
      icon: "↗",
      title: "We operate in the “messy middle”",
      body:
        "Most real work happens between systems — in documents, emails, and exceptions. That’s where we specialize.",
    },
    {
      cls: "whyC3",
      icon: "⚙",
      title: "We combine AI with real-world execution",
      body:
        "We apply AI where it helps — and combine it with structured logic and human oversight where it matters.",
    },
    {
      cls: "whyC4",
      icon: "✦",
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

          <div className={styles.vennWrap} aria-hidden="true">
            <div className={`${styles.vennCircle} ${styles.vennC1}`}>
              Financial<br />Execution
            </div>
            <div className={`${styles.vennCircle} ${styles.vennC2}`}>
              Operational<br />Workflows
            </div>
            <div className={`${styles.vennCircle} ${styles.vennC3}`}>
              Business<br />Decision-Making
            </div>
            <div className={styles.vennLogo}>NITCO</div>
          </div>

          <p className={styles.whatFootNote}>
            We don’t just analyze problems — we help you move toward working
            solutions quickly.
          </p>
        </div>
      </section>

      {/* THREE CORE PROGRAMS — pinned scroll */}
      <section className={styles.programs}>
        <div className={styles.programsScroll} ref={programsRef}>
          <div className={styles.programsSticky}>
            <div className={styles.container}>
              <div className={styles.programsGrid}>
                <div className={styles.programsHead}>
                  <div className={styles.programsEyebrow}>
                    Three Core Programs
                  </div>
                  <h2 className={styles.h2}>
                    Drive better performance across finance, operations, and
                    data with these targeted programs.
                  </h2>
                </div>
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
                <div className={styles.programsList}>
                  {programs.map((p, i) => (
                    <div
                      key={p.title}
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
                <div className={styles.whyIcon}>{w.icon}</div>
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
