import React from "react";
import Section1 from "../components/Company/HomePage/HomePageSection1/section1";
import Section2 from "../components/Company/HomePage/HomePageSection2/section2";
import Section3 from "../components/Company/HomePage/Homesection3/section3";
import Section4 from "../components/Company/HomePage/HomeSection4/section4";
import Contactform from "../components/Services/ContactForm/contactform";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";
import { getSeoForPath } from "../lib/fetchSeoData";

const HomePage = () => {
  return (
    <>
     <Navbar />
      <NavBarMobile />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Contactform title="Get In Touch" />
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
