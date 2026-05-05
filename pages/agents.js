import AgentPage from "../components/agents/AgentPage";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import FooterDesignMobile from '../components/Footer/FooterDesign/FooterDesignMobile';
import Layout from "../components/Layout";

export default function Agent() {
  return (
    <Layout>
      <Navbar />
      <AgentPage />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
}
