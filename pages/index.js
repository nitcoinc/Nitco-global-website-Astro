import React from "react";
import NewHome from "../components/Company/HomePage/NewHome/NewHome";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";
import { getSeoForPath } from "../lib/fetchSeoData";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <NewHome />
      <Footer />
      <FooterDesignMobile />
    </>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/");
  return { props: { seo } };
}

export default HomePage;
