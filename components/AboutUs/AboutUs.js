import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AboutUs.module.css";

/* ===== Inline SVG icon set ===== */
const Icon = ({ name, size = 22, strokeWidth = 1.75 }) => {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    ...stroke,
  };
  switch (name) {
    case "building":
      return (
        <svg {...props}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
          <path d="M10 21v-4h4v4" />
        </svg>
      );
    case "arrowLeft":
      return (
        <svg {...props}>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "flask":
      return (
        <svg {...props}>
          <path d="M9 3h6" />
          <path d="M10 3v6.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V3" />
          <path d="M6.5 14h11" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="13" width="8" height="8" rx="2" />
          <path d="M11 7h4a2 2 0 0 1 2 2v4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...props}>
          <path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78 6 6 0 0 0-11.6 2.28A4 4 0 0 0 6 19h11.5z" />
        </svg>
      );
    case "database":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
        </svg>
      );
    default:
      return null;
  }
};

/* ===== CountUp (in-view triggered) ===== */
function CountUp({ to, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "-80px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ===== Hero Visual (floating cards) ===== */
function HeroVisual() {
  const capabilities = [
    { icon: "brain", label: "AI / ML" },
    { icon: "workflow", label: "RPA" },
    { icon: "cloud", label: "Cloud" },
    { icon: "database", label: "Data" },
  ];
  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroVisualGlow} aria-hidden="true" />

      {/* US chip */}
      <div className={`${styles.chip} ${styles.chipUS}`}>
        <span className={styles.chipIcon}>
          <Icon name="pin" size={16} />
        </span>
        <div>
          <p className={styles.chipEyebrow}>HQ</p>
          <p className={styles.chipLabel}>Houston, Texas</p>
        </div>
      </div>

      {/* India chip */}
      <div className={`${styles.chip} ${styles.chipIN}`}>
        <span className={styles.chipIcon}>
          <Icon name="pin" size={16} />
        </span>
        <div>
          <p className={styles.chipEyebrow}>India office</p>
          <p className={styles.chipLabel}>Hyderabad</p>
        </div>
      </div>

      {/* Main card */}
      <div className={styles.heroCard}>
        <div className={styles.heroCardHeader}>
          <div className={styles.heroCardBrand}>
            <span className={styles.heroCardBrandIcon}>
              <Icon name="globe" size={20} />
            </span>
            <div>
              <p className={styles.heroCardEyebrow}>NITCO Inc.</p>
              <p className={styles.heroCardTitle}>Global footprint</p>
            </div>
          </div>
          <span className={styles.heroCardEst}>
            <Icon name="spark" size={14} /> Est. 2008
          </span>
        </div>

        <svg viewBox="0 0 320 90" className={styles.heroArc} aria-hidden="true">
          <defs>
            <linearGradient id="hero-arc-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5d5cd6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5d5cd6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M20,70 Q160,-10 300,70 L300,90 L20,90 Z" fill="url(#hero-arc-fill)" />
          <path d="M20,70 Q160,-10 300,70" fill="none" stroke="#5d5cd6" strokeWidth="2" />
          <line x1="60" y1="58" x2="260" y2="58" stroke="rgba(27,225,242,0.45)" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="60" cy="58" r="4.5" fill="#1BE1F2" />
          <circle cx="60" cy="58" r="9" fill="rgba(27,225,242,0.18)" />
          <circle cx="260" cy="58" r="4.5" fill="#1BE1F2" />
          <circle cx="260" cy="58" r="9" fill="rgba(27,225,242,0.18)" />
        </svg>

        <div className={styles.capGrid}>
          {capabilities.map((c) => (
            <div key={c.label} className={styles.capTile}>
              <Icon name={c.icon} size={16} />
              <p>{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Data ===== */
const VALUES = [
  {
    icon: "users",
    title: "Customer-focused, customer-driven",
    description:
      "We deliver technology solutions through close collaboration with our clients — built around their goals, not ours.",
  },
  {
    icon: "flask",
    title: "Research and innovation",
    description:
      "We invest in researching and developing next-generation technologies so our clients stay ahead of the curve.",
  },
  {
    icon: "heart",
    title: "People and integrity",
    description:
      "We foster our people with technology, diversity, creativity, and integrity at the heart of how we work.",
  },
];

const LEADERSHIP = [
  {
    name: "Chandra Yatagiri",
    title: "CEO & Co-founder",
    bio: "Chandra, a co-founder of NITCO in 2008, has worked in the enterprise applications and services field since 1998. He is responsible for the company's vision and business execution.",
    image: "/images/leadership/chandra.jpg",
  },
  {
    name: "Shailender Pinnapureddy",
    title: "Managing Partner & Co-Founder",
    bio: "Shailender co-founded NITCO in 2008. He has more than 20 years of experience in the IT industry designing and building IT infrastructure for enterprise applications.",
    image: "/images/leadership/shailender.jpg",
  },
  {
    name: "Shakeel Muhammad, PhD",
    title: "Chief AI Strategy Officer",
    bio: "Shakeel is an accomplished technology leader with 20+ years of experience working at Fortune 500 companies across multiple industries.",
    image: "/images/leadership/shakeel.png",
  },
  {
    name: "Ashish Kashyap",
    title: "Chief AI & Data Officer",
    bio: "Ashish brings extensive experience in AI, analytics, and data platform modernization, with a strong focus on generative AI and agent-based solutions. At NITCO, he is responsible for shaping and operationalizing AI-driven transformation for clients.",
    image: "/images/leadership/ashish.jpg",
  },
  {
    name: "Lance Shealy",
    title: "Sales Director",
    bio: "Lance has extensive business development experience including product sales, consulting sales, software product management, and management consulting.",
    image: "/images/leadership/lance.jpg",
  },
  {
    name: "Brian Heck",
    title: "Business Development Manager",
    bio: "Brian has a strong background in technology sales and consulting, specializing in integration, EDI, RPA, and AI. He partners with organizations to deliver practical solutions that create lasting business value.",
    image: "/images/leadership/brian.jpg",
  },
];

function getInitials(name) {
  const cleaned = name.replace(/,.*$/, "").trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ===== Page ===== */
const AboutNew = () => {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            <Icon name="arrowLeft" size={16} />
            Back to home
          </Link>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeIcon}>
                  <Icon name="building" size={20} />
                </span>
                <span className={styles.heroBadgeText}>About</span>
              </div>

              <h1 className={styles.heroTitle}>
                Meet the faces, values &amp; vision behind NITCO Inc.
              </h1>

              <p className={styles.heroLead}>
                A technology company headquartered in Houston, Texas, with a
                global footprint — focused on aligning our clients&apos;
                organization and technology goals through pragmatic AI and
                digital transformation.
              </p>
            </div>

            <div className={styles.heroVisualWrap}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <span className={styles.eyebrow}>Our story</span>
              <h2 className={styles.h2}>
                Built on technical depth and client success.
              </h2>
            </div>
            <div className={styles.proseCol}>
              <p>
                Headquartered in Houston, Texas with a global footprint, NITCO
                brings deep expertise across RPA, AI, ML, NLP, Cloud,
                application integration, and infrastructure.
              </p>
              <p>
                Our leadership pairs technical depth with broad industry
                experience, so we deliver uncomplicated integrations that
                create value quickly — and keep innovating to exceed what our
                clients expect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NITCO – STATS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrow}>Why NITCO Inc.</span>
            <h2 className={styles.h2}>Experience that scales with you.</h2>
          </div>

          <div className={styles.statsGrid}>
            {[
              { target: 150, suffix: "+", label: "Employees" },
              { target: 15, suffix: "+", label: "Years of Experience" },
              { target: 100, suffix: "+", label: "Enterprise Solutions" },
            ].map((stat, idx) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statBar} aria-hidden="true" />
                <div className={styles.statNumber}>
                  <CountUp
                    to={stat.target}
                    suffix={stat.suffix}
                    duration={1.6 + idx * 0.15}
                  />
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrow}>What we stand for</span>
            <h2 className={styles.h2}>Three values that shape every engagement.</h2>
          </div>

          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueBar} aria-hidden="true" />
                <span className={styles.valueIcon}>
                  <Icon name={v.icon} size={24} />
                </span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR GOAL */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <span className={styles.eyebrow}>Our goal</span>
              <h2 className={styles.h2}>
                Vision and experience to power your success.
              </h2>
            </div>
            <div className={styles.proseCol}>
              <p>
                We provide the vision and experience to match your business
                needs to a customer-driven technical solution that powers your
                success.
              </p>
              <p>
                Our expertise across a wide range of organizational and
                technical domains — including RPA, AI, ML, and Cloud services
                — means we are adept at creating solutions that provide value
                quickly, where our clients need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHead}>
            <span className={styles.eyebrow}>Our leadership team</span>
            <h2 className={styles.h2}>The people behind NITCO.</h2>
          </div>

          <div className={styles.leaderGrid}>
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className={styles.leaderCard}>
                <span className={styles.leaderBar} aria-hidden="true" />
                <div className={styles.leaderHead}>
                  <span className={styles.leaderAvatar}>
                    <span className={styles.leaderInitials} aria-hidden="true">
                      {getInitials(leader.name)}
                    </span>
                    <Image src={leader.image} alt={leader.name} width={300} height={300} />
                  </span>
                  <div className={styles.leaderMeta}>
                    <h3 className={styles.leaderName}>{leader.name}</h3>
                    <p className={styles.leaderTitle}>{leader.title}</p>
                  </div>
                </div>
                <p className={styles.leaderBio}>{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>
              Together, we can drive AI-driven digital transformation.
            </h2>
            <p className={styles.ctaText}>
              Tell us where execution is breaking down. We&apos;ll come back
              with a clear, practical view of what&apos;s possible.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Get In Touch <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutNew;
