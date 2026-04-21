import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icon from "react-feather";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css"
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

  const [showAllCaseStudyTopics, setShowAllCaseStudyTopics] = useState(false);
  const [showCaseStudyIndustries, setShowCaseStudyIndustries] = useState(false);
  const [showCaseStudyDepartments, setShowCaseStudyDepartments] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1); // Reset current page when filters change
  }, [selectedFilters]);

  const handleFilterClick = (filterType, filterValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter((value) => value !== filterValue)
        : [...prevFilters[filterType], filterValue],
    }));
  };

  const handleShowAllTopics = () => {
    setShowAllCaseStudyTopics(!showAllCaseStudyTopics);
  };
  const handleShowAllIndustries = () => {
    setShowCaseStudyIndustries(!showCaseStudyIndustries);
  };
  const handleShowAllDepartments = () => {
    setShowCaseStudyDepartments(!showCaseStudyDepartments);
  };

  // Filter blogs based on selected categories, industries, and departments
  const filteredcasestudies = casestudies.filter(
    (casestudy) =>
      (selectedFilters.casestudytopic.length === 0 ||
        selectedFilters.casestudytopic.includes(casestudy.casestudytopic)) ||
      (casestudy.casestudytopic1 && selectedFilters.casestudytopic.includes(casestudy.casestudytopic1)) ||
      (casestudy.casestudytopic2 && selectedFilters.casestudytopic.includes(casestudy.casestudytopic2))
      &&
      (selectedFilters.caseStudyindustries.length === 0 ||
        selectedFilters.caseStudyindustries.includes(
          casestudy.casestudyindustry
        )) &&
      (selectedFilters.casestudydepartments.length === 0 ||
        selectedFilters.casestudydepartments.includes(
          casestudy.casestudydepartment
        ))
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredcasestudies.length / itemsPerPage);

  // Calculate current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredcasestudies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setSelectedFilters({
      caseStudyindustries: [],
      casestudydepartments: [],
      casestudytopic: [],
      casestudytopic1: [],
      casestudytopic2: [],



    });
  };


  const truncateText = (text, charLimit) => {
    return text?.length > charLimit ? text.substring(0, charLimit) + '...' : text;
  };

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
            {(
              selectedFilters.casestudytopic.length > 0 ||
              selectedFilters.caseStudyindustries.length > 0 ||
              selectedFilters.casestudydepartments.length > 0
            ) && (
                <div className={styles.selectedFilters}>
                  <h3>Selected Filters:</h3>
                  <div className={styles.filterGroup}>
                    {selectedFilters.casestudytopic.map((category, index) => (
                      <button key={index} className={styles.filterButton}>
                        {category}
                      </button>
                    ))}
                    {selectedFilters.caseStudyindustries.map((industry, index) => (
                      <button key={index} className={styles.filterButton}>
                        {industry}
                      </button>
                    ))}
                    {selectedFilters.casestudydepartments.map((dept, index) => (
                      <button key={index} className={styles.filterButton}>
                        {dept}
                      </button>
                    ))}
                  </div>
                  <button className={styles.clearButton} onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}

            {/* Industry Filter */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>{casestudyindustriesheading}</h3>
              <div className={styles.widgetContent}>
                {caseStudyindustries
                  .slice(0, showCaseStudyIndustries ? caseStudyindustries.length : 3)
                  .map(({ casestudydesc }, i) => (
                    <button
                      key={i}
                      className={styles.filterButton}
                      onClick={() => handleFilterClick("caseStudyindustries", casestudydesc)}
                    >
                      {casestudydesc}
                    </button>
                  ))}
              </div>
              {caseStudyindustries.length > 3 && (
                <button className={styles.toggleButton} onClick={handleShowAllIndustries}>
                  {showCaseStudyIndustries ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>

            {/* Department Filter */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>{casestudydeptheading}</h3>
              <div className={styles.widgetContent}>
                {casestudydepartments
                  .slice(0, showCaseStudyDepartments ? casestudydepartments.length : 3)
                  .map(({ casestudydepartmentsdesc }, i) => (
                    <button
                      key={i}
                      className={styles.filterButton}
                      onClick={() =>
                        handleFilterClick("casestudydepartments", casestudydepartmentsdesc)
                      }
                    >
                      {casestudydepartmentsdesc}
                    </button>
                  ))}
              </div>
              {casestudydepartments.length > 3 && (
                <button className={styles.toggleButton} onClick={handleShowAllDepartments}>
                  {showCaseStudyDepartments ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>

            {/* Topic Filter */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>{casestudyptopicheading}</h3>
              <div className={styles.widgetContent}>
                {casestudytopic
                  .slice(0, showAllCaseStudyTopics ? casestudytopic.length : 3)
                  .map(({ casestudytopicdesc }, i) => (
                    <button
                      key={i}
                      className={styles.filterButton}
                      onClick={() => handleFilterClick("casestudytopic", casestudytopicdesc)}
                    >
                      {casestudytopicdesc}
                    </button>
                  ))}
              </div>
              {casestudytopic.length > 3 && (
                <button className={styles.toggleButton} onClick={handleShowAllTopics}>
                  {showAllCaseStudyTopics ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className={styles.mainContent}>
            {currentItems.length <= 0 ? (
              <div className={styles.noResults}>
                <p>Oops! It seems there are no Case Studies matching your search.</p>
                <p>Try refining your filters or check back later for new updates!</p>
              </div>
            ) : (
              <div className={styles.caseStudyGrid}>
                {currentItems.map((item, i) => {
                  const {
                    caseimage,
                    casedesc = "",
                    heading,
                    slug,
                    casestudydepartment,
                    casestudyindustry,
                    casestudytopic,
                    casestudytopic1,
                    casestudytopic2,
                    duration,
                    postedon,
                  } = item;

                  const truncatedDescription = truncateText(casedesc, 200);
                  const truncatedHeading = truncateText(heading, 50);

                  if (i === 0) {
                    return (
                      <div key={i} className={styles.featuredItem}>
                        <div className={styles.featuredImage}>
                          <Link href={`/case-studies/${slug}`}>
                            <img src={caseimage} alt={heading} />
                          </Link>
                        </div>
                        <div className={styles.featuredContent}>
                          <Link href={`/case-studies/${slug}`}>
                            <h3 className={styles.itemTitle}>{truncatedHeading}</h3>
                          </Link>
                          <div className={styles.tags}>
                            {[casestudyindustry, casestudydepartment, casestudytopic, casestudytopic1, casestudytopic2]
                              .filter(Boolean)
                              .map((tag, idx) => (
                                <span key={idx} className={styles.tag}>
                                  {tag}
                                </span>
                              ))}
                          </div>
                          <p className={styles.description}>{truncatedDescription}...</p>
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
                      <Link href={`/case-studies/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncatedHeading}</h6>
                      </Link>
                      <div className={styles.tags}>
                        {[casestudyindustry, casestudydepartment, casestudytopic, casestudytopic1, casestudytopic2]
                          .filter(Boolean)
                          .map((tag, idx) => (
                            <span key={idx} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                      </div>
                      <p className={styles.description}>{truncatedDescription}...</p>
                      <div className={styles.meta}>
                        {duration && <span>{duration}</span>}
                        {postedon && <span>{postedon}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {totalPages > 1 && (
              <div className={styles.paginationArea}>
                <nav aria-label="Page navigation">
                  <ul className={styles.pagination}>
                    {/* Prev button */}
                    <li
                      className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""
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

                    {/* Next button */}
                    <li
                      className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""
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

export default CaseStudies;
