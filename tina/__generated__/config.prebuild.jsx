// tina/config.js
import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

// tina/collections/navBar.js
var navBar_default = {
  type: "object",
  name: "navBar",
  label: "Nav Bar",
  path: "content/singleDocumentCollections",
  format: "mdx",
  ui: {
    filename: {
      readonly: true,
      slugify: () => "NavBar"
    },
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: "image",
      name: "navbarImage",
      label: "Image"
    }
  ]
};

// tina/collections/blocks/HomePageBlock.js
var HomePageBlock_default = {
  type: "object",
  name: "homePageBlock",
  label: "Home Page Block",
  fields: [
    {
      type: "string",
      name: "HeadingOfMainBanner",
      label: "Main Heading"
    },
    {
      type: "string",
      name: "TextOfMainBanner",
      label: "Tagline Text"
    },
    {
      type: "string",
      name: "ContactUsButton",
      label: "Call To Action Button Text"
    },
    {
      type: "string",
      name: "ContactUsButtonLink",
      label: "Call To Action Button Link URL"
    },
    {
      type: "object",
      list: true,
      name: "mainFeatureList",
      label: "Feature Card",
      fields: [
        {
          type: "string",
          name: "featureheading",
          label: "Heading",
          isTitle: true,
          required: true
        },
        {
          type: "image",
          name: "featureImage",
          label: "ICON"
        },
        {
          type: "string",
          name: "featuredescription",
          label: "Description"
        },
        {
          type: "string",
          name: "featureurl",
          label: "URL"
        }
      ]
    },
    {
      type: "string",
      name: "serviceheading",
      label: "Platforms"
    },
    {
      type: "string",
      name: "servicetext",
      label: "Text"
    },
    {
      type: "object",
      list: true,
      name: "serviceslist",
      label: "Services",
      fields: [
        {
          type: "string",
          name: "servicesName",
          label: "Service Name"
        },
        {
          type: "string",
          name: "urlForservices",
          label: "URL"
        }
      ]
    },
    {
      type: "image",
      name: "servicesImage",
      label: "Services Image"
    },
    {
      type: "image",
      name: "designImage",
      label: "Design Image"
    },
    {
      type: "string",
      name: "designheading",
      label: "Heading"
    },
    {
      type: "string",
      name: "designtext",
      label: "Text"
    },
    {
      type: "object",
      list: true,
      name: "designs",
      label: "Designs",
      fields: [
        {
          type: "string",
          name: "designName",
          label: "Design Name"
        }
      ]
    },
    {
      type: "string",
      name: "ourFeatureheading",
      label: "Heading"
    },
    {
      type: "string",
      name: "ourFeaturetext",
      label: "Text"
    },
    {
      type: "object",
      list: true,
      name: "ourfeatureslist",
      label: "our features",
      fields: [
        {
          type: "string",
          name: "featureName",
          label: "feature Name"
        },
        {
          type: "string",
          name: "featureDescription",
          label: "Feature Description"
        }
      ]
    },
    {
      type: "string",
      name: "funfactheading",
      label: "FunFact Heading"
    },
    {
      type: "string",
      name: "funfacttext",
      label: "FunFact Text"
    },
    {
      type: "string",
      name: "funfactcontactheading",
      label: "Contact Heading"
    },
    {
      type: "string",
      name: "funfactcontacttext",
      label: "Contact text"
    },
    {
      type: "string",
      name: "funfactcontactarea",
      label: "Contact area"
    },
    {
      type: "object",
      list: true,
      name: "factslist",
      label: "Facts",
      fields: [
        {
          type: "string",
          name: "factsnumbers",
          label: "Numbers"
        },
        {
          type: "string",
          name: "factsfield",
          label: "Field"
        }
      ]
    },
    {
      type: "object",
      list: true,
      name: "RecentCaseWorks",
      label: "Recent works",
      fields: [
        {
          type: "string",
          name: "caseHeading",
          label: "Heading"
        },
        {
          type: "string",
          name: "casetext",
          label: "Text"
        },
        {
          type: "image",
          name: "casestudyimage",
          label: "Image"
        },
        {
          type: "string",
          name: "slug",
          label: "Case Slug"
        }
      ]
    }
  ]
};

