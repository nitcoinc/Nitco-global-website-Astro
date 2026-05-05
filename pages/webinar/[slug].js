import * as React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../../components/Resources/resourceDetailedPage/AllPost";
import { getSeoForPath } from "../../lib/fetchSeoData";

export default function WebinarPage(props) {
  return <Post {...props} />;
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "content", "allPosts");
  const files = fs.readdirSync(dir).filter((f) => f.startsWith("webinar__") && f.endsWith(".mdx"));
  const paths = files.map((f) => ({
    params: { slug: f.replace(/^webinar__/, "").replace(/\.mdx$/, "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postName = params.slug;
  const dir = path.join(process.cwd(), "content", "allPosts");
  const seo = await getSeoForPath(`/webinar/${postName}`);

  /* Current webinar */
  let currentPostData = {};
  let currentPostBody = "";
  try {
    const raw = fs.readFileSync(path.join(dir, `webinar__${postName}.mdx`), "utf8");
    const { data, content } = matter(raw);
    currentPostData = data;
    currentPostBody = content.trim();
  } catch {}

  /* Recent webinars (other slugs, up to 5) */
  const otherFiles = fs.readdirSync(dir).filter(
    (f) => f.startsWith("webinar__") && f.endsWith(".mdx") && f !== `webinar__${postName}.mdx`
  );
  const latestPosts = otherFiles
    .map((f) => {
      try {
        const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
        return {
          slug: data.slug || f.replace(/^webinar__/, "").replace(/\.mdx$/, ""),
          pageType: "webinar",
          title: data.title || "",
          image: data.image || null,
          date: data.date ? String(data.date) : null,
        };
      } catch { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 5);

  return {
    props: {
      data: {
        allPosts: {
          slug: currentPostData.slug || postName,
          pageType: currentPostData.pageType || "webinar",
          pagetype: currentPostData.pagetype || "Webinar",
          title: currentPostData.title || "",
          image: currentPostData.image || null,
          date: currentPostData.date ? String(currentPostData.date) : null,
          body: currentPostBody,
        },
      },
      query: "",
      variables: {},
      sorteddata: latestPosts,
      seo: seo || null,
    },
  };
}
