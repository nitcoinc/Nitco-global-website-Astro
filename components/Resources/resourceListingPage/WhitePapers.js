import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const WhitePapers = ({ data }) => {
  const { whitepaperslist = [], whitepapertopicheading, whitepapertopic = [] } = data;

  const [selectedFilters, setSelectedFilters] = useState({ whitepapertopic: [] });
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedFilters]);

  const handleFilterClick = (filterType, filterValue) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(filterValue)
        ? prev[filterType].filter((v) => v !== filterValue)
        : [...prev[filterType], filterValue],
    }));
  };

  const clearFilters = () => setSelectedFilters({ whitepapertopic: [] });

  const filteredItems = whitepaperslist.filter(
    (wp) =>
      selectedFilters.whitepapertopic.length === 0 ||
      selectedFilters.whitepapertopic.includes(wp.whitepapertopic) ||
      (wp.whitepapertopic2 && selectedFilters.whitepapertopic.includes(wp.whitepapertopic2))
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
        <div className={styles.listingHeaderLeft}>
          <h1>White Papers</h1>
        </div>
        <div className={styles.listingHeaderRight}>
          <p>Download research-backed reports and expert opinions to stay ahead of the curve.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedFilters.whitepapertopic.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedFilters.whitepapertopic.map((t, i) => (
                  <button key={i} className={styles.filterButton}>{t}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {whitepapertopic.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>{whitepapertopicheading}</h3>
              <div className={styles.widgetContent}>
                {whitepapertopic.slice(0, showAllTopics ? undefined : 3).map(({ whitepapertopicdesc }, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("whitepapertopic", whitepapertopicdesc)}>{whitepapertopicdesc}</button>
                ))}
              </div>
              {whitepapertopic.length > 3 && (
                <button className={styles.toggleButton} onClick={() => setShowAllTopics(!showAllTopics)}>
                  {showAllTopics ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No white papers match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { image, heading, description, slug, whitepapertopic, whitepapertopic2, duration, postedon } = item;
                const tags = [whitepapertopic, whitepapertopic2].filter(Boolean);

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/whitepapers/${slug}`}>
                          <img src={image} alt={heading} />
                        </Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>
                          {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                        </div>
                        <Link href={`/whitepapers/${slug}`}>
                          <h3 className={styles.itemTitle}>{truncateText(heading, 80)}</h3>
                        </Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>
                          {duration && <span>{duration}</span>}
                          {postedon && <span>{postedon}</span>}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className={styles.card}>
                    <Link href={`/whitepapers/${slug}`}>
                      <img src={image} alt={heading} className={styles.cardImg} />
                    </Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>
                        {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                      </div>
                      <Link href={`/whitepapers/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncateText(heading, 80)}</h6>
                      </Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>
                        {duration && <span>{duration}</span>}
                        {postedon && <span>{postedon}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.paginationArea}>
              <ul className={styles.pagination}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}>
                  <button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                </li>
                {currentPage > 1 && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button></li>}
                <li className={`${styles.pageItem} ${styles.active}`}><button className={styles.pageLink}>{currentPage}</button></li>
                {currentPage < totalPages && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button></li>}
                {currentPage < totalPages - 1 && (
                  <>
                    <li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li>
                    <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button></li>
                  </>
                )}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}>
                  <button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhitePapers;
