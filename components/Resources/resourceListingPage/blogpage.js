import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const BlogPage = ({ data }) => {
  const { blogpost, catheading, categories = [] } = data;

  const [selectedFilters, setSelectedFilters] = useState({ categories: [] });
  const [showAllCategories, setShowAllCategories] = useState(false);
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

  const clearFilters = () => setSelectedFilters({ categories: [] });

  const filteredBlogs = blogpost.filter(
    (blog) =>
      selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(blog.blogcategory) ||
      (blog.blogcategory2 && selectedFilters.categories.includes(blog.blogcategory2))
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}>
          <h1>Latest Insights &amp; Updates</h1>
        </div>
        <div className={styles.listingHeaderRight}>
          <p>Keep up with our latest news — articles, reports, podcasts, and events.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedFilters.categories.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedFilters.categories.map((cat, i) => (
                  <button key={i} className={styles.filterButton}>{cat}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

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
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  {showAllCategories ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className={styles.mainContent}>
          {currentBlogs.length === 0 ? (
            <div className={styles.noResults}>
              <p>No blogs match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentBlogs.map((item, i) => {
                const { blogimage, headingpro, description, slug, blogcategory, blogcategory2, duration, postedon } = item;
                const tags = [blogcategory, blogcategory2].filter(Boolean);

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/blog/${slug}`}>
                          <img src={blogimage} alt={headingpro} />
                        </Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>
                          {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                        </div>
                        <Link href={`/blog/${slug}`}>
                          <h3 className={styles.itemTitle}>{truncateText(headingpro, 80)}</h3>
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
                    <Link href={`/blog/${slug}`}>
                      <img src={blogimage} alt={headingpro} className={styles.cardImg} />
                    </Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>
                        {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                      </div>
                      <Link href={`/blog/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncateText(headingpro, 80)}</h6>
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
                {currentPage > 1 && (
                  <li className={styles.pageItem}>
                    <button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>
                  </li>
                )}
                <li className={`${styles.pageItem} ${styles.active}`}>
                  <button className={styles.pageLink}>{currentPage}</button>
                </li>
                {currentPage < totalPages && (
                  <li className={styles.pageItem}>
                    <button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>
                  </li>
                )}
                {currentPage < totalPages - 1 && (
                  <>
                    <li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li>
                    <li className={styles.pageItem}>
                      <button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                    </li>
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

export default BlogPage;
