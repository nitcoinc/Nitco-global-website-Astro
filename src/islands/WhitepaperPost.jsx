import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./whitepaperpost.module.css";
import HubSpotWhitepapersForm from "./HubSpotWhitepapersForm.jsx";

export default function WhitepaperPost({ data: pageData }) {
  const whitepaper = pageData?.whitepapers;
  const downloadLink = whitepaper?.pdfFileUrl || null;

  return (
    <div className={styles.page}>
      <div className={styles.bodyWrap}>
        <div className={styles.cols}>
          <article className={styles.article}>
            <div className={styles.prose}>
              <ReactMarkdown components={{ h1: 'h2' }}>{whitepaper?.body}</ReactMarkdown>
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
