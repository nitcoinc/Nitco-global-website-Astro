import dynamic from "next/dynamic";
import ArtificialSection1 from "../../components/Services/Section1/artificialSection1";
import Layout from "../../components/Layout";
import ArtificialSection2 from "../../components/Services/section2/artificialSection2";
import Navbar from '../../components/Navbar/Navbar';
import NavBarMobile from "../../components/Navbar/NavBarMobile/navBarMobile"

import AIG_Icon from "../../images/services-image/Aigimages/ai-governance-icon.svg";
import AIGGiff from "../../images/services-image/Aigimages/AI-Governance-Icon.gif";

import BannerImage from "../../images/services-image/AiImages/BannerImage_AI.webp";
import AIBanner02 from "../../images/services-image/AiImages/AIBanner02.webp";
import AIBanner03 from "../../images/services-image/AiImages/AIBanner03.webp";

import Assess from "../../images/services-image/Aigimages/assess.webp";
import Design from "../../images/services-image/Aigimages/design.webp";
import Implement from "../../images/services-image/Aigimages/implement.webp";
import Manage from "../../images/services-image/Aigimages/manage.webp";
import Evolve from "../../images/services-image/Aigimages/evolve.webp";
import SaidotAi from "../../images/services-image/Aigimages/saidot-ai.webp";
import Azure from "../../images/services-image/AiImages/Azure.webp";

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
const aigovernance = () => {
    const DataSection1 = {
        Icon: AIG_Icon,
        Icon1: AIGGiff,
        Heading: "Enterprise AI Governance",
        Title: "Govern AI at Enterprise Scale with Confidence",
        Description:
            "As AI adoption accelerates, unmanaged risk becomes a business liability. We enable organizations to build robust governance frameworks, implement platform-based controls, and continuously monitor AI systems, transforming compliance into a strategic advantage while unlocking safe, scalable innovation.",
    };
    const section3Data = {
        Title:
            "Drive trust, reduce risk, and scale AI with confidence across your organization..",
    };
    const Numeric = [
        { value: 100, label: "Solutions Deployed" },
        { value: 45, label: "Customers served" },
        { value: 200, label: "Certified Developers" },
        { value: 10, label: "Years of Experience" },
    ];
    const expertiseAreas = [
        {
            title: "Complete Visibility & Control ",
            description:
                "Gain a centralized view of all AI systems, models, and agents eliminating shadow AI and ensuring full accountability.",
        },
        {
            title: "Regulatory Confidence",
            description:
                "Stay aligned with evolving regulations such as EU AI Act, NIST AI RMF, and industry standards, reducing compliance risk and audit exposure.",
        },
        {
            title: "Proactive Risk Management",
            description:
                "Identify and mitigate risks early from bias and hallucinations to data leakage and model drift before they impact your business. ",
        },
        {
            title: "Operational Governance at Scale ",
            description:
                "Embed governance into your AI lifecycle with automated controls, approval workflows, and real-time monitoring.",
        },
        {
            title: "Executive Transparency",
            description:
                "Enable leadership with clear dashboards, risk heatmaps, and board-level reporting for informed decision-making.",
        },
        {
            title: "Continuous Adaptation",
            description:
                "Evolve your governance program as AI technologies, regulations, and business priorities change without slowing innovation.",
        },
    ];
    const DataSection4 = [
        {
            Title: "Assess",
            image: Assess,
            Description:
                "We evaluate your AI landscape to identify risks, assess governance maturity, and define a clear roadmap for compliance and control.",
        },
        {
            Title: "Design",
            image: Design,
            Description:
                "We establish governance frameworks, policies, and operating models that ensure accountability, transparency, and responsible AI adoption.",
        },
        {
            Title: "Implement",
            image: Implement,
            Description:
                "We deploy and integrate governance platforms and controls to operationalize oversight across AI systems and workflows.",
        },
        {
            Title: "Manage",
            image: Manage,
            Description:
                "We continuously monitor and optimize your governance program to ensure ongoing compliance, risk mitigation, and sustained performance.",
        },
        {
            Title: "Evolve",
            image: Evolve,
            Description:
                "We continuously refine and enhance your governance program adapting to new risks, regulations, and business needs to ensure long-term value.",
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
            title: "Saidot.ai",
            Image: SaidotAi,
            link: "https://www.saidot.ai/",
            Description:
                "Saidot is SaaS platform for AI governance, easy to start, efficient to maintain, and powered by a knowledge graph and automatically inherited governance data.",
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
                Title="Business Outcomes of Enterprise AI Governance"
                Numeric={Numeric}
            />
            <ArtificialIntelligencesection4
                Title="How We Deliver Enterprise AI Governance"
                cardDataSection4={cardDataSection4}
                DataSection4={DataSection4}
                partnerCardWidth="490px"
                technologyPartnerTitle={
                    <>
                        AI Governance{" "}
                        <span style={{ color: "#ed1651" }}>technology partners</span>
                    </>
                }
            />
            <ServicePageSection5 Title="AI Governance" />
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

export default aigovernance;