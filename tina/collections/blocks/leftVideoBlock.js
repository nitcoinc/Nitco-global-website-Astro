export default {
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
