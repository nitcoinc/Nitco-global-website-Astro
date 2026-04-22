import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../../images/nitco-images/Logo.svg";
import LogoWhite from "../../images/nitco-images/LogoWhite.svg";

const Caret = () => (
  <svg
    className="nav-caret"
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1 1l4.5 4.5L10 1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeDescription, setActiveDescription] = useState("ai-d");
  const [activeNav, setActiveNav] = useState("");

  const toggleNavbar = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (navKey) => {
    setActiveNav(navKey);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (!header) return;

      if (window.scrollY > 20) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = menuOpen
    ? "collapse navbar-collapse show"
    : "collapse navbar-collapse";

  const togglerClass = menuOpen
    ? "navbar-toggler navbar-toggler-right"
    : "navbar-toggler navbar-toggler-right collapsed";

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
    setActiveDescription(`${menu}-d`);
  };

  return (
    <div className="displayLapNav">
      <header id="header" className="headroom">
        <div className="container">
          <div className="startp-nav">
            <div className="container-fluid px-0">
              <nav className="navbar navbar-expand-md navbar-light">
                {/* LOGO */}
                <Link href="/" className="navbar-brand">
                  <img
                    {...Logo}
                    alt="NITCO Logo"
                    width="188"
                    height="44"
                    className="nav-logo-default"
                  />
                  <img
                    {...LogoWhite}
                    alt="NITCO Logo"
                    width="188"
                    height="44"
                    className="nav-logo-white"
                  />
                </Link>

                {/* TOGGLER */}
                <button
                  onClick={toggleNavbar}
                  className={togglerClass}
                  type="button"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"></span>
                  <span className="icon-bar bottom-bar"></span>
                </button>

                {/* NAV LINKS */}
                <div className={navbarClass}>
                  <ul className="navbar-nav ms-auto">

                    {/* AI AGENT COMMAND CENTER */}
                    <li
                      className={`nav-item-services nav-has-caret ${activeNav === "agent-center" ? "active" : ""}`}
                    >
                      <Link
                        href="/agents"
                        className="nav-link"
                        onClick={() => handleNavClick("agent-center")}
                      >
                        AI Agent Command Center
                        <Caret />
                      </Link>

                      <div className="solutions-megamenu">
                        <div className="solutions-megamenu-inner">
                          <Link href="/agents" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19V6l11-3v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="17" cy="16" r="3" />
                              </svg>
                            </span>
                            <h4>Data Quality Monitoring</h4>
                            <p>An agent for governed data quality scoring, trends, and root-cause insights.</p>
                          </Link>

                          <Link href="/agents" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                <path d="M8 10h.01M12 10h.01M16 10h.01" />
                              </svg>
                            </span>
                            <h4>Ask Your Data</h4>
                            <p>An agent for natural language data exploration that generates SQL, visualizes insights, and explains query logic.</p>
                          </Link>

                          <Link href="/agents" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M14 2v6h6" />
                                <path d="M9 13h6M9 17h6" />
                              </svg>
                            </span>
                            <h4>Intelligent Document Mapping Agent</h4>
                            <p>An intelligent agent that extracts, maps, and standardizes data from documents, helping teams streamline workflows and improve data accuracy.</p>
                          </Link>

                          <div className="sm-blurb">
                            Purpose-built AI agents that plug into your operations — automating data quality, exploration, and document workflows so your teams can move faster with confidence.
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* SOLUTIONS */}
                    <li
                      className={`nav-item-services nav-has-caret ${activeNav === "services" ? "active" : ""}`}
                    >
                      <Link
                        href="#"
                        className="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveNav("services");
                        }}
                      >
                        Solutions
                        <Caret />
                      </Link>

                      <div className="solutions-megamenu">
                        <div className="solutions-megamenu-inner">
                          <Link href="/services/data-services" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <ellipse cx="12" cy="5" rx="8" ry="3" />
                                <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                                <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                              </svg>
                            </span>
                            <h4>Working Capital &amp;<br />Spend Integrity Program</h4>
                            <p>Improve working capital, increase billing and payment accuracy, and strengthen financial execution.</p>
                          </Link>

                          <Link href="/services/automation-services" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09c0 .66.39 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.26.61.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                              </svg>
                            </span>
                            <h4>Manual Work &amp; Workflow<br />Automation Program</h4>
                            <p>Reduce manual work, streamline approvals, and automate document-driven processes.</p>
                          </Link>

                          <Link href="/services/data-services" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3h7v7H3z" />
                                <path d="M14 3h7v7h-7z" />
                                <path d="M14 14h7v7h-7z" />
                                <path d="M3 14h7v7H3z" />
                              </svg>
                            </span>
                            <h4>Decision-Ready<br />Data Program</h4>
                            <p>Turn fragmented business data into trusted decision support.</p>
                          </Link>

                          <div className="sm-blurb">
                            We identify where business performance breaks across financial execution, operations, and decision-making — and rapidly turn those insights into practical, working solutions.
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* RESOURCES */}
                    <li
                      className={`nav-item ${activeNav === "resources" ? "active" : ""}`}
                    >
                      <Link
                        href="/insights/case-studies"
                        className="nav-link"
                        onClick={() => handleNavClick("resources")}
                      >
                        Resources
                      </Link>
                    </li>

                    {/* COMPANY */}
                    <li
                      className={`nav-item-services nav-has-caret ${activeNav === "company" ? "active" : ""}`}
                    >
                      <Link
                        href="#"
                        className="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveNav("company");
                        }}
                      >
                        Company
                        <Caret />
                      </Link>

                      <div className="solutions-megamenu">
                        <div className="solutions-megamenu-inner">
                          <Link href="/company/about" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                              </svg>
                            </span>
                            <h4>About Us</h4>
                            <p>Learn about NITCO's mission, leadership, and how we partner with enterprises to deliver real outcomes.</p>
                          </Link>

                          <Link href="/company/careers" className="sm-card">
                            <span className="sm-card-icon">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                              </svg>
                            </span>
                            <h4>Careers</h4>
                            <p>Join a team building AI-driven solutions for working capital, automation, and decision-ready data.</p>
                          </Link>

                          <div className="sm-blurb" style={{ gridColumn: "span 2" }}>
                            We're a team of strategists, engineers, and AI practitioners helping enterprises turn complex operations into measurable, working outcomes.
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* CONTACT CTA */}
                <Link href="/contact" className="desktopNav">
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
