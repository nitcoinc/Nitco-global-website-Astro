import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css"; // Use same CSS as CaseStudies

const BlogPage = ({ data }) => {
  const {
    blogpost,
    catheading,
    categories = [],
  } = data;

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
  });

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1); // Reset page on filter change
  }, [selectedFilters]);

  const handleFilterClick = (filterType, filterValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter((v) => v !== filterValue)
        : [...prevFilters[filterType], filterValue],
    }));
  };

  const handleShowAllCategories = () =>
    setShowAllCategories(!showAllCategories);

  // Filter logic (only by topics/categories)
  const filteredBlogs = blogpost.filter(
    (blog) =>
      selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(blog.blogcategory) ||
      (blog.blogcategory2 &&
        selectedFilters.categories.includes(blog.blogcategory2))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setSelectedFilters({ categories: [] });
  };

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <>
      <div className="container pb-5 button-block">
        <div className="row mb-5">
          <div className="col-12 col-md-8">
            <h1>Latest insights & updates</h1>
          </div>
          <div className="col-12 col-md-4 mt-2 mt-md-1">
            <p>
              Keep up with all our latest news. Check out articles, download
              reports, listen to our podcast or get information about events.
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
            {selectedFilters.categories.length > 0 && (
              <div className={styles.selectedFilters}>
                <h3>Selected Filters:</h3>
                <div className={styles.filterGroup}>
                  {selectedFilters.categories.map((cat, i) => (
                    <button key={i} className={styles.filterButton}>
                      {cat}
                    </button>
                  ))}
                </div>
                <button className={styles.clearButton} onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}

            {/* Topics / Categories only */}
            {categories.length > 0 && (
              <div className={styles.widget}>
                <h3 className={styles.widgetTitle}>{catheading}</h3>
                <div className={styles.widgetContent}>
                  {categories
                    .slice(0, showAllCategories ? categories.length : 3)
                    .map(({ catdesc }, i) => (
                      <button
                        key={i}
                        className={styles.filterButton}
                        onClick={() => handleFilterClick("categories", catdesc)}
                      >
                        {catdesc}
                      </button>
                    ))}
                </div>
                {categories.length > 3 && (
                  <button
                    className={styles.toggleButton}
                    onClick={handleShowAllCategories}
                  >
                    {showAllCategories ? "Show Less ▲" : "Show More ▼"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className={styles.mainContent}>
            {currentBlogs.length <= 0 ? (
              <div className={styles.noResults}>
                <p>Oops! It seems there are no Blogs matching your filters.</p>
                <p>Try refining your filters or check back later for updates!</p>
              </div>
            ) : (
              <div className={styles.caseStudyGrid}>
                {currentBlogs.map((item, i) => {
                  const {
                    blogimage,
                    headingpro,
                    description,
                    slug,
                    blogcategory,
                    blogcategory2,
                    duration,
                    postedon,
                  } = item;

                  const truncatedDesc = truncateText(description, 200);
                  const truncatedTitle = truncateText(headingpro, 50);

                  if (i === 0) {
                    return (
                      <div key={i} className={styles.featuredItem}>
                        <div className={styles.featuredImage}>
                          <Link href={`/blog/${slug}`}>
                            <img src={blogimage} alt={headingpro} />
                          </Link>
                        </div>
                        <div className={styles.featuredContent}>
                          <Link href={`/blog/${slug}`}>
                            <h3 className={styles.itemTitle}>
                              {truncatedTitle}
                            </h3>
                          </Link>
                          <div className={styles.tags}>
                            {[blogcategory, blogcategory2]
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
                      <Link href={`/blog/${slug}`}>
                        <img
                          src={blogimage}
                          alt={headingpro}
                          className={styles.cardImg}
                        />
                      </Link>
                      <Link href={`/blog/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncatedTitle}</h6>
                      </Link>
                      <div className={styles.tags}>
                        {[blogcategory, blogcategory2]
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
    </>
  );
};

export default BlogPage;
