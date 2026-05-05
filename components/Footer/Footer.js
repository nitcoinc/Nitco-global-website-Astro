import Link from "next/link";
import Logo from "../../images/nitco-images/LogoWhite.svg";
import USA from "../../images/FooterDesignChange/USA.png";
import Indian from "../../images/FooterDesignChange/Indian.png";
import fb from "../../images/FooterDesignChange/fb.svg";
import X from "../../images/FooterDesignChange/X.svg";
import youtube from "../../images/FooterDesignChange/youtube.svg";
import linkdin from "../../images/FooterDesignChange/linkdin.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const headingStyle = {
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "18px",
  };
  const linkStyle = {
    color: "#fff",
    fontSize: "14px",
    textDecoration: "none",
    display: "block",
    marginBottom: "10px",
    opacity: 0.95,
  };
  const socialCircle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#fff",
    marginRight: "10px",
  };

  return (
    <footer
      className="displayLap"
      style={{ backgroundColor: "#080715", color: "#fff" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 40px 30px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Logo + locations */}
          <div>
            <Link href="/">
              <img {...Logo} alt="NITCO" width="180" height="44" />
            </Link>
            <div style={{ marginTop: "32px" }}>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                <img
                  {...USA}
                  alt="USA"
                  style={{
                    width: "26px",
                    height: "18px",
                    marginRight: "10px",
                  }}
                />
                USA - Texas
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#fff",
                  margin: 0,
                }}
              >
                <img
                  {...Indian}
                  alt="India"
                  style={{
                    width: "26px",
                    height: "18px",
                    marginRight: "10px",
                  }}
                />
                India - Hyderabad
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={headingStyle}>Services</h3>
            <Link href="/services/artificial-intelligence-services" style={linkStyle}>
              Artificial Intelligence (AI)
            </Link>
            <Link href="/services/artificial-intelligence-governance" style={linkStyle}>
              AI Governance (AIG)
            </Link>
            <Link href="/services/automation-services" style={linkStyle}>
              Automation
            </Link>
            <Link href="/services/integration-services" style={linkStyle}>
              Integration
            </Link>
            <Link href="/services/data-services" style={linkStyle}>
              Data
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 style={headingStyle}>Company</h3>
            <Link href="/company/about" style={linkStyle}>
              About
            </Link>
            <Link href="/company/careers/" style={linkStyle}>
              Careers
            </Link>
          </div>

          {/* Follow Us + Contact */}
          <div style={{ textAlign: "right" }}>
            <h3 style={{ ...headingStyle, textAlign: "right" }}>Follow Us</h3>
            <div style={{ marginBottom: "32px" }}>
              <a
                href="https://www.facebook.com/NitcoIncOfficial/"
                target="_blank"
                rel="noreferrer"
                style={socialCircle}
              >
                <img
                  {...fb}
                  alt="Facebook"
                  style={{ width: "16px", height: "16px" }}
                />
              </a>
              <a
                href="https://twitter.com/nitcoofficial/"
                target="_blank"
                rel="noreferrer"
                style={socialCircle}
              >
                <img
                  {...X}
                  alt="X"
                  style={{ width: "14px", height: "14px" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/nitcoincofficial"
                target="_blank"
                rel="noreferrer"
                style={socialCircle}
              >
                <img
                  {...linkdin}
                  alt="LinkedIn"
                  style={{ width: "16px", height: "16px" }}
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UChm0AxXJl4gsIiUimX1kh-A"
                target="_blank"
                rel="noreferrer"
                style={{ ...socialCircle, marginRight: 0 }}
              >
                <img
                  {...youtube}
                  alt="YouTube"
                  style={{ width: "16px", height: "16px" }}
                />
              </a>
            </div>
            <h3 style={{ ...headingStyle, textAlign: "right" }}>Contact Us</h3>
            <a
              href="mailto:YourPartner@nitcoinc.com"
              style={{
                color: "#fff",
                fontSize: "14px",
                textDecoration: "none",
                opacity: 0.95,
              }}
            >
              YourPartner@nitcoinc.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.18)",
            marginTop: "40px",
            paddingTop: "22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <Link
              href="/privacy-policy"
              style={{ color: "#fff", fontSize: "13px", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              style={{ color: "#fff", fontSize: "13px", textDecoration: "none" }}
            >
              Cookie Policy
            </Link>
          </div>
          <p style={{ color: "#fff", fontSize: "13px", margin: 0, opacity: 0.85 }}>
            &copy; {currentYear} Nitco, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
