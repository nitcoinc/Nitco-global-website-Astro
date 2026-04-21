import React from "react";
import PlatformPage from "../components/platform/platformPage";
import Contactform from "../components/Services/ContactForm/contactform";
import Powerplatform from "../components/platform/powerplatform";
import { getSeoForPath } from "../lib/fetchSeoData";
import TechonologyAlliances from "../components/platform/Technology/techonologyAlliances";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";

const Platform = () => {
  return (
    <div>
      <Navbar />
      <NavBarMobile />
      <PlatformPage />
      <div>
        <Powerplatform />
        
      </div>
      <TechonologyAlliances />
      <Contactform title="Get In Touch" />
      <Footer />
      <FooterDesignMobile />
    </div>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/platform");
  return { props: { seo } };
}

export default Platform;
