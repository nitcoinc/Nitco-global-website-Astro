import { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import PartnerPage from "../../components/Partners/PartnerPage";
import { PARTNER_CATEGORIES, getPartnerCategory } from "../../lib/partnersData";

export default function PartnerCategoryPage({ category }) {
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
      <PartnerPage category={category} onContact={handleContact}/>
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
  return { props: { category } };
}
