// allPosts.js (TinaCMS configuration)

/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Post Content",
  name: "allPosts",
  path: "content/allPosts",
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
      ui: { defaultItem: "none" },
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "blog",
          label: "Blogs",
        },
        {
          value: "case-studies",
          label: "Case Studies",
        },
        {
          value: "webinar",
          label: "Webinar",
        },
        {
          value: "news",
          label: "News",
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
      type: "datetime",
      name: "date",
      label:"Date"
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
  ],
  ui: {
    filename: {
      readonly: true,
      slugify: ({ pageType, slug }) => {
        return `${pageType}__${slug}`;
      },
    },
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

