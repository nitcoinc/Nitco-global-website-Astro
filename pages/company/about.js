import About from '../../components/Company/Aboutus/about';
import Layout from "../../components/Layout";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"
import FooterDesignMobile from '../../components/Footer/FooterDesign/FooterDesignMobile';
import { getSeoForPath } from "../../lib/fetchSeoData";

const Aboutuspage = () => {
    return (
        <Layout>
            <Navbar />
            <NavBarMobile />
            <About />
            <Footer />
            <FooterDesignMobile />
        </Layout>
    );
};

// ✅ Fetch SEO data statically at build time
export async function getStaticProps() {
  const seo = await getSeoForPath("/company/about");
  return { props: { seo } };
}


export default Aboutuspage;
