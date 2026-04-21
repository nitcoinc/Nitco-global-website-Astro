
import CareersPage from '../../components/Company/careersPage';
import Layout from "../../components/Layout";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"
import FooterDesignMobile from '../../components/Footer/FooterDesign/FooterDesignMobile';
import { getSeoForPath } from "../../lib/fetchSeoData";

const CareerPage = ({ seo }) => {
  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      <CareersPage />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

// ✅ Fetch SEO data statically from TinaCMS
export async function getStaticProps() {
  const seo = await getSeoForPath("/company/careers");
  return { props: { seo } };
}

export default CareerPage;
