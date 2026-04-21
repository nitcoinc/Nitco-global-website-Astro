import AgentPage from "../components/agents/AgentPage";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import NavBarMobile from "../components/Navbar/NavBarMobile/navBarMobile";
import FooterDesignMobile from '../components/Footer/FooterDesign/FooterDesignMobile';
import Layout from "../components/Layout";

export default function Agent() {
 return (
        <Layout>
            <Navbar />
            <NavBarMobile  />
            <AgentPage />
            <Footer />
            <FooterDesignMobile />
        </Layout>
    );
}


    