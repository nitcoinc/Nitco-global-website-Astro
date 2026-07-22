import { useEffect, useState } from "react";
import styles from './hubspot.module.css';

export default function HubSpotWhitepapersForm({ formId, downloadLink }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // postMessage listener — most reliable, fires after HubSpot records the submission
    const handleMessage = (event) => {
      if (
        event.data?.type === "hsFormCallback" &&
        event.data?.eventName === "onFormSubmitted"
      ) {
        setIsSubmitted(true);
        const container = document.getElementById("hubspotFormContainer");
        if (container) container.innerHTML = "";
      }
    };
    window.addEventListener("message", handleMessage);

    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "8158070",
          formId: formId,
          target: "#hubspotFormContainer",
          // onFormSubmitted fires after HubSpot records the submission
          onFormSubmitted: () => {
            setTimeout(() => {
              setIsSubmitted(true);
              const container = document.getElementById("hubspotFormContainer");
              if (container) container.innerHTML = "";
            }, 500);
          },
        });
      }
    });

    return () => {
      script.remove();
      window.removeEventListener("message", handleMessage);
    };
  }, [formId]); // ← formId only, NOT isSubmitted

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

  if (isSubmitted) {
    return (
      <div className={styles.thankYou}>
        <div className={styles.thankYouIcon}>✓</div>
        <h2 className={styles.thankYouTitle}>Thank You!</h2>
        <p className={styles.thankYouText}>
          {downloadLink
            ? "Your whitepaper is ready to download."
            : "We’ll send the whitepaper to your email shortly."}
        </p>
        {downloadLink && (
          <button onClick={handleDownload} className={styles.downloadBtn}>
            Download Now
          </button>
        )}
      </div>
    );
  }

  return <div id="hubspotFormContainer" className={styles.formContainer}></div>;
}