// tina/collections/blocks/blogAreaBlock.js
var blogAreaBlock_default = {
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
        }
      ]
    },
    {
      type: "string",
      name: "industriesheading",
      label: "Industriesheading"
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
      label: "Deptheading"
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
      label: "catheading"
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

// tina/collections/blocks/buttonBlock.js
var buttonBlock_default = {
  type: "object",
  name: "buttonBlock",
  label: "Button Block",
  fields: [
    {
      type: "object",
      list: true,
      name: "buttonList",
      label: "Button List",
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name"
        },
        {
          type: "string",
          name: "url",
          label: "URL"
        }
      ]
    }
  ]
};

// tina/collections/blocks/caseStudiesBlock.js
var caseStudiesBlock_default = {
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
          label: "Heading"
        },
        {
          type: "string",
          name: "casedesc",
          label: "Case Desc"
        },
        {
          type: "image",
          name: "caseimage",
          label: "Casestudy Image"
        },
        {
          type: "string",
          name: "postedBy",
          label: "Posted By"
        },
        {
          type: "string",
          name: "postedon",
          label: "Posted On"
        },
        {
          type: "string",
          name: "duration",
          label: "Duration"
        },
        {
          type: "string",
          name: "slug",
          label: "Page Slug"
        },
        {
          type: "string",
          name: "casestudytopic",
          label: "CaseStudyTopic"
        },
        {
          type: "string",
          name: "casestudytopic1",
          label: "CaseStudyTopic1"
        },
        {
          type: "string",
          name: "casestudytopic2",
          label: "CaseStudyTopic2"
        },
        {
          type: "string",
          name: "casestudyindustry",
          label: "CaseStudyindustry"
        },
        {
          type: "string",
          name: "casestudydepartment",
          label: "CaseStudydepartment"
        }
      ]
    },
    {
      type: "string",
      name: "casestudyindustriesheading",
      label: "CaseStudyIndustriesheading"
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
          label: "CaseStudy Desc"
        }
      ]
    },
    {
      type: "string",
      name: "casestudydeptheading",
      label: "CaseStudyDeptheading"
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
          label: "CaseStudyDepartment Desc"
        }
      ]
    },
    {
      type: "string",
      name: "casestudyptopicheading",
      label: "CaseStudyTopicheading"
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
          label: "CaseStudy topic Desc"
        }
      ]
    }
  ]
};

// tina/collections/blocks/casestudiesDetailsBlock.js
var casestudiesDetailsBlock_default = {
  label: "CaseStudy Details",
  name: "CaseStudiesDetailsBlock",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "image",
      label: "Image",
      name: "image"
    },
    {
      type: "string",
      label: "Case Study Body",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea"
      }
    }
  ]
};

// tina/collections/blocks/cookietypesBlock.js
var cookietypesBlock_default = {
  type: "object",
  name: "CookieTypesBlock",
  label: "CookieTypes Block",
  fields: [
    {
      type: "string",
      name: "mainheading",
      label: "Main Heading"
    },
    {
      type: "string",
      name: "subheading",
      label: "Sub Heading"
    },
    {
      type: "string",
      label: "Types of Cookies We Use",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea"
      }
    }
  ]
};

// tina/collections/blocks/leftVideoBlock.js
var leftVideoBlock_default = {
  type: "object",
  name: "LeftVideoBlock",
  label: "Left Video Block",
  fields: [
    {
      type: "string",
      name: "tagline_L_V",
      label: "Heading"
    },
    {
      type: "string",
      name: "text_L_V",
      label: "Description"
    },
    {
      type: "string",
      name: "video_L_V",
      label: "Video for Left"
    },
    {
      type: "string",
      name: "url_L_V",
      label: "Navigation URL"
    },
    {
      type: "string",
      name: "navigation_text_L_V",
      label: "Navigation Text"
    },
    {
      type: "object",
      list: true,
      name: "list_L_V",
      label: "Sub Title and Content",
      fields: [
        {
          type: "string",
          name: "subHeading_L_V",
          label: "Sub Heading"
        },
        {
          type: "string",
          name: "subContent_L_V",
          label: "Sub Content"
        }
      ]
    }
  ]
};

