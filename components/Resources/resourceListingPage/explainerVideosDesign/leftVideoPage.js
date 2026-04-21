import React, { useEffect, useState } from "react";
import styles from "./leftVideoSection.module.css";

const LeftVideoPage = ({ data }) => {
  const { text_L_V, tagline_L_V, video_L_V } = data;
  const anchorId = tagline_L_V
    ? tagline_L_V.toLowerCase().replace(/\s+/g, "-")
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

    // Hide message after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <section
        id={anchorId}
        className={`container ${isFeatured ? styles.featured : ""}`}
      >
        <div className={styles.videoSection}>
          <div className={styles.videoLeft}>
            <div className={styles.videoMain}>
              <iframe
                src={video_L_V}
                className={styles.videoSelf}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={tagline_L_V}
                width="100%"
              />
            </div>
          </div>

          <div className={`${styles.videoRight} ${styles.copyLinkContainer}`}>
            <h2>{tagline_L_V}</h2>
            <p>{text_L_V}</p>

            {/* 🔗 Hover Copy Link */}
            {!isFeatured && (
              <span className={styles.copyLink} onClick={handleCopy}>
                🔗 Click to Copy Link
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ✅ Bottom Left Toast Message */}
      {showToast && (
        <div className={styles.toastBox}>
          ✅ Link copied to dashboard
        </div>
      )}
    </>
  );
};

export default LeftVideoPage;
