import Link from "next/link";
import Image from "next/image";
import Logo from "../../../images/nitco-images/LogoWhite.svg";
import USA from "../../../images/FooterDesignChange/USA.png";
import Indian from "../../../images/FooterDesignChange/Indian.png";
import fb from "../../../images/FooterDesignChange/fb.svg";
import X from "../../../images/FooterDesignChange/X.svg";
import youtube from "../../../images/FooterDesignChange/youtube.svg";
import linkdin from "../../../images/FooterDesignChange/linkdin.svg";

import styles from "./FooterDesignMobile.module.css";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.displayMobile}>
      <div className={styles.footerWrapper}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <Link href="/">
            <Image src={Logo} alt="logo" width={180} height={40} />
          </Link>
        </div>

        {/* Tablet Layout */}
        <div className={styles.tabletLayout}>
          {/* Services */}
          <div className={styles.section}>
            <h3>Solutions</h3>

            <div className={styles.linksInline}>
              <Link href="/solutions/working-capital-spend-integrity">
              Working Capital & Spend Integrity Program
            </Link>

              <span>|</span>

            <Link href="/solutions/workflow-automation">
            Workflow Automation
            </Link>

              <span>|</span>

               <Link href="/solutions/decision-ready-data">
              Decision-Ready Data Program
            </Link>

              <span>|</span>

                <Link href="/solutions/employee-knowledge-productivity">
              Employee Knowledge & Productivity
            </Link>

              <span>|</span>

            <Link href="/solutions/customer-support-optimization">
              Customer Experience & Support Optimization
            </Link>

               <span>|</span>

             <Link href="/solutions/ai-solution-delivery">
              AI Solution Delivery
            </Link>

               <span>|</span>

            <Link href="/solutions/ai-risk-cost-governance">
              AI Risk, Cost & Governance
            </Link>
            </div>
          </div>

          <div className={styles.companySocialRow}>
            {/* Company */}
            <div className={styles.section}>
              <h3>Company</h3>

              <div className={styles.linksInline}>
                <Link href="/company/about">About</Link>

                <span>|</span>

                <Link href="/company/careers/">Careers</Link>
              </div>
            </div>

            {/* Social */}
            <div className={styles.section}>
              <h3>Follow Us</h3>

              <div className={styles.socialWrapper}>
                <a
                  href="https://www.facebook.com/NitcoIncOfficial/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialCircle}
                >
                  <Image src={fb} alt="Facebook" width={20} height={20} />
                </a>

                <a
                  href="https://twitter.com/nitcoofficial/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialCircle}
                >
                  <Image src={X} alt="X" width={20} height={20} />
                </a>

                <a
                  href="https://www.linkedin.com/company/nitcoincofficial"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialCircle}
                >
                  <Image src={linkdin} alt="LinkedIn" width={20} height={20} />
                </a>

                <a
                  href="https://www.youtube.com/channel/UChm0AxXJl4gsIiUimX1kh-A"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialCircle}
                >
                  <Image src={youtube} alt="YouTube" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className={styles.addressSection}>
            <div className={styles.divider}></div>

            <div className={styles.addressRow}>
              <Image src={USA} alt="USA" width={26} height={18} />

              <div>
                <p>
                  <strong>US Headquarters:</strong> 440 Cobia Dr., Suite 1701
                  Katy, Texas 77494
                </p>

                <span>281-503-7002</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.addressRow}>
              <Image src={Indian} alt="India" width={26} height={18} />

              <div>
                <p>
                  <strong>India Hyderabad:</strong> 514-515, 5th Floor DSL
                  Abacus IT Park, IDA Uppal, Hyderabad, Telangana 500013,
                  India.
                </p>

                <span>040-45437549</span>

                <p className={styles.mt10}>
                  Gachibowli, Hyderabad, Telangana 500032, India
                </p>

                <span>040-45437626</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className={styles.mobileLayout}>
          <div className={styles.mobileSection}>
            <h3>Solutions</h3>

           <Link href="/solutions/working-capital-spend-integrity">
              Working Capital & Spend Integrity Program
            </Link>

            <Link href="/solutions/workflow-automation">
            Workflow Automation
            </Link>


               <Link href="/solutions/decision-ready-data">
              Decision-Ready Data Program
            </Link>


                <Link href="/solutions/employee-knowledge-productivity">
              Employee Knowledge & Productivity
            </Link>

            <Link href="/solutions/customer-support-optimization">
              Customer Experience & Support Optimization
            </Link>


             <Link href="/solutions/ai-solution-delivery">
              AI Solution Delivery
            </Link>

            <Link href="/solutions/ai-risk-cost-governance">
              AI Risk, Cost & Governance
            </Link>
          </div>

          <div className={styles.mobileSection}>
            <h3>Company</h3>

            <Link href="/company/about">About</Link>

            <Link href="/company/careers/">Careers</Link>
          </div>

          <div className={styles.mobileSection}>
            <h3>Follow Us</h3>

            <div className={styles.socialWrapper}>
              <a href="#"><Image src={fb} alt="Facebook" width={20} height={20} /></a>
              <a href="#"><Image src={X} alt="X" width={20} height={20} /></a>
              <a href="#"><Image src={linkdin} alt="LinkedIn" width={20} height={20} /></a>
              <a href="#"><Image src={youtube} alt="YouTube" width={20} height={20} /></a>
            </div>
          </div>

          <div className={styles.mobileSection}>
            <h3>Contact Us</h3>

            <a href="mailto:YourPartner@nitcoinc.com">
              YourPartner@nitcoinc.com
            </a>
          </div>

          <div className={styles.mobileCountry}>
            <div>
              <Image src={USA} alt="USA" width={26} height={18} />
              <span>USA - Texas</span>
            </div>

            <div>
              <Image src={Indian} alt="India" width={26} height={18} />
              <span>India - Hyderabad</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottomBar}>
          <div className={styles.policyLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>

            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>

          <p>
            &copy; {CURRENT_YEAR} Nitco, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;