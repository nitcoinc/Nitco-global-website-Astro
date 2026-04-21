export default {
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
          component: "textarea",
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
  