import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./contactForm.module.css";

/* ── Inline SVG icons ── */
function Icon({ name, size = 18 }) {
  const p = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size, height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  const paths = {
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.88 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 10.91a16 16 0 006.36 6.36l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    alertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    building: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  };
  return <svg {...p}>{paths[name] || <circle cx="12" cy="12" r="9"/>}</svg>;
}

/* ── HubSpot config (unchanged) ── */
const HUBSPOT_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/8158070/591b39dd-a13c-4a1b-a1e4-c941be318797";

const INTEREST_MAP = {
  "Working Capital & Spend Integrity": "Working Capital & Spend Integrity",
  "Workflow Automation":               "Workflow Automation",
  "Decision-Ready Data":               "Decision-Ready Data",
  "Employee Knowledge & Productivity": "Employee Knowledge & Productivity",
  "Customer Experience & Support":     "Customer Experience & Support",
  "AI Solution Delivery":              "AI Solution Delivery",
  "AI Risk, Cost & Governance":        "AI Risk, Cost & Governance",
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: [],
    message: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      setStatus("captcha");
      return;
    }
    setSubmitting(true);
    setStatus(null);

    const body = {
      fields: [
        { name: "firstname", value: formData.firstName },
        { name: "lastname",  value: formData.lastName  },
        { name: "email",     value: formData.email     },
        { name: "message",   value: formData.message   },
        { name: "interest",  value: formData.interests.join(", ") },
      ],
    };

    try {
      const response = await fetch(HUBSPOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setStatus("error");
      } else {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", interests: [], message: "" });
        setCaptchaValue(null);
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}  aria-hidden="true"/>
        <div className={styles.heroGrid}  aria-hidden="true"/>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>Contact Us</span>
            <h1 className={styles.heroTitle}>
              Let&apos;s Build Something Together
            </h1>
            <p className={styles.heroSub}>
              Got an idea we can help with? Want to join our team? Here&apos;s how to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* ── FORM ── */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <p className={styles.formSub}>We&apos;ll get back to you within one business day.</p>

              {status === "success" && (
                <div className={styles.successMsg}>
                  <span className={styles.msgIcon}><Icon name="checkCircle" size={16}/></span>
                  Form submitted successfully — we&apos;ll be in touch soon!
                </div>
              )}
              {(status === "error") && (
                <div className={styles.errorMsg}>
                  <span className={styles.msgIcon}><Icon name="alertCircle" size={16}/></span>
                  There was an error submitting the form. Please try again.
                </div>
              )}
              {status === "captcha" && (
                <div className={styles.errorMsg}>
                  <span className={styles.msgIcon}><Icon name="alertCircle" size={16}/></span>
                  Please complete the CAPTCHA before submitting.
                </div>
              )}

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">
                      First Name<span className={styles.required}>*</span>
                    </label>
                    <input
                      className={styles.input}
                      type="text"
                      id="firstName"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">
                      Last Name<span className={styles.required}>*</span>
                    </label>
                    <input
                      className={styles.input}
                      type="text"
                      id="lastName"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    Email<span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="email"
                    id="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Interests<span className={styles.required}>*</span>
                  </label>
                  <div className={styles.checkboxGrid}>
                    {Object.entries(INTEREST_MAP).map(([label, value], i) => (
                      <label key={i} className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          className={styles.customCheckbox}
                          checked={formData.interests.includes(value)}
                          onChange={() => handleCheckboxChange(value)}
                        />
                        <span className={styles.checkboxLabel}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">
                    Message<span className={styles.required}>*</span>
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="message"
                    placeholder="Tell us about your project or question…"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.captcha}>
                  <ReCAPTCHA
                    sitekey="6Lew4yoqAAAAALwuAWLLde2vNnO6TVqLcD15sbYP"
                    onChange={(val) => setCaptchaValue(val)}
                    theme="dark"
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? "Sending…" : <><span>Send Message</span> <Icon name="arrowRight" size={16}/></>}
                </button>
              </form>
            </div>

            {/* ── SIDE ── */}
            <div className={styles.side}>
              <div className={styles.sideHeader}>
                <span className={styles.sideEyebrow}>Our Offices</span>
                <h2 className={styles.sideTitle}>Serving clients across the globe</h2>
                <p className={styles.sideSub}>
                  Headquartered in Texas with a delivery center in Hyderabad — we work across time zones to keep your projects moving.
                </p>
              </div>

              {/* USA */}
              <div className={styles.officeCard}>
                <div className={styles.officeHeader}>
                  <div className={styles.officeIconBox}>
                    <Icon name="building" size={16}/>
                  </div>
                  <div>
                    <p className={styles.officeCountry}>United States</p>
                  </div>
                  <span className={styles.officeFlag}>🇺🇸</span>
                </div>
                <div className={styles.officeRows}>
                  <div className={styles.officeRow}>
                    <div className={styles.officeRowIcon}><Icon name="phone" size={14}/></div>
                    <p className={styles.officeRowText}>
                      <a href="tel:2815037002">281-503-7002</a>
                    </p>
                  </div>
                  <div className={styles.officeRow}>
                    <div className={styles.officeRowIcon}><Icon name="mapPin" size={14}/></div>
                    <p className={styles.officeRowText}>440 Cobia Dr., Suite 1701, Katy, Texas 77494</p>
                  </div>
                </div>
              </div>

              {/* India */}
              <div className={styles.officeCard}>
                <div className={styles.officeHeader}>
                  <div className={styles.officeIconBox}>
                    <Icon name="building" size={16}/>
                  </div>
                  <div>
                    <p className={styles.officeCountry}>India</p>
                  </div>
                  <span className={styles.officeFlag}>🇮🇳</span>
                </div>
                <div className={styles.officeRows}>
                  <div className={styles.officeRow}>
                    <div className={styles.officeRowIcon}><Icon name="phone" size={14}/></div>
                    <p className={styles.officeRowText}>
                      <a href="tel:04045437549">040-45437549</a>
                    </p>
                  </div>
                  <div className={styles.officeRow}>
                    <div className={styles.officeRowIcon}><Icon name="mapPin" size={14}/></div>
                    <p className={styles.officeRowText}>514-515, 5th Floor DSL Abacus IT Park, IDA Uppal, Hyderabad, Telangana 500013</p>
                  </div>
                  <hr className={styles.officeDivider}/>
                  <div className={styles.officeRow}>
                    <div className={styles.officeRowIcon}><Icon name="phone" size={14}/></div>
                    <p className={styles.officeRowText}>
                      <a href="tel:04045437626">040-45437626</a>
                    </p>
                  </div>
                  <div className={styles.officeRow}>
                    <div className={styles.officeRowIcon}><Icon name="mapPin" size={14}/></div>
                    <p className={styles.officeRowText}>Gachibowli, Hyderabad, Telangana 500032</p>
                  </div>
                </div>
              </div>

              {/* Email quick-row */}
              <div className={styles.quickRow}>
                <div className={styles.quickIcon}><Icon name="mail" size={15}/></div>
                <div>
                  <p className={styles.quickLabel}>General inquiries</p>
                  <p className={styles.quickValue}>info@nitcoinc.com</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
