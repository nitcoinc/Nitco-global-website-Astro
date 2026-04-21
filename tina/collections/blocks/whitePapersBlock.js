export default {
  type: "object",
  name: "whitePapersBlock",
  label: "White Papers Block",
  fields: [
    {
      type: "object",
      list: true,
      name: "whitepaperslist",
      label: "White Papers List",
      fields: [
        {
          type: "image",
          name: "image",
          label: "White Papers Image",
        },
        {
          type: "string",
          name: "slug",
          label: "Post Url",
        },
        {
          type: "string",
          name: "heading",
          label: "White Papers Heading",
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
          name: "description",
          label: "Description",
        },
        {
          type: "string",
          name: "whitepapertopic",
          label: "WhitepaperTopic",
        },
        {
          type: "string",
          name: "whitepapertopic2",
          label: "WhitepaperTopic2",
        },
        {
          type: "string",
          name: "whitepaperindustry",
          label: "Whitepaperindustry",
        },
        {
          type: "string",
          name: "whitepaperdepartment",
          label: "Whitepaperdepartment",
        },
      ],
    },
    {
      type: "string",
      name: "whitepaperindustriesheading",
      label: "WhitepaperIndustriesheading",
    },
    {
      type: "object",
      list: true,
      name: "whitepaperindustries",
      label: "WhitepaperIndustries",
      fields: [
        {
          type: "string",
          name: "whitepaperdesc",
          label: "WhitepaperDesc",
        },
      ],
    },
    {
      type: "string",
      name: "whitepaperdeptheading",
      label: "WhitepaperDeptheading",
    },
    {
      type: "object",
      list: true,
      name: "whitepaperdepartments",
      label: "Whitepaperdepartments",
      fields: [
        {
          type: "string",
          name: "whitepaperdepartmentsdesc",
          label: "WhitepaperDepartment Desc",
        },
      ],
    },
    {
      type: "string",
      name: "whitepapertopicheading",
      label: "WhitepaperTopicheading",
    },
    {
      type: "object",
      list: true,
      name: "whitepapertopic",
      label: "Whitepapertopic",
      fields: [
        {
          type: "string",
          name: "whitepapertopicdesc",
          label: "Whitepaper topic Desc",
        },
      ],
    },
  ],
};
