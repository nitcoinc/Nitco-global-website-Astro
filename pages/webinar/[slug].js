import * as React from "react";
import { client } from "../../tina/__generated__/client";
import Post from "../../components/Resources/resourceDetailedPage/AllPost";
import { getSeoForPath } from "../../lib/fetchSeoData";

export default function WebinarPage(props) {
  return <Post {...props} />;
}

export async function getStaticPaths() {
  const postsResponse = await client.queries.allPostsConnection({
    filter: { pageType: { eq: "webinar" } },
  });

  const paths =
    postsResponse?.data?.allPostsConnection?.edges
      ?.map(({ node }) => node)
      ?.reduce((ps, { _sys }) => {
        const [_pageType, filename] = _sys.filename.split("__");
        return filename ? [...ps, { params: { slug: filename } }] : ps;
      }, []) || [];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postName = params.slug;

  // ✅ Fetch main webinar content
  const { data, query, variables } = await client.queries.allPosts({
    relativePath: `/webinar__${postName}.mdx`,
  });

  // ✅ Fetch SEO data statically (no runtime fetch)
  const seo = await getSeoForPath(`/webinar/${postName}`);

  // ✅ Fetch all webinars for sidebar (latest 5)
  const postsResponse = await client.queries.allPostsConnection({
    filter: { pageType: { eq: "webinar" } },
  });

  const allSlugs =
    postsResponse?.data?.allPostsConnection?.edges
      ?.map(({ node }) => node?._sys?.filename?.split("__")[1])
      ?.filter((slug) => slug && slug !== postName) || [];

  const latestWebinars = [];

  for (let slug of allSlugs) {
    try {
      const post = await client.queries.allPosts({
        relativePath: `/webinar__${slug}.mdx`,
      });
      latestWebinars.push(post.data.allPosts);
    } catch {
      // skip missing files
    }
    if (latestWebinars.length >= 5) break;
  }

  // ✅ Sort by date (descending)
  latestWebinars.sort((a, b) => new Date(b.date) - new Date(a.date));

  // ✅ Return props for static rendering
  return {
    props: {
      sorteddata: latestWebinars,
      data,
      query,
      variables,
      seo, // <– SEO data used by _app.js for static meta
    },
  };
}
