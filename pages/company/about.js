import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar/Navbar";
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import AboutNew from "../../components/Company/AboutNew/AboutNew";
import { getSeoForPath } from "../../lib/fetchSeoData";

const AboutUsPage = () => {
  useEffect(() => {
    document.body.classList.add("home-dark-nav");
    return () => document.body.classList.remove("home-dark-nav");
  }, []);

  return (
    <Layout>
      <style jsx global>{`
        body.home-dark-nav #header,
        body.home-dark-nav .startp-nav,
        body.home-dark-nav .navbar { background: transparent !important; }
        body.home-dark-nav #header.is-sticky {
          background: #0b0a3a !important;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35) !important;
        }
        body.home-dark-nav #header .nav-link,
        body.home-dark-nav #header .navbar-nav .nav-link { color: #ffffff !important; }
        body.home-dark-nav #header .navbar-toggler .icon-bar { background: #fff !important; }

        .nav-logo-white { display: none; }
        body.home-dark-nav #header .nav-logo-default { display: none; }
        body.home-dark-nav #header .nav-logo-white { display: inline-block; }
        body.home-dark-nav #header.is-sticky .nav-logo-default { display: none; }
        body.home-dark-nav #header.is-sticky .nav-logo-white { display: inline-block; }
      `}</style>

      <div className="d-none d-lg-block">
        <Navbar />
      </div>
      <div className="d-block d-lg-none">
        <NavBarMobile />
      </div>

      <AboutNew />

      <div className="d-none d-lg-block">
        <Footer />
      </div>
      <div className="d-block d-lg-none">
        <FooterDesignMobile />
      </div>
    </Layout>
  );
};

// Fetch SEO data statically at build time
export async function getStaticProps() {
  const seo = await getSeoForPath("/company/about");
  return { props: { seo } };
}

export default AboutUsPage;
