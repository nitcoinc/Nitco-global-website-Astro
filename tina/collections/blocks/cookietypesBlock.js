export default {
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
          component: "textarea",
        },
      }
    ]    
  };
  