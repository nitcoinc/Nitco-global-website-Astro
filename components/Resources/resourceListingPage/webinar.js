import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css"; // Unified styling

const WebinarsPage = ({ data }) => {
  const {
    webinars = [],
    webinartopicheading,
    webinartopic = [],
  } = data;

  const [selectedFilters, setSelectedFilters] = useState({
    webinartopic: [],
  });

  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const handleFilterClick = (filterType, filterValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter((value) => value !== filterValue)
        : [...prevFilters[filterType], filterValue],
    }));
  };

  const handleShowAllTopics = () => setShowAllTopics(!showAllTopics);

  // Filter webinars based on topic only
  const filteredWebinars = webinars.filter(
    (webinar) =>
      selectedFilters.webinartopic.length === 0 ||
      selectedFilters.webinartopic.includes(webinar.webinartopic)
  );

  // Pagination
  const totalPages = Math.ceil(filteredWebinars.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWebinars.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => setSelectedFilters({ webinartopic: [] });

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <Layout>
      <div className="container pb-5 button-block">
        {/* HEADER */}
        <div className="row mb-5">
          <div className="col-12 col-md-8">
            <h1>Latest insights & updates</h1>
          </div>
          <div className="col-12 col-md-4 mt-2 mt-md-1">
            <p>
              Stay up-to-date with our latest webinars. Explore expert talks,
              thought leadership sessions, and discussions on trending topics.
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
            {selectedFilters.webinartopic.length > 0 && (
              <div className={styles.selectedFilters}>
                <h3>Selected Filters:</h3>
                <div className={styles.filterGroup}>
                  {selectedFilters.webinartopic.map((topic, i) => (
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

            {/* Topic Filter Only */}
            {webinartopic.length > 0 && (
              <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>{webinartopicheading}</h3>
                <div className={styles.widgetContent}>
                  {webinartopic
                    .slice(0, showAllTopics ? webinartopic.length : 3)
                    .map(({ webinartopicdesc }, i) => (
                      <button
                        key={i}
                        className={styles.filterButton}
                        onClick={() =>
                          handleFilterClick("webinartopic", webinartopicdesc)
                        }
                      >
                        {webinartopicdesc}
                      </button>
                    ))}
                </div>
                {webinartopic.length > 3 && (
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
                <p>Oops! It seems there are no Webinars matching your filters.</p>
                <p>Try refining your filters or check back later for updates!</p>
              </div>
            ) : (
              <div className={styles.caseStudyGrid}>
                {currentItems.map((item, i) => {
                  const {
                    webinarConcept,
                    webinarText,
                    webinarImage,
                    slug,
                    webinartopic,
                    duration,
                    postedon,
                  } = item;

                  const truncatedDescription = truncateText(webinarText, 200);
                  const truncatedHeading = truncateText(webinarConcept, 50);

                  // Featured first webinar
                  if (i === 0) {
                    return (
                      <div key={i} className={styles.featuredItem}>
                        <div className={styles.featuredImage}>
                          <Link href={`/webinar/${slug}`}>
                            <img src={webinarImage} alt={truncatedHeading} />
                          </Link>
                        </div>
                        <div className={styles.featuredContent}>
                          <Link href={`/webinar/${slug}`}>
                            <h3 className={styles.itemTitle}>
                              {truncatedHeading}
                            </h3>
                          </Link>
                          <div className={styles.tags}>
                            {webinartopic && (
                              <span className={styles.tag}>{webinartopic}</span>
                            )}
                          </div>
                          <p className={styles.description}>
                            {truncatedDescription}
                          </p>
                          <div className={styles.meta}>
                            {duration && <span>{duration}</span>}
                            {postedon && <span>{postedon}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Other webinars
                  return (
                    <div key={i} className={styles.card}>
                      <Link href={`/webinar/${slug}`}>
                        <img
                          src={webinarImage}
                          alt={truncatedHeading}
                          className={styles.cardImg}
                        />
                      </Link>
                      <Link href={`/webinar/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncatedHeading}</h6>
                      </Link>
                      <div className={styles.tags}>
                        {webinartopic && (
                          <span className={styles.tag}>{webinartopic}</span>
                        )}
                      </div>
                      <p className={styles.description}>
                        {truncatedDescription}
                      </p>
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
    </Layout>
  );
};

export default WebinarsPage;
