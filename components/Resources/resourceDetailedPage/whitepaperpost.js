import React from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import styles from "./whitepaperpost.module.css";
import HubSpotWhitepapersForm from "../../Hubspot/hubSpotWhitepapersForm";
import { urlFor } from '../../../lib/sanityImage.js';

export default function Whitepapers({ data: pageData }) {
  const whitepaper = pageData?.whitepapers;
  const downloadLink = whitepaper?.pdfFileUrl || null;

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── Hero ── */}
      <div className={styles.hero}>
        {whitepaper?.image && (
          <img
            src={urlFor(whitepaper.image, { width: 1200 })}
            alt={whitepaper.title || "Whitepaper"}
            className={styles.heroImg}
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            {whitepaper?.pagetype || "White Paper"}
          </span>
          {whitepaper?.title && (
            <h1 className={styles.heroTitle}>{whitepaper.title}</h1>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.bodyWrap}>
        <div className={styles.cols}>

          {/* Left — article */}
          <article className={styles.article}>
            <div className={styles.prose}>
              <ReactMarkdown>{whitepaper?.body}</ReactMarkdown>
            </div>
          </article>

          {/* Right — HubSpot download form */}
          <aside className={styles.sidebar}>
            <div className={styles.formCard}>
              <h3 className={styles.formHeading}>
                Download your copy
              </h3>
              <p className={styles.formSubheading}>
                Fill out the form below to get instant access to this whitepaper.
              </p>
              <HubSpotWhitepapersForm
                formId="431f4e43-590b-4aa7-aeb4-bccb4a47adf0"
                downloadLink={downloadLink}
              />
            </div>
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
