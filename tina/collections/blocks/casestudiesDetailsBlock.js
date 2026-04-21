/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "CaseStudy Details",
  name: "CaseStudiesDetailsBlock",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "image",
      label: "Image",
      name: "image",
    },
    {
      type: "string",
      label: "Case Study Body",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea",
      },
    },
  ],
};
