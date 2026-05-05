import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Resources from "../components/Resources/Resources";

export default function ResourcesPage({ blogs, caseStudies, webinars, whitepapers }) {
  return (
    <>
      <Navbar />
      <Resources
        blogs={blogs}
        caseStudies={caseStudies}
        webinars={webinars}
        whitepapers={whitepapers}
      />
      <Footer />
    </>
  );
}

/* Read all MDX files in a directory and return parsed frontmatter */
function readMdxDir(dirPath) {
  try {
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    return files.map((file) => {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
      const { data } = matter(raw);
      return { ...data, _filename: file };
    });
  } catch {
    return [];
  }
}

export async function getStaticProps() {
  const allPostsDir     = path.join(process.cwd(), "content", "allPosts");
  const whitepapersDir  = path.join(process.cwd(), "content", "whitepaperspost");

  const allPosts   = readMdxDir(allPostsDir);
  const wpPosts    = readMdxDir(whitepapersDir);

  /* ── Blogs ── */
  const blogs = allPosts
    .filter((p) => p.pageType === "blog")
    .map((p) => ({
      title: p.title || "",
      image: p.image || null,
      date:  p.date  ? String(p.date) : null,
      slug:  p.slug  || p._filename.replace(/^blog__/, "").replace(/\.mdx?$/, ""),
    }))
    .filter((b) => b.title && b.slug)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  /* ── Case Studies ── */
  const caseStudies = allPosts
    .filter((p) => p.pageType === "case-studies")
    .map((p) => ({
      title: p.title || "",
      image: p.image || null,
      date:  p.date  ? String(p.date) : null,
      slug:  p.slug  || p._filename.replace(/^case-studies__/, "").replace(/\.mdx?$/, ""),
    }))
    .filter((cs) => cs.title && cs.slug)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  /* ── Webinars ── */
  const webinars = allPosts
    .filter((p) => p.pageType === "webinar")
    .map((p) => ({
      title: p.title || "",
      image: p.image || null,
      date:  p.date  ? String(p.date) : null,
      slug:  p.slug  || p._filename.replace(/^webinar__/, "").replace(/\.mdx?$/, ""),
    }))
    .filter((w) => w.title && w.slug)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  /* ── Whitepapers ── */
  const whitepapers = wpPosts
    .filter((p) => p.pageType === "whitepapers")
    .map((p) => ({
      title:     p.title  || "",
      image:     p.image  || null,
      slug:      p.slug   || p._filename.replace(/^whitepapers__/, "").replace(/\.mdx?$/, ""),
      pdfFileUrl: p.pdfFileUrl || null,
    }))
    .filter((wp) => wp.title && wp.slug);

  return {
    props: { blogs, caseStudies, webinars, whitepapers },
  };
}
