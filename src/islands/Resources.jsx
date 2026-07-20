import { useState, useMemo, useEffect, useCallback } from "react";
import styles from "./Resources.module.css";
import {
  CASE_STUDY_ENRICHMENT,
  TOPICS,
  SOLUTION_AREAS,
  EXPLAINER_VIDEOS,
  EXCLUSIVE_REPORTS,
} from "../lib/resourcesData";
import { urlFor } from '../lib/sanityImage.js';

/* ── Inline SVG icons ── */
const Icon = ({ name, size = 14 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  switch (name) {
    case "arrowLeft":    return <svg {...p}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
    case "arrowRight":   return <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
    case "arrowUpRight": return <svg {...p}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>;
    case "book":         return <svg {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
    case "fileText":     return <svg {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
    case "filter":       return <svg {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
    case "calendar":     return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case "clock":        return <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case "play":         return <svg {...p} fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
    case "wallet":       return <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
    case "workflow":     return <svg {...p}><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M11 7h4a2 2 0 0 1 2 2v4"/></svg>;
    case "chart":        return <svg {...p}><path d="M3 3v18h18"/><path d="m7 16 4-4 4 4 4-4"/></svg>;
    case "headset":      return <svg {...p}><path d="M3 12a9 9 0 0 1 18 0v3a2 2 0 0 1-2 2h-2v-5h4"/><path d="M3 12v3a2 2 0 0 0 2 2h2v-5H3"/></svg>;
    case "rocket":       return <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>;
    case "shield":       return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    default: return null;
  }
};

const SOLUTION_ICONS = ["wallet","workflow","chart","book","headset","rocket","shield"];

const CONTENT_TYPES = [
  { key: "Case Studies",     label: "Case Studies" },
  { key: "Blogs",            label: "Blogs" },
  { key: "White Papers",     label: "White Papers" },
  { key: "Explainer Videos",  label: "Explainer Videos" },
  { key: "Exclusive Reports", label: "Exclusive Reports" },
  { key: "Webinars",          label: "Webinars" },
];

/* ── format date (locale-independent to avoid SSR/client hydration mismatch) ── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch { return null; }
}

/* ── Card ── */
function Card({ title, description, image, date, duration, badge, topics, href, external, isVideo, isReport, onPlay }) {
  const inner = (
    <>
      <div className={`${styles.cardImageWrap} ${isReport ? styles.cardReportWrap : ""}`}>
        {image && (
          <img
            src={urlFor(image, { width: 600 }).width(600).url ? urlFor(image).width(600).url() : (typeof image === 'string' ? image : '')}
            alt=""
            width={600}
            height={400}
            className={styles.cardImg}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
        {isReport && (
          <div className={styles.cardReportBg} aria-hidden="true">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden="true">
              <text x="0" y="38" fontFamily="Georgia, serif" fontSize="28" fontWeight="700" fill="rgba(255,255,255,0.12)">MIT</text>
              <text x="0" y="62" fontFamily="Georgia, serif" fontSize="13" fill="rgba(255,255,255,0.08)">Technology Review</text>
              <text x="0" y="76" fontFamily="Georgia, serif" fontSize="13" fill="rgba(255,255,255,0.08)">Insights</text>
            </svg>
            <span className={styles.cardReportPartner}>celigo × NITCO</span>
          </div>
        )}
        <div className={styles.cardImgOverlay} aria-hidden="true" />
        <div className={styles.cardBadgeWrap}>
          <span className={styles.cardBadge}>
            <Icon name={isVideo ? "play" : "fileText"} size={10} />
            {badge}
          </span>
          {topics && topics.map((t) => (
            <span key={t} className={`${styles.cardBadge} ${styles.topicBadge}`}>{t}</span>
          ))}
        </div>
        {isVideo && (
          <div className={styles.videoPlayIcon} aria-hidden="true">
            <span className={styles.videoPlayCircle}>
              <Icon name="play" size={20} />
            </span>
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {description && <p className={styles.cardDesc}>{description}</p>}
        <div className={styles.cardFooter}>
          <span className={styles.cardMeta}>
            {date && (
              <span className={styles.cardMetaItem}>
                <Icon name="calendar" size={12} />
                {date}
              </span>
            )}
            {duration && (
              <span className={styles.cardMetaItem}>
                <Icon name="clock" size={12} />
                {duration}
              </span>
            )}
          </span>
          <span className={styles.cardCta}>
            {isVideo ? "Watch" : "Read"}
            {onPlay ? <Icon name="play" size={12} /> : external ? <Icon name="arrowUpRight" size={12} /> : <Icon name="arrowRight" size={12} />}
          </span>
        </div>
      </div>
    </>
  );

  if (onPlay) {
    return (
      <button type="button" onClick={onPlay} className={`${styles.card} ${styles.cardButton}`}>
        {inner}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>
        {inner}
      </a>
    );
  }
  return <a href={href} className={styles.card}>{inner}</a>;
}

/* ── Main component ── */
export default function Resources({ blogs, caseStudies, webinars, whitepapers }) {
  const [activeTab, setActiveTab]     = useState("Case Studies");
  const [activeTopic, setActiveTopic] = useState("All");
  const [videoModal, setVideoModal]   = useState(null); // vimeo video ID or null

  const closeModal = useCallback(() => setVideoModal(null), []);

  useEffect(() => {
    if (!videoModal) return;
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoModal, closeModal]);

  /* Enrich case studies with static topics/description */
  const enrichedCaseStudies = useMemo(() => {
    return (caseStudies || []).map((cs) => {
      const extra = CASE_STUDY_ENRICHMENT[cs.slug] || {};
      return {
        ...cs,
        topics: extra.topics || [],
        duration: extra.duration || "3 Min Read",
        description: extra.description || "",
        image: cs.image || `/images/case-studies/${cs.slug}.webp`,
      };
    });
  }, [caseStudies]);

  /* Filtered case studies */
  const filteredCaseStudies = useMemo(() => {
    if (activeTopic === "All") return enrichedCaseStudies;
    return enrichedCaseStudies.filter((cs) => cs.topics.includes(activeTopic));
  }, [enrichedCaseStudies, activeTopic]);

  /* Items for current tab */
  const currentItems = useMemo(() => {
    switch (activeTab) {
      case "Case Studies":     return filteredCaseStudies;
      case "Blogs":            return blogs || [];
      case "White Papers":     return whitepapers || [];
      case "Explainer Videos":  return EXPLAINER_VIDEOS;
      case "Exclusive Reports": return EXCLUSIVE_REPORTS;
      case "Webinars":          return webinars || [];
      default:                  return [];
    }
  }, [activeTab, filteredCaseStudies, blogs, whitepapers, webinars]);

  /* Count per tab */
  const countFor = (key) => {
    switch (key) {
      case "Case Studies":     return enrichedCaseStudies.length;
      case "Blogs":            return (blogs || []).length;
      case "White Papers":     return (whitepapers || []).length;
      case "Explainer Videos":  return EXPLAINER_VIDEOS.length;
      case "Exclusive Reports": return EXCLUSIVE_REPORTS.length;
      case "Webinars":          return (webinars || []).length;
      default:                  return 0;
    }
  };

  /* Render a single card based on active tab */
  function renderCard(item, idx) {
    switch (activeTab) {
      case "Case Studies":
        return (
          <Card
            key={item.slug + idx}
            title={item.title}
            description={item.description}
            image={item.image || `/images/case-studies/${item.slug}.webp`}
            date={formatDate(item.date)}
            duration={item.duration}
            badge="Case Study"
            topics={item.topics}
            href={`/case-studies/${item.slug}/`}
          />
        );
      case "Blogs":
        return (
          <Card
            key={item.slug + idx}
            title={item.title}
            image={item.image}
            date={formatDate(item.date)}
            badge="Blog"
            href={`/blog/${item.slug}/`}
          />
        );
      case "White Papers":
        return (
          <Card
            key={item.slug + idx}
            title={item.title}
            image={item.image}
            badge="White Paper"
            href={`/whitepapers/${item.slug}/`}
          />
        );
      case "Explainer Videos":
        return (
          <Card
            key={item.slug + idx}
            title={item.title}
            description={item.description}
            image={item.image}
            badge="Explainer Video"
            isVideo
            onPlay={() => setVideoModal(item.slug)}
          />
        );
      case "Exclusive Reports":
        return (
          <Card
            key={item.slug + idx}
            title={item.title}
            description={item.description}
            badge={item.badge}
            href={`/exclusive-reports/${item.slug}/`}
            isReport
          />
        );
      case "Webinars":
        return (
          <Card
            key={item.slug + idx}
            title={item.title}
            image={item.image}
            date={formatDate(item.date)}
            badge="Webinar"
            href={`/webinar/${item.slug}/`}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.container}>
          <a href="/" className={styles.backLink}>
            <Icon name="arrowLeft" size={14} /> Back to home
          </a>
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <div className={styles.heroKicker}>
                <span className={styles.heroKickerIcon}>
                  <Icon name="book" size={18} />
                </span>
                <span className={styles.heroKickerLabel}>Resources</span>
              </div>
              <h1 className={styles.heroH1}>Real outcomes from real engagements.</h1>
              <p className={styles.heroP}>
                Stories of AI, RPA, intelligent automation, and enterprise integration in
                production — across logistics, healthcare, manufacturing, public sector,
                energy, and food &amp; beverage.
              </p>
            </div>

            <aside className={styles.libraryCard} aria-label="Solution areas">
              <p className={styles.libraryCardLabel}>Library</p>
              <p className={styles.libraryCardSub}>
                Targeted programs across finance, operations, data, knowledge, and AI.
              </p>
              <div className={styles.libraryPills}>
                {SOLUTION_AREAS.map((label, i) => (
                  <div key={label} className={styles.libraryPill}>
                    <span className={styles.libraryPillIcon}>
                      <Icon name={SOLUTION_ICONS[i]} size={13} />
                    </span>
                    <span className={styles.libraryPillLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>
              <Icon name="fileText" size={13} /> Content type
            </span>
            <div className={styles.tabs} role="tablist" aria-label="Content type">
              {CONTENT_TYPES.map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => { setActiveTab(key); setActiveTopic("All"); }}
                  className={`${styles.tab} ${activeTab === key ? styles.tabActive : ""}`}
                >
                  {label}
                  <span className={styles.tabCount}>{countFor(key)}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Case Studies" && (
            <div className={styles.topicRow}>
              <span className={styles.filterLabel}>
                <Icon name="filter" size={13} /> Filter by topic
              </span>
              <div className={styles.topicChips}>
                {["All", ...TOPICS].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTopic(t)}
                    className={`${styles.topicChip} ${activeTopic === t ? styles.topicChipActive : ""}`}
                  >
                    {t}
                    {t !== "All" && (
                      <span className={styles.tabCount}>
                        {enrichedCaseStudies.filter((cs) => cs.topics.includes(t)).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Card grid ── */}
      <section className={styles.contentSection} role="tabpanel">
        <div className={styles.container}>
          <p className={styles.countLine}>
            {currentItems.length} {activeTab === "Case Studies" && activeTopic !== "All" ? `${activeTopic} ` : ""}
            {activeTab.toLowerCase()} {currentItems.length === 1 ? "result" : "results"}
          </p>
          <div className={styles.grid}>
            {currentItems.length === 0 ? (
              <div className={styles.emptyState}>No results found.</div>
            ) : (
              currentItems.map((item, idx) => renderCard(item, idx))
            )}
          </div>
        </div>
      </section>

      {/* ── Video lightbox ── */}
      {videoModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={closeModal}
        >
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Close video"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className={styles.modalIframeWrap}>
              <iframe
                src={`https://player.vimeo.com/video/${videoModal}?autoplay=1&title=0&byline=0&portrait=0&color=1BE1F2`}
                className={styles.modalIframe}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Explainer Video"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
