import Link from "next/link";
import Logo from "../../../images/nitco-images/LogoWhite.svg";
import { GoArrowUpRight } from "react-icons/go";
import USA from "../../../images/FooterDesignChange/USA.png";
import Indian from "../../../images/FooterDesignChange/Indian.png";
import fb from "../../../images/FooterDesignChange/fb.svg";
import X from "../../../images/FooterDesignChange/X.svg";
import youtube from "../../../images/FooterDesignChange/youtube.svg";
import linkdin from "../../../images/FooterDesignChange/linkdin.svg";
import styles from "./FooterDesignMobile.module.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className={styles.displayMobile}
      style={{ backgroundColor: "#25247b" }}
    >
      <div className={`${styles.footerAreaNew} container-fluid`}>
        <div className="row justify-content-center lh-base single-footer-widget">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/">
              <img {...Logo} alt="logo" width="180" height="40" />
            </Link>
          </div>
        </div>

        <div className="row justify-content-center lh-base single-footer-widget">
          <div>
            <h3
              style={{ color: "#fff", marginBottom: "0px", fontSize: "15px" }}
            >
              Services
            </h3>
            <div style={{ fontSize: "12px" }}>
              <Link
                href="/services/artificial-intelligence-services"
                style={{ color: "#fff", paddingRight: "10px" }}
              >
                Artificial Intelligence (AI){" "}
                <span style={{ color: "#fff", paddingRight: "10px" }}>|</span>
              </Link>
              <Link
                href="/services/artificial-intelligence-governance"
                style={{ color: "#fff", paddingRight: "10px" }}
              >
                AI Governance (AIG){" "}
                <span style={{ color: "#fff", paddingRight: "10px" }}>|</span>
              </Link>
              <Link
                href="/services/automation-services"
                style={{ color: "#fff", paddingRight: "10px" }}
              >
                Automation{" "}
              </Link>
              <span style={{ color: "#fff", paddingRight: "10px" }}>|</span>
              <Link
                href="/services/integration-services"
                style={{ color: "#fff", paddingRight: "10px" }}
              >
                Integration{" "}
              </Link>
              <span style={{ color: "#fff", paddingRight: "10px" }}>|</span>
              <Link
                href="/services/data-services"
                style={{ color: "#fff", paddingRight: "10px" }}
              >
                Data
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <div style={{ marginTop: "30px", textAlign: "left" }}>
              <h3
                style={{ color: "#fff", marginBottom: "0px", fontSize: "15px" }}
              >
                Company
              </h3>
              <div className="list" style={{ fontSize: "12px" }}>
                <Link
                  href="/company/about"
                  style={{ color: "#fff", paddingRight: "10px" }}
                >
                  About{" "}
                </Link>
                <span style={{ color: "#fff", paddingRight: "10px" }}>|</span>

                <Link
                  href="/company/careers/"
                  style={{ color: "#fff", paddingRight: "10px" }}
                >
                  Careers
                </Link>
              </div>
            </div>
            <div style={{ paddingTop: "30px" }}>
              <h3
                style={{ color: "#fff", marginBottom: "0px", fontSize: "15px" }}
              >
                Follow Us
              </h3>
              <a
                href="https://www.facebook.com/NitcoIncOfficial/"
                target="_blank"
                rel="noreferrer"
              >
                <img {...fb} alt="India" className={styles.socialIcons} />
              </a>
              <a
                href="https://twitter.com/nitcoofficial/"
                className="twitter text-white"
                target="_blank"
                rel="noreferrer"
              >
                <img {...X} alt="India" className={styles.socialIcons} />
              </a>
              <a
                href="https://www.linkedin.com/company/nitcoincofficial"
                className="instagram text-white"
                target="_blank"
                rel="noreferrer"
              >
                <img {...linkdin} alt="India" className={styles.socialIcons} />
              </a>
              <a
                href="https://www.youtube.com/channel/UChm0AxXJl4gsIiUimX1kh-A"
                className="instagram text-white"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  {...youtube}
                  alt="India"
                  className={styles.socialIcons}
                  style={{ marginRight: "0px" }}
                />
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            width: "100%",
            padding: "0 !important",
          }}
          className="row"
        >
          <div className={styles.headUnderLine}></div>
          <div
            style={{ color: "#fff", display: "flex", paddingBottom: "15px" }}
          >
            
            <img
              {...USA}
              alt="USA"
              style={{ width: "30px", height: "20px", marginRight: "10px" }}
            />
            <p
              style={{
              
                fontSize: "12px",
                margin: "0px",
                marginTop: "-5px",
              }}
            >
              <span className={styles.CountryHeadNew}>US Headquarters: </span>
              440 Cobia Dr., Suite 1701 Katy, Texas 77494 <br />{" "}
              <span style={{ fontSize: "12px" }}>281-503-7002</span>
            </p>
          </div>
          <div className={styles.headUnderLine}></div>
          <div
            style={{
              paddingBottom: "20px",
              width: "100%",
              color: "#fff",
              display: "flex",          
            }}
          >
            <img
              {...Indian}
              alt="India"
              style={{ width: "30px", height: "20px", marginRight: "10px" }}
            />
            <div>
              <p
                style={{
                  fontSize: "12px",
                  margin: "0px",
                  marginTop: "-5px",
                }}
              >
                <span className={styles.CountryHeadNew}>India Hyderabad: </span>
                514-515, 5th Floor DSL Abacus IT Park, IDA Uppal, Hyderabad,
                Telangana 500013, India.
              </p>
              <p style={{ fontSize: "12px" }}>040-45437549</p>

              <p style={{ fontSize: "12px", margin: "0px", marginTop: "10px" }}>
                Gachibowli, Hyderabad, Telangana 500032, India
              </p>
              <p style={{ fontSize: "12px" }}>040-45437626</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyRightNew}>
        <div>
          <p>
            <a href="mailto:YourPartner@nitcoinc.com">
              <span className="text-white" style={{ fontSize: "12px" }}>
                YourPartner@nitcoinc.com
              </span>
            </a>
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <a
                href="/privacy-policy"
                className="text-white"
                style={{ fontSize: "12px" }}
              >
                <GoArrowUpRight
                  className="arrowupright-icon"
                  style={{ fontSize: "12px" }}
                />
                Privacy Policy
              </a>
            </div>
            <div>
              <a
                href="/cookie-policy"
                className="text-white"
                style={{ fontSize: "12px" }}
              >
                <span className="arrowupright-icon">
                  <GoArrowUpRight
                    className="arrowupright-icon"
                    style={{
                      fontSize: "12px",
                      fontWeight: "800 !important",
                    }}
                  />
                </span>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "12px !important",
            color: "#fff",
            marginTop: "15px",
          }}
        >
          &copy; {currentYear} Nitco, Inc. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
