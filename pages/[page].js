import * as React from "react";
import { client } from "../tina/__generated__/client";
import Page from "../components/Page";
import { getSeoForPath } from "../lib/fetchSeoData"; // ✅ Import SEO helper

export default (props) => <Page {...props} />;

// ✅ Dynamically generate all static pages with `pageType: none`
export async function getStaticPaths() {
  try {
    const pagesResponse = await client.queries.pageConnection({
      filter: { pageType: { eq: "none" } },
    });

    let paths =
      pagesResponse?.data?.pageConnection?.edges
        ?.map(({ node }) => node)
        ?.reduce((ps, { _sys }) => {
          const filename = _sys.filename.split("__")[1];
          if (filename)
            ps.push({
              params: { page: filename },
            });
          return ps;
        }, []) ?? [];

    return { paths, fallback: false };
  } catch (err) {
    console.warn(
      "[pages/[page].js] TinaCMS backend unreachable, returning empty paths:",
      err?.message || err
    );
    return { paths: [], fallback: false };
  }
};

// ✅ Fetch content + SEO statically for each "none" page
export const getStaticProps = async ({ params }) => {
  const pageName = params.page;

  try {
    // Fetch the page data from Tina
    const { data, query, variables } = await client.queries.page({
      relativePath: `none__${pageName}.mdx`,
    });

    // Fetch SEO data from TinaCMS for the corresponding path
    const seo = await getSeoForPath(`/${pageName}`);

    return {
      props: {
        data,
        query,
        variables,
        seo, // ✅ Pass to _app.js for static SEO rendering
      },
    };
  } catch (err) {
    console.warn(
      `[pages/[page].js] TinaCMS fetch failed for ${pageName}:`,
      err?.message || err
    );
    return { notFound: true };
  }
};
