import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import FooterDesignMobile from '../components/Footer/FooterDesign/FooterDesignMobile';
import Contact from '../components/Contact/ContactForm';
import Layout from "../components/Layout";
import { getSeoForPath } from "../lib/fetchSeoData";

const Contactpage = () => {
  return (
    <Layout>
      <Navbar />
      <Contact />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/contact");
  return { props: { seo } };
}

export default Contactpage;
