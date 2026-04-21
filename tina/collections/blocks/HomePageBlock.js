export default {
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
