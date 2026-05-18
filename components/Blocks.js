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


export default ({ page }) => {
  const { blocks } = page || {};
  if (blocks == null) return <></>;
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.__typename) {
          case "PageBlocksButtonBlock":
            return (
              <Fragment key={i + block.__typename}>
                <VideosbuttonsListArea data={block} />
              </Fragment>
            );
          case "PageBlocksBlogBlock":
            return (
              <Fragment key={i + block.__typename}>
                <BlogPage data={block} />
              </Fragment>
            );
          case "PageBlocksCaseStudiesBlock":
            return (
              <Fragment key={i + block.__typename}>
                <CaseStudies data={block} />
              </Fragment>
            );
          case "PageBlocksWhitePapersBlock":
            return (
              <Fragment key={i + block.__typename}>
                <WhitePapers data={block} />
              </Fragment>
            );
          case "PageBlocksLeftVideoBlock":
            return (
              <Fragment key={i + block.__typename}>
                <LeftVideoPage data={block} />
              </Fragment>
            );
          case "PageBlocksRightVideoBlock":
            return (
              <Fragment key={i + block.__typename}>
                <RightVideoPage data={block} />
              </Fragment>
            );
          // case "PageBlocksNewsBlock":
          //   return (
          //     <Fragment key={i + block.__typename}>
          //       <NewsPage data={block} />
          //     </Fragment>
          //   );
          case "PageBlocksWebinarBlock":
            return (
              <Fragment key={i + block.__typename}>
                <WebinarsPage data={block} />
              </Fragment>
            );
          case "PageBlocksPolicydefinitionsBlock":
            return (
              <Fragment key={i + block.__typename}>
                <PrivacyPolicy data={block} />
              </Fragment>
            );

          case "PageBlocksCookieTypesBlock":
            return (
              <Fragment key={i + block.__typename}>
                <CookiePolicy data={block} />
              </Fragment>
            );
        };
      })}
    </>
  );
};
