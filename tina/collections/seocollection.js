// tina/collections/seoCollection.js

export const seoCollection = {
  name: "seo",
  label: "SEO Metadata",
  path: "content/seo",
  format: "json",
  fields: [
    {
      type: "string",
      name: "path",
      label: "Page Path",
      required: true,
    },
    {
      type: "string",
      name: "title",
      label: "Title Tag",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Meta Description",
      ui: {
        component: "textarea",
      },
      required: true,
    },
    {
      type: "string",
      name: "canonical",
      label: "Canonical URL",
      required: false,
    },
  ],
};
