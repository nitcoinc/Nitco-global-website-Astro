import HomePageBlock from "./blocks/HomePageBlock";
import blogAreaBlock from "./blocks/blogAreaBlock";
import buttonBlock from "./blocks/buttonBlock";
import caseStudiesBlock from "./blocks/caseStudiesBlock";
import casestudiesDetailsBlock from "./blocks/casestudiesDetailsBlock";
import cookietypesBlock from "./blocks/cookietypesBlock";
import leftVideoBlock from "./blocks/leftVideoBlock";
import newsBlock from "./blocks/newsBlock";
import pageBannerBlock from "./blocks/pageBannerBlock";
import policyDefinitionsBlock from "./blocks/policyDefinitionsBlock";
import rightVideoBlock from "./blocks/rightVideoBlock";
import webinarBlock from "./blocks/webinarBlock";
import whitePapersBlock from "./blocks/whitePapersBlock";
/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Page Content",
  name: "page",
  path: "content/pages",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "slug",
      label: "Page Slug",
      required: true,
    },
    {
      type: "string",
      name: "pageType",
      label: "Page Type",
      required: true,
      ui: { defaultItem: "none" },
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "solutions",
          label: "Solutions",
        },
        {
          value: "services",
          label: "Services",
        },
        {
          value: "company",
          label: "Company",
        },
        {
          value: "insights",
          label: "Insights",
        },
        {
          value: "case-studies",
          label: "case-studies",
        },
      ],
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [
        HomePageBlock,
        blogAreaBlock,
        buttonBlock,
        casestudiesDetailsBlock,
        caseStudiesBlock,
        cookietypesBlock,
        leftVideoBlock,
        newsBlock,
        pageBannerBlock,
        policyDefinitionsBlock,
        rightVideoBlock,
        whitePapersBlock,
        webinarBlock
      ],
    },
  ],
  // Change filename to include pageType, then update the router function to split filename based on pageType.
  ui: {
    filename: {
      readonly: true,
      slugify: ({ pageType, slug }) => {
        // console.log(pageType, slug);
        return `${pageType}__${slug}`;
      },
    },
    // PageType is not in document, must include this information within filename.
    router: ({ document }) => {
      // console.log(document);
      const isHomePage =
        document._sys.filename === "none__home" ||
        document._sys.filename === "home";
      if (isHomePage) {
        return `/`;
      }
      const splitFilename = document._sys.filename.split("__");
      if (splitFilename.length === 1) return `/${splitFilename[0]}`;
      if (splitFilename.length === 2 && splitFilename[0] === "none")
        return `/${splitFilename[1]}`;
      if (splitFilename.length === 2)
        return `/${splitFilename[0]}/${splitFilename[1]}`;
      throw new Error("Tina Router: Page url could not be correctly parsed..");
    },
  },
};
