import React from "react";
import ReactMarkdown from "react-markdown";
import Banner_image from "../../images/services-image/ServicePage_banner_image.webp"
import Image from "next/image";
import styles from "./Section1/artificialSection1.module.css"
import { MdKeyboardArrowRight } from "react-icons/md";
import AIIcon1 from "../../images/services-image/Icons/AI.gif";
import AIGIcon from "../../images/services-image/Aigimages/AI-Governance-Icon.gif";
import AIIcon2 from "../../images/services-image/Icons/Automation.gif";
import DataIcon1 from "../../images/services-image/Icons/Data.gif";
import Integration from "../../images/services-image/Icons/Intigration.gif";
import Contactfrom from "./ContactForm/contactform"
const Services = () => {
    return (
        <>
            <div className={styles.pagebannerContainer}>
                <Image
                    src={Banner_image}
                    alt="bannerImage"
                    className={styles.pageBannerImg}
                />
                <div className={styles.pagebannerText}>
                    <h1 className={styles.pagebannerdescription}>
                        Transforming Enterprises with AI, Automation, Integration, and Data
                    </h1>
                </div>
            </div>
            <div className={styles.servicePagegradient}>
                <div className="container">
                    <h1 className={styles.section1heading}>
                        Explore our <span style={{ color: "#ed1651" }}>services</span>
                    </h1>
                    <div
                        className={styles.servicePagetwoSections}>
                        <div className={styles.servicePageServiceSection}>
                            <div className={styles.servicePageLeftSide}>
                                <Image
                                    src={AIIcon1}
                                    alt="Artificial"
                                    className={styles.servicePageimageClass}
                                /></div>
                            <div className={styles.servicePageRightSide}>
                                <h2 style={{ fontSize: "24px !important" }}>
                                    Reimagine Possibility
                                    with <br /><span style={{ color: "#ed1651", fontSize: "24px" }}>Artificial Intelligence</span>
                                </h2>
                                <p className={styles.servicePageExplanation}>Unlock the power of AI to transform how you
                                    operate, innovate, and grow. From machine
                                    learning and generative models to intelligent
                                    automation, we help organizations harness the
                                    full potential of artificial intelligence - with
                                    impact, at scale, and with a human touch.</p>
                                <button id="AllServices-AIservice" className={styles.servicePagebutton} onClick={() => (window.location.href = "/services/artificial-intelligence-services")}>Know More <MdKeyboardArrowRight className={styles.knowMoreArw} /></button>
                            </div>
                        </div>
                        <div className={styles.servicePageServiceSection}>
                            <div className={styles.servicePageLeftSide}>
                                <Image
                                    src={AIGIcon}
                                    alt="AI Governance"
                                    className={styles.servicePageimageClass}
                                />
                            </div>

                            <div className={styles.servicePageRightSide}>
                                <h2 style={{ fontSize: "24px !important" }}>
                                    Govern AI at Enterprise <br />
                                    <span style={{ color: "#ed1651", fontSize: "24px" }}>
                                         Scale with Confidence
                                    </span>
                                </h2>

                                <p className={styles.servicePageExplanation}>
                                    As AI adoption accelerates, unmanaged risk becomes a business liability. We enable organizations to build robust governance frameworks, implement platform-based controls, and continuously monitor AI systems, transforming compliance into a strategic advantage while unlocking safe, scalable innovation.
                                </p>

                                <button
                                    id="AllServices-AIGService"
                                    className={styles.servicePagebutton}
                                    onClick={() =>
                                        (window.location.href = "/services/artificial-intelligence-governance")
                                    }
                                >
                                    Know More <MdKeyboardArrowRight className={styles.knowMoreArw} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.servicePagetwoSections1}>
                        <div className={styles.servicePageServiceSection}>
                            <div className={styles.servicePageLeftSide}>
                                <Image
                                    src={AIIcon2}
                                    alt="Artificial"
                                    className={styles.servicePageimageClass}
                                /></div>
                            <div className={styles.servicePageRightSide}>
                                <h2 style={{ fontSize: "24px !important" }}>
                                    Automate Smarter. <br /><span style={{ color: "#ed1651", fontSize: "24px" }}>Scale Faster</span>
                                </h2>
                                <p className={styles.servicePageExplanation}>We turn time-consuming processes into seamless
                                    workflows that save time, reduce cost, and scale
                                    with your business. Whether it's RPA, AI-driven
                                    automation, or autonomous agents, we make it
                                    work-fast and reliably.</p>
                                <button id="AllServices-AutomationService" className={styles.servicePagebutton} onClick={() => (window.location.href = "/services/automation-services")}>Know More <MdKeyboardArrowRight className={styles.knowMoreArw} /></button>
                            </div>
                        </div>
                        <div className={styles.servicePageServiceSection}>
                            <div className={styles.servicePageLeftSide}>
                                <Image
                                    src={Integration}
                                    alt="Artificial"
                                    className={styles.servicePageimageClass}
                                /></div>
                            <div className={styles.servicePageRightSide}>
                                <h2 style={{ fontSize: "24px !important" }}>
                                    Modern Integration for a
                                    <br /><span style={{ color: "#ed1651", fontSize: "24px" }}>Connected Enterprise</span>
                                </h2>
                                <p className={styles.servicePageExplanation}> We help you move from data silos to data
                                    synergy. With modern EDI, enterprise-wide
                                    integrations, and API-first architectures, we
                                    turn your systems into a connected, intelligent
                                    foundation for innovation and growth.</p>
                                <button id="AllServices-IntegrationService" className={styles.servicePagebutton} onClick={() => (window.location.href = "/services/integration-services")}>Know More <MdKeyboardArrowRight className={styles.knowMoreArw} /></button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.servicePagetwoSections1}>
                        <div className={styles.servicePageServiceSection}>
                            <div className={styles.servicePageLeftSide}>
                                <Image
                                    src={DataIcon1}
                                    alt="Artificial"
                                    className={styles.servicePageimageClass}
                                /></div>
                            <div className={styles.servicePageRightSide}>
                                <h2 style={{ fontSize: "24px !important" }}>
                                    Turn Data into Decisions.
                                    And Decisions into Impact </h2>
                                <p className={styles.servicePageExplanation}>Your future is data-driven. We help you build that
                                    future with intelligent data platforms, solid
                                    governance, and AI-powered insights-turning
                                    every byte into business value.</p>
                                <button id="AllServices-DataService" className={styles.servicePagebutton} onClick={() => (window.location.href = "/services/data-services")}>Know More <MdKeyboardArrowRight className={styles.knowMoreArw} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Contactfrom title="Get In Touch" />
        </>
    );
};
export default Services;