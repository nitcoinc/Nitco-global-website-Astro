import * as React from "react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { urlFor } from "../lib/sanityImage.js";
import styles from "./resorcesGlobal.module.css";
import btnStyles from "./buttonArea.module.css";
import leftStyles from "./leftVideoSection.module.css";
import rightStyles from "./rightVideoSection.module.css";

// ── ButtonsListArea ──────────────────────────────────────────────────────────

const ButtonsListArea = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const handleClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className={btnStyles.insightButtons}>
      <button
        className={`${btnStyles.filterbtn} ${pathname === "/insights/blogs" ? btnStyles.active : ""}`}
        onClick={() => handleClick("/insights/blogs")}
      >
        Blogs
      </button>
      <button
        className={`${btnStyles.filterbtn} ${pathname === "/insights/whitepapers" ? btnStyles.active : ""}`}
        onClick={() => handleClick("/insights/whitepapers")}
      >
        White Papers
      </button>
      <button
        className={`${btnStyles.filterbtn} ${pathname === "/insights/explainer-videos" ? btnStyles.active : ""}`}
        onClick={() => handleClick("/insights/explainer-videos")}
      >
        Explainer Videos
      </button>
      <button
        className={`${btnStyles.filterbtn} ${pathname === "/insights/webinar" ? btnStyles.active : ""}`}
        onClick={() => handleClick("/insights/webinar")}
      >
        Webinars
      </button>
      <button
        className={`${btnStyles.filterbtn} ${pathname === "/insights/case-studies" ? btnStyles.active : ""}`}
        onClick={() => handleClick("/insights/case-studies")}
      >
        Case Studies
      </button>
    </div>
  );
};

// ── Pagination helper ────────────────────────────────────────────────────────

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;
  return (
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
  );
};

// ── BlogPage ─────────────────────────────────────────────────────────────────

