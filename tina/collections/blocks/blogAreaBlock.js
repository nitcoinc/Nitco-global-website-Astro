export default {
  type: "object",
  name: "blogBlock",
  label: "Blog Block",
  fields: [
    {
      type: "object",
      list: true,
      name: "blogpost",
      label: "Blog Post",
      fields: [
        {
          type: "image",
          name: "blogimage",
          label: "Blog Image"
        },
        {
          name: "postedon",
          label: "Posted On",
          type: "string"
        },
        {
          type: "string",
          name: "headingpro",
          label: "Heading"
        },
        {
          type: "string",
          name: "postedBy",
          label: "Posted By"
        },
        {
          type: "string",
          name: "duration",
          label: "Duration"
        },
        {
          type: "string",
          name: "description",
          label: "Description"
        },
        {
          type: "string",
          name: "slug",
          label: "Slug"
        },
        {
          type: "string",
          name: "blogcategory",
          label: "Blogcategory"
        },
         {
          type: "string",
          name: "blogcategory2",
          label: "Blogcategory2"
        },
        {
          type: "string",
          name: "blogindustry",
          label: "Blogindustry"
        },
        {
          type: "string",
          name: "blogdepartment",
          label: "Blogdepartment"
        },

      ]
    },
    {
      type: "string",
      name: "industriesheading",
      label: "Industriesheading",
    },
    {
      type: "object",
      list: true,
      name: "industries",
      label: "Industries",
      fields: [
        {
          type: "string",
          name: "industriesdesc",
          label: "Industries Desc"
        }
      ]
    },
    {
      type: "string",
      name: "deptheading",
      label: "Deptheading",
    },
    {
      type: "object",
      list: true,
      name: "departments",
      label: "departments",
      fields: [
        {
          type: "string",
          name: "departmentsdesc",
          label: "Department Desc"
        }
      ]
    },
    {
      type: "string",
      name: "catheading",
      label: "catheading",
    },
    {
      type: "object",
      list: true,
      name: "categories",
      label: "Categories",
      fields: [
        {
          type: "string",
          name: "catdesc",
          label: "Cat Desc"
        }
      ]
    }
  ]
};
