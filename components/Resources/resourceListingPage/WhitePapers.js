import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css"; // unified layout styling

const WhitePapers = ({ data }) => {
  const {
    whitepaperslist = [],
    whitepapertopicheading,
    whitepapertopic = [],
  } = data;

  const [selectedFilters, setSelectedFilters] = useState({
    whitepapertopic: [],
  });

  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1); // reset page when filters change
  }, [selectedFilters]);

  const handleFilterClick = (filterType, filterValue) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(filterValue)
        ? prev[filterType].filter((val) => val !== filterValue)
        : [...prev[filterType], filterValue],
    }));
  };

  const handleShowAllTopics = () => setShowAllTopics(!showAllTopics);

  // Filter whitepapers based on selected topics only
  const filteredWhitePapers = whitepaperslist.filter(
    (whitepaper) =>
      selectedFilters.whitepapertopic.length === 0 ||
      selectedFilters.whitepapertopic.includes(whitepaper.whitepapertopic) ||
      (whitepaper.whitepapertopic2 &&
        selectedFilters.whitepapertopic.includes(whitepaper.whitepapertopic2))
  );

  // Pagination
  const totalPages = Math.ceil(filteredWhitePapers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWhitePapers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => setSelectedFilters({ whitepapertopic: [] });

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <>
      <div className="container pb-5 button-block">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 col-md-8">
            <h1>Latest insights & updates</h1>
          </div>
          <div className="col-12 col-md-4 mt-2 mt-md-1">
            <p>
              Keep up with all our latest reports and expert opinions. Download
              whitepapers to stay ahead with research-backed insights.
            </p>
          </div>
        </div>

        <div className={styles.caseStudyContainer}>
          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            <div className={styles.buttonsList}>
              <ButtonsListArea />
            </div>

            {/* Selected Filters */}
            {selectedFilters.whitepapertopic.length > 0 && (
              <div className={styles.selectedFilters}>
                <h3>Selected Filters:</h3>
                <div className={styles.filterGroup}>
                  {selectedFilters.whitepapertopic.map((topic, i) => (
                    <button key={i} className={styles.filterButton}>
                      {topic}
                    </button>
                  ))}
                </div>
                <button className={styles.clearButton} onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}

            {/* Topics Filter Only */}
            {whitepapertopic.length > 0 && (
              <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>{whitepapertopicheading}</h3>
                <div className={styles.widgetContent}>
                  {whitepapertopic
                    .slice(0, showAllTopics ? whitepapertopic.length : 3)
                    .map(({ whitepapertopicdesc }, i) => (
                      <button
                        key={i}
                        className={styles.filterButton}
                        onClick={() =>
                          handleFilterClick("whitepapertopic", whitepapertopicdesc)
                        }
                      >
                        {whitepapertopicdesc}
                      </button>
                    ))}
                </div>
                {whitepapertopic.length > 3 && (
                  <button
                    className={styles.toggleButton}
                    onClick={handleShowAllTopics}
                  >
                    {showAllTopics ? "Show Less ▲" : "Show More ▼"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* MAIN CONTENT */}
          <div className={styles.mainContent}>
            {currentItems.length <= 0 ? (
              <div className={styles.noResults}>
                <p>Oops! It seems there are no White Papers matching your filters.</p>
                <p>Try refining your topics or check back later for new updates!</p>
              </div>
            ) : (
              <div className={styles.caseStudyGrid}>
                {currentItems.map((item, i) => {
                  const {
                    image,
                    heading,
                    description,
                    slug,
                    whitepapertopic,
                    whitepapertopic2,
                    duration,
                    postedon,
                  } = item;

                  const truncatedDesc = truncateText(description, 200);
                  const truncatedHeading = truncateText(heading, 50);

                  if (i === 0) {
                    return (
                      <div key={i} className={styles.featuredItem}>
                        <div className={styles.featuredImage}>
                          <Link href={`/whitepapers/${slug}`}>
                            <img src={image} alt={heading} />
                          </Link>
                        </div>
                        <div className={styles.featuredContent}>
                          <Link href={`/whitepapers/${slug}`}>
                            <h3 className={styles.itemTitle}>
                              {truncatedHeading}
                            </h3>
                          </Link>
                          <div className={styles.tags}>
                            {[whitepapertopic, whitepapertopic2]
                              .filter(Boolean)
                              .map((tag, idx) => (
                                <span key={idx} className={styles.tag}>
                                  {tag}
                                </span>
                              ))}
                          </div>
                          <p className={styles.description}>{truncatedDesc}</p>
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
                        <img
                          src={image}
                          alt={heading}
                          className={styles.cardImg}
                        />
                      </Link>
                      <Link href={`/whitepapers/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncatedHeading}</h6>
                      </Link>
                      <div className={styles.tags}>
                        {[whitepapertopic, whitepapertopic2]
                          .filter(Boolean)
                          .map((tag, idx) => (
                            <span key={idx} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                      </div>
                      <p className={styles.description}>{truncatedDesc}</p>
                      <div className={styles.meta}>
                        {duration && <span>{duration}</span>}
                        {postedon && <span>{postedon}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.paginationArea}>
                <nav aria-label="Page navigation">
                  <ul className={styles.pagination}>
                    {/* Prev */}
                    <li
                      className={`${styles.pageItem} ${
                        currentPage === 1 ? styles.disabled : ""
                      }`}
                    >
                      <button
                        className={styles.pageLink}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                    </li>

                    {currentPage > 1 && (
                      <li className={styles.pageItem}>
                        <button
                          className={styles.pageLink}
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          {currentPage - 1}
                        </button>
                      </li>
                    )}

                    <li className={`${styles.pageItem} ${styles.active}`}>
                      <button className={styles.pageLink}>{currentPage}</button>
                    </li>

                    {currentPage < totalPages && (
                      <li className={styles.pageItem}>
                        <button
                          className={styles.pageLink}
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          {currentPage + 1}
                        </button>
                      </li>
                    )}

                    {currentPage < totalPages - 1 && (
                      <>
                        <li className={`${styles.pageItem} ${styles.disabled}`}>
                          <span className={styles.pageLink}>...</span>
                        </li>
                        <li className={styles.pageItem}>
                          <button
                            className={styles.pageLink}
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </li>
                      </>
                    )}

                    {/* Next */}
                    <li
                      className={`${styles.pageItem} ${
                        currentPage === totalPages ? styles.disabled : ""
                      }`}
                    >
                      <button
                        className={styles.pageLink}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhitePapers;
