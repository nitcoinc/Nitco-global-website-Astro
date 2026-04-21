import * as React from "react";
import { client } from "../../tina/__generated__/client";
import Post from "../../components/Resources/resourceDetailedPage/AllPost";
import { getSeoForPath } from "../../lib/fetchSeoData";

export default (props) => {
  return <Post {...props} />;
};

export async function getStaticPaths() {
  const postsResponse = await client.queries.allPostsConnection({
    filter: { pageType: { eq: "blog" } },
  });

  const paths = postsResponse?.data?.allPostsConnection?.edges?.map(({ node }) => {
    const [_pageType, filename] = node._sys.filename.split("__");
    return { params: { slug: filename } };
  }) ?? [];

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const postName = params.slug;

  // Fetch current blog post
  const { data, query, variables } = await client.queries.allPosts({
    relativePath: `/blog__${postName}.mdx`,
  });

    // ✅ Fetch SEO data statically at build time
  const seo = await getSeoForPath(`/blog/${postName}`);

  // Fetch latest 5 posts (optional: if used for related posts)
  const postsResponse = await client.queries.allPostsConnection({
    filter: { pageType: { eq: "blog" } },
  });

  const posts = postsResponse?.data?.allPostsConnection?.edges
    ?.map(({ node }) => node)
    ?.map(({ _sys }) => _sys.filename)
    ?.map(filename => filename.split("__")[1])
    ?.filter(slug => slug && slug !== postName); // Exclude current post

  const latestPosts = [];

  for (let slug of posts ?? []) {
    try {
      const post = await client.queries.allPosts({
        relativePath: `/blog__${slug}.mdx`,
      });
      latestPosts.push(post.data.allPosts);
    } catch (e) {
      // Catch missing or invalid posts
    }
    if (latestPosts.length >= 5) break;
  }

  // Sort by date (optional)
  latestPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      sorteddata: latestPosts,
      data,
      query,
      variables,
      seo,
    },
  };
};
