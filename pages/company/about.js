import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import AboutNew from "../../components/Company/AboutNew/AboutNew";
import { getSeoForPath } from "../../lib/fetchSeoData";

const AboutUsPage = () => {
  return (
    <Layout>
      <Navbar />
      <AboutNew />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/company/about");
  return { props: { seo } };
}

export default AboutUsPage;