// tina/collections/blocks/newsBlock.js
var newsBlock_default = {
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
          label: "News Heading"
        },
        {
          type: "string",
          name: "newstext",
          label: "News Text"
        },
        {
          type: "image",
          name: "file",
          label: "Image"
        },
        {
          type: "string",
          name: "slug",
          // Adding the slug field
          label: "Slug"
        },
        {
          type: "string",
          name: "postedBy",
          label: "Posted By"
        },
        {
          type: "string",
          name: "postedon",
          label: "Posted On"
        },
        {
          type: "string",
          name: "duration",
          label: "Duration"
        },
        {
          type: "string",
          name: "newstopic",
          label: "NewsTopic"
        },
        {
          type: "string",
          name: "newsindustry",
          label: "Newsindustry"
        },
        {
          type: "string",
          name: "newsdepartment",
          label: "Newsdepartment"
        }
      ]
    },
    {
      type: "string",
      name: "newsindustriesheading",
      label: "NewsIndustriesheading"
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
          label: "NewsIndustries Desc"
        }
      ]
    },
    {
      type: "string",
      name: "newsdeptheading",
      label: "NewsDeptheading"
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
          label: "NewsDepartment Desc"
        }
      ]
    },
    {
      type: "string",
      name: "newstopicheading",
      label: "Newscatheading"
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
          label: "Newstopic Desc"
        }
      ]
    }
  ]
};

// tina/collections/blocks/pageBannerBlock.js
var pageBannerBlock_default = {
  type: "object",
  name: "Pagebannerblock",
  label: "Page Banner Block",
  fields: [
    {
      type: "string",
      name: "pageTitle",
      label: "PageTitle"
    }
  ]
};

// tina/collections/blocks/policyDefinitionsBlock.js
var policyDefinitionsBlock_default = {
  type: "object",
  name: "policydefinitionsBlock",
  label: "Policy Interpretation And Definitions Block",
  fields: [
    {
      type: "string",
      name: "mainheading",
      label: "Main Heading"
    },
    {
      type: "datetime",
      name: "lastupdated",
      label: "Last Updated"
    },
    {
      type: "string",
      label: "Content",
      name: "body",
      isBody: true,
      ui: {
        component: "textarea"
      }
      // {
      //   type: "string",
      //   name: "interheading",
      //   label: "Heading"
      // },
      // {
      //   type: "string",
      //   name: "subheading1",
      //   label: "Interpretation Heading"
      // },
      // {
      //   type: "string",
      //   name: "intercontent",
      //   label: "Content"
      // },
      // {
      //   type: "string",
      //   name: "subheading2",
      //   label: "Definitions Heading"
      // },
      // {
      //   type: "string",
      //   name: "desc",
      //   label: "Text"
      // },
      // {
      //   type: "object",
      //   list: true,
      //   name: "policypurposeslist",
      //   label: "Policy Purposes List",
      //   fields: [
      //     {
      //       type: "string",
      //       name: "policyabout",
      //       label: "Policy About"
      //     }
      //   ]
    }
  ]
};

// tina/collections/blocks/rightVideoBlock.js
var rightVideoBlock_default = {
  type: "object",
  name: "RightVideoBlock",
  label: "Right Video Block",
  fields: [
    {
      type: "string",
      name: "tagline_R_V",
      label: "Heading"
    },
    {
      type: "string",
      name: "text_R_V",
      label: "Description"
    },
    {
      type: "string",
      name: "video_R_V",
      label: "Video for Right"
    },
    {
      type: "string",
      name: "url_R_V",
      label: "Navigation URL"
    },
    {
      type: "string",
      name: "navigation_text_R_V",
      label: "Navigation Text"
    },
    {
      type: "string",
      name: "subContent_R_V",
      label: "Sub Content"
    },
    {
      type: "object",
      list: true,
      name: "list_R_V",
      label: "Sub Title and Content",
      fields: [
        {
          type: "string",
          name: "subHeading_R_V",
          label: "Sub Heading"
        },
        {
          type: "object",
          list: true,
          name: "keyPointsRI",
          label: "Key Points",
          fields: [
            {
              type: "string",
              name: "keypoint_R_V",
              label: "Key Point"
            }
          ]
        }
      ]
    }
  ]
};

