import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const CaseStudies = ({ posts = [] }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    industries: [], departments: [], topics: [],
  });
  const [showIndustries, setShowIndustries] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedFilters]);

  const industries = [...new Set(posts.map((p) => p.blogindustry).filter(Boolean))];
  const departments = [...new Set(posts.map((p) => p.blogdepartment).filter(Boolean))];
  const topics = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter((v) => v !== value) : [...prev[type], value],
    }));
  };

  const clearFilters = () => setSelectedFilters({ industries: [], departments: [], topics: [] });

  const filteredItems = posts.filter(
    (p) =>
      (selectedFilters.topics.length === 0 || selectedFilters.topics.includes(p.blogcategory)) &&
      (selectedFilters.industries.length === 0 || selectedFilters.industries.includes(p.blogindustry)) &&
      (selectedFilters.departments.length === 0 || selectedFilters.departments.includes(p.blogdepartment))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}><h1>Case Studies</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Explore real-world success stories — see how NITCO drives results across industries and departments.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {hasActiveFilters && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedFilters.topics.map((f) => (
                  <button key={`topic-${f}`} className={styles.filterButton} onClick={() => handleFilterClick("topics", f)}>{f}</button>
                ))}
                {selectedFilters.industries.map((f) => (
                  <button key={`industry-${f}`} className={styles.filterButton} onClick={() => handleFilterClick("industries", f)}>{f}</button>
                ))}
                {selectedFilters.departments.map((f) => (
                  <button key={`dept-${f}`} className={styles.filterButton} onClick={() => handleFilterClick("departments", f)}>{f}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {industries.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Industries</h3>
              <div className={styles.widgetContent}>
                {industries.slice(0, showIndustries ? undefined : 3).map((v, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("industries", v)}>{v}</button>
                ))}
              </div>
              {industries.length > 3 && <button className={styles.toggleButton} onClick={() => setShowIndustries(!showIndustries)}>{showIndustries ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}

          {departments.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Departments</h3>
              <div className={styles.widgetContent}>
                {departments.slice(0, showDepartments ? undefined : 3).map((v, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("departments", v)}>{v}</button>
                ))}
              </div>
              {departments.length > 3 && <button className={styles.toggleButton} onClick={() => setShowDepartments(!showDepartments)}>{showDepartments ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}

          {topics.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Topics</h3>
              <div className={styles.widgetContent}>
                {topics.slice(0, showTopics ? undefined : 3).map((v, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("topics", v)}>{v}</button>
                ))}
              </div>
              {topics.length > 3 && <button className={styles.toggleButton} onClick={() => setShowTopics(!showTopics)}>{showTopics ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No case studies match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { image, title, description = "", slug, blogdepartment, blogindustry, blogcategory, duration, publishedAt } = item;
                const itemKey = slug || i;
                const tags = [blogindustry, blogdepartment, blogcategory].filter(Boolean);
                const dateDisplay = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

                if (i === 0) {
                  return (
                    <div key={itemKey} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/case-studies/${slug}`}><img src={image} alt={title} /></Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>{tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}</div>
                        <Link href={`/case-studies/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <Link href={`/case-studies/${slug}`}><img src={image} alt={title} className={styles.cardImg} /></Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>{tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}</div>
                      <Link href={`/case-studies/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></Link>
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

export default CaseStudies;
