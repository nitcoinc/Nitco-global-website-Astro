import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useTina } from "tinacms/dist/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./allposts.module.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import NavBarMobile from "../../Navbar/NavBarMobile/navBarMobile";
import FooterDesignMobile from "../../Footer/FooterDesign/FooterDesignMobile";
import InsightsSubscribeForm from "../../Hubspot/HubspotInsightsForm/insightsSubscribeForm";

export default function Post({
  query,
  variables,
  data: pageData,
  sorteddata: blogdata,
}) {
  const {
    data: { post },
  } = useTina({
    query: query,
    variables: variables,
    data: pageData,
    sorteddata: blogdata,
  });

  const stickyRef = useRef(null);
  const containerRef = useRef(null);
  const [fixed, setFixed] = useState(false);
  const [bottomReached, setBottomReached] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const containerSticky = containerRef.current;
      const sticky = stickyRef.current;

      if (!containerSticky || !sticky) return;

      const containerRect = containerSticky.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const rightSectionWidth = sticky.parentElement.offsetWidth;
      const topOffset = 80;

      if (containerRect.top <= topOffset) {
        if (containerRect.bottom >= stickyHeight + topOffset) {
          setFixed(true);
          setBottomReached(false);
          sticky.style.width = `${rightSectionWidth}px`;
        } else {
          setFixed(false);
          setBottomReached(true);
          sticky.style.width = "100%";
        }
      } else {
        setFixed(false);
        setBottomReached(false);
        sticky.style.width = "100%";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar />
      <NavBarMobile />

      <div className={styles.main}>
        {/* Hero Section */}
        <div className={styles.imageTextMain}>
          <img
            src={pageData?.allPosts.image}
            alt={
              pageData?.allPosts.title
                ? pageData?.allPosts.title
                : pageData?.allPosts.pagetype
                  ? `${pageData?.allPosts.pagetype} visual`
                  : "Nitco banner image"
            }
            className={styles.image}
          />
          {pageData?.allPosts.title ? (
            <div className={styles.textMain}>
              <p className={styles.highlightText}>
                {pageData?.allPosts.pagetype}{" "}
              </p>
              <h1 className={styles.text}>{pageData?.allPosts.title}</h1>
            </div>
          ) : (
            " "
          )}
        </div>

        {/* Content Section */}
        <div style={{ marginTop: "70px" }} className="container">
          <div className={styles.pageWrapper}>
            <div className={styles.containerSticky} ref={containerRef}>
              {/* Left Section */}
              <div className={styles.leftSection}>
                <div>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {pageData?.allPosts.body}
                  </ReactMarkdown>
                </div>

                {/* Recent Posts Section */}
                <div className={styles.sectionHead}>
                  <h1 style={{ fontWeight: "600" }}>
                    Recent <span style={{ color: "#ed1651" }}>Post</span>
                  </h1>
                  <div className={styles.mainRecent}>
                    {blogdata.slice(0, 4).map((post, index) => (
                      <a
                        href={`/${post.pageType}/${post.slug}`}
                        key={index}
                        className={styles.box}
                      >
                        <img
                          src={post.image}
                          alt={post.title || post.pageType || "Nitco recent post"}
                          className={styles.ImagesSty}
                        />
                        <p className={styles.description}>{post.title}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section (Subscribe Form) */}
              <div className={styles.rightSection}>
                <div
                  ref={stickyRef}
                  className={`${styles.stickyCard} 
                    ${fixed ? styles.fixed : ""} 
                    ${bottomReached ? styles.bottom : ""}`}
                >
                  <InsightsSubscribeForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FooterDesignMobile />
    </div>
  );
}
