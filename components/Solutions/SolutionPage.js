import Link from "next/link";
import styles from "./SolutionPage.module.css";
import { ALL_SOLUTIONS } from "../../lib/solutionsData";

/* ── Inline SVG icons (no external dep) ── */
function Icon({ name, size = 20 }) {
  const s = size;
  const icons = {
    wallet: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5m-9-5h6m-3 8a1 1 0 100-2 1 1 0 000 2z" />,
    receipt: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
    banknote: <><path strokeLinecap="round" strokeLinejoin="round" d="M2 6h20v12H2z" /><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h.01M18 12h.01" /></>,
    building: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z M9 22V12h6v10" />,
    gitBranch: <><circle cx="6" cy="18" r="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="6" r="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="6" r="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 8v8M8 6h7a3 3 0 010 6h-3" /></>,
    clock: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></>,
    refreshCw: <path strokeLinecap="round" strokeLinejoin="round" d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" />,
    eyeOff: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line strokeLinecap="round" strokeLinejoin="round" x1="1" y1="1" x2="23" y2="23" /></>,
    lineChart: <><polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    search: <><circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" /></>,
    shieldAlert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4M12 16h.01" />,
    alertCircle: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="8" x2="12" y2="12" /><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="16" x2="12.01" y2="16" /></>,
    listChecks: <><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></>,
    trendingUp: <><polyline strokeLinecap="round" strokeLinejoin="round" points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline strokeLinecap="round" strokeLinejoin="round" points="17 6 23 6 23 12" /></>,
    trendingDown: <><polyline strokeLinecap="round" strokeLinejoin="round" points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline strokeLinecap="round" strokeLinejoin="round" points="17 18 23 18 23 12" /></>,
    target: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" /></>,
    shieldCheck: <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" />,
    zap: <polygon strokeLinecap="round" strokeLinejoin="round" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    workflow: <><rect x="3" y="3" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" /><rect x="15" y="15" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 6h3a3 3 0 013 3v3M9 18h3a3 3 0 003-3v-3" /></>,
    map: <><polygon strokeLinecap="round" strokeLinejoin="round" points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line strokeLinecap="round" strokeLinejoin="round" x1="8" y1="2" x2="8" y2="18" /><line strokeLinecap="round" strokeLinejoin="round" x1="16" y1="6" x2="16" y2="22" /></>,
    rocket: <><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /></>,
    barChart: <><line strokeLinecap="round" strokeLinejoin="round" x1="18" y1="20" x2="18" y2="10" /><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="20" x2="12" y2="4" /><line strokeLinecap="round" strokeLinejoin="round" x1="6" y1="20" x2="6" y2="14" /></>,
    mail: <><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline strokeLinecap="round" strokeLinejoin="round" points="22,6 12,13 2,6" /></>,
    fileText: <><path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8" /><line strokeLinecap="round" strokeLinejoin="round" x1="16" y1="13" x2="8" y2="13" /><line strokeLinecap="round" strokeLinejoin="round" x1="16" y1="17" x2="8" y2="17" /><polyline strokeLinecap="round" strokeLinejoin="round" points="10 9 9 9 8 9" /></>,
    checkCircle: <><path strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline strokeLinecap="round" strokeLinejoin="round" points="22 4 12 14.01 9 11.01" /></>,
    network: <><circle cx="12" cy="5" r="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="19" cy="19" r="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5" cy="19" r="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4M7 17h10M7.5 17.5l-2.5-9.5M16.5 17.5l2.5-9.5" /></>,
    bot: <><rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="5" r="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4M8 15h.01M16 15h.01" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    gitMerge: <><circle cx="18" cy="18" r="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="6" r="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 8v8a6 6 0 006 6h2" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 6v4" /></>,
    fileSpreadsheet: <><path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8" /><line strokeLinecap="round" strokeLinejoin="round" x1="8" y1="13" x2="16" y2="13" /><line strokeLinecap="round" strokeLinejoin="round" x1="8" y1="17" x2="16" y2="17" /><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="11" x2="12" y2="19" /></>,
    sparkles: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 2l.75 2.25L23 5l-2.25.75L20 8l-.75-2.25L17 5l2.25-.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l.5 1.5L6 18l-1.5.5L4 20l-.5-1.5L2 18l1.5-.5z" /></>,
    users: <><path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
    userPlus: <><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" /><line strokeLinecap="round" strokeLinejoin="round" x1="20" y1="8" x2="20" y2="14" /><line strokeLinecap="round" strokeLinejoin="round" x1="23" y1="11" x2="17" y2="11" /></>,
    keyRound: <><path strokeLinecap="round" strokeLinejoin="round" d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 10-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></>,
    boxes: <><path strokeLinecap="round" strokeLinejoin="round" d="M2.97 12.92A2 2 0 002 14.63v3.24a2 2 0 00.97 1.71l3 1.8a2 2 0 002.06 0L12 19v-5.5l-5-3-4.03 2.42z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 16.5v3.27M12 13.5V19M17 16.5v3.27M22 13.5l-5 3-5-3 5-3 5 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l3.97-2.38A2 2 0 0022 14.63v-3.24a2 2 0 00-.97-1.71l-3-1.8a2 2 0 00-2.06 0L12 9.5V19z" /></>,
    folderSearch: <><path strokeLinecap="round" strokeLinejoin="round" d="M11 20H4a2 2 0 01-2-2V6a2 2 0 012-2h4l2 3h9a2 2 0 012 2v1.5" /><circle cx="17" cy="17" r="3" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-1.5-1.5" /></>,
    compass: <><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeLinecap="round" strokeLinejoin="round" /></>,
    laptop: <><rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" /><line strokeLinecap="round" strokeLinejoin="round" x1="2" y1="20" x2="22" y2="20" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="2 17 12 22 22 17" strokeLinecap="round" strokeLinejoin="round" /><polyline points="2 12 12 17 22 12" strokeLinecap="round" strokeLinejoin="round" /></>,
    bookOpen: <><path strokeLinecap="round" strokeLinejoin="round" d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>,
    headset: <><path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></>,
    messageSquare: <><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></>,
    star: <polygon strokeLinecap="round" strokeLinejoin="round" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    settings: <><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    lightbulb: <><path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6M12 3a7 7 0 014.9 12H7.1A7 7 0 0112 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 15h5" /></>,
    eye: <><path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" /></>,
    scale: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 21h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 7l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3L6 7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 7l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3L18 7z" /></>,
    gauge: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v2M6.3 7.3l1.42 1.42M4 14h2M7.3 18.7L8.7 17.3M12 16v-4M12 16l2.5-2.5" /></>,
    dollarSign: <><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="1" x2="12" y2="23" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" /></>,
    fileWarning: <><path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8" /><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="12" x2="12" y2="16" /><line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="18" x2="12.01" y2="18" /></>,
    arrowLeft: <><line strokeLinecap="round" strokeLinejoin="round" x1="19" y1="12" x2="5" y2="12" /><polyline strokeLinecap="round" strokeLinejoin="round" points="12 19 5 12 12 5" /></>,
    arrowRight: <><line strokeLinecap="round" strokeLinejoin="round" x1="5" y1="12" x2="19" y2="12" /><polyline strokeLinecap="round" strokeLinejoin="round" points="12 5 19 12 12 19" /></>,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      {icons[name] || <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

/* ── Hero Card visual ── */
function HeroCard({ hero }) {
  const { cardLabel, cardTitle, type, steps, tiles, kpis, topChip, bottomChip } = hero;
  const iconName = hero.accentIcon || "zap";

  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroGlow} aria-hidden="true" />

      {/* main card */}
      <div className={styles.heroCard}>
        <div className={styles.heroCardHeader}>
          <div className={styles.heroCardMeta}>
            <div className={styles.heroCardIconBox}>
              <Icon name={iconName} size={18} />
            </div>
            <div>
              <p className={styles.heroCardLabel}>{cardLabel}</p>
              <p className={styles.heroCardTitle}>{cardTitle}</p>
            </div>
          </div>
          <span className={styles.heroCardLive}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4" fill="#53eafd" opacity="0.4" />
              <circle cx="6" cy="6" r="2" fill="#53eafd" />
            </svg>
            live
          </span>
        </div>

        {type === "steps" && (
          <div className={styles.heroStepList}>
            {steps.map((step, i) => (
              <div key={step.label} className={styles.heroStep}>
                <div className={styles.heroStepIcon}>
                  <Icon name={step.icon} size={13} />
                </div>
                <div className={styles.heroStepBody}>
                  <p className={styles.heroStepNum}>Step {i + 1}</p>
                  <p className={styles.heroStepLabel}>{step.label}</p>
                </div>
                <span className={styles.heroStepStatus}>{step.status}</span>
              </div>
            ))}
          </div>
        )}

        {type === "sparkline" && (
          <>
            <svg viewBox="0 0 320 90" style={{ width: "100%", height: 80 }} aria-hidden="true">
              <defs>
                <linearGradient id="sp-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3d3ca0" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#3d3ca0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,14 L40,22 L70,28 L110,44 L150,42 L190,58 L230,52 L260,68 L300,62 L320,70 L320,90 L0,90 Z" fill="url(#sp-grad)" />
              <path d="M0,14 L40,22 L70,28 L110,44 L150,42 L190,58 L230,52 L260,68 L300,62 L320,70" fill="none" stroke="#5c5ae0" strokeWidth="2" />
              <circle cx="320" cy="70" r="4" fill="#53eafd" />
            </svg>
            {tiles && (
              <div className={styles.heroTiles}>
                {tiles.map((t) => (
                  <div key={t.label} className={styles.heroTile}>
                    <div style={{ display: "flex", justifyContent: "center", color: "#53eafd", marginBottom: 6 }}>
                      <Icon name={t.icon} size={14} />
                    </div>
                    <p className={styles.heroTileLabel}>{t.label}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {type === "kpigrid" && (
          <>
            <div className={styles.heroKpiGrid}>
              {kpis.map((kpi) => (
                <div key={kpi.label} className={styles.heroKpi}>
                  <div className={styles.heroKpiMeta}>
                    <div style={{ color: "#53eafd" }}><Icon name={kpi.icon} size={13} /></div>
                    <p className={styles.heroKpiLabel}>{kpi.label}</p>
                  </div>
                  <p className={styles.heroKpiValue}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 320 60" style={{ width: "100%", height: 52 }} aria-hidden="true">
              <defs>
                <linearGradient id="bar-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5c5ae0" stopOpacity="1" />
                  <stop offset="100%" stopColor="#5c5ae0" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {[18, 32, 24, 40, 28, 46, 36, 52, 44, 56].map((h, i) => (
                <rect key={i} x={i * 32 + 4} y={60 - h} width="22" height={h} rx="3" fill="url(#bar-grad)" />
              ))}
            </svg>
          </>
        )}
      </div>

      {/* floating top-right chip */}
      {topChip && (
        <div className={styles.chipTopRight}>
          <div className={styles.chipHeader}>
            <div style={{ color: "#53eafd" }}><Icon name={topChip.icon} size={13} /></div>
            <p className={styles.chipLabel}>{topChip.label}</p>
          </div>
          <div className={styles.chipBar}>
            <div className={styles.chipBarFill} style={{ width: topChip.barWidth }} />
          </div>
        </div>
      )}

      {/* floating bottom-left chip */}
      {bottomChip && (
        <div className={styles.chipBottomLeft}>
          <div className={styles.chipRow}>
            <div style={{ color: bottomChip.color === "yellow" ? "#fde68a" : "#53eafd" }}>
              <Icon name={bottomChip.icon.replace("Yellow", "").replace("alertCircleYellow", "alertCircle").replace("fileSpreadsheetYellow", "fileSpreadsheet")} size={13} />
            </div>
            <div>
              <p className={styles.chipLabel}>{bottomChip.label}</p>
              <p className={styles.chipValue}>{bottomChip.value}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page template ── */
export default function SolutionPage({ solution, onContact }) {
  const others = ALL_SOLUTIONS.filter((s) => s.slug !== solution.slug);

  const hero = {
    ...solution.hero,
    accentIcon: solution.icon,
  };

  return (
    <div className={styles.page}>
      {/* HERO */}
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
                    <Icon name={solution.icon} size={22} />
                  </div>
                  <p className={styles.heroLabel}>Program</p>
                </div>
                <h1 className={styles.heroTitle}>{solution.title}</h1>
                <p className={styles.heroSubtitle}>{solution.subtitle}</p>
                <div className={styles.heroCtas}>
                  <button
                    type="button"
                    className={styles.ctaPrimary}
                    onClick={onContact}
                  >
                    {solution.ctaCta}
                    <Icon name="arrowRight" size={16} />
                  </button>
                  <Link href="/" className={styles.ctaOutline}>
                    View all solutions
                  </Link>
                </div>
              </div>
              {/* Right: hero card visual */}
              <HeroCard hero={hero} />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>The challenge</p>
          <h2 className={styles.sectionTitle}>{solution.problemsHeading}</h2>
          <div className={styles.problemsGrid}>
            {solution.problems.map((p, i) => (
              <div key={i} className={styles.problemCard}>
                <div className={styles.problemIconBox}>
                  <Icon name={p.icon} size={16} />
                </div>
                <p className={styles.problemText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>What we work on</p>
          <h2 className={styles.sectionTitle}>{solution.focusAreasHeading}</h2>
          <div className={styles.focusGrid}>
            {solution.focusAreas.map((fa, i) => (
              <div key={i} className={styles.focusCard}>
                <div className={styles.focusIconBox}>
                  <Icon name={fa.icon} size={20} />
                </div>
                <h3 className={styles.focusTitle}>{fa.title}</h3>
                <p className={styles.focusDesc}>{fa.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET + OUTCOMES */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.twoColGrid}>
            <div>
              <p className={styles.eyebrow}>Deliverables</p>
              <h2 className={styles.sectionTitle}>{solution.whatYouGetHeading}</h2>
              <div className={styles.listStack}>
                {solution.whatYouGet.map((item, i) => (
                  <div key={i} className={styles.listItem}>
                    <div className={`${styles.listItemIconBox} ${styles.listItemIconBoxBlue}`}>
                      <Icon name={item.icon} size={16} />
                    </div>
                    <p className={styles.listItemText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={styles.eyebrow}>Outcomes</p>
              <h2 className={styles.sectionTitle}>{solution.outcomesHeading}</h2>
              <div className={styles.listStack}>
                {solution.outcomes.map((item, i) => (
                  <div key={i} className={styles.listItem}>
                    <div className={`${styles.listItemIconBox} ${styles.listItemIconBoxCyan}`}>
                      <Icon name={item.icon} size={16} />
                    </div>
                    <p className={styles.listItemText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Where we engage</p>
          <h2 className={styles.sectionTitle}>Where we engage most often.</h2>
          <div className={styles.useCasesGrid}>
            {solution.useCases.map((uc, i) => (
              <div key={i} className={styles.useCaseCard}>
                <div className={styles.useCaseTopLine} aria-hidden="true" />
                <div className={styles.useCaseGlow} aria-hidden="true" />
                <div className={styles.useCaseIconBox}>
                  <Icon name={uc.icon} size={18} />
                </div>
                <p className={styles.useCaseText}>{uc.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT STARTS */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>How it starts</p>
          <h2 className={styles.sectionTitle}>{solution.howItStartsHeading}</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepConnector} aria-hidden="true" />
            {solution.howItStarts.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepIconWrap}>
                  <div className={styles.stepIconCircle}>
                    <Icon name={step.icon} size={22} />
                  </div>
                  <span className={styles.stepNum}>{i + 1}</span>
                </div>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER SOLUTIONS */}
      <section className={styles.exploreSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Related programs</p>
          <h2 className={styles.sectionTitle}>Explore other solutions.</h2>
          <div className={styles.exploreGrid}>
            {others.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className={styles.exploreCard}>
                <div className={styles.exploreCardTopLine} aria-hidden="true" />
                <div className={styles.exploreCardIconBox}>
                  <Icon name={s.icon} size={18} />
                </div>
                <div className={styles.exploreCardBody}>
                  <p className={styles.exploreCardTitle}>{s.title}</p>
                  <p className={styles.exploreCardDesc}>{s.subtitle}</p>
                </div>
                <div className={styles.exploreArrow}>
                  <Icon name="arrowRight" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerGlow} aria-hidden="true" />
            <div className={styles.ctaBannerLayout}>
              <div>
                <div className={styles.ctaKicker}>
                  <div style={{ color: "#53eafd" }}><Icon name="sparkles" size={14} /></div>
                  <p className={styles.ctaKickerText}>Ready when you are</p>
                </div>
                <h2 className={styles.ctaTitle}>{solution.ctaHeading}</h2>
              </div>
              <div className={styles.ctaActions}>
                <button type="button" className={styles.ctaPrimary} onClick={onContact}>
                  {solution.ctaCta}
                  <Icon name="arrowRight" size={16} />
                </button>
                <Link href="/" className={styles.ctaOutline}>
                  View all solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
