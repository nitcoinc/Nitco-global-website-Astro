import Link from "next/link";
import Logo from "../../images/nitco-images/LogoWhite.svg";
import { GoArrowUpRight } from "react-icons/go";
import USA from "../../images/FooterDesignChange/USA.png";
import Indian from "../../images/FooterDesignChange/Indian.png";
import fb from "../../images/FooterDesignChange/fb.svg";
import X from "../../images/FooterDesignChange/X.svg";
import youtube from "../../images/FooterDesignChange/youtube.svg";
import linkdin from "../../images/FooterDesignChange/linkdin.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="displayLap" style={{ backgroundColor: "#25247b" }}>
      <div
        className="container-fluid footer-area 
      "
        style={{ paddingTop: "80px" }}
      >
        <div className="row justify-content-center lh-base single-footer-widget">
          <div className="col-6 ps-5">
            <div className="single-footer-widget lineHeight-1-6">
              <div className="logo p-3">
                <Link href="/">
                  <img {...Logo} alt="logo" width="180" height="40" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-2">
            <h3 className="custom-footer-headings">Services</h3>
            <ul className="list">
              <li className="serviceFooter">
                <Link href="/services/artificial-intelligence-services">
                  Artificial Intelligence (AI)
                </Link>
              </li>
               <li className="serviceFooter">
                <Link href="/services/artificial-intelligence-governance">
                  AI Governance (AIG)
                </Link>
              </li>
              <li className="serviceFooter">
                <Link href="/services/automation-services">
                  Automation
                </Link>
              </li>
              <li className="serviceFooter">
                <Link href="/services/integration-services">
                  Integration
                </Link>
              </li>
              <li className="serviceFooter">
                <Link href="/services/data-services">
                  Data
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-2">
            <h3 className="custom-footer-headings">Company</h3>
            <ul className="list">
              <li className="serviceFooter">
                <Link href="/company/about">About</Link>
              </li>
              <li className="serviceFooter">
                <Link href="/company/careers/">Careers</Link>
              </li>
            </ul>
          </div>

          <div className="col-2">
            <h3 className="custom-footer-headings">Follow Us</h3>
            <a
              href="https://www.facebook.com/NitcoIncOfficial/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                {...fb}
                alt="India"
                style={{ width: "auto", height: "20px", marginRight: "5px" }}
              />
            </a>
            <a
              href="https://twitter.com/nitcoofficial/"
              className="twitter text-white"
              target="_blank"
              rel="noreferrer"
            >
              <img
                {...X}
                alt="India"
                style={{ width: "auto", height: "20px", marginRight: "5px" }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/nitcoincofficial"
              className="instagram text-white"
              target="_blank"
              rel="noreferrer"
            >
              <img
                {...linkdin}
                alt="India"
                style={{ width: "auto", height: "20px", marginRight: "5px" }}
              />
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
                style={{ width: "auto", height: "20px", marginRight: "0px" }}
              />
            </a>
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
          className="row mt-5"
        >
          <div className="copyright-area  p-4" style={{ width: "20%" }}>
            <p>
              <a href="mailto:YourPartner@nitcoinc.com">
                <span className="text-white" style={{ fontSize: "13px" }}>
                  YourPartner@nitcoinc.com
                </span>
              </a>
            </p>
            <div className="row">
              <div>
                <a
                  href="/privacy-policy"
                  className="text-white"
                  style={{ fontSize: "13px", paddingTop: "10px" }}
                >
                  <GoArrowUpRight
                    className="arrowupright-icon"
                    style={{ fontSize: "18px", fontWeight: "800 !important" }}
                  />
                  Privacy Policy
                </a>
              </div>
              <div>
                <a
                  href="/cookie-policy"
                  className="text-white"
                  style={{ fontSize: "13px", paddingTop: "10px" }}
                >
                  <span className="arrowupright-icon">
                    <GoArrowUpRight
                      className="arrowupright-icon"
                      style={{
                        fontSize: "18px",
                        fontWeight: "800 !important",
                      }}
                    />
                  </span>
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="mt-3"></div>
            <p
              className="text-white mt-3"
              style={{ lineHeight: "18px", fontSize: "13px !important" }}
            >
              &copy; {currentYear} Nitco, Inc. All Rights Reserved.
            </p>
          </div>

          <div className=" text-white" style={{ width: "20%" }}>
            <h6 className="text-white mt-3">
              <img
                {...USA}
                alt="USA"
                style={{ width: "30px", height: "20px", marginRight: "10px" }}
              />
              US Headquarters
            </h6>
            <div className="border-top-custom-pink"></div>
            <p
              style={{
                lineHeight: "18px",
                fontSize: "13px",
                paddingTop: "10px",
              }}
            >
              440 Cobia Dr., Suite 1701 Katy, Texas 77494 <br />
            </p>
            <p style={{ fontSize: "13px" }}>281-503-7002</p>
          </div>   <div
            className=" text-white"
            style={{ paddingBottom: "20px", width: "40%" }}
          >
            <h6 className="text-white mt-3">
              {" "}
              <img
                {...Indian}
                alt="India"
                style={{ width: "30px", height: "20px", marginRight: "10px" }}
              />
              India office, Hyderabad
            </h6>
            <div className="border-top-custom-pink"></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "40%" }}>
                <p
                  style={{
                    lineHeight: "18px",
                    fontSize: "13px",
                    paddingTop: "10px",
                  }}
                >
                  514-515, 5th Floor DSL Abacus IT Park, IDA Uppal, Hyderabad,
                  Telangana 500013, India
                </p>
                <p style={{ fontSize: "13px" }}>040-45437549</p>
              </div>
              <div
                className=" text-white"
                style={{ width: "40%", paddingTop: "10px" }}
              >
                <p style={{ fontSize: "13px" }}>
                  Gachibowli, Hyderabad, Telangana 500032, India
                </p>
                <p style={{ fontSize: "13px" }}>040-45437626</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
