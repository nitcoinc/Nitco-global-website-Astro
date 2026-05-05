import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import FooterDesignMobile from "../components/Footer/FooterDesign/FooterDesignMobile";
import Services from "../components/Services/services";
import Layout from "../components/Layout";
import { getSeoForPath } from "../lib/fetchSeoData";

const ServicesPage = () => {
  return (
    <Layout>
      <Navbar />
      <Services />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/services");
  return { props: { seo } };
}

export default ServicesPage;
