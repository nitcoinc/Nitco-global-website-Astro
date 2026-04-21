import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import ArtificialSection1 from "../../components/Services/Section1/artificialSection1";
import ArtificialSection2 from "../../components/Services/section2/artificialSection2";
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"
import Discover from "../../images/services-image/IntegrationImg/Discover_integration.webp";
import Advice from "../../images/services-image/IntegrationImg/Advice-integration.webp";
import Deliver from "../../images/services-image/IntegrationImg/Deliver-integration.webp";
import Manage from "../../images/services-image/IntegrationImg/Manage-integration.webp";
import Evolve from "../../images/services-image/IntegrationImg/Evolve-integration.webp";
import Boomi from "../../images/services-image/IntegrationImg/Boomi.webp";
import IBM from "../../images/services-image/IntegrationImg/IBM.webp";
import Workato from "../../images/services-image/IntegrationImg/Workato.webp";
import Celigo from "../../images/services-image/IntegrationImg/Celigo.webp";
import Jitterbit from "../../images/services-image/IntegrationImg/Jitterbit.webp";
import Tray from "../../images/services-image/IntegrationImg/Tray.webp";
import Banner from "../../images/services-image/IntegrationImg/Banner-integration.webp";
import Banner2 from "../../images/services-image/IntegrationImg/Banner2-integration.webp";
import Banner3 from "../../images/services-image/IntegrationImg/Banner3-integration.webp";
import Integration from "../../images/services-image/Icons/Intigration.gif";
import IntegrationIcon from "../../images/services-image/IntegrationImg/IntegrationIcon.svg";
import { getSeoForPath } from "../../lib/fetchSeoData";


