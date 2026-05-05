import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import WorkingCapital from "../../components/Company/Services/WorkingCapital/WorkingCapital";

const WorkingCapitalPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <WorkingCapital />
      </main>
      <Footer />
      <FooterDesignMobile />
    </>
  );
};

export default WorkingCapitalPage;
