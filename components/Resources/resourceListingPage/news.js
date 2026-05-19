import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "react-feather";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import { duration } from "moment";

const NewsPage = ({ data }) => {
  const {
    services,
    newsindustriesheading,
    newsindustries,
    newsdeptheading,
    newsdepartments,
    newstopicheading,
    newstopics,
  } = data;

  const [selectedFilters, setSelectedFilters] = useState({
    newsindustries: [],
    newsdepartments: [],
    newstopics: [],
  });

  const [showNewsTopic, setshowNewsTopic] = useState(false);
  const [showNewsIndustries, setshowNewsIndustries] = useState(false);
  const [showNewsDepartments, setShowNewsDepartments] = useState(false);
  const NewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleShowAllCategories = () => {
    setshowNewsTopic(!showNewsTopic);
  };
  const handleShowAllIndustries = () => {
    setshowNewsIndustries(!showNewsIndustries);
  };
  const handleShowAllDepartments = () => {
    setShowNewsDepartments(!showNewsDepartments);
  };

  const filteredNews = services.filter(
    (news) =>
      (selectedFilters.newsindustries.length === 0 ||
        selectedFilters.newsindustries.includes(news.newsindustry)) &&
      (selectedFilters.newsdepartments.length === 0 ||
        selectedFilters.newsdepartments.includes(news.newsdepartment)) &&
      (selectedFilters.newstopics.length === 0 ||
        selectedFilters.newstopics.includes(news.newstopic))
  );

  const indexOfLastBlog = currentPage * NewsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - NewsPerPage;
  const currentBlogs = filteredNews.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredNews.length / NewsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setSelectedFilters({
      newsindustries: [],
      newsdepartments: [],
      newstopics: [],
    });
  };

  const truncateText = (text, charLimit) => {
    return text?.length > charLimit ? text.substring(0, charLimit) + '...' : text;
  };

  return (
    <>
      <div className="container pb-5 button-block">
        <div className="row mb-5">
          <div className="col-8">
            <h1>Latest insights & updates</h1>
          </div>
          <div className="col-4 mt-1">
            <p>
              Keep up with all our latest news. Check out articles, download
              reports, listen to our podcast or get information about events.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 me-2 post-block">
            <div className="mb-5">
              <ButtonsListArea />
            </div>
            {/* Selected filters */}
            <div className="selected-filters">
              {(selectedFilters.newsindustries.length > 0 ||
                selectedFilters.newsdepartments.length > 0 ||
                selectedFilters.newstopics.length > 0) && (
                  <div>
                    <h3>Selected Filters:</h3>
                    <ul>
                      {selectedFilters.newsindustries.map((category, index) => (
                        <button
                          key={index}
                          className="btn btn-light btn-sm btn-custom-filters ms-1"
                        >
                          {category}
                        </button>
                      ))}
                      {selectedFilters.newsdepartments.map((industry, index) => (
                        <button
                          key={index}
                          className="btn btn-light btn-sm btn-custom-filters ms-1"
                        >
                          {industry}
                        </button>
                      ))}
                      {selectedFilters.newstopics.map((department, index) => (
                        <button
                          key={index}
                          className="btn btn-light btn-sm btn-custom-filters ms-1"
                        >
                          {department}
                        </button>
                      ))}
                    </ul>
                    <button className="button1" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  </div>
                )}
            </div>
            {/* Industries */}
            <div className="widget widget_categories">
              <h3 className="widget-title">{newsindustriesheading}</h3>
              <div>
                {newsindustries
                  .slice(0, showNewsIndustries ? newsindustries.length : 3)
                  .map(({ newsindustriesdesc }, i) => (
                    <button
                      key={i}
                      className="btn btn-light btn-sm btn-custom-filters mt-1 ms-1"
                      checked={selectedFilters.newsindustries.includes(
                        newsindustriesdesc
                      )}
                      onClick={() =>
                        handleFilterClick("newsindustries", newsindustriesdesc)
                      }
                    >
                      {newsindustriesdesc}
                    </button>
                  ))}
                {newsindustries.length > 3 && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="blogbutton"
                      onClick={handleShowAllIndustries}
                    >
                      {showNewsIndustries
                        ? "Show Less \u25B2"
                        : "Show More \u25BC"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Departments */}
            <div className="widget widget_categories mt-5">
              <h3 className="widget-title">{newsdeptheading}</h3>
              <div>
                {newsdepartments
                  .slice(0, showNewsDepartments ? newsdepartments.length : 3)
                  .map(({ newsdepartmentsdesc }, i) => (
                    <button
                      key={i}
                      className="btn btn-light btn-sm btn-custom-filters mt-1 ms-1"
                      checked={selectedFilters.newsdepartments.includes(
                        newsdepartmentsdesc
                      )}
                      onClick={() =>
                        handleFilterClick(
                          "newsdepartments",
                          newsdepartmentsdesc
                        )
                      }
                    >
                      {newsdepartmentsdesc}
                    </button>
                  ))}
                {newsdepartments.length > 3 && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="blogbutton"
                      onClick={handleShowAllDepartments}
                    >
                      {showNewsDepartments
                        ? "Show Less \u25B2"
                        : "Show More \u25BC"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Categories */}
            <div className="widget widget_categories mt-5">
              <h3 className="widget-title">{newstopicheading}</h3>
              <div>
                {newstopics
                  .slice(0, showNewsTopic ? newstopics.length : 3)
                  .map(({ newstopicdesc }, i) => (
                    <button
                      key={i}
                      className="btn btn-light btn-sm btn-custom-filters mt-1 ms-1"
                      checked={selectedFilters.newstopics.includes(
                        newstopicdesc
                      )}
                      onClick={() =>
                        handleFilterClick("newstopics", newstopicdesc)
                      }
                    >
                      {newstopicdesc}
                    </button>
                  ))}
                {newstopics.length > 3 && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="blogbutton"
                      onClick={handleShowAllCategories}
                    >
                      {showNewsTopic ? "Show Less \u25B2" : "Show More \u25BC"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col border-left-custom-pink post-block">
            {currentBlogs.length <= 0 ? ( // Check if no news articles found
              <div className="no-blogs-found">
                <p>
                  Oops! It seems there are no News Articles matching your
                  search.
                </p>
                <p>
                  Try refining your filters or check back later for new updates!
                </p>
              </div>
            ) : (
              // Displays News Articles
              <div className="row ms-1">
                {currentBlogs.map(
                  (
                    {
                      newsconcept,
                      newstext,
                      slug,
                      file,
                      newsdepartment,
                      newsindustry,
                      newstopic,
                      postedBy,
                      postedon,
                      duration,
                    },
                    i
                  ) => {
                    newstext = newstext || " ";

                    const truncatedDescription = truncateText(newstext, 200);
                    const truncatedHeading = truncateText(newsconcept, 50);
                    if (i === 0) {
                      return (
                        <div
                          key={i + "service"}
                          className="row border-bottom-custom-pink mb-4"
                        >
                          <div className="col-7 mb-4">
                            <Link href={`/news/${slug}`}>
                              <Image src={file} alt="News image" width={600} height={400} unoptimized />
                            </Link>
                          </div>
                          <div className="col-5">
                            <div>
                              <Link href={`/news/${slug}`}>
                                <h3 className="webinarH6">{truncatedHeading}</h3>
                              </Link>
                            </div>
                            {newsindustry && (
                              <button className="btn btn-sm btn-custom-industry-dept-category">
                                {newsindustry}
                              </button>
                            )}
                            {newsdepartment && (
                              <button className="btn btn-sm btn-custom-industry-dept-category ms-1">
                                {newsdepartment}
                              </button>
                            )}
                            {newstopic && (
                              <button className="btn btn-sm btn-custom-industry-dept-category ms-1">
                                {newstopic}
                              </button>
                            )}
                            <p className="mt-4">{truncatedDescription}...</p>
                            <div className="row mt-3">
                              {duration && (
                                <div className="col-6">{duration}</div>
                              )}
                              {postedon && (
                                <div className="col-6 text-end">{postedon}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={i + "service"} className="col-6">
                          <div>
                            <Link href={`/news/${slug}`}>
                              <Image src={file} alt="News image" width={600} height={400} unoptimized />
                            </Link>
                            <div>
                              <Link href={`/news/${slug}`}>
                                <h6 className="webinarH6 mt-3">{truncatedHeading}</h6>
                              </Link>
                            </div>
                            {newsindustry && (
                              <button className="btn btn-sm btn-custom-industry-dept-category">
                                {newsindustry}
                              </button>
                            )}
                            {newsdepartment && (
                              <button className="btn btn-sm btn-custom-industry-dept-category ms-1">
                                {newsdepartment}
                              </button>
                            )}
                            {newstopic && (
                              <button className="btn btn-sm btn-custom-industry-dept-category ms-1">
                                {newstopic}
                              </button>
                            )}
                          </div>
                          <div className="mt-3">
                            <p>{truncatedDescription}...</p>
                            <div className="row mt-3 mb-5">
                              {duration && (
                                <div className="col-6">{duration}</div>
                              )}
                              {postedon && (
                                <div className="col-6 text-end">{postedon}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                )}
              </div>
            )}

            {/* Render pagination */}
            {totalPages > 1 && (
              <div className="pagination-area">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    {/* "Prev" button */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                    </li>

                    {/* Dynamic page numbers */}
                    {currentPage > 1 && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          {currentPage - 1}
                        </button>
                      </li>
                    )}

                    <li className="page-item active">
                      <button className="page-link">{currentPage}</button>
                    </li>

                    {currentPage < totalPages && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          {currentPage + 1}
                        </button>
                      </li>
                    )}

                    {currentPage < totalPages - 1 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}

                    {/* Last page number */}
                    {currentPage < totalPages - 1 && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </li>
                    )}

                    {/* "Next" button */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
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


export default NewsPage;
