const output =
    process.env["NODE_ENV"] === "production"
        ? "export"
        : process.env["NODE_ENV"] === "staging"
            ? "standalone"
            : null;

module.exports = {
    output: "standalone",
    images: { unoptimized: true },

    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html',
            },
        ];
    },

    async redirects() {
        return [
            {
                source: '/:path*__:_slug.mdx',
                destination: '/:path*/:_slug',
                permanent: true,
            },
        ];
    }
};




// //const { withNextVideo } = require('next-video/process')

// const output =
//     process.env["NODE_ENV"] === "production"
//         ? "export"
//         : process.env["NODE_ENV"] === "staging"
//             ? "standalone"
//             : null;

// module.exports = {
//     output: "standalone",
//     images: { unoptimized: true },
//     async rewrites() {
//         return [
//             {
//                 source: '/admin',
//                 destination: '/admin/index.html',
//             },
//         ]
//     },
// }
