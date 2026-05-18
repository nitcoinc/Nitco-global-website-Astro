import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/pmandapati/Desktop/agent-projects/Nitco_global_website/tina/__generated__/.cache/1779106695865', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  