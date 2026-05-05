import React, { useCallback } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import SolutionPage from "../../components/Solutions/SolutionPage";
import { ALL_SOLUTIONS, getSolutionBySlug } from "../../lib/solutionsData";

export default function SolutionRoute({ solution }) {
  const handleContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  }, []);

  if (!solution) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <p>Solution not found.</p>
        </div>
        <Footer />
        <FooterDesignMobile />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{solution.title} | NITCO Inc.</title>
        <meta name="description" content={solution.subtitle} />
      </Head>
      <Navbar />
      <SolutionPage solution={solution} onContact={handleContact} />
      <Footer />
      <FooterDesignMobile />
    </>
  );
}

export async function getStaticPaths() {
  const paths = ALL_SOLUTIONS.map((s) => ({
    params: { page: s.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const solution = getSolutionBySlug(params.page);
  if (!solution) {
    return { notFound: true };
  }
  return {
    props: { solution },
  };
}
