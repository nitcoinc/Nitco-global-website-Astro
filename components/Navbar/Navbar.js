import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

/* ── Inline SVG icons ── */
const Icon = ({ name, size = 16 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" };
  switch (name) {
    case "chevronDown": return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case "arrowRight":  return <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
    case "menu":        return <svg {...p}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
    case "x":           return <svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
    case "wallet":      return <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="16" cy="15" r="1" fill="currentColor" stroke="none"/></svg>;
    case "workflow":    return <svg {...p}><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M11 7h4a2 2 0 0 1 2 2v4"/></svg>;
    case "chart":       return <svg {...p}><path d="M3 3v18h18"/><path d="m7 16 4-4 4 4 4-4"/></svg>;
    case "book":        return <svg {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
    case "headset":     return <svg {...p}><path d="M3 12a9 9 0 0 1 18 0v3a2 2 0 0 1-2 2h-2v-5h4"/><path d="M3 12v3a2 2 0 0 0 2 2h2v-5H3"/></svg>;
    case "rocket":      return <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
    case "shield":      return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "building":    return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01"/><path d="M10 21v-4h4v4"/></svg>;
    case "briefcase":   return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case "cloud":       return <svg {...p}><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78 6 6 0 0 0-11.6 2.28A4 4 0 0 0 6 19h11.5z"/></svg>;
    case "network":     return <svg {...p}><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M7 17l-2 2M17 17l2 2M12 11l-5 6M12 11l5 6"/></svg>;
    case "bot":         return <svg {...p}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 15h.01M16 15h.01"/></svg>;
    case "messages":    return <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>;
    default: return null;
  }
};

/* ── Data ── */
const SOLUTIONS = [
  { icon: "wallet",   title: "Working Capital & Spend Integrity",    desc: "Improve billing accuracy, payment execution, and working capital performance", href: "/solutions/working-capital-spend-integrity" },
  { icon: "workflow", title: "Workflow Automation",                   desc: "Eliminate manual effort and streamline exception-heavy processes",               href: "/solutions/workflow-automation" },
  { icon: "chart",    title: "Decision-Ready Data",                   desc: "Turn fragmented data into trusted insight for faster decisions",                  href: "/solutions/decision-ready-data" },
  { icon: "book",     title: "Employee Knowledge & Productivity",      desc: "Instant, context-aware answers across systems and documents",                    href: "/solutions/employee-knowledge-productivity" },
  { icon: "headset",  title: "Customer Support Optimization",         desc: "Reduce support cost and improve resolution times",                               href: "/solutions/customer-support-optimization" },
  { icon: "rocket",   title: "AI Solution Delivery",                  desc: "Turn AI ideas into production-ready workflow solutions",                          href: "/solutions/ai-solution-delivery" },
  { icon: "shield",   title: "AI Risk, Cost & Governance",            desc: "Ensure AI is secure, controlled, cost-effective, and scalable",                  href: "/solutions/ai-risk-cost-governance" },
];

const PARTNERS = [
  { icon: "cloud",    title: "Cloud & AI Platforms",                  desc: "Hyperscaler partnerships powering our AI and data foundations",                  href: "/partners/cloud-ai-platforms" },
  { icon: "network",  title: "Integration & Automation Platforms",    desc: "iPaaS and enterprise integration partners for connected workflows",              href: "/partners/integration-automation-platforms" },
  { icon: "bot",      title: "Intelligent Automation & RPA",          desc: "Best-in-class RPA and intelligent automation alliances for scale",               href: "/partners/intelligent-automation-rpa" },
  { icon: "messages", title: "Conversational AI",                     desc: "Conversational AI platform partners for assistants and agents",                  href: "/partners/conversational-ai" },
];

const COMPANY = [
  { icon: "building",  title: "About Us", desc: "Who we are and how we work",  href: "/company/about" },
  { icon: "briefcase", title: "Careers",  desc: "Join our team",               href: "/company/careers" },
];

/* ── Mega menu panel ── */
function MegaPanel({ items, intro, cols, open, narrow }) {
  return (
    <div className={[styles.megaPanel, narrow ? styles.megaPanelNarrow : "", open ? styles.megaOpen : ""].join(" ")}>
      <div className={styles.megaGlowPurple} aria-hidden="true" />
      <div className={styles.megaGlowCyan}   aria-hidden="true" />
      <div className={styles.megaGlowPink}   aria-hidden="true" />
      <div className={styles.megaGrid}       aria-hidden="true" />
      <div className={cols === "compact" ? styles.megaBodyRight : styles.megaBody}>
        <div className={styles.megaIntro}>
          <p className={styles.megaIntroKicker}>{intro.kicker}</p>
          <h3 className={styles.megaIntroTitle}>{intro.title}</h3>
          <p className={styles.megaIntroBody}>{intro.body}</p>
          <Link href={intro.ctaHref} className={styles.megaIntroCta}>
            {intro.ctaText} <Icon name="arrowRight" size={12} />
          </Link>
        </div>
        <div className={[styles.megaItems, cols === 3 ? styles.megaItems3 : cols === "compact" ? styles.megaItems2compact : styles.megaItems2].join(" ")}>
          {items.map((item) => (
            <Link key={item.title} href={item.href} className={styles.megaItem}>
              <span className={styles.megaItemIcon}><Icon name={item.icon} size={14} /></span>
              <span className={styles.megaItemText}>
                <span className={styles.megaItemTitle}>{item.title}</span>
                <span className={styles.megaItemDesc}>{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [openMenu,   setOpenMenu]   = useState(null);   // 'Solutions' | 'Partners' | 'Company' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub,  setMobileSub]  = useState(null);   // 'Solutions' | 'Partners' | 'Company' | null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileSub = (key) => setMobileSub(prev => prev === key ? null : key);
  const closeMobile = () => { setMobileOpen(false); setMobileSub(null); };

  return (
    <header
      id="header"
      className={[styles.header, scrolled ? styles.scrolled : ""].join(" ")}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/images/logo-nitco.png" alt="NITCO Inc." width={234} height={54} />
        </Link>

        {/* Desktop nav */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList} role="menubar">

            {/* AI Agent Command Center — direct link */}
            <li className={styles.navItem} role="none" onMouseEnter={() => setOpenMenu(null)}>
              <Link href="/ai-agent-command-center" className={styles.navLink} role="menuitem">
                AI Agent Command Center
              </Link>
            </li>

            {/* Solutions */}
            <li className={styles.navItem} role="none" onMouseEnter={() => setOpenMenu("Solutions")}>
              <button
                className={[styles.navLink, openMenu === "Solutions" ? styles.active : ""].join(" ")}
                aria-haspopup="true" aria-expanded={openMenu === "Solutions"}
                role="menuitem"
              >
                Solutions <Icon name="chevronDown" size={12} className={openMenu === "Solutions" ? styles.chevron : styles.chevron} />
              </button>
              <MegaPanel
                open={openMenu === "Solutions"} items={SOLUTIONS} cols={3}
                intro={{ kicker: "Solutions", title: "AI-led outcomes across the operations spectrum.", body: "Pick a domain and see how we move from analysis to working solutions.", ctaText: "Explore all solutions", ctaHref: "/services/working-capital-spend-integrity" }}
              />
            </li>

            {/* Partners */}
            <li className={styles.navItem} role="none" onMouseEnter={() => setOpenMenu("Partners")}>
              <button
                className={[styles.navLink, openMenu === "Partners" ? styles.active : ""].join(" ")}
                aria-haspopup="true" aria-expanded={openMenu === "Partners"}
                role="menuitem"
              >
                Partners <Icon name="chevronDown" size={12} />
              </button>
              <MegaPanel
                open={openMenu === "Partners"} items={PARTNERS} cols={2}
                intro={{ kicker: "Partners", title: "Best-in-class platforms behind every engagement.", body: "We partner across cloud, integration, automation, and conversational AI.", ctaText: "Meet our partners", ctaHref: "/partners/cloud-ai-platforms" }}
              />
            </li>

            {/* Resources */}
            <li className={styles.navItem} role="none" onMouseEnter={() => setOpenMenu(null)}>
              <Link href="/resources" className={styles.navLink} role="menuitem">
                Resources
              </Link>
            </li>

            {/* Company */}
            <li className={styles.navItem} role="none" onMouseEnter={() => setOpenMenu("Company")}>
              <button
                className={[styles.navLink, openMenu === "Company" ? styles.active : ""].join(" ")}
                aria-haspopup="true" aria-expanded={openMenu === "Company"}
                role="menuitem"
              >
                Company <Icon name="chevronDown" size={12} />
              </button>
              <MegaPanel
                open={openMenu === "Company"} items={COMPANY} cols="compact"
                intro={{ kicker: "Company", title: "Built for measurable, working solutions.", body: "Who we are, how we work, and how to join the team.", ctaText: "Read our story", ctaHref: "/company/about" }}
              />
            </li>
          </ul>

          <Link href="/contact" className={styles.contactBtn}>
            Contact Us <Icon name="arrowRight" size={14} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <Icon name={mobileOpen ? "x" : "menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      <nav id="mobile-nav" className={[styles.mobileMenu, mobileOpen ? styles.mobileOpen : ""].join(" ")} aria-label="Mobile navigation">

        {/* AI Agent Command Center */}
        <div className={styles.mobileNavItem}>
          <Link href="/ai-agent-command-center" className={styles.mobileNavLink} onClick={closeMobile}>
            AI Agent Command Center
          </Link>
        </div>

        {/* Solutions accordion */}
        {[
          { key: "Solutions", items: SOLUTIONS, label: "Solutions" },
          { key: "Partners",  items: PARTNERS,  label: "Partners" },
          { key: "Company",   items: COMPANY,   label: "Company" },
        ].map(({ key, items, label }) => (
          <div key={key} className={styles.mobileNavItem}>
            <button
              className={styles.mobileNavLink}
              onClick={() => toggleMobileSub(key)}
              aria-expanded={mobileSub === key}
            >
              {label}
              <svg className={[styles.mobileChevron, mobileSub === key ? styles.open : ""].join(" ")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            <div className={[styles.mobileSubMenu, mobileSub === key ? styles.subOpen : ""].join(" ")}>
              <div className={styles.mobileSubList}>
                {items.map((item) => (
                  <Link key={item.title} href={item.href} className={styles.mobileSubItem} onClick={closeMobile}>
                    <span className={styles.mobileSubIcon}><Icon name={item.icon} size={16} /></span>
                    <span>
                      <div className={styles.mobileSubTitle}>{item.title}</div>
                      <div className={styles.mobileSubDesc}>{item.desc}</div>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Resources */}
        <div className={styles.mobileNavItem}>
          <Link href="/resources" className={styles.mobileNavLink} onClick={closeMobile}>
            Resources
          </Link>
        </div>

        <Link href="/contact" className={styles.mobileContactBtn} onClick={closeMobile}>
          Contact Us <Icon name="arrowRight" size={16} />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