const ArtificialInteligencesection3 = dynamic(
  () =>
    import(
      "../../components/Services/Section3/artificialInteligencesection3"
    ),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const ArtificialIntelligencesection4 = dynamic(
  () =>
    import(
      "../../components/Services/Section4/artificialIntelligencesection4"
    ),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const ServicePageSection5 = dynamic(
  () => import("../../components/Services/Section5/servicePageSection5"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const Contactform = dynamic(
  () => import("../../components/Services/ContactForm/contactform"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const FooterDesignMobile = dynamic(
  () => import("../../components/Footer/FooterDesign/FooterDesignMobile"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const Footer = dynamic(() => import("../../components/Footer/Footer"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});


const integrationService = () => {
  const DataSection1 = {
    Icon: IntegrationIcon,
    Icon1: Integration,
    Heading: "Integration",
    Title: "Modern Integration for a Connected Enterprise",
    Description:
      "We help you move from data silos to data synergy. With modern EDI, enterprise-wide integrations, and API-first architectures, we turn your systems into a connected, intelligent foundation for innovation and growth.",
  };
  const DataSection3 = {
    Title:
      "Together with our clients, we simplify the complex-building integration solutions that drive efficiency, transparency, and smarter business decisions.",
  };
  const expertiseAreas = [
    {
      title: "EDI / B2B Integration",
      description:
        "We modernize electronic data interchange (EDI) and streamline B2B communication with trading partners. From onboarding to transaction mapping, our solutions reduce manual effort, improve accuracy, and ensure compliance across your supply chain.",
    },
    {
      title: "Enterprise Integrations",
      description:
        "We connect critical business systems-ERP, CRM, HR, and more-creating unified workflows and real-time data visibility. Our integration frameworks minimize silos and enable seamless information flow across the enterprise.",
    },
    {
      title: "API Management",
      description:
        "We design, develop, and manage secure, scalable APIs that power internal systems and external digital experiences. From API gateways to lifecycle governance, we ensure your APIs are performant, discoverable, and future-ready.",
    },
  ];
  const DataSection4 = [
    {
      Title: "Discover",
      Description:
        "We start by analyzing your existing integrations-from legacy EDI workflows to enterprise systems and APIs. Through workshops and audits, we uncover inefficiencies, gaps, and opportunities to streamline data exchange and connectivity across your business ecosystem.",
      image: Discover,
    },
    {
      Title: "Advise",
      image: Advice,
      Description:
        "We develop a tailored integration strategy aligned with your goals. Whether it's modernizing B2B EDI systems, scaling enterprise-wide integrations, or establishing robust API governance, our roadmap ensures flexibility, security, and long-term sustainability.",
    },
    {
      Title: "Deliver",
      image: Deliver,
      Description:
        "We implement reliable, scalable solutions across all pillars-automating B2B transactions, integrating ERP/CRM systems, and building API layers that connect everything seamlessly. With best-in-class tools and frameworks, we bring your integration vision to life.",
    },
    {
      Title: "Manage",
      image: Manage,
      Description:
        "Post-deployment, we ensure your integrations operate at peak performance. From monitoring EDI document flow to managing API traffic and maintaining uptime across enterprise systems, our proactive support keeps your data pipelines secure and efficient.",
    },
    {
      Title: "Evolve",
      image: Evolve,
      Description:
        "As your business evolves, we adapt your integration landscape. We support onboarding new partners, expanding enterprise integrations, and extending your API capabilities-future-proofing your architecture to support innovation and growth.",
    },
  ];
  const cardDataSection4 = [
    {
      title: "Boomi",
      Image: Boomi,
      link: "https://boomi.com/partners/find-a-partner/#/1255665",
      Description:
        "As a certified Boomi partner, we specialize in low-code integration that connects everything-apps, data, devices, and people. Whether you're modernizing legacy systems or building cloud-native workflows, Boomi helps us accelerate delivery and simplify complex architectures.",
    },
    {
      title: "IBM",
      Image: IBM,
      link: "https://www.ibm.com/in-en",
      Description:
        "Leveraging IBM’s integration and automation suite-including App Connect and MQ-we help enterprises manage high-volume data exchanges with speed and security. Our expertise ensures reliability in mission-critical environments where precision and performance matter most.",
    },
    {
      title: "Workato",
      Image: Workato,
      link: "https://partners.workato.com/consultants/nitco-inc",
      Description:
        "We use Workato’s intelligent automation platform to blend integration with workflow automation. With pre-built connectors and AI-powered logic, we enable agile teams to automate processes across business and IT-without writing complex code.",
    },
    {
      title: "Celigo",
      Image: Celigo,
      link: "https://www.celigo.com/",
      Description:
        "As a Celigo integration partner, we use its low-code iPaaS and prebuilt connectors to automate and unify ERP, CRM, e-commerce, cloud apps, accelerating deployment, ensuring data consistency, and simplifying architectures.",
    },
    {
      title: "JitterBit",
      Image: Jitterbit,
      link: "https://www.jitterbit.com/",
      Description:
        "As a Jitterbit integration partner, we leverage its low-code Harmony platform and connectors to integrate SaaS, on-premise systems, and APIs, accelerating deployment, ensuring data accuracy, streamlining workflows, and reducing complexity.",
    },
    {
      title: "Tray.ai",
      Image: Tray,
      link: "https://tray.ai/",
      Description:
        "Partnering with Tray.io, we leverage its low-code automation platform and extensive connectors to orchestrate cloud and on-prem workflows, accelerate deployments, maintain data consistency, and simplify integration architectures.",
    },
  ];
  const Section2 = [
    { id: 1, name: "Case Study", Id: "Integration-CaseStudy", src: Banner, link: "case-studies/modernizing-integrations-boomi-to-workato-migration-at-scale", Title: "Modernizing Integrations Boomi to Workato Migration at Scale", Description: "The customer needed to migrate 350+ integrations from Boomi to Workato while enhancing performance, scalability, and real-time responsiveness. The legacy setup struggled with long-running database calls, large data volumes, and limited file handling (e.g., ZIP files, attachments), which caused slow processes, higher operational effort, and made critical high-volume integrations difficult to run." },
    { id: 2, name: "Blog", Id: "Integration-Blog", src: Banner2, link: "blog/ipass-what-is-it-and-what-you-can-do", Title: "What is iPaaS and Why It Matters", Description: "Integrated platform-as-a-service, or iPaaS, has been a game-changer for countless organizations across a wide variety of industries. iPaaS is a virtual platform that allows numerous software applications to interact with one another and share data and allow users to access the various applications supported by the platform in a centralized environment." },
    { id: 3, name: "White Paper", Id: "Integration-WhitePaper", src: Banner3, link: "whitepapers/api-management-as-a-journey", Title: "API Management as a Journey", Description: "APIs are the building blocks for digital success, which makes managing APIs more important than ever. Rather than approaching API management as a one-time task, business and IT leaders should approach it as an ongoing, mission-critical practice for discovering, managing, and governing APIs across their IT ecosystems." },
  ];
  const Numeric = [
    { value: 200, label: "Solutions Deployed" },
    { value: 60, label: "Customers served" },
    { value: 200, label: "Certified Developers" },
    { value: 20, label: "Years of Experience" },
  ];
  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      <ArtificialSection1 data={DataSection1} />
      <ArtificialSection2 section2Data={Section2} />
      <ArtificialInteligencesection3
        data={DataSection3}
        expertiseAreas={expertiseAreas}
        Title={
          <>
            Our {DataSection1?.Heading || ""}{" "}
            <span style={{ color: "#ed1651" }}>Expertise</span>
          </>
        }
        Numeric={Numeric}
      />
      <ArtificialIntelligencesection4
        Title="How We Deliver Seamless Data Integration"
        cardDataSection4={cardDataSection4}
        DataSection4={DataSection4}
        technologyPartnerTitle={
                    <>
                        Integration with our{" "}
                        <span style={{ color: "#ed1651" }}>technology partners</span>
                    </>
                }
      />
      <ServicePageSection5 Title="Integration" />
      <Contactform />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/services/integration-services");
  return { props: { seo } };
}
export default integrationService;
