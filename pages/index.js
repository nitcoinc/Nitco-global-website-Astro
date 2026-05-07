import React from "react";
import HomePage from "../components/HomePage/HomePage";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";
import { getSeoForPath } from "../lib/fetchSeoData";

const HomePageComponent = () => {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
      <FooterDesignMobile />
    </>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/");
  return { props: { seo } };
}

export default HomePageComponent;
