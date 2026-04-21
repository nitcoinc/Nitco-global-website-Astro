import * as React from "react";
import { client } from "../../tina/__generated__/client";
import Whitepapers from "../../components/Resources/resourceDetailedPage/whitepaperpost";
import { getSeoForPath } from "../../lib/fetchSeoData";

export default function WhitepaperPage(props) {
  return <Whitepapers {...props} />;
}

/**
 * ✅ Fetches all whitepapers paths (handles pagination)
 */
export async function getStaticPaths() {
  let allEdges = [];
  let hasNextPage = true;
  let after = null;

  // 🔁 Loop through all paginated results from Tina
  while (hasNextPage) {
    const response = await client.queries.whitepapersConnection({
      filter: { pageType: { eq: "whitepapers" } },
      first: 50, // fetch up to 50 per request
      after: after,
    });

    const connection = response?.data?.whitepapersConnection;
    if (connection?.edges?.length) {
      allEdges = allEdges.concat(connection.edges);
    }

    hasNextPage = connection?.pageInfo?.hasNextPage;
    after = connection?.pageInfo?.endCursor;
  }

  // 🧩 Build dynamic paths for Next.js
  const paths =
    allEdges
      ?.map(({ node }) => node)
      ?.reduce((ps, { _sys }) => {
        const [_pageType, filename] = _sys.filename.split("__");
        return filename ? [...ps, { params: { slug: filename } }] : ps;
      }, []) || [];

  return { paths, fallback: false };
}

/**
 * ✅ Fetches single whitepaper data and latest 5 others for sidebar
 */
export async function getStaticProps({ params }) {
  const postName = params.slug;

  // ✅ Fetch main whitepaper content
  const { data, query, variables } = await client.queries.whitepapers({
    relativePath: `/whitepapers__${postName}.mdx`,
  });

  // ✅ Fetch SEO data
  const seo = await getSeoForPath(`/whitepapers/${postName}`);

  // ✅ Fetch all whitepapers for sidebar (paginated)
  let allEdges = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const response = await client.queries.whitepapersConnection({
      filter: { pageType: { eq: "whitepapers" } },
      first: 50,
      after: after,
    });

    const connection = response?.data?.whitepapersConnection;
    if (connection?.edges?.length) {
      allEdges = allEdges.concat(connection.edges);
    }

    hasNextPage = connection?.pageInfo?.hasNextPage;
    after = connection?.pageInfo?.endCursor;
  }

  // ✅ Extract other slugs (excluding current page)
  const allSlugs =
    allEdges
      ?.map(({ node }) => node?._sys?.filename?.split("__")[1])
      ?.filter((slug) => slug && slug !== postName) || [];

  // ✅ Fetch up to 5 latest whitepapers
  const latestWhitepapers = [];
  for (let slug of allSlugs) {
    try {
      const wp = await client.queries.whitepapers({
        relativePath: `/whitepapers__${slug}.mdx`,
      });
      latestWhitepapers.push(wp.data.whitepapers);
    } catch {
      // skip missing posts
    }
    if (latestWhitepapers.length >= 5) break;
  }

  // ✅ Sort by date if available
  latestWhitepapers.sort((a, b) => new Date(b.date) - new Date(a.date));

  // ✅ Return data to page
  return {
    props: {
      data,
      query,
      variables,
      seo,
      sorteddata: latestWhitepapers,
    },
  };
}
