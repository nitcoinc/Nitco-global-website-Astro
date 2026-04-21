import React, { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import ReactMarkdown from "react-markdown";
import Layout from "../../Layout";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import NavBarMobile from "../../Navbar/NavBarMobile/navBarMobile";
import FooterDesignMobile from "../../Footer/FooterDesign/FooterDesignMobile";
import styles from "./whitepaperpost.module.css"
import HubSpotWhitepapersForm from "../../Hubspot/hubSpotWhitepapersForm";





export default function Whitepapers({ query, variables, data: pageData }) {
  const {
    data: { post },
  } = useTina({ query, variables, data: pageData });

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector("#formSentinel");
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { root: null }
    );
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const whitepaper = pageData?.whitepapers;
  const content = whitepaper?.body || "";
  const downloadLink = whitepaper?.pdfFileUrl || null;



  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      <div className={styles.main}>
        <div className={styles.imageTextMain}>
          <img
            src={whitepaper?.image}
            alt={whitepaper?.title}
            className={styles.image}
          />
          <div className={styles.textMain}>
            <p className={styles.highlightText}>
              {whitepaper?.pagetype}
            </p>
            <h1 className={styles.text}>{whitepaper?.title}</h1>
          </div>
        </div>
        <div className="container">
          <div className={`row ${styles.block2}`}>
            <div className="col-lg-8 col-md-12" style={{ marginBottom: "40px" }}>
              <div className="markdown-container">
                <ReactMarkdown>{whitepaper?.body}</ReactMarkdown>
              </div>
            </div>
            <div className="col-lg-4 col-md-12" style={{ marginBottom: "40px" }}>
              <div className="whitepapers-download-from" id="secondary">
                <h3 style={{ color: "#dc4a46" }}>
                  Please fill out the form to download your copy
                </h3>
                <HubSpotWhitepapersForm
                  formId="431f4e43-590b-4aa7-aeb4-bccb4a47adf0"
                  downloadLink={downloadLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
}
