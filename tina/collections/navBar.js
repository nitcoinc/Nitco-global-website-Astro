export default {
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
