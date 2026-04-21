import React, { useEffect, useState } from "react";
import styles from "./rightVideoSection.module.css";

const RightVideoPage = ({ data }) => {
  const { text_R_V, tagline_R_V, video_R_V } = data;
  const anchorId = tagline_R_V
    ? tagline_R_V.toLowerCase().replace(/\s+/g, "-")
    : "";

  const [isFeatured, setIsFeatured] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (window.location.hash === `#${anchorId}`) {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsFeatured(true);
    }
  }, [anchorId]);

  const handleCopy = () => {
    const link = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard.writeText(link);
    setShowToast(true);

    // Hide toast after 2 seconds
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <section
        id={anchorId}
        className={`container ${isFeatured ? styles.featured : ""}`}
      >
        <div className={styles.videoSectionRight}>
          <div className={`${styles.textBlock} ${styles.copyLinkContainer}`}>
            <h2>{tagline_R_V}</h2>
            <p>{text_R_V}</p>

            {/* Copy Link */}
            {!isFeatured && (
              <span className={styles.copyLink} onClick={handleCopy}>
                🔗 Click to Copy Link
              </span>
            )}
          </div>

          <div className={styles.videoBlock}>
            <div className={styles.videoMain}>
              <iframe
                src={video_R_V}
                className={styles.videoSelf}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={tagline_R_V}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toast message */}
      {showToast && (
        <div className={styles.toastBox}>
          ✅ Link copied to dashboard
        </div>
      )}
    </>
  );
};

export default RightVideoPage;
