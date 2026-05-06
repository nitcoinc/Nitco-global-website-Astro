import React, { useCallback } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";
import AICommandCenter from "../components/AICommandCenter/AICommandCenter";

export default function AIAgentCommandCenterPage() {
  const handleContact = useCallback(() => {
    window.location.href = "/contact";
  }, []);

  return (
    <>
      <Head>
        <title>AI Agent Command Center | NITCO Inc.</title>
        <meta
          name="description"
          content="Centralized visibility, governance, and execution for production-ready AI agents that drive real business outcomes."
        />
      </Head>
      <Navbar />
      <AICommandCenter onContact={handleContact} />
      <Footer />
      <FooterDesignMobile />
    </>
  );
}
