import { useCallback } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import CareersPage from "../../components/Company/careersPage";

export default function CareerPage() {
  const handleContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  }, []);

  return (
    <>
      <Head>
        <title>Careers | NITCO Inc.</title>
        <meta
          name="description"
          content="As NITCO continues to grow, we're always seeking innovative and dedicated professionals for challenging positions across AI, automation, cloud, and data."
        />
      </Head>
      <Navbar />
      <CareersPage onContact={handleContact} />
      <Footer />
      <FooterDesignMobile />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
