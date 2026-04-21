import { client } from "../tina/__generated__/client";

export async function loadAllSeoData() {
  let allEntries = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const { data } = await client.queries.seoConnection({
      first: 100,
      after,
    });

    const edges = data?.seoConnection?.edges || [];
    allEntries = [...allEntries, ...edges.map(({ node }) => node)];

    hasNextPage = data?.seoConnection?.pageInfo?.hasNextPage;
    after = data?.seoConnection?.pageInfo?.endCursor;
  }

  return allEntries;
}
