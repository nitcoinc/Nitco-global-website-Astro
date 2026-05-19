import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./allposts.module.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import InsightsSubscribeForm from "../../Hubspot/HubspotInsightsForm/insightsSubscribeForm";
import { urlFor } from '../../../lib/sanityImage.js';
import { BlogPostingSchema } from '../../seo/StructuredData';

export default function Post({
  data: pageData,
  sorteddata: blogdata,
}) {
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
  const description = pageData?.allPosts?.description;
  const publishedAt = pageData?.allPosts?.publishedAt;
  const postedBy = pageData?.allPosts?.postedBy;

  return (
    <div className={styles.page}>
      <Navbar />

      {image && (
        <BlogPostingSchema
          title={title}
          description={description}
          image={urlFor(image, { width: 1200 })}
          datePublished={publishedAt}
          author={postedBy}
        />
      )}

      {/* ── Hero ── */}
      <div className={styles.hero}>
        {image && (
          <Image src={urlFor(image, { width: 1200 })} alt={title || pageType} width={1200} height={630} sizes="100vw" priority className={styles.heroImg} />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{pageType}</span>
          {title && <h1 className={styles.heroTitle}>{title}</h1>}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.bodyWrap}>
        <div className={styles.cols} ref={containerRef}>

          {/* Left — article */}
          <article className={styles.article}>
            <div className={styles.prose}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {body}
              </ReactMarkdown>
            </div>

            {/* Recent Posts */}
            {blogdata && blogdata.length > 0 && (
              <section className={styles.recentSection}>
                <h2 className={styles.recentHeading}>
                  Recent <span className={styles.accent}>Posts</span>
                </h2>
                <div className={styles.recentGrid}>
                  {blogdata.slice(0, 4).map((p, i) => (
                    <a
                      key={i}
                      href={`/${p.pageType}/${p.slug}`}
                      className={styles.recentCard}
                    >
                      <Image
                        src={urlFor(p.image, { width: 400 })}
                        alt={p.title || p.pageType || "Post"}
                        width={400}
                        height={267}
                        sizes="(max-width: 768px) 100vw, 400px"
                        className={styles.recentImg}
                      />
                      <p className={styles.recentTitle}>{p.title}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right — subscribe form */}
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

      <Footer />
    </div>
  );
}
