import { useEffect, useState } from "react";

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
          region: "na1", // ✅ adjust if your HubSpot portal region differs
          portalId: "8158070",
          formId: formId,
          target: "#hubspotFormContainer",
          onFormSubmit: () => {
            // Wait to let HubSpot process the submission
            setTimeout(() => {
              setIsSubmitted(true);
              const container = document.getElementById("hubspotFormContainer");
              if (container) container.innerHTML = "";
            }, 1200);
          },
        });
      }
    });

    return () => {
      script.remove();
    };
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
      <div className="thankyou-box">
        <h2>Thank You!</h2>
        <p>Here is your whitepaper ready for download.</p>
        <button onClick={handleDownload} className="download-btn">
          DOWNLOAD
        </button>
      </div>
    );
  }

  return <div id="hubspotFormContainer"></div>;
};

export default HubSpotWhitepapersForm;
