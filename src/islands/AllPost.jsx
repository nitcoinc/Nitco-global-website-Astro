import * as React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./allposts.module.css";
import InsightsSubscribeForm from "./InsightsSubscribeForm.jsx";
import { urlFor } from "../lib/sanityImage.js";

export default function AllPost({ data: pageData, sorteddata: blogdata }) {
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
      const topOffset = 90;
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

  const pageType = pageData?.allPosts?.pagetype || pageData?.allPosts?.pageType || "Blog";
  const title = pageData?.allPosts?.title;
  const image = pageData?.allPosts?.image;
  const body = pageData?.allPosts?.body;

  const heroImgSrc = image ? urlFor(image).width(1200).url() : null;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        {heroImgSrc && (
          <img
            src={heroImgSrc}
            alt={title || pageType}
            width={1200}
            height={630}
            className={styles.heroImg}
            loading="eager"
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{pageType}</span>
          {title && <h1 className={styles.heroTitle}>{title}</h1>}
        </div>
      </div>

      <div className={styles.bodyWrap}>
        <div className={styles.cols} ref={containerRef}>
          <article className={styles.article}>
            <div className={styles.prose}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ h1: 'h2' }}>
                {body}
              </ReactMarkdown>
            </div>

            {blogdata && blogdata.length > 0 && (
              <section className={styles.recentSection}>
                <h2 className={styles.recentHeading}>
                  Recent <span className={styles.accent}>Posts</span>
                </h2>
                <div className={styles.recentGrid}>
                  {blogdata.slice(0, 4).map((p, i) => {
                    const postImgSrc = p.image ? urlFor(p.image).width(400).url() : null;
                    return (
                      <a key={i} href={`/${p.pageType}/${p.slug}/`} className={styles.recentCard}>
                        {postImgSrc && (
                          <img
                            src={postImgSrc}
                            alt={p.title || p.pageType || "Post"}
                            width={400}
                            height={267}
                            className={styles.recentImg}
                            loading="lazy"
                          />
                        )}
                        <p className={styles.recentTitle}>{p.title}</p>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </article>

          <aside className={styles.sidebar}>
            <div
              ref={stickyRef}
              className={`${styles.stickyWrap} ${fixed ? styles.fixed : ""} ${bottomReached ? styles.bottom : ""}`}
            >
              <InsightsSubscribeForm />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
