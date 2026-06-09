import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./whitepaperpost.module.css";
import HubSpotWhitepapersForm from "./HubSpotWhitepapersForm.jsx";
import { urlFor } from "../lib/sanityImage.js";

export default function WhitepaperPost({ data: pageData }) {
  const whitepaper = pageData?.whitepapers;
  const downloadLink = whitepaper?.pdfFileUrl || null;
  const heroImgSrc = whitepaper?.image ? urlFor(whitepaper.image).width(1200).url() : null;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        {heroImgSrc && (
          <img
            src={heroImgSrc}
            alt={whitepaper.title || "Whitepaper"}
            width={1200}
            height={630}
            className={styles.heroImg}
            loading="eager"
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

      <div className={styles.bodyWrap}>
        <div className={styles.cols}>
          <article className={styles.article}>
            <div className={styles.prose}>
              <ReactMarkdown>{whitepaper?.body}</ReactMarkdown>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.formCard}>
              <h3 className={styles.formHeading}>Download your copy</h3>
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
    </div>
  );
}
