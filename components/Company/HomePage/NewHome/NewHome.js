import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./NewHome.module.css";

const NewHome = () => {
  const whatGridRef = useRef(null);
  const [whatRevealed, setWhatRevealed] = useState(false);

  useEffect(() => {
    const el = whatGridRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setWhatRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWhatRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const iconWallet = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
  const iconGears = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <path d="M9 3v2M9 13v2M3 9h2M13 9h2M5.3 5.3l1.4 1.4M11.3 11.3l1.4 1.4M5.3 12.7l1.4-1.4M11.3 6.7l1.4-1.4" />
      <circle cx="16.5" cy="16.5" r="2.2" />
    </svg>
  );
  const iconChart = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V11M10 20V6M15 20v-7M20 20v-4" />
    </svg>
  );
  const iconBook = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
      <path d="M8 7h7M8 11h7" />
    </svg>
  );
  const iconHeadset = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.2" />
      <rect x="17" y="14" width="4" height="6" rx="1.2" />
      <path d="M20 20a3 3 0 0 1-3 3h-2" />
    </svg>
  );
  const iconRocket = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4c4 1 6 3 7 7-2 .4-3.5 1-5 2L9 20l-3-1-1-3 7-7c1-1.5 1.6-3 2-5z" />
      <circle cx="15" cy="9" r="1.4" />
      <path d="M5 19c-1 1-1 3-1 3s2 0 3-1" />
    </svg>
  );
  const iconShield = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );

  const programs = [
    {
      icon: iconWallet,
      title: "Working Capital & Spend Integrity",
      body: "Improve billing accuracy, payment execution, and working capital performance",
      cta: "Learn more",
    },
    {
      icon: iconGears,
      title: "Workflow Automation",
      body: "Eliminate manual effort and streamline exception-heavy processes",
      cta: "Talk to us about this",
    },
    {
      icon: iconChart,
      title: "Decision-Ready Data",
      body: "Turn fragmented data into trusted insight for faster decisions",
      cta: "Talk to us about this",
    },
    {
      icon: iconBook,
      title: "Employee Knowledge & Productivity",
      body: "Instant, context-aware answers across systems and documents",
      cta: "Talk to us about this",
    },
    {
      icon: iconHeadset,
      title: "Customer Support Optimization",
      body: "Reduce support cost and improve resolution times",
      cta: "Talk to us about this",
    },
    {
      icon: iconRocket,
      title: "AI Solution Delivery",
      body: "Turn AI ideas into production-ready workflow solutions",
      cta: "Talk to us about this",
    },
    {
      icon: iconShield,
      title: "AI Risk, Cost & Governance",
      body: "Ensure AI is secure, controlled, cost-effective, and scalable.",
      cta: "Talk to us about this",
    },
  ];

  const why = [
    {
      title: "We focus on business outcomes — not just technology",
      body:
        "We start with where your business is losing money, time, or clarity — not with tools.",
    },
    {
      title: "We operate in the “messy middle”",
      body:
        "Most real work happens between systems — in documents, emails, and exceptions. That’s where we specialize.",
    },
    {
      title: "We combine AI with real-world execution",
      body:
        "We apply AI where it helps — and combine it with structured logic and human oversight where it matters.",
    },
    {
      title: "We deliver progress quickly",
      body:
        "Our programs are designed to move from insight to actionable next steps in weeks, not months.",
    },
  ];

  const outcomes = [
    { text: "Reduced manual processing effort across operations by 50%+", image: "/images/HomePage/outcome-1.png" },
    { text: "Identified significant working capital improvement opportunities", image: "/images/HomePage/outcome-1.png" },
    { text: "Accelerated document-driven workflows across shared services", image: "/images/HomePage/outcome-1.png" },
    { text: "Reduced reporting and decision cycle times", image: "/images/HomePage/outcome-1.png" },
    { text: "Improved trust in key business metrics across leadership teams", image: "/images/HomePage/outcome-1.png" },
  ];
  const whatNitcoCards = [
    {
      title: "Financial Execution",
      body:
        "Fix working capital, payment accuracy & spend integrity at the workflow level to eliminate leakage.",
      img: "/images/HomePage/whatNitco-illustration.png",
    },
    {
      title: "Operational Workflows",
      body:
        "Compress cycle times across shared services & document-heavy workflows to match business pace.",
      img: "/images/HomePage/whatNitco-laptop.png",
    },
    {
      title: "Business Decision-Making",
      body:
        "Deliver decision-grade insights to leadership for faster, sharper, more reliable forecasting.",
      img: "/images/HomePage/whatNitco-analytics.png",
    },
  ];
  const [activeOutcome, setActiveOutcome] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          src="/HomeHero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>
            Fix what’s slowing your business down <br /> - money leakage, operational
            drag,<br /> and decision friction.
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
            <p className={styles.whatLead}>
              NITCO works at the intersection of Financial execution, Operational
              workflows, and Business decision-making
            </p>
          </div>

          <div
            ref={whatGridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
              marginTop: "22px",
            }}
          >
            {whatNitcoCards.map((card, idx) => (
              <article
                key={card.title}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 4px 16px rgba(15, 17, 64, 0.08)",
                  minHeight: "370px",
                  display: "flex",
                  flexDirection: "column",
                  opacity: whatRevealed ? 1 : 0,
                  transform: whatRevealed
                    ? "translateY(0)"
                    : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${idx * 140}ms`,
                  willChange: "opacity, transform",
                }}
              >
                <div style={{ padding: "22px 24px", flex: 1 }}>
                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontSize: "18px",
                      lineHeight: 1.2,
                      color: "#0b0f3a",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: 1.45,
                      color: "#111111",
                    }}
                  >
                    {card.body}
                  </p>
                </div>
                <div
                  style={{
                    background: "#16164C",
                    minHeight: "220px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      width: "70%",
                      maxHeight: "160px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </article>
            ))}
          </div>

          <p className={styles.whatFootNote}>
            We don’t just analyze problems — we help you move toward working
            solutions quickly.
          </p>
        </div>
      </section>

      {/* OUR PROGRAMS — icon card grid */}
      <section className={styles.programs}>
        <div className={styles.container}>
          <div className={styles.programsHead2}>
            <div className={styles.programsEyebrow}>Our Programs</div>
            <h2 className={styles.programsHeadline}>
              Targeted programs across finance, operations, data,
              knowledge, and AI.
            </h2>
          </div>
          <div className={styles.programsCardGrid}>
            {programs.map((p) => (
              <div key={p.title} className={styles.programCard2}>
                <div className={styles.programIcon}>{p.icon}</div>
                <h3 className={styles.programCardTitle}>{p.title}</h3>
                <p className={styles.programCardBody}>{p.body}</p>
                <Link href="/services" className={styles.programCardLink}>
                  {p.cta}
                  <span aria-hidden="true" className={styles.programCardArrow}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NITCO */}
      <section className={`${styles.why} bg-[#eef0ff]`}>
        <div className={styles.container}>
          <div className={styles.whyHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowCyan}`}>
              Why NITCO?
            </div>
            <h2 className={styles.whyH2}>
              Turning vision into high-impact technology solutions.
            </h2>
          </div>
          <div className={styles.whyList}>
            {why.map((w, i) => (
              <div key={w.title} className={styles.whyRow}>
                <div className={styles.whyNum}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className={styles.whyHeadline}>{w.title}</h3>
                <p className={styles.whyText}>{w.body}</p>
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
                {outcomes.map((o, i) => (
                  <li
                    key={o.text}
                    onMouseEnter={() => setActiveOutcome(i)}
                    className={i === activeOutcome ? styles.outcomesHighlight : ""}
                    style={{ cursor: "pointer" }}
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
              <img
                key={outcomes[activeOutcome].image}
                src={outcomes[activeOutcome].image}
                alt={outcomes[activeOutcome].text}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className={styles.engagement}>
        <div className={styles.container}>
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
        </div>
      </section>
    </>
  );
};

export default NewHome;
