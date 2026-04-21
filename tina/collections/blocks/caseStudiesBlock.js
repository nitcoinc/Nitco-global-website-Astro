export default {
  type: "object",
  name: "CaseStudiesBlock",
  label: "Case Studies Block",
  fields: [
    {
      type: "object",
      list: true,
      name: "casestudies",
      label: "case Studies",
      fields: [
        {
          type: "string",
          name: "heading",
          label: "Heading",
        },
        {
          type: "string",
          name: "casedesc",
          label: "Case Desc",
        },
        {
          type: "image",
          name: "caseimage",
          label: "Casestudy Image",
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
          name: "slug",
          label: "Page Slug",
        },
        {
          type: "string",
          name: "casestudytopic",
          label: "CaseStudyTopic",
        },
         {
          type: "string",
          name: "casestudytopic1",
          label: "CaseStudyTopic1",
        },
         {
          type: "string",
          name: "casestudytopic2",
          label: "CaseStudyTopic2",
        },
        {
          type: "string",
          name: "casestudyindustry",
          label: "CaseStudyindustry",
        },
        {
          type: "string",
          name: "casestudydepartment",
          label: "CaseStudydepartment",
        },
      ],
    },
    {
      type: "string",
      name: "casestudyindustriesheading",
      label: "CaseStudyIndustriesheading",
    },
    {
      type: "object",
      list: true,
      name: "caseStudyindustries",
      label: "CaseStudyIndustries",
      fields: [
        {
          type: "string",
          name: "casestudydesc",
          label: "CaseStudy Desc",
        },
      ],
    },
    {
      type: "string",
      name: "casestudydeptheading",
      label: "CaseStudyDeptheading",
    },
    {
      type: "object",
      list: true,
      name: "casestudydepartments",
      label: "caseStudydepartments",
      fields: [
        {
          type: "string",
          name: "casestudydepartmentsdesc",
          label: "CaseStudyDepartment Desc",
        },
      ],
    },
    {
      type: "string",
      name: "casestudyptopicheading",
      label: "CaseStudyTopicheading",
    },
    {
      type: "object",
      list: true,
      name: "casestudytopic",
      label: "CaseStudytopic",
      fields: [
        {
          type: "string",
          name: "casestudytopicdesc",
          label: "CaseStudy topic Desc",
        },
      ],
    }
  ],
};
