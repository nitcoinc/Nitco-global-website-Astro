export default {
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
                    label: "Name",
                },
                {
                    type: "string",
                    name: "url",
                    label: "URL"
                },
            ],
        },
    ],
};
