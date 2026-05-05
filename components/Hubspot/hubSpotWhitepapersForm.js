import { useEffect, useState } from "react";
import styles from "./hubspot.module.css";

const HubSpotWhitepapersForm = ({ formId, downloadLink }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt && !isSubmitted) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "8158070",
          formId: formId,
          target: "#hubspotFormContainer",
          onFormSubmit: () => {
            setTimeout(() => {
              setIsSubmitted(true);
              const container = document.getElementById("hubspotFormContainer");
              if (container) container.innerHTML = "";
            }, 1200);
          },
        });
      }
    });

    return () => { script.remove(); };
  }, [formId, isSubmitted]);

  const handleDownload = async () => {
    try {
      const response = await fetch(downloadLink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const filename = downloadLink.split("/").pop() || "whitepaper.pdf";
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (isSubmitted && downloadLink) {
    return (
      <div className={styles.thankYou}>
        <div className={styles.thankYouIcon}>✓</div>
        <h2 className={styles.thankYouTitle}>Thank You!</h2>
        <p className={styles.thankYouText}>Your whitepaper is ready to download.</p>
        <button onClick={handleDownload} className={styles.downloadBtn}>
          Download Now
        </button>
      </div>
    );
  }

  return <div id="hubspotFormContainer" className={styles.formContainer}></div>;
};

export default HubSpotWhitepapersForm;
