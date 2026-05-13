import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import PartnerPage from "../../components/Partners/PartnerPage";
import { PARTNER_CATEGORIES, getPartnerCategory } from "../../lib/partnersData";
import { CASE_STUDY_ENRICHMENT } from "../../lib/resourcesData";

export default function PartnerCategoryPage({ category, caseStudies }) {
  const router = useRouter();

  const handleContact = useCallback(() => {
    window.location.href = "/contact";
  }, []);

  if (!category) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{category.title} | NITCO Inc.</title>
        <meta name="description" content={category.intro}/>
      </Head>
      <Navbar/>
      <PartnerPage category={category} caseStudies={caseStudies} onContact={handleContact}/>
      <Footer/>
      <FooterDesignMobile/>
    </>
  );
}

export async function getStaticPaths() {
  const paths = PARTNER_CATEGORIES.map((c) => ({
    params: { slug: c.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = getPartnerCategory(params.slug);
  if (!category) return { notFound: true };

  const allPostsDir = path.join(process.cwd(), "content", "allPosts");
  let allCaseStudies = [];
  try {
    const files = fs.readdirSync(allPostsDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    allCaseStudies = files
      .map((file) => {
        const raw = fs.readFileSync(path.join(allPostsDir, file), "utf8");
        const { data } = matter(raw);
        return { ...data, _filename: file };
      })
      .filter((p) => p.pageType === "case-studies")
      .map((p) => {
        const slug = p.slug || p._filename.replace(/^case-studies__/, "").replace(/\.mdx?$/, "");
        const enrichment = CASE_STUDY_ENRICHMENT[slug] || {};
        return {
          title: p.title || "",
          image: p.image || null,
          date: p.date ? String(p.date) : null,
          slug,
          topics: enrichment.topics || [],
          description: enrichment.description || "",
        };
      })
      .filter((cs) => cs.title && cs.slug);
  } catch {
    allCaseStudies = [];
  }

  const relatedTopics = category.relatedTopics || [];
  const caseStudies = allCaseStudies
    .filter((cs) => cs.topics.some((t) => relatedTopics.includes(t)))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return { props: { category, caseStudies } };
}
