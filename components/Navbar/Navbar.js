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
                      className={`nav-item nav-has-caret ${activeNav === "agent-center" ? "active" : ""}`}
                    >
                      <Link
                        href="/agents"
                        className="nav-link"
                        onClick={() => handleNavClick("agent-center")}
                      >
                        AI Agent Command Center
                        <Caret />
                      </Link>
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
                      className={`nav-item nav-has-caret ${activeNav === "resources" ? "active" : ""}`}
                    >
                      <Link
                        href="/insights/case-studies"
                        className="nav-link"
                        onClick={() => handleNavClick("resources")}
                      >
                        Resources
                        <Caret />
                      </Link>
                    </li>

                    {/* COMPANY */}
                    <li
                      className={`nav-item nav-has-caret ${activeNav === "company" ? "active" : ""}`}
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

                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            href="/company/about"
                            className="hoverColorChange"
                            onClick={() => handleNavClick("company")}
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/company/careers"
                            className="hoverColorChange"
                            onClick={() => handleNavClick("company")}
                          >
                            Careers
                          </Link>
                        </li>
                      </ul>
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
