import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PARTNER_CATEGORIES } from "../../lib/partnersData";
import styles from "./PartnerPage.module.css";

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
    cloud: <><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></>,
    network: <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M7 17l-2 2M17 17l2 2M12 11l-5 6M12 11l5 6"/></>,
    bot: <><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 15h.01M16 15h.01"/></>,
    messages: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    brain: <path d="M12 5a7 7 0 017 7c0 2.5-1.5 5-3.5 6.5V20a1 1 0 01-2 0v-1.5A7 7 0 0112 5zm0 0V3m-4 9H5m14 0h-3M9.5 9.5l-2-2m7 2l2-2M9.5 14.5l-2 2m7-2l2 2"/>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    cog: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    shieldCheck: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4"/>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    gitBranch: <><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></>,
    plug: <><path d="M7 16H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/><polyline points="7 12 12 17 17 12"/></>,
    workflow: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"/></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>,
    lineChart: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    scrollText: <><path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 01-4 0V5a2 2 0 00-2-2H4a2 2 0 00-2 2v3h6"/><path d="M19 3H8.5A2.5 2.5 0 006 5.5v0A2.5 2.5 0 008.5 8H20v13"/><line x1="10" y1="12" x2="16" y2="12"/><line x1="10" y1="16" x2="14" y2="16"/></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M20 2l.75 2.25L23 5l-2.25.75L20 8l-.75-2.25L17 5l2.25-.75z"/><path d="M4 16l.5 1.5L6 18l-1.5.5L4 20l-.5-1.5L2 18l1.5-.5z"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    bookOpen: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  };
  return <svg {...p}>{paths[name] || <circle cx="12" cy="12" r="9"/>}</svg>;
}

/* ── Partner logo with img → fallback ── */
function PartnerLogo({ partner, boxClass, fallbackClass }) {
  const [errored, setErrored] = useState(false);
  const showImg = !!partner.domain && !errored;
  return (
    <div className={boxClass}>
      {showImg ? (
        <Image
          src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`}
          alt=""
          width={32}
          height={32}
          onError={() => setErrored(true)}
          unoptimized
        />
      ) : (
        <div className={fallbackClass}>
          <Icon name={partner.fallbackIcon || "cloud"} size={22}/>
        </div>
      )}
    </div>
  );
}

/* ── Orbital hero visual ── */
function HeroVisual({ category }) {
  const n = category.partners.length;
  const cx = 50, cy = 50, r = 36;
  const angleFor = (i) => {
    if (n <= 1) return -Math.PI / 2;
    if (n === 2) return i === 0 ? Math.PI : 0;
    return -Math.PI / 2 + (i * 2 * Math.PI) / n;
  };
  const round = (v) => Math.round(v * 1000) / 1000;
  const points = category.partners.map((_, i) => {
    const a = angleFor(i);
    return { x: round(cx + r * Math.cos(a)), y: round(cy + r * Math.sin(a)) };
  });
  const gradId = `grad-${category.slug}`;

  return (
    <div className={styles.heroVisual}>
      <div className={styles.orbitalWrap}>
        <div className={styles.orbitalBg}/>
        <div className={styles.orbitalGlow}/>

        <svg className={styles.orbitalSvg} viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(83,234,253,0.55)"/>
              <stop offset="100%" stopColor="rgba(83,234,253,0.05)"/>
            </linearGradient>
          </defs>
          {/* outer orbit ring dots */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / 12;
            return (
              <circle key={i}
                cx={Math.round((cx + r * Math.cos(a)) * 1000) / 1000}
                cy={Math.round((cy + r * Math.sin(a)) * 1000) / 1000}
                r="0.4" fill="rgba(83,234,253,0.2)"/>
            );
          })}
          {/* inner ring dots */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 2 * Math.PI) / 24;
            const ri = 22;
            return (
              <circle key={`i${i}`}
                cx={Math.round((cx + ri * Math.cos(a)) * 1000) / 1000}
                cy={Math.round((cy + ri * Math.sin(a)) * 1000) / 1000}
                r="0.18" fill="rgba(83,234,253,0.15)"/>
            );
          })}
          {/* lines from center to each partner */}
          {points.map((p, i) => (
            <line key={`l${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y}
              stroke={`url(#${gradId})`} strokeWidth="0.35" strokeDasharray="0.9 0.9"/>
          ))}
          {/* active dots at partner positions */}
          {points.map((p, i) => (
            <circle key={`d${i}`} cx={p.x} cy={p.y} r="0.9" fill="rgba(83,234,253,0.85)"/>
          ))}
        </svg>

        {/* NITCO center */}
        <div className={styles.nitcoCore}>
          <Icon name={category.icon} size={28}/>
          <span className={styles.nitmeshLabel}>NITCO Mesh</span>
        </div>

        {/* partner logos at orbital positions */}
        {category.partners.map((partner, i) => (
          <div
            key={partner.name}
            className={styles.partnerLogo}
            style={{ left: `${points[i].x}%`, top: `${points[i].y}%` }}
            title={partner.name}
          >
            <PartnerLogo
              partner={partner}
              boxClass={styles.partnerLogoBox}
              fallbackClass={styles.partnerLogoFallback}
            />
          </div>
        ))}
      </div>

      <div className={styles.liveTag}>
        <span className={styles.liveDot}/>
        Live ecosystem · {n} partner{n === 1 ? "" : "s"}
      </div>
    </div>
  );
}

