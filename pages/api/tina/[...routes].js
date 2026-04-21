// pages/api/tina/[...slug].js
import { TinaNodeBackend } from "@tinacms/datalayer";
import databaseClient from "../../../tina/__generated__/databaseClient";

// This backend only handles read operations (read-only token)
const handler = TinaNodeBackend({
  databaseClient,
});

export default function (req, res) {
  return handler(req, res);
}
















// import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
// import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

// import databaseClient from "../../../tina/__generated__/databaseClient";

// const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// const handler = TinaNodeBackend({
//   authProvider: isLocal
//     ? LocalBackendAuthProvider()
//     : AuthJsBackendAuthProvider({
//         authOptions: TinaAuthJSOptions({
//           databaseClient: databaseClient,
//           secret: process.env.NEXTAUTH_SECRET,
//         }),
//       }),
//   databaseClient,
// });

// export default (req, res) => {
//   // Modify the request here if you need to
//   return handler(req, res);
// };
