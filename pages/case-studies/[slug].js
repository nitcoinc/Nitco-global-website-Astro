import * as React from "react";
import { client } from "../../tina/__generated__/client";
import Post from "../../components/Resources/resourceDetailedPage/AllPost";
import { getSeoForPath } from "../../lib/fetchSeoData";

export default function CaseStudyPage(props) {
  return <Post {...props} />;
}

export async function getStaticPaths() {
  const postsResponse = await client.queries.allPostsConnection({
    filter: { pageType: { eq: "case-studies" } },
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

  // ✅ Fetch current case study
  const { data, query, variables } = await client.queries.allPosts({
    relativePath: `/case-studies__${postName}.mdx`,
  });

  // ✅ Fetch SEO data statically at build time
  const seo = await getSeoForPath(`/case-studies/${postName}`);

  // ✅ Fetch all case studies to get latest 5 (for sidebar)
  const postsResponse = await client.queries.allPostsConnection({
    filter: { pageType: { eq: "case-studies" } },
  });

  const allSlugs =
    postsResponse?.data?.allPostsConnection?.edges
      ?.map(({ node }) => node?._sys?.filename?.split("__")[1])
      ?.filter((slug) => slug && slug !== postName) || [];

  const latestPosts = [];

  for (let slug of allSlugs) {
    try {
      const post = await client.queries.allPosts({
        relativePath: `/case-studies__${slug}.mdx`,
      });
      latestPosts.push(post.data.allPosts);
    } catch {
      // skip missing posts
    }
    if (latestPosts.length >= 5) break;
  }

  // ✅ Sort by date descending
  latestPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      sorteddata: latestPosts,
      data,
      query,
      variables,
      seo, // ✅ Pass SEO to _app.js for static <title> and <meta>
    },
  };
}
