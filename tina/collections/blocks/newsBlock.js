export default {
  type: "object",
  name: "newsBlock",
  label: "News Block",
  fields: [
    {
      type: "object",
      list: true,
      name: "services",
      label: "Services",
      required: true,
      fields: [
        {
          type: "string",
          name: "newsconcept",
          label: "News Heading",
        },
        {
          type: "string",
          name: "newstext",
          label: "News Text",
        },
        {
          type: "image",
          name: "file",
          label: "Image",
        },
        {
          type: "string",
          name: "slug", // Adding the slug field
          label: "Slug",
        },
        {
          type: "string",
          name: "postedBy",
          label: "Posted By"
        },
        {
          type: "string",
          name: "postedon",
          label: "Posted On",
        },
        {
          type: "string",
          name: "duration",
          label: "Duration",
        },
        {
          type: "string",
          name: "newstopic",
          label: "NewsTopic",
        },
        {
          type: "string",
          name: "newsindustry",
          label: "Newsindustry",
        },
        {
          type: "string",
          name: "newsdepartment",
          label: "Newsdepartment",
        },
      ],
    },
    {
      type: "string",
      name: "newsindustriesheading",
      label: "NewsIndustriesheading",
    },
    {
      type: "object",
      list: true,
      name: "newsindustries",
      label: "NewsIndustries",
      fields: [
        {
          type: "string",
          name: "newsindustriesdesc",
          label: "NewsIndustries Desc",
        },
      ],
    },
    {
      type: "string",
      name: "newsdeptheading",
      label: "NewsDeptheading",
    },
    {
      type: "object",
      list: true,
      name: "newsdepartments",
      label: "Newsdepartments",
      fields: [
        {
          type: "string",
          name: "newsdepartmentsdesc",
          label: "NewsDepartment Desc",
        },
      ],
    },
    {
      type: "string",
      name: "newstopicheading",
      label: "Newscatheading",
    },
    {
      type: "object",
      list: true,
      name: "newstopics",
      label: "News Topics",
      fields: [
        {
          type: "string",
          name: "newstopicdesc",
          label: "Newstopic Desc",
        },
      ],
    }
  ],
};
