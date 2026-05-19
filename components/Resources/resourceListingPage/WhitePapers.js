import React, { useState } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";
import { urlFor } from '../../../lib/sanityImage.js';

const WhitePapers = ({ whitepapers = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(whitepapers.length / itemsPerPage);
  const currentItems = whitepapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}><h1>White Papers</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Download research-backed reports and expert opinions to stay ahead of the curve.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}><ButtonsListArea /></div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}><p>No white papers found.</p></div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { image, title, description, slug } = item;
                const itemKey = slug || i;

                if (i === 0) {
                  return (
                    <div key={itemKey} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/whitepapers/${slug}`}><img src={urlFor(image, { width: 400 })} alt={title} /></Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <Link href={`/whitepapers/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <Link href={`/whitepapers/${slug}`}><img src={urlFor(image, { width: 400 })} alt={title} className={styles.cardImg} /></Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <Link href={`/whitepapers/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
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

export default WhitePapers;