// tina/collections/blocks/webinarBlock.js
var webinarBlock_default = {
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
          label: "Webinar Heading"
        },
        {
          type: "string",
          name: "webinarText",
          label: "Webinar Text"
        },
        {
          type: "image",
          name: "webinarImage",
          label: "Image"
        },
        {
          type: "string",
          name: "postedBy",
          label: "Posted By"
        },
        {
          type: "string",
          name: "postedon",
          label: "Posted On"
        },
        {
          type: "string",
          name: "duration",
          label: "Duration"
        },
        {
          type: "string",
          name: "slug",
          // Adding the slug field
          label: "Slug"
        },
        {
          type: "string",
          name: "webinartopic",
          label: "WebinarTopic"
        },
        {
          type: "string",
          name: "webinarindustry",
          label: "Webinarindustry"
        },
        {
          type: "string",
          name: "webinardepartment",
          label: "Webinardepartment"
        }
      ]
    },
    {
      type: "string",
      name: "webinarindustriesheading",
      label: "WebinarIndustriesheading"
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
          label: "WebinarDesc"
        }
      ]
    },
    {
      type: "string",
      name: "webinardeptheading",
      label: "WebinarDeptheading"
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
          label: "WebinarDepartment Desc"
        }
      ]
    },
    {
      type: "string",
      name: "webinartopicheading",
      label: "WebinarTopicheading"
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
          label: "Webinar topic Desc"
        }
      ]
    }
  ]
};

// tina/collections/blocks/whitePapersBlock.js
var whitePapersBlock_default = {
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
          label: "White Papers Image"
        },
        {
          type: "string",
          name: "slug",
          label: "Post Url"
        },
        {
          type: "string",
          name: "heading",
          label: "White Papers Heading"
        },
        {
          type: "string",
          name: "postedBy",
          label: "Posted By"
        },
        {
          type: "string",
          name: "postedon",
          label: "Posted On"
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
          name: "whitepapertopic",
          label: "WhitepaperTopic"
        },
        {
          type: "string",
          name: "whitepapertopic2",
          label: "WhitepaperTopic2"
        },
        {
          type: "string",
          name: "whitepaperindustry",
          label: "Whitepaperindustry"
        },
        {
          type: "string",
          name: "whitepaperdepartment",
          label: "Whitepaperdepartment"
        }
      ]
    },
    {
      type: "string",
      name: "whitepaperindustriesheading",
      label: "WhitepaperIndustriesheading"
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
          label: "WhitepaperDesc"
        }
      ]
    },
    {
      type: "string",
      name: "whitepaperdeptheading",
      label: "WhitepaperDeptheading"
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
          label: "WhitepaperDepartment Desc"
        }
      ]
    },
    {
      type: "string",
      name: "whitepapertopicheading",
      label: "WhitepaperTopicheading"
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
          label: "Whitepaper topic Desc"
        }
      ]
    }
  ]
};

// tina/collections/page.js
var page_default = {
  label: "Page Content",
  name: "page",
  path: "content/pages",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "slug",
      label: "Page Slug",
      required: true
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
          label: "None"
        },
        {
          value: "solutions",
          label: "Solutions"
        },
        {
          value: "services",
          label: "Services"
        },
        {
          value: "company",
          label: "Company"
        },
        {
          value: "insights",
          label: "Insights"
        },
        {
          value: "case-studies",
          label: "case-studies"
        }
      ]
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [
        HomePageBlock_default,
        blogAreaBlock_default,
        buttonBlock_default,
        casestudiesDetailsBlock_default,
        caseStudiesBlock_default,
        cookietypesBlock_default,
        leftVideoBlock_default,
        newsBlock_default,
        pageBannerBlock_default,
        policyDefinitionsBlock_default,
        rightVideoBlock_default,
        whitePapersBlock_default,
        webinarBlock_default
      ]
    }
  ],
  // Change filename to include pageType, then update the router function to split filename based on pageType.
  ui: {
    filename: {
      readonly: true,
      slugify: ({ pageType, slug }) => {
        return `${pageType}__${slug}`;
      }
    },
    // PageType is not in document, must include this information within filename.
    router: ({ document }) => {
      const isHomePage = document._sys.filename === "none__home" || document._sys.filename === "home";
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
    }
  }
};

