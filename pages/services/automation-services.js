import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import ArtificialSection1 from "../../components/Services/Section1/artificialSection1";
import ArtificialSection2 from "../../components/Services/section2/artificialSection2";
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"
import DiscoverAuto from "../../images/services-image/AutomationImg/Discover-Auto.webp";
import AdviceAuto from "../../images/services-image/AutomationImg/Advice-Auto.webp";
import DeliverAuto from "../../images/services-image/AutomationImg/Deliver-Auto.webp";
import ManageAuto from "../../images/services-image/AutomationImg/Manage-Auto.webp";
import EvolveAuto from "../../images/services-image/AutomationImg/Evolve-Auto.webp";
import UiPath from "../../images/services-image/AutomationImg/UiPath.webp";
import Blueprism from "../../images/services-image/AutomationImg/Blueprism.webp";
import AutomationIcon from "../../images/services-image/AutomationImg/AutomationIcon.svg";
import Microsoft from "../../images/services-image/AutomationImg/Microsoft.webp";
import Banner from "../../images/services-image/AutomationImg/Banner1-Automation.webp";
import Banner2 from "../../images/services-image/AutomationImg/Banner2-Automation.webp";
import Banner3 from "../../images/services-image/AutomationImg/Banner3-Automation.webp";
import AIIcon1 from "../../images/services-image/Icons/Automation.gif";
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


const automationService = () => {
  const DataSection1 = {
    Icon: AutomationIcon,
    Icon1: AIIcon1,
    Heading: "Automation",
    Title: "Automate Smarter. Scale Faster.",
    Description:
      "We turn time-consuming processes into seamless workflows that save time, reduce cost, and scale with your business. Whether it's RPA, AI-driven automation, or autonomous agents, we make it work-fast and reliably.",
  };
  const DataSection3 = {
    Title:
      "We've partnered with organizations across industries to streamline operations, reduce manual effort, and build future-ready automation ecosystems-turning complexity into clarity through intelligent design. ",
  };
  const expertiseAreas = [
    {
      title: "Robotic Process Automation (RPA) ",
      description:
        "We automate rule-based, repetitive tasks using industry-leading platforms. From invoice processing to HR operations, our bots deliver speed, accuracy, and massive time savings.",
    },
    {
      title: "Intelligent Automation",
      description:
        "Combining RPA with AI, OCR, NLP, and analytics, we create end-to-end automation workflows that think and adapt. These solutions reduce human touchpoints and boost operational intelligence.",
    },
    {
      title: "Agentic Automation",
      description:
        "We design autonomous agents capable of planning, reasoning, and making decisions. These systems don’t just follow instructions-they work toward goals dynamically, making automation proactive and context-aware.",
    },
  ];
  const DataSection4 = [
    {
      Title: "Discover",
      Description:
        "We begin by identifying manual, repetitive, and high-impact processes across your organization. Through deep-dive workshops and process mapping, we uncover automation opportunities that deliver measurable ROI.",
      image: DiscoverAuto,
    },
    {
      Title: "Advise",
      image: AdviceAuto,
      Description:
        "We craft a tailored automation strategy-prioritizing use cases, choosing the right tools, and aligning with your business and IT goals. Our roadmap ensures scalability, compliance, and long-term success. ",
    },
    {
      Title: "Deliver",
      image: DeliverAuto,
      Description:
        "We build and deploy automation solutions-bots, workflows, or intelligent agents-using platforms like UiPath, Automation Anywhere, and custom frameworks. We ensure fast implementation with minimal disruption.",
    },
    {
      Title: "Manage",
      image: ManageAuto,
      Description:
        "Post-deployment, we monitor performance, handle exceptions, and ensure reliability at scale. Our support ensures your automation runs efficiently, securely, and continuously improves.",
    },
    {
      Title: "Evolve",
      image: EvolveAuto,
      Description:
        "We help you move from basic task automation to intelligent and autonomous operations-enhancing capabilities with AI, analytics, and next-gen agentic automation for future readiness.",
    },
  ];
  const cardDataSection4 = [
    {
      title: "UiPath",
      Image: UiPath,
      link: "https://www.uipath.com/partners/business-partners?search=nitco-inc",
      Description:
        "As a trusted UiPath partner, we deliver enterprise-grade RPA solutions that are fast, flexible, and built to scale. From bot development to orchestration, we help clients automate complex processes with precision and speed.",
    },
    {
      title: "Microsoft Power Automate",
      Image: Microsoft,
      link: "https://www.microsoft.com/en/power-platform/products/power-automate?market=af",
      Description:
        "Harnessing the power of Microsoft’s automation ecosystem, we streamline workflows across the Microsoft stack and beyond. Power Automate lets us rapidly connect systems, automate approvals, and integrate AI-all within your existing Microsoft environment.",
    },
    {
      title: "Blueprism ",
      Image: Blueprism,
      link: "https://www.blueprism.com/",
      Description:
        "We leverage Blue Prism’s secure, intelligent automation capabilities to build robust digital workforces. With a strong focus on compliance and scalability, our Blue Prism solutions support highly regulated and mission-critical environments.",
    },
  ];
  const Section2 = [
    { id: 1, name: "Case Study", Id: "Automation-CaseStudy", src: Banner, link: "case-studies/logistics-ai-rpa-automation-for-isf-10-customs-filing", Title: "Logistics–AI + RPA Automation for ISF-10 Customs Filing", Description: "An international logistics company needed to ensure accurate and timely filing of ISF-10 customs forms for shipments to the U.S. Manual processing resulted in a 10% error rate, risking $5,000 fines per violation for late, incomplete, or inaccurate submissions, jeopardizing both cost and compliance." },
    { id: 2, name: "Blog", Id: "Automation-Blog", src: Banner2, link: "blog/rpa-for-human-resources", Title: "Boost HR Efficiency with RPA", Description: "Robotic Process Automation (RPA) is a technology that helps organizations automate their business processes. RPA can be used to automate many HR-related tasks—from managing employee records to processing payroll and recruiting. In this blog post, we’ll explore how RPA can be used to streamline the HR function and improve efficiency." },
    { id: 3, name: "White Paper", Id: "Automation-WhitePaper", src: Banner3, link: "whitepapers/ai-and-automation-trends-2025", Title: "AI & Automation Trends 2025", Description: "When it comes to capturing AI’s potential, the C-suite has become a bit discouraged, and not without reason. They’re spending many millions of dollars on AI, but only about half of all AI prototypes make it into production. Seventy percent of respondents in a recent survey say they’ve launched 30% or fewer of their planned initiatives. So, it’s small wonder that two-thirds are ambivalent or dissatisfied with their own organization’s ability to capture AI’s gains." },
  ];

  const Numeric = [
    { value: 125, label: "Solutions Deployed" },
    { value: 50, label: "Customers served" },
    { value: 200, label: "Certified Developers" },
    { value: 15, label: "Years of Experience" },
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
        Title="A Proven Approach to Automation Success"
        cardDataSection4={cardDataSection4}
        DataSection4={DataSection4}
        technologyPartnerTitle={
                    <>
                        Automation with our{" "}
                        <span style={{ color: "#ed1651" }}>technology partners</span>
                    </>
                }
      />
      <ServicePageSection5 Title="Automation" />
      <Contactform />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

export async function getStaticProps() {
  const seo = await getSeoForPath("/services/automation-services");
  return { props: { seo } };
}

export default automationService;