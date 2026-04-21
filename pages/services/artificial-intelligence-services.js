import dynamic from "next/dynamic";
import ArtificialSection1 from "../../components/Services/Section1/artificialSection1";
import Layout from "../../components/Layout";
import ArtificialSection2 from "../../components/Services/section2/artificialSection2";
import Azure from "../../images/services-image/AiImages/Azure.webp";
import AWS from "../../images/services-image/AiImages/AWS.webp";
import Deliver_AI from "../../images/services-image/AiImages/Deliver_AI.jpg";
import Advice_AI from "../../images/services-image/AiImages/Advice_AI.webp";
import Discover_AI from "../../images/services-image/AiImages/Discover_AI.webp";
import Evolve_AI from "../../images/services-image/AiImages/Evolve_AI.webp";
import Manage_AI from "../../images/services-image/AiImages/Manage_AI.webp";
import Kore from "../../images/services-image/AiImages/Kore.webp";
import AI_Icon from "../../images/services-image/AiImages/AI_Icon.svg";
import BannerImage from "../../images/services-image/AiImages/BannerImage_AI.webp";
import AIBanner02 from "../../images/services-image/AiImages/AIBanner02.webp";
import AIBanner03 from "../../images/services-image/AiImages/AIBanner03.webp";
import AIIcon1 from "../../images/services-image/Icons/AI.gif";
import { getSeoForPath } from "../../lib/fetchSeoData";
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"




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
const artificialIntelligence = () => {
  const DataSection1 = {
    Icon: AI_Icon,
    Icon1: AIIcon1,
    Heading: "Artificial Intelligence",
    Title: "Reimagine Possibility with Artificial Intelligence",
    Description:
      "Unlock the power of AI to transform how you operate, innovate, and grow. From machine learning and generative models to intelligent automation, we help organizations harness the full potential of artificial intelligence-with impact, at scale, and with a human touch.",
  };
  const section3Data = {
    Title:
      "We've empowered organizations to act swiftly and strategically, unlocking AI’s full potential through a holistic approach.",
  };
  const Numeric = [
    { value: 100, label: "Solutions Deployed" },
    { value: 45, label: "Customers served" },
    { value: 200, label: "Certified Developers" },
    { value: 10, label: "Years of Experience" },
  ];
  const expertiseAreas = [
    {
      title: "AI Strategy & Advisory",
      description:
        "We help organizations craft tailored AI strategies aligned with their business objectives.",
    },
    {
      title: "Conversational AI",
      description:
        "Designing intelligent user journeys with seamless, personalized conversational experiences across channels.",
    },
    {
      title: "Agentic AI",
      description:
        "Systems that dynamically adapt to changing goals and environments-enabling progress without constant human input.",
    },
    {
      title: "AI Governance",
      description:
        "We enable responsible AI adoption with governance frameworks that ensure transparency, compliance, data privacy, risk management, trust, and scalable innovation",
    },
  ];
  const DataSection4 = [
    {
      Title: "Discover",
      Description:
        "We begin by understanding your business goals, challenges, and systems. Through workshops and audits, we uncover high-impact opportunities where AI can create measurable value and set the foundation for intelligent transformation.",
      image: Discover_AI,
    },
    {
      Title: "Advise",
      image: Advice_AI,
      Description:
        "We turn discovery insights into a strategic, scalable roadmap-prioritizing high-impact use cases, defining success metrics, and recommending the right AI technologies. Working closely with your team, we ensure the plan aligns with your goals, resources, and long-term vision.",
    },
    {
      Title: "Deliver",
      image: Deliver_AI,
      Description:
        "We bring your strategic roadmap to life by developing and deploying scalable AI solutions tailored to your priorities. Working transparently and iteratively with your team, we ensure seamless integration, rapid delivery, and measurable business impact.",
    },
    {
      Title: "Manage",
      image: Manage_AI,
      Description:
        "We provide continuous monitoring and maintenance to ensure your AI solutions run smoothly. Our proactive approach detects issues early, optimizes performance, and keeps systems aligned with evolving business needs.",
    },
    {
      Title: "Evolve",
      image: Evolve_AI,
      Description:
        "We continuously refine and enhance your AI solutions-updating models, adding new features, and adapting to changing business needs-to ensure sustained value and keep you ahead in a fast-evolving landscape.",
    },
  ];
  const cardDataSection4 = [
    {
      title: "Microsoft Azure",
      Image: Azure,
      link: "https://azure.microsoft.com/en-us/",
      Description:
        "As a trusted Azure partner, we harness the full suite of Azure AI and cloud services to build intelligent, enterprise-grade solutions-driving agility, automation, and innovation across your organization.",
    },
    {
      title: "Kore.ai",
      Image: Kore,
      link: "https://kore.ai/",
      Description:
        "We specialize in Kore.ai’s conversational AI platform to design, develop, and deploy powerful virtual assistants. From customer service to internal automation, we create human-like, context-aware experiences that deliver real business outcomes.",
    },
    {
      title: "Amazon Web Services (AWS)",
      Image: AWS,
      link: "https://aws.amazon.com/console/",
      Description:
        "Leveraging the flexibility and breadth of AWS, we deploy AI and ML models that scale effortlessly. Our solutions integrate seamlessly with your cloud environment, enabling faster time-to-value and operational efficiency.",
    },
  ];
  const Section2 = [
    {
      id: 1,
      name: "Case Study",
      Id: "AI-CaseStudy",
      src: BannerImage,
      link: "case-studies/ai-driven-credentialing-automation-for-government",
      Title: "AI-Driven Credentialing Automation for Government",
      Description:
        "A U.S. government agency faced a mounting challenge: processing over 50,000 credentialing applications per month each containing a variety of document types (PDFs, JPEGs, PNGs) with sensitive, structured and unstructured data. The manual review of IDs, photos, background checks, and affidavits was time-consuming, error-prone, and posed compliance risks",
    },
    {
      id: 2,
      name: "Blog",
      Id: "AI-Blog",
      src: AIBanner02,
      link: "blog/conversational-AI-offers-big-business-benefits",
      Title: "Why Conversational AI Is More Than Just Chatbots",
      Description:
        "Whether you think conversational AI is the future of your organization and you need to jump headfirst into embracing the emerging technology, or you think conversational AI has virtually nothing to offer your business, you may be right! But you can't know for sure unless you have a solid grasp of what conversational AI is and what it isn't.",
    },
    {
      id: 3,
      name: "White Paper",
      Id: "AI-WhitePaper",
      src: AIBanner03,
      link: "whitepapers/generic-or-siloed-ai-and-strategic-gaps",
      Title: "Generic or siloed AI and strategic gaps?",
      Description:
        "While AI promises transformation, many point solutions fall short. They offer generic automation without the deep integration and customization your unique workflows demand. Crucially, they struggle with orchestrating complex enterprise-wide processes and lack the robust governance, security, and compliance controls essential for widespread, trusted adoption. This limited scope stifles true enterprise-wide impact.",
    },
  ];
  return (
    <Layout>
      <Navbar />
      <NavBarMobile />
      <ArtificialSection1 data={DataSection1} />
      <ArtificialSection2 section2Data={Section2} />
      <ArtificialInteligencesection3
        data={section3Data}
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
        Title="Our Blueprint for AI Success"
        cardDataSection4={cardDataSection4}
        DataSection4={DataSection4}
        technologyPartnerTitle={
                    <>
                        AI with our{" "}
                        <span style={{ color: "#ed1651" }}>technology partners</span>
                    </>
                }
      />
      <ServicePageSection5 Title="Artificial Intelligence" />
      <Contactform />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};

// ✅ Fetch SEO statically during build
export async function getStaticProps() {
  const seo = await getSeoForPath("/services/artificial-intelligence-services");
  return { props: { seo } };
}

export default artificialIntelligence;