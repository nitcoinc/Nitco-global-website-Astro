import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../../images/nitco-images/Logo.svg";
import LogoWhite from "../../images/nitco-images/LogoWhite.svg";

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
                      className={`nav-item ${activeNav === "agent-center" ? "active" : ""
                        }`}
                    >
                      <Link
                        href="/agents"
                        className="nav-link"
                        onClick={() => handleNavClick("agent-center")}
                      >
                        AI Agent Command Center
                      </Link>
                    </li>

                    {/* SERVICES */}
                    <li
                      className={`nav-item-services ${activeNav === "services" ? "active" : ""
                        }`}
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
                      </Link>

                      <ul className="dropdown-menu-services">
                        <div className="dropdown-content-services">
                          <div className="dropdown-block-services block2">
                            <ul>
                              <li
                                onMouseEnter={() => handleMouseEnter("ai")}
                                onClick={() =>
                                (window.location.href =
                                  "/services/artificial-intelligence-services")
                                }
                                className="hoverColorChange"
                              >
                                Artificial Intelligence (AI)
                              </li>
                              <li
                                onMouseEnter={() => handleMouseEnter("aigovernance")}
                                onClick={() =>
                                  (window.location.href = "/services/artificial-intelligence-governance")
                                }
                                className="hoverColorChange"
                              >
                                AI Governance (AIG)
                              </li>

                              <li
                                onMouseEnter={() =>
                                  handleMouseEnter("automation")
                                }
                                onClick={() =>
                                (window.location.href =
                                  "/services/automation-services")
                                }
                                className="hoverColorChange"
                              >
                                Automation
                              </li>

                              <li
                                onMouseEnter={() => handleMouseEnter("cloud")}
                                onClick={() =>
                                (window.location.href =
                                  "/services/integration-services")
                                }
                                className="hoverColorChange"
                              >
                                Integration
                              </li>

                              <li
                                onMouseEnter={() =>
                                  handleMouseEnter("dataanalytics")
                                }
                                onClick={() =>
                                (window.location.href =
                                  "/services/data-services")
                                }
                                className="hoverColorChange"
                              >
                                Data
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ul>
                    </li>

                    {/* RESOURCES */}
                    <li
                      className={`nav-item ${activeNav === "resources" ? "active" : ""
                        }`}
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
                      className={`nav-item ${activeNav === "company" ? "active" : ""
                        }`}
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
