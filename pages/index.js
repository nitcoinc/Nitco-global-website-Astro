import React, { useEffect } from "react";
import NewHome from "../components/Company/HomePage/NewHome/NewHome";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";
import { getSeoForPath } from "../lib/fetchSeoData";

const HomePage = () => {
  useEffect(() => {
    document.body.classList.add("home-dark-nav");
    return () => document.body.classList.remove("home-dark-nav");
  }, []);

  return (
    <>
      <style jsx global>{`
        body.home-dark-nav #header,
        body.home-dark-nav .startp-nav,
        body.home-dark-nav .navbar { background: transparent !important; }
        body.home-dark-nav #header.is-sticky {
          background: #0b0a3a !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.35) !important;
        }
        body.home-dark-nav #header .nav-link,
        body.home-dark-nav #header .navbar-nav .nav-link { color: #ffffff !important; }
        body.home-dark-nav #header .navbar-toggler .icon-bar { background: #fff !important; }

        /* Logo swap: show white on dark hero, dark on sticky/non-home */
        .nav-logo-white { display: none; }
        body.home-dark-nav #header .nav-logo-default { display: none; }
        body.home-dark-nav #header .nav-logo-white { display: inline-block; }
        body.home-dark-nav #header.is-sticky .nav-logo-default { display: none; }
        body.home-dark-nav #header.is-sticky .nav-logo-white { display: inline-block; }
      `}</style>
      <Navbar />
      <NavBarMobile />
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
