import * as React from "react";
import { useTina } from "tinacms/dist/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Blocks from "../components/Blocks";
import Footer from "../components/Footer/Footer";
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile"
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile"



export default function Page({ query, variables, data: pageData }) {
  const tinaResult = useTina({
    query: query || "",
    variables: variables || {},
    data: pageData || {},
  });
  const page = tinaResult?.data?.page;

  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      {page ? (
        <Blocks page={page} />
      ) : (
        <div style={{ padding: "120px 24px", textAlign: "center", minHeight: "60vh" }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Page unavailable</h1>
          <p style={{ color: "#666" }}>
            This page&apos;s content cannot be loaded right now. Please try again later.
          </p>
        </div>
      )}
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
}