function CaseStudyCard({ cs }) {
  return (
    <Link href={`/case-studies/${cs.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        background: "#0e0c1e",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
        {cs.image && (
          <div style={{ height: "180px", overflow: "hidden", flexShrink: 0 }}>
            <Image
              src={cs.image}
              alt={cs.title}
              width={400}
              height={180}
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
            {cs.topics.map((t) => (
              <span key={t} style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(83,234,253,0.1)",
                color: "#53eafd",
                letterSpacing: "0.03em",
              }}>{t}</span>
            ))}
          </div>
          <p style={{ color: "#fff", fontSize: "15px", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
            {cs.title}
          </p>
          {cs.description && (
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              lineHeight: 1.6,
              margin: "0 0 16px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}>
              {cs.description}
            </p>
          )}
          <span style={{ color: "#53eafd", fontSize: "13px", fontWeight: 500 }}>
            Read case study →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PartnerPage({ category, caseStudies = [], onContact }) {
  const others = PARTNER_CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow1} aria-hidden="true"/>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            <Icon name="arrowLeft" size={15}/> Back to home
          </Link>
          <div className={styles.heroLayout}>
            <div>
              <div className={styles.heroEyebrow}>
                <div className={styles.heroIconCircle}>
                  <Icon name={category.icon} size={18}/>
                </div>
                <p className={styles.heroKicker}>{category.kicker}</p>
              </div>
              <h1 className={styles.heroTitle}>{category.title}</h1>
              <p className={styles.heroIntro}>{category.intro}</p>
              <div className={styles.heroCtas}>
                <button type="button" className={styles.ctaPrimary} onClick={onContact}>
                  Talk to an Expert <Icon name="arrowRight" size={15}/>
                </button>
                <Link href="/resources" className={styles.ctaOutline}>
                  View Resources
                </Link>
              </div>
            </div>
            <HeroVisual category={category}/>
          </div>
        </div>
      </section>

      <hr className={styles.hairline}/>

      {/* ── PARTNERS GRID ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Our Partners</p>
            <h2 className={styles.sectionTitle}>{category.partnersHeadline}</h2>
            <p className={styles.sectionSub}>{category.partnersSubheadline}</p>
          </div>
          <div className={styles.partnersGrid}>
            {category.partners.map((partner) => (
              <div key={partner.name} className={styles.partnerCard}>
                <div className={styles.partnerCardTop}>
                  <PartnerLogo
                    partner={partner}
                    boxClass={styles.partnerCardLogoBox}
                    fallbackClass={styles.partnerCardLogoFallback}
                  />
                  <div>
                    <p className={styles.partnerCardName}>{partner.name}</p>
                    {partner.serviceBadge && (
                      <span className={styles.partnerServiceBadge}>{partner.serviceBadge}</span>
                    )}
                  </div>
                </div>
                <p className={styles.partnerCardDesc}>{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={styles.hairline}/>

      {/* ── SERVICES ── */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>What We Do</p>
            <h2 className={styles.sectionTitle}>{category.servicesHeadline}</h2>
            <p className={styles.sectionSub}>{category.servicesSubheadline}</p>
          </div>
          <div className={styles.servicesGrid}>
            {category.services.map((svc) => (
              <div key={svc.title} className={styles.serviceCard}>
                <div className={styles.serviceIconBox}>
                  <Icon name={svc.icon} size={20}/>
                </div>
                <div>
                  <p className={styles.serviceTitle}>{svc.title}</p>
                  <p className={styles.serviceDesc}>{svc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {caseStudies.length > 0 && (
        <>
          <hr className={styles.hairline}/>
          <section className={styles.section}>
            <div className={styles.container}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
                <div>
                  <p className={styles.eyebrow}>Related Case Studies</p>
                  <h2 className={styles.sectionTitle} style={{ margin: "8px 0 8px" }}>Outcomes we've delivered</h2>
                  <p className={styles.sectionSub} style={{ margin: 0 }}>Real-world results from programs aligned to this category.</p>
                </div>
                <Link href="/resources" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "999px",
                  padding: "9px 20px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}>
                  Browse all case studies <Icon name="arrowRight" size={13}/>
                </Link>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}>
                {caseStudies.map((cs) => (
                  <CaseStudyCard key={cs.slug} cs={cs}/>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <hr className={styles.hairline}/>

      {/* ── EXPLORE OTHER PARTNERS ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Explore More</p>
          <h2 className={styles.sectionTitle}>Other partner ecosystems</h2>
          <div className={styles.exploreGrid}>
            {others.map((cat) => (
              <Link key={cat.slug} href={`/partners/${cat.slug}`} className={styles.exploreCard}>
                <div className={styles.exploreCardIcon}>
                  <Icon name={cat.icon} size={18}/>
                </div>
                <p className={styles.exploreCardTitle}>{cat.title}</p>
                <div className={styles.exploreCardArrow}>
                  <Icon name="arrowRight" size={14}/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className={styles.hairline}/>

      {/* ── CTA BANNER ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerGlow} aria-hidden="true"/>
            <div className={styles.ctaBannerLayout}>
              <div>
                <div className={styles.ctaBannerKicker}>
                  <Icon name="sparkles" size={14} style={{ color: "#53eafd" }}/>
                  <p className={styles.ctaBannerKickerText}>Work With Us</p>
                </div>
                <h3 className={styles.ctaBannerTitle}>
                  Ready to put these platforms to work for your business?
                </h3>
              </div>
              <div className={styles.ctaBannerActions}>
                <button type="button" className={styles.ctaPrimary} onClick={onContact}>
                  Get In Touch <Icon name="arrowRight" size={15}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
