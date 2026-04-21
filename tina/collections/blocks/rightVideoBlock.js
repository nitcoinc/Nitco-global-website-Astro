export default {
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
