import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";
import { urlFor } from '../../../lib/sanityImage.js';

const WebinarsPage = ({ posts = [] }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedTopics]);

  const topics = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const clearFilters = () => setSelectedTopics([]);

  const filteredItems = posts.filter(
    (p) => selectedTopics.length === 0 || selectedTopics.includes(p.blogcategory)
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}><h1>Webinars</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Expert talks and thought leadership sessions on the topics that matter most.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedTopics.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedTopics.map((t) => <button key={t} className={styles.filterButton} onClick={() => handleFilterClick(t)}>{t}</button>)}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {topics.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Topics</h3>
              <div className={styles.widgetContent}>
                {topics.slice(0, showAllTopics ? undefined : 3).map((t, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick(t)}>{t}</button>
                ))}
              </div>
              {topics.length > 3 && <button className={styles.toggleButton} onClick={() => setShowAllTopics(!showAllTopics)}>{showAllTopics ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No webinars match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { title, description, image, slug, blogcategory, duration, publishedAt } = item;
                const itemKey = slug || i;
                const dateDisplay = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

                if (i === 0) {
                  return (
                    <div key={itemKey} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/webinar/${slug}`}><Image src={urlFor(image, { width: 400 })} alt={title} width={400} height={267} sizes="(max-width: 768px) 100vw, 400px" /></Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>{blogcategory && <span className={styles.tag}>{blogcategory}</span>}</div>
                        <Link href={`/webinar/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <Link href={`/webinar/${slug}`}><Image src={urlFor(image, { width: 400 })} alt={title} width={400} height={267} sizes="(max-width: 768px) 100vw, 400px" className={styles.cardImg} /></Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>{blogcategory && <span className={styles.tag}>{blogcategory}</span>}</div>
                      <Link href={`/webinar/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.paginationArea}>
              <ul className={styles.pagination}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button></li>
                {currentPage > 1 && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button></li>}
                <li className={`${styles.pageItem} ${styles.active}`}><button className={styles.pageLink}>{currentPage}</button></li>
                {currentPage < totalPages && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button></li>}
                {currentPage < totalPages - 1 && (<><li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li><li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button></li></>)}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarsPage;
