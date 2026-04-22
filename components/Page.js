import * as React from "react";
import { useTina } from "tinacms/dist/react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Blocks from "../components/Blocks";
import Footer from "../components/Footer/Footer";
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile"
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile"



export default function Page({ query, variables, data: pageData }) {
  const {
    data: { page },
  } = useTina({
    query: query,
    variables: variables,
    data: pageData,
  });
  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      <Blocks page={page} />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
}