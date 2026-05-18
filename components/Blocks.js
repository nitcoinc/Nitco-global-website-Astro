import * as React from "react";
import CaseStudies from "./Resources/resourceListingPage/casestudies.js";
import WhitePapers from "./Resources/resourceListingPage/WhitePapers.js";
import BlogPage from "./Resources/resourceListingPage/blogpage.js";
import LeftVideoPage from "./Resources/resourceListingPage/explainerVideosDesign/leftVideoPage.js";
import RightVideoPage from "./Resources/resourceListingPage/explainerVideosDesign/rightVideoPage.js";
import WebinarsPage from "./Resources/resourceListingPage/webinar.js";
import VideosbuttonsListArea from "./Resources/resourceListingPage/explainerVideosDesign/Buttonareavideos.js";
import PrivacyPolicy from "../components/Policy/privacypolicy.js";
import CookiePolicy from "../components/Policy/cookiepolicy.js";

const { Fragment } = React;

export default ({ page, posts = [], whitepapers = [] }) => {
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
};
