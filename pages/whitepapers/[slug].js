import * as React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Whitepapers from "../../components/Resources/resourceDetailedPage/whitepaperpost";
import { getSeoForPath } from "../../lib/fetchSeoData";

export default function WhitepaperPage(props) {
  return <Whitepapers {...props} />;
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "content", "whitepaperspost");
  const files = fs.readdirSync(dir).filter((f) => f.startsWith("whitepapers__") && f.endsWith(".mdx"));
  const paths = files.map((f) => ({
    params: { slug: f.replace(/^whitepapers__/, "").replace(/\.mdx$/, "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postName = params.slug;
  const dir = path.join(process.cwd(), "content", "whitepaperspost");
  const seo = await getSeoForPath(`/whitepapers/${postName}`);

  /* Current whitepaper */
  let wpData = {};
  let wpBody = "";
  try {
    const raw = fs.readFileSync(path.join(dir, `whitepapers__${postName}.mdx`), "utf8");
    const { data, content } = matter(raw);
    wpData = data;
    wpBody = content.trim();
  } catch {}

  return {
    props: {
      data: {
        whitepapers: {
          slug: wpData.slug || postName,
          pageType: wpData.pageType || "whitepapers",
          pagetype: wpData.pagetype || "Whitepaper",
          title: wpData.title || "",
          image: wpData.image || null,
          pdfFileUrl: wpData.pdfFileUrl || null,
          body: wpBody,
        },
      },
      query: "",
      variables: {},
      sorteddata: [],
      seo: seo || null,
    },
  };
}
