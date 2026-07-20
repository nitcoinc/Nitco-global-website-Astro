import { useState } from "react";
import styles from "./ExclusiveReportPage.module.css";

/* ── Inline SVG icons ── */
const Icon = ({ name, size = 16 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  switch (name) {
    case "arrowLeft":  return <svg {...p}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
    case "check":      return <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>;
    case "fileReport": return <svg {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    default: return null;
  }
};


/* ── MIT Technology Review Insights logo ── */
const MITLogo = () => (
  <div className={styles.mitLogo}>
    <div className={styles.mitLogoTop}>MIT</div>
    <div className={styles.mitLogoBottom}>
      <span>Technology</span>
      <span>Review</span>
      <span className={styles.mitInsights}>Insights</span>
    </div>
  </div>
);

const BULLETS = [
  "Cross-functional success, moving AI out of IT and into every department",
  "More complex AI workflows that break down silos and span more data sources",
  "Greater autonomy in AI workflows today, and confidence in future autonomy",
];

export default function ExclusiveReportPage() {
  const [form, setForm]       = useState({ firstName: "", jobTitle: "", email: "" });
  const [agreed, setAgreed]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]   = useState({});

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.jobTitle.trim())  e.jobTitle  = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid business email required";
    if (!agreed) e.agreed = "You must agree to continue";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  }

  return (
    <main className={styles.page}>

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.container}>
          <a href="/resources/" className={styles.backLink}>
            <Icon name="arrowLeft" size={14} /> Back to Resources
          </a>

          <div className={styles.kicker}>
            <span className={styles.kickerIcon}><Icon name="fileReport" size={12} /></span>
            Exclusive Report
          </div>

          <div className={styles.partnerLogos}>
            <img src="/images/exclusive-reports/celigo-logo.png" alt="celigo" className={styles.celigoLogo} />
            <span className={styles.logoDivider}>×</span>
            <img src="/images/exclusive-reports/nitco-logo-white.png" alt="NITCO" className={styles.nitcoLogo} />
          </div>

          <h1 className={styles.heroHeading}>
            Bridging the operational gap<br className={styles.br} /> with intelligent integration
          </h1>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTENT + FORM
      ══════════════════════════════════════ */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.layout}>

            {/* ── Left: body content ── */}
            <div className={styles.content}>
              <a
                href="https://info.celigo.com/mit-nitco-inc"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contentHeadingLink}
              >
                Reserve your copy of the full MIT Technology Review Insights report.
              </a>
              <p className={styles.body}>
                AI is everywhere. Why isn&apos;t it working for everyone?
              </p>
              <p className={styles.body}>
                New research from MIT Technology Review Insights, in association with Celigo,
                surveyed 500 IT decision makers to identify why some organizations operationalize
                AI successfully, while others stall.
              </p>

              <p className={styles.bodyBold}>
                Learn how elite organizations use a unified integration strategy to achieve:
              </p>

              <ul className={styles.bullets}>
                {BULLETS.map((b) => (
                  <li key={b} className={styles.bullet}>
                    <span className={styles.bulletIcon}><Icon name="check" size={12} /></span>
                    {b}
                  </li>
                ))}
              </ul>

              <p className={styles.body}>
                Stop experimenting and start scaling. Discover the operational &ldquo;secret sauce&rdquo; used
                by organizations who are achieving AI success.
              </p>

              <div className={styles.mitLogoWrap}>
                <MITLogo />
              </div>
            </div>

            {/* ── Right: form ── */}
            <aside className={styles.formCard}>
              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <Icon name="check" size={26} />
                  </div>
                  <h2 className={styles.successTitle}>Thank you!</h2>
                  <p className={styles.successBody}>
                    Your request has been received. Access the full report instantly on
                    the Celigo &amp; MIT Technology Review Insights page.
                  </p>
                  <a
                    href="https://info.celigo.com/mit-nitco-inc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.submitBtn}
                  >
                    Access the report →
                  </a>
                </div>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Get the report</h2>
                  <p className={styles.formSub}>Fill out the form to download instantly.</p>

                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldWrap}>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={(e) => { setForm(f => ({ ...f, firstName: e.target.value })); setErrors(er => ({ ...er, firstName: "" })); }}
                        className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                      />
                      {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                    </div>

                    <div className={styles.fieldWrap}>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={form.jobTitle}
                        onChange={(e) => { setForm(f => ({ ...f, jobTitle: e.target.value })); setErrors(er => ({ ...er, jobTitle: "" })); }}
                        className={`${styles.input} ${errors.jobTitle ? styles.inputError : ""}`}
                      />
                      {errors.jobTitle && <span className={styles.errorMsg}>{errors.jobTitle}</span>}
                    </div>

                    <div className={styles.fieldWrap}>
                      <input
                        type="email"
                        placeholder="Business Email"
                        value={form.email}
                        onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                      />
                      {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                    </div>

                    <div className={styles.checkboxWrap}>
                      <label className={`${styles.checkboxLabel} ${errors.agreed ? styles.checkboxError : ""}`}>
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => { setAgreed(e.target.checked); setErrors(er => ({ ...er, agreed: "" })); }}
                          className={styles.checkbox}
                        />
                        <span>
                          We have updated our{" "}
                          <a
                            href="https://www.celigo.com/privacy-policy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.privacyLink}
                          >
                            privacy policy
                          </a>
                          . By submitting this form, the information you provide will be used in
                          accordance with the terms of our privacy policy.{" "}
                          <span className={styles.required}>*</span>
                        </span>
                      </label>
                      {errors.agreed && <span className={styles.errorMsg}>{errors.agreed}</span>}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Access the report
                    </button>
                  </form>
                </>
              )}
            </aside>

          </div>
        </div>
      </section>

    </main>
  );
}
