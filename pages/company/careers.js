import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterDesignMobile from "../../components/Footer/FooterDesign/FooterDesignMobile";
import CareersPage from "../../components/Company/careersPage";
import { getSeoForPath } from "../../lib/fetchSeoData";

const CareerPage = ({ seo }) => {
  return (
    <Layout>
      <Navbar />
      <CareersPage />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/company/careers");
  return { props: { seo } };
}

export default CareerPage;
