import * as React from "react";
import fs from "fs";
import path from "path";
import { client } from "../tina/__generated__/client";
import Page from "../components/Page";
import { getSeoForPath } from "../lib/fetchSeoData";

export default (props) => <Page {...props} />;

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "content", "pages");
  const files = fs.readdirSync(dir).filter((f) => f.startsWith("none__") && f.endsWith(".mdx"));
  const paths = files.map((f) => ({
    params: { page: f.replace(/^none__/, "").replace(/\.mdx$/, "") },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const pageName = params.page;
  const seo = await getSeoForPath(`/${pageName}`);
  try {
    const { data, query, variables } = await client.queries.page({
      relativePath: `none__${pageName}.mdx`,
    });
    return { props: { data, query, variables, seo: seo || null } };
  } catch {
    return { props: { data: { page: null }, query: "", variables: {}, seo: seo || null } };
  }
};
