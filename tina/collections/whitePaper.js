/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "whitepapers Content",
  name: "whitepapers",
  path: "content/whitepaperspost",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "slug",
      label: "Page Slug",
    },
    {
      type: "string",
      name: "pageType",
      label: "Page Type",
      ui: { defaultItem: "whitepapers" },
      options: [
        {
          value: "whitepapers",
          label: "whitePapers",
        },
        {
          value: "webinars",
          label: "webinars",
        },
      ],
    },
    {
      type: "string",
      name: "pagetype",
      label: "Page Type",
    },
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "image",
      name: "image",
      label: "Image",
    },
    {
      type: "string",
      name: "body",
      label: "Body",
      isBody: true,
      ui: {
        component: "textarea",
      },
    },
      {
      type: "string",
      name: "pdfFileUrl",
      label: "Whitepaper PDF URL",
      description: "Paste the full HubSpot file URL here",
    },
  ],
  // Change filename to include pageType, then update the router function to split filename based on pageType.
  ui: {
    filename: {
      readonly: true,
      slugify: ({ pageType, slug }) => {
        return `${pageType}__${slug}`;
      },
    },
    // PageType is not in document, must include this information within filename.
    router: ({ document }) => {
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
