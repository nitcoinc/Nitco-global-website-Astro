export default {
  type: "object",
  name: "webinarBlock",
  label: "Webinar Block",
  fields: [
    {
      type: "object",
      list: true,
      name: "webinars",
      label: "Webinar List",
      required: true,
      fields: [
        {
          type: "string",
          name: "webinarConcept",
          label: "Webinar Heading",
        },
        {
          type: "string",
          name: "webinarText",
          label: "Webinar Text",
        },
        {
          type: "image",
          name: "webinarImage",
          label: "Image",
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
          name: "slug", // Adding the slug field
          label: "Slug",
        },
        {
          type: "string",
          name: "webinartopic",
          label: "WebinarTopic",
        },
        {
          type: "string",
          name: "webinarindustry",
          label: "Webinarindustry",
        },
        {
          type: "string",
          name: "webinardepartment",
          label: "Webinardepartment",
        },
      ],
    },
    {
      type: "string",
      name: "webinarindustriesheading",
      label: "WebinarIndustriesheading",
    },
    {
      type: "object",
      list: true,
      name: "webinarindustries",
      label: "WebinarIndustries",
      fields: [
        {
          type: "string",
          name: "webinardesc",
          label: "WebinarDesc",
        },
      ],
    },
    {
      type: "string",
      name: "webinardeptheading",
      label: "WebinarDeptheading",
    },
    {
      type: "object",
      list: true,
      name: "webinardepartments",
      label: "Webinardepartments",
      fields: [
        {
          type: "string",
          name: "webinardepartmentsdesc",
          label: "WebinarDepartment Desc",
        },
      ],
    },
    {
      type: "string",
      name: "webinartopicheading",
      label: "WebinarTopicheading",
    },
    {
      type: "object",
      list: true,
      name: "webinartopic",
      label: "Webinartopic",
      fields: [
        {
          type: "string",
          name: "webinartopicdesc",
          label: "Webinar topic Desc",
        },
      ],
    }
  ],
};
