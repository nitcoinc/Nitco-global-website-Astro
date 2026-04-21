import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";
import navBar from "./collections/navBar.js";
import page from "./collections/page";
import allPosts from "./collections/allPosts.js";
import whitePaper from "./collections/whitePaper.js";
import { seoCollection } from "./collections/seocollection";



const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  process.env.GITHUB_BRANCH;

// const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
// const contentApiUrlOverride =
//   process.env["NODE_ENV"] === "staging" ? "/api/tina/gql" : null;
export default defineConfig({
  //authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
  //contentApiUrlOverride: "/api/tina/gql",
  token: process.env.TINA_TOKEN,  // This should match the value in your .env file
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // This should match the value in your .env file
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
      mediaRoot: "uploads",
    },
  },
  build:  {
    publicFolder: "public",
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [TinaUserCollection, navBar, page, allPosts, whitePaper, seoCollection],
  },
});






// // tina/config.js
// import { defineConfig } from "tinacms";
// import {
//   TinaUserCollection,
// } from "tinacms-authjs/dist/tinacms";

// import navBar from "./collections/navBar.js";
// import page from "./collections/page.js";
// import allPosts from "./collections/allPosts.js";
// import whitePaper from "./collections/whitePaper.js";
// import { seoCollection } from "./collections/seocollection.js";

// // ✅ Hardcoded for testing on dev environment
// const branch = "main";
// const clientId = "88d50294-10d8-4d51-858d-a3c1dda758dc"; // from Nitco Inc Tina Cloud project
// const token = "1e8491614fc03a027f8be79441095372b05a884c"; // Read-only token

// export default defineConfig({
//   // Read-only mode for testing
//   clientId,
//   token,
//   branch,

//   media: {
//     tina: {
//       publicFolder: "public",
//       mediaRoot: "uploads",
//     },
//   },

//   build: {
//     publicFolder: "public",
//     outputFolder: "admin", // Tina dashboard path
//   },

//   schema: {
//     collections: [
//       TinaUserCollection,
//       navBar,
//       page,
//       allPosts,
//       whitePaper,
//       seoCollection,
//     ],
//   },
// });