// tina/collections/allPosts.js
var allPosts_default = {
  label: "Post Content",
  name: "allPosts",
  path: "content/allPosts",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "slug",
      label: "Page Slug"
    },
    {
      type: "string",
      name: "pageType",
      label: "Page Type",
      ui: { defaultItem: "none" },
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "blog",
          label: "Blogs"
        },
        {
          value: "case-studies",
          label: "Case Studies"
        },
        {
          value: "webinar",
          label: "Webinar"
        },
        {
          value: "news",
          label: "News"
        }
      ]
    },
    {
      type: "string",
      name: "pagetype",
      label: "Page Type"
    },
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "image",
      name: "image",
      label: "Image"
    },
    {
      type: "datetime",
      name: "date",
      label: "Date"
    },
    {
      type: "string",
      name: "body",
      label: "Body",
      isBody: true,
      ui: {
        component: "textarea"
      }
    }
  ],
  ui: {
    filename: {
      readonly: true,
      slugify: ({ pageType, slug }) => {
        return `${pageType}__${slug}`;
      }
    },
    router: ({ document }) => {
      const isHomePage = document._sys.filename === "none__home" || document._sys.filename === "home";
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
    }
  }
};

// tina/collections/whitePaper.js
var whitePaper_default = {
  label: "whitepapers Content",
  name: "whitepapers",
  path: "content/whitepaperspost",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "slug",
      label: "Page Slug"
    },
    {
      type: "string",
      name: "pageType",
      label: "Page Type",
      ui: { defaultItem: "whitepapers" },
      options: [
        {
          value: "whitepapers",
          label: "whitePapers"
        },
        {
          value: "webinars",
          label: "webinars"
        }
      ]
    },
    {
      type: "string",
      name: "pagetype",
      label: "Page Type"
    },
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "image",
      name: "image",
      label: "Image"
    },
    {
      type: "string",
      name: "body",
      label: "Body",
      isBody: true,
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "pdfFileUrl",
      label: "Whitepaper PDF URL",
      description: "Paste the full HubSpot file URL here"
    }
  ],
  // Change filename to include pageType, then update the router function to split filename based on pageType.
  ui: {
    filename: {
      readonly: true,
      slugify: ({ pageType, slug }) => {
        return `${pageType}__${slug}`;
      }
    },
    // PageType is not in document, must include this information within filename.
    router: ({ document }) => {
      const isHomePage = document._sys.filename === "none__home" || document._sys.filename === "home";
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
    }
  }
};

// tina/collections/seocollection.js
var seoCollection = {
  name: "seo",
  label: "SEO Metadata",
  path: "content/seo",
  format: "json",
  fields: [
    {
      type: "string",
      name: "path",
      label: "Page Path",
      required: true
    },
    {
      type: "string",
      name: "title",
      label: "Title Tag",
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Meta Description",
      ui: {
        component: "textarea"
      },
      required: true
    },
    {
      type: "string",
      name: "canonical",
      label: "Canonical URL",
      required: false
    }
  ]
};

// tina/config.js
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || process.env.GITHUB_BRANCH;
var config_default = defineConfig({
  //authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
  //contentApiUrlOverride: "/api/tina/gql",
  token: process.env.TINA_TOKEN,
  // This should match the value in your .env file
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // This should match the value in your .env file
  branch,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin"
    // within the public folder
  },
  schema: {
    collections: [TinaUserCollection, navBar_default, page_default, allPosts_default, whitePaper_default, seoCollection]
  }
});
export {
  config_default as default
};