const BlogPage = ({ posts = [] }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedCategories]);

  const categories = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  const filteredPosts = posts.filter(
    (p) => selectedCategories.length === 0 || selectedCategories.includes(p.blogcategory)
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
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
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedCategories.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedCategories.map((cat) => (
                  <button key={cat} className={styles.filterButton} onClick={() => handleFilterClick(cat)}>{cat}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {categories.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Categories</h3>
              <div className={styles.widgetContent}>
                {categories
                  .slice(0, showAllCategories ? categories.length : 3)
                  .map((cat, i) => (
                    <button
                      key={i}
                      className={styles.filterButton}
                      onClick={() => handleFilterClick(cat)}
                    >
                      {cat}
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

        <div className={styles.mainContent}>
          {currentPosts.length === 0 ? (
            <div className={styles.noResults}>
              <p>No blogs match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentPosts.map((item, i) => {
                const { image, title, description, slug, blogcategory, duration, publishedAt } = item;
                const itemKey = slug || i;
                const tags = [blogcategory].filter(Boolean);
                const dateDisplay = publishedAt
                  ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : "";

                if (i === 0) {
                  return (
                    <div key={itemKey} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <a href={`/blog/${slug}`}>
                          <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" />
                        </a>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>
                          {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                        </div>
                        <a href={`/blog/${slug}`}>
                          <h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3>
                        </a>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>
                          {duration && <span>{duration}</span>}
                          {dateDisplay && <span>{dateDisplay}</span>}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <a href={`/blog/${slug}`}>
                      <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" className={styles.cardImg} />
                    </a>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>
                        {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                      </div>
                      <a href={`/blog/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6>
                      </a>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>
                        {duration && <span>{duration}</span>}
                        {dateDisplay && <span>{dateDisplay}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

// ── CaseStudies ───────────────────────────────────────────────────────────────

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
                const dateDisplay = publishedAt
                  ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : "";

                if (i === 0) {
                  return (
                    <div key={itemKey} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <a href={`/case-studies/${slug}`}>
                          <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" />
                        </a>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>{tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}</div>
                        <a href={`/case-studies/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></a>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <a href={`/case-studies/${slug}`}>
                      <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" className={styles.cardImg} />
                    </a>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>{tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}</div>
                      <a href={`/case-studies/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></a>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

// ── WhitePapers ───────────────────────────────────────────────────────────────

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
                        <a href={`/whitepapers/${slug}`}>
                          <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" />
                        </a>
                      </div>
                      <div className={styles.featuredContent}>
                        <a href={`/whitepapers/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></a>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <a href={`/whitepapers/${slug}`}>
                      <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" className={styles.cardImg} />
                    </a>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <a href={`/whitepapers/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></a>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

// ── WebinarsPage ──────────────────────────────────────────────────────────────

const WebinarsPage = ({ posts = [] }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedTopics]);

  const topics = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const clearFilters = () => setSelectedTopics([]);

  const filteredItems = posts.filter(
    (p) => selectedTopics.length === 0 || selectedTopics.includes(p.blogcategory)
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
        <div className={styles.listingHeaderLeft}><h1>Webinars</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Expert talks and thought leadership sessions on the topics that matter most.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedTopics.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedTopics.map((t) => <button key={t} className={styles.filterButton} onClick={() => handleFilterClick(t)}>{t}</button>)}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {topics.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Topics</h3>
              <div className={styles.widgetContent}>
                {topics.slice(0, showAllTopics ? undefined : 3).map((t, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick(t)}>{t}</button>
                ))}
              </div>
              {topics.length > 3 && <button className={styles.toggleButton} onClick={() => setShowAllTopics(!showAllTopics)}>{showAllTopics ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No webinars match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { title, description, image, slug, blogcategory, duration, publishedAt } = item;
                const itemKey = slug || i;
                const dateDisplay = publishedAt
                  ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : "";

                if (i === 0) {
                  return (
                    <div key={itemKey} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <a href={`/webinar/${slug}`}>
                          <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" />
                        </a>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>{blogcategory && <span className={styles.tag}>{blogcategory}</span>}</div>
                        <a href={`/webinar/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></a>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={itemKey} className={styles.card}>
                    <a href={`/webinar/${slug}`}>
                      <img src={urlFor(image).width(400).url()} alt={title} loading="lazy" className={styles.cardImg} />
                    </a>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>{blogcategory && <span className={styles.tag}>{blogcategory}</span>}</div>
                      <a href={`/webinar/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></a>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

// ── LeftVideoPage ─────────────────────────────────────────────────────────────

const LeftVideoPage = ({ data }) => {
  const { text_L_V, tagline_L_V, video_L_V } = data;
  const anchorId = tagline_L_V
    ? tagline_L_V.toLowerCase().replace(/\s+/g, "-")
    : "";

  const [isFeatured, setIsFeatured] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === `#${anchorId}`) {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsFeatured(true);
    }
  }, [anchorId]);

  const handleCopy = () => {
    const link = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard.writeText(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <section id={anchorId} className={`container ${isFeatured ? leftStyles.featured : ""}`}>
        <div className={leftStyles.videoSection}>
          <div className={leftStyles.videoLeft}>
            <div className={leftStyles.videoMain}>
              <iframe
                src={video_L_V}
                className={leftStyles.videoSelf}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={tagline_L_V}
                width="100%"
              />
            </div>
          </div>

          <div className={`${leftStyles.videoRight} ${leftStyles.copyLinkContainer}`}>
            <h2>{tagline_L_V}</h2>
            <p>{text_L_V}</p>
            {!isFeatured && (
              <span className={leftStyles.copyLink} onClick={handleCopy}>
                🔗 Click to Copy Link
              </span>
            )}
          </div>
        </div>
      </section>

      {showToast && (
        <div className={leftStyles.toastBox}>
          ✅ Link copied to dashboard
        </div>
      )}
    </>
  );
};

// ── RightVideoPage ────────────────────────────────────────────────────────────

const RightVideoPage = ({ data }) => {
  const { text_R_V, tagline_R_V, video_R_V } = data;
  const anchorId = tagline_R_V
    ? tagline_R_V.toLowerCase().replace(/\s+/g, "-")
    : "";

  const [isFeatured, setIsFeatured] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === `#${anchorId}`) {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsFeatured(true);
    }
  }, [anchorId]);

  const handleCopy = () => {
    const link = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard.writeText(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <section id={anchorId} className={`container ${isFeatured ? rightStyles.featured : ""}`}>
        <div className={rightStyles.videoSectionRight}>
          <div className={`${rightStyles.textBlock} ${rightStyles.copyLinkContainer}`}>
            <h2>{tagline_R_V}</h2>
            <p>{text_R_V}</p>
            {!isFeatured && (
              <span className={rightStyles.copyLink} onClick={handleCopy}>
                🔗 Click to Copy Link
              </span>
            )}
          </div>

          <div className={rightStyles.videoBlock}>
            <div className={rightStyles.videoMain}>
              <iframe
                src={video_R_V}
                className={rightStyles.videoSelf}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={tagline_R_V}
              />
            </div>
          </div>
        </div>
      </section>

      {showToast && (
        <div className={rightStyles.toastBox}>
          ✅ Link copied to dashboard
        </div>
      )}
    </>
  );
};

// ── VideosbuttonsListArea ─────────────────────────────────────────────────────

const VideosbuttonsListArea = ({ data }) => {
  const { buttonList } = data;
  const ButtonItem = Array.isArray(buttonList) ? buttonList.slice(0, 8) : null;

  return (
    <>
      <div className="container button-block mb-5">
        <div className="row mb-5">
          <div className="col-12 col-md-8">
            <h1>Latest insights &amp; updates</h1>
          </div>
          <div className="col-12 col-md-4 mt-2 mt-md-1">
            <p>
              Keep up with all our latest news. Check out articles, download
              reports, listen to our podcast or get information about events.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              {ButtonItem != null
                ? ButtonItem.map(({ name, url }, i) => (
                    <button
                      key={i + "button"}
                      className="btn btn-light btn-custom-filters mt-1 ms-2 p-2"
                      onClick={() => { window.location.href = `/${url}`; }}
                    >
                      {name}
                    </button>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── PrivacyPolicy ─────────────────────────────────────────────────────────────

const PrivacyPolicy = ({ data }) => {
  const { mainheading, lastupdated, body } = data;

  return (
    <>
      <div className="container policy-container">
        <div className="row">
          <div className="col-sm-12">
            <div className="markdown-container-fullpage">
              <h1>{mainheading}</h1>
              <p>Last Updated: {lastupdated}</p>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── CookiePolicy ──────────────────────────────────────────────────────────────

const CookiePolicy = ({ data }) => {
  const { mainheading, subheading, body } = data;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="markdown-container-fullpage">
              <h2 style={{ paddingTop: "30px" }}>{mainheading}</h2>
              <h3>{subheading}</h3>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Blocks dispatcher ─────────────────────────────────────────────────────────

const { Fragment } = React;

/**
 * Dispatches Sanity page blocks to their corresponding React sub-components.
 * @param {{ page: object, posts: object[], whitepapers: object[] }} props
 */
export default function Blocks({ page, posts = [], whitepapers = [] }) {
  const { blocks } = page || {};
  if (blocks == null) return <></>;
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case "buttonBlock":
            return (
              <Fragment key={i + block._type}>
                <VideosbuttonsListArea data={block} />
              </Fragment>
            );
          case "blogBlock":
            return (
              <Fragment key={i + block._type}>
                <BlogPage posts={posts.filter((p) => p.postType === "blog")} />
              </Fragment>
            );
          case "caseStudiesBlock":
            return (
              <Fragment key={i + block._type}>
                <CaseStudies posts={posts.filter((p) => p.postType === "caseStudy")} />
              </Fragment>
            );
          case "whitePapersBlock":
            return (
              <Fragment key={i + block._type}>
                <WhitePapers whitepapers={whitepapers} />
              </Fragment>
            );
          case "leftVideoBlock":
            return (
              <Fragment key={i + block._type}>
                <LeftVideoPage data={block} />
              </Fragment>
            );
          case "rightVideoBlock":
            return (
              <Fragment key={i + block._type}>
                <RightVideoPage data={block} />
              </Fragment>
            );
          case "webinarBlock":
            return (
              <Fragment key={i + block._type}>
                <WebinarsPage posts={posts.filter((p) => p.postType === "webinar")} />
              </Fragment>
            );
          case "policyBlock":
            return (
              <Fragment key={i + block._type}>
                <PrivacyPolicy data={block} />
              </Fragment>
            );
          case "cookieBlock":
            return (
              <Fragment key={i + block._type}>
                <CookiePolicy data={block} />
              </Fragment>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
