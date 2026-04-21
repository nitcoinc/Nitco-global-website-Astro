import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile"
import FooterDesignMobile from '../components/Footer/FooterDesign/FooterDesignMobile';
import Contact from '../components/Contact/ContactForm';
import Layout from "../components/Layout";
import { getSeoForPath } from "../lib/fetchSeoData";


const Contactpage = () => {
    return (
        <Layout>
            <Navbar />
            <NavBarMobile  />
            <Contact />
            <Footer />
            <FooterDesignMobile />
        </Layout>
    );
};

export async function getStaticProps() {
  // ✅ Fetch SEO from TinaCMS statically during build
  const seo = await getSeoForPath("/contact");

  return {
    props: { seo },
  };
}

export default Contactpage;
