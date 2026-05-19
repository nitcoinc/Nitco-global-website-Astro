import * as React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Blocks from "../components/Blocks";
import Footer from "../components/Footer/Footer";
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile"
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile"

export default function Page({ page, posts = [], whitepapers = [] }) {
  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      <Blocks page={page} posts={posts} whitepapers={whitepapers} />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
}
