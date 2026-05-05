import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const CaseStudies = ({ data }) => {
  const {
    casestudies,
    casestudyindustriesheading,
    caseStudyindustries,
    casestudydeptheading,
    casestudydepartments,
    casestudyptopicheading,
    casestudytopic,
  } = data;

  const [selectedFilters, setSelectedFilters] = useState({
    caseStudyindustries: [],
    casestudydepartments: [],
    casestudytopic: [],
  });

  const [showTopics, setShowTopics] = useState(false);
  const [showIndustries, setShowIndustries] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
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

  const clearFilters = () => setSelectedFilters({
    caseStudyindustries: [], casestudydepartments: [], casestudytopic: [],
  });

  const filteredItems = casestudies.filter(
    (cs) =>
      (selectedFilters.casestudytopic.length === 0 ||
        selectedFilters.casestudytopic.includes(cs.casestudytopic) ||
        (cs.casestudytopic1 && selectedFilters.casestudytopic.includes(cs.casestudytopic1)) ||
        (cs.casestudytopic2 && selectedFilters.casestudytopic.includes(cs.casestudytopic2))) &&
      (selectedFilters.caseStudyindustries.length === 0 ||
        selectedFilters.caseStudyindustries.includes(cs.casestudyindustry)) &&
      (selectedFilters.casestudydepartments.length === 0 ||
        selectedFilters.casestudydepartments.includes(cs.casestudydepartment))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  const hasActiveFilters =
    selectedFilters.casestudytopic.length > 0 ||
    selectedFilters.caseStudyindustries.length > 0 ||
    selectedFilters.casestudydepartments.length > 0;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}>
          <h1>Case Studies</h1>
        </div>
        <div className={styles.listingHeaderRight}>
          <p>Explore real-world success stories — see how NITCO drives results across industries and departments.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {hasActiveFilters && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {[...selectedFilters.casestudytopic, ...selectedFilters.caseStudyindustries, ...selectedFilters.casestudydepartments].map((f, i) => (
                  <button key={i} className={styles.filterButton}>{f}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>{casestudyindustriesheading}</h3>
            <div className={styles.widgetContent}>
              {caseStudyindustries.slice(0, showIndustries ? undefined : 3).map(({ casestudydesc }, i) => (
                <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("caseStudyindustries", casestudydesc)}>{casestudydesc}</button>
              ))}
            </div>
            {caseStudyindustries.length > 3 && (
              <button className={styles.toggleButton} onClick={() => setShowIndustries(!showIndustries)}>
                {showIndustries ? "Show Less ▲" : "Show More ▼"}
              </button>
            )}
          </div>

          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>{casestudydeptheading}</h3>
            <div className={styles.widgetContent}>
              {casestudydepartments.slice(0, showDepartments ? undefined : 3).map(({ casestudydepartmentsdesc }, i) => (
                <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("casestudydepartments", casestudydepartmentsdesc)}>{casestudydepartmentsdesc}</button>
              ))}
            </div>
            {casestudydepartments.length > 3 && (
              <button className={styles.toggleButton} onClick={() => setShowDepartments(!showDepartments)}>
                {showDepartments ? "Show Less ▲" : "Show More ▼"}
              </button>
            )}
          </div>

          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>{casestudyptopicheading}</h3>
            <div className={styles.widgetContent}>
              {casestudytopic.slice(0, showTopics ? undefined : 3).map(({ casestudytopicdesc }, i) => (
                <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("casestudytopic", casestudytopicdesc)}>{casestudytopicdesc}</button>
              ))}
            </div>
            {casestudytopic.length > 3 && (
              <button className={styles.toggleButton} onClick={() => setShowTopics(!showTopics)}>
                {showTopics ? "Show Less ▲" : "Show More ▼"}
              </button>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No case studies match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { caseimage, casedesc = "", heading, slug, casestudydepartment, casestudyindustry, casestudytopic, casestudytopic1, casestudytopic2, duration, postedon } = item;
                const tags = [casestudyindustry, casestudydepartment, casestudytopic, casestudytopic1, casestudytopic2].filter(Boolean);

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/case-studies/${slug}`}>
                          <img src={caseimage} alt={heading} />
                        </Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>
                          {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                        </div>
                        <Link href={`/case-studies/${slug}`}>
                          <h3 className={styles.itemTitle}>{truncateText(heading, 80)}</h3>
                        </Link>
                        <p className={styles.description}>{truncateText(casedesc, 200)}</p>
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
                    <Link href={`/case-studies/${slug}`}>
                      <img src={caseimage} alt={heading} className={styles.cardImg} />
                    </Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>
                        {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                      </div>
                      <Link href={`/case-studies/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncateText(heading, 80)}</h6>
                      </Link>
                      <p className={styles.description}>{truncateText(casedesc, 150)}</p>
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

export default CaseStudies;
