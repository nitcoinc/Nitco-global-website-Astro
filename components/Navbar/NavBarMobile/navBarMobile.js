import Link from "next/link";
import { useState, useEffect } from "react";
import * as Icon from "react-feather";
import Logo from "../../../images/nitco-images/Logo.svg";
import styles from "./navBarMobile.module.css";
const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("null");
  const [activeDescription, setActiveDescription] = useState("ai-d");
  const [activeNav, setActiveNav] = useState("");

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    // console.log(activeNav, "activeNav");
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(prev => !prev);
  };
  const [isDropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown1 = (e) => {
    e.preventDefault();
    setDropdownOpen1(prev => !prev);
  };

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const elementId = document.getElementById("header");
      if (window.scrollY > 20) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
    setActiveDescription(`${menu}-d`);

    // Remove the active class from all items in block2
    document
      .querySelectorAll(".dropdown-block-services.block2 ul li")
      .forEach((item) => {
        item.classList.remove("active");
      });

    // Add the active class to the relevant item
    document
      .querySelector(
        `.dropdown-block-services.block2 ul li[data-submenu="${menu}"]`
      )
      .classList.add("active");
  };

  return (
    <div className={styles.phoneView}>
      <header id="header" className="headroom">
        <div className="container">
          <div className="startp-nav">
            <div
              className="container-fluid"
              style={{ paddingLeft: "0", paddingRight: "0" }}
            >
              <nav className="navbar navbar-expand-md navbar-light">
                <Link href="/" className="navbar-brand">
                  <img {...Logo} alt="logo" width="180" height="36" />
                </Link>

                <button
                  onClick={toggleNavbar}
                  className={classTwo}
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"></span>
                  <span className="icon-bar bottom-bar"></span>
                </button>

                <div className={classOne} style={{ marginTop: "40px" }}>
                  <ul className="navbar-nav ms-auto">
                    {/* AI AGENT COMMAND CENTER */}
                    <li
                      className={`nav-item ${activeNav === "agent-center" ? "active" : ""
                        }`}
                    >
                      <Link
                        href="/agents"
                        onClick={() => {
                          handleNavClick("agent-center");
                          toggleNavbar();
                        }}
                        className={`nav-link ${activeNav === "agent-center" ? "active" : ""
                          }`}
                        style={{ paddingTop: "5px", paddingBottom: "5px" }}
                      >
                        AI Agent Command Center
                      </Link>
                    </li>
                    <li className={`${styles.navItem} ${styles.dropdown}`}>
                      <Link
                        href="#"
                        onClick={toggleDropdown}
                        className={styles.navLink}
                      >
                        Services
                      </Link>
                      {isDropdownOpen && (
                        <ul className={styles.dropdownMenu}>
                          <li className={styles.navItem} >
                            <Link
                              href="/services/artificial-intelligence-services"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                              styles={{ color: "#2A2070" }}

                            >
                              Artificial Intelligence (AI)
                            </Link>
                          </li>
                          <li className={styles.navItem}>
                            <Link
                              href="/services/artificial-intelligence-governance"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                            >
                              AI Governance (AIG)
                            </Link>
                          </li>
                          <li className={styles.navItem} >
                            <Link
                              href="/services/automation-services"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                              styles={{ color: "#2A2070" }}

                            >
                              Automation
                            </Link>
                          </li>
                          <li className={styles.navItem} >
                            <Link
                              href="/services/integration-services"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                              styles={{ color: "#2A2070" }}
                            >
                              Integration
                            </Link>
                          </li>
                          <li className={styles.navItem} >
                            <Link
                              href="/services/data-services"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                              styles={{ color: "#2A2070" }}
                            >
                              Data
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li
                      className={`nav-item ${activeNav === "resources" ? "active" : ""
                        }`}
                    >
                      <Link
                        href="/insights/case-studies"
                        onClick={() => handleNavClick("resources")}
                        className={`nav-link ${activeNav === "resources" ? "active" : ""
                          }`}
                        style={{ paddingTop: "5px", paddingBotom: "5px" }}
                      >
                        Resources
                      </Link>
                    </li>

                    <li className={`${styles.navItem} ${styles.dropdown}`}>
                      <Link
                        href="#"
                        onClick={toggleDropdown1}
                        className={styles.navLink}
                      >
                        Company
                      </Link>
                      {isDropdownOpen1 && (
                        <ul className={styles.dropdownMenu}>
                          <li className={styles.navItem}>
                            <Link
                              href="/company/about"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                            >
                              About Us
                            </Link>
                          </li>
                          <li className={styles.navItem}>
                            <Link
                              href="/company/careers"
                              onClick={toggleNavbar}
                              className={styles.insideLink}
                            >
                              Careers
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className={styles.contactBtn}>
                      <Link
                        href="/contact"
                        style={{ color: "#ed1651", padding: "5px" }}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
