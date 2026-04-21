import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import ArtificialSection1 from "../../components/Services/Section1/artificialSection1";
import ArtificialSection2 from "../../components/Services/section2/artificialSection2";
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"
import Azure from "../../images/services-image/Data/Azure-Data.webp";
import AWS from "../../images/services-image/Data/AWS-Data.webp";
import Advice from "../../images/services-image/Data/Advice-Data.webp";
import Deliver from "../../images/services-image/Data/Deliver_Data.webp";
import Discover from "../../images/services-image/Data/Discover-Data.webp";
import Evolve from "../../images/services-image/Data/Evolve-Data.webp";
import Google from "../../images/services-image/Data/Google-Data.webp";
import Manage from "../../images/services-image/Data/Manage_Data.webp";
import Banner from "../../images/services-image/Data/Banner1-Data.webp";
import Banner2 from "../../images/services-image/Data/Banner2-Data.webp";
import Banner3 from "../../images/services-image/Data/Banner3-Data.webp";
import DataIcon1 from "../../images/services-image/Icons/Data.gif";
import DataAnalysisIcon from "../../images/services-image/DataAnalysisIcon.svg";
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


const dataService = () => {
  const DataSection1 = {
    Icon: DataAnalysisIcon,
    Icon1: DataIcon1,
    Heading: "Data",
    Title: "Turn Data into Decisions. And Decisions into Impact",
    Description:
      "Your future is data-driven. We help you build that future with intelligent data platforms, solid governance, and AI-powered insights-turning every byte into business value.",
  };
  const DataSection3 = {
    Title:
      "We’ve helped organizations across industries transform how they manage, govern, and leverage data-building trusted data foundations that enable smarter decisions and sustained innovation.",
  };
  const expertiseAreas = [
    {
      title: " Engineering & Architecture",
      description:
        "We design and implement scalable, modern data architectures-on-prem, cloud, or hybrid. Whether it’s building real-time pipelines, data lakes, or warehouse solutions, we create the infrastructure that turns raw data into usable assets. ",
    },
    {
      title: "Management & Governance",
      description:
        "We establish policies, processes, and controls to ensure your data is accurate, secure, and compliant. From master data management to regulatory alignment, we help you build trust in your data at every level.",
    },
    {
      title: "Analytics & AI",
      description:
        "We bring your data to life through dashboards, advanced analytics, and machine learning. By combining BI with AI, we help you uncover patterns, predict outcomes, and make confident, data-driven decisions.",
    },
  ];
  const DataSection4 = [
    {
      Title: "Discover",
      Description:
        "We begin by evaluating your current data landscape-how it’s captured, stored, used, and governed. Through collaborative workshops and assessments, we uncover gaps, inefficiencies, and opportunities to align your data with business strategy.",
      image: Discover,
    },
    {
      Title: "Advise",
      image: Advice,
      Description:
        "We develop a data strategy tailored to your goals. Whether it’s modernizing architecture, improving governance, or enabling advanced analytics, we create a roadmap that prioritizes impact, security, and scalability.",
    },
    {
      Title: "Deliver",
      image: Deliver,
      Description:
        "We implement robust data solutions-from building modern data platforms and pipelines to deploying governance frameworks and analytics models. Our delivery approach is agile, transparent, and business-aligned.",
    },
    {
      Title: "Manage",
      image: Manage,
      Description:
        "We provide ongoing support and monitoring to ensure data quality, compliance, and performance. Whether managing metadata, access, or platform health, we keep your data environment optimized and reliable.",
    },
    {
      Title: "Evolve",
      image: Evolve,
      Description:
        "As your business and data grow, we continuously refine your systems-adding new capabilities, supporting cloud or hybrid transitions, and embedding AI and automation to keep you ahead of the curve.",
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
      title: "Google",
      Image: Google,
      link: "https://www.google.com/",
      Description:
        "We specialize in Kore.ai’s conversational AI platform to design, develop, and deploy powerful virtual assistants. From customer service to internal automation, we create human-like, context-aware experiences that deliver real business outcomes.",
    },
    {
      title: "Amazon Web Services (AWS)",
      Image: AWS,
      link: "https://aws.amazon.com/console/",
      Description:
        "We leverage AWS’s powerful suite of data services-such as Redshift, Glue, S3, and Athena-to build cloud-native data lakes, real-time pipelines, and scalable analytics platforms. Our solutions ensure agility, security, and high availability for mission-critical data workloads.",
    },
  ];
  const Section2 = [
    { id: 1, name: "Case Study", Id: "Data-CaseStudy", src: Banner, link: "case-studies/ai-powered-transcript-analytics-optimization", Title: "AI-Powered Transcript Analytics Optimization", Description: "The insurer had limited visibility into the value hidden within customer-service call transcripts. Many interactions included quoting requests or upsell cues that were neither captured nor routed effectively. Manual QA covered under 5% of calls, and agents lacked consistent scripting to act on these opportunities, resulting in lost revenue, missed upsells, and reduced retention." },
    { id: 2, name: "Blog", Id: "Data-Blog", src: Banner2, link: "blog/boomi-your-solution-to-the-m-and-a-data-marriage-problem", Title: "Harmonizing Data in Mergers and Acquisitions", Description: "Typically, companies merge or acquire other companies because they operate in the same market sector and hope to gain efficiencies and economies of scale by leveraging shared resources. By sharing overhead and serving the same number of total customers, the companies can reduce costs and become more profitable." },
    { id: 3, name: "White Paper", Id: "Data-WhitePaper", src: Banner3, link: "whitepapers/azure-data-integration-in-the-cloud", Title: "Azure Data Integration in the Cloud", Description: "Effective data analytics provides enormous business value for many organizations. As ever-greater amounts of diverse data become available, analytics can provide even more value. But to benefit from this change, your organization needs to embrace the new approaches to data analytics that cloud computing makes possible. \n Microsoft Azure provides a broad set of cloud technologies for data analysis, all designed to help you derive more value from your data." },
  ];
  const Numeric = [
    { value: 100, label: "Solutions Deployed" },
    { value: 45, label: "Customers served" },
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
        Title="Turning Data into a Competitive Advantage "
        cardDataSection4={cardDataSection4}
        DataSection4={DataSection4}
        technologyPartnerTitle={
                    <>
                        Data with our{" "}
                        <span style={{ color: "#ed1651" }}>technology partners</span>
                    </>
                }
      />
      <ServicePageSection5 Title="Data" />
      <Contactform />
      <Footer />
      <FooterDesignMobile />
    </Layout>
  );
};
export async function getStaticProps() {
  const seo = await getSeoForPath("/services/data-services");
  return { props: { seo } };
}
export default dataService;
