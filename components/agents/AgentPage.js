import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./AgentPage.module.css";
import Banner_image from "../../images/agent-images/BannerImage.webp";
import SelectIcon from "../../images/agent-images/Select.svg";
import ConfigureIcon from "../../images/agent-images/Configure.svg";
import OperateIcon from "../../images/agent-images/Operate.svg";
import Contactfrom from "../Services/ContactForm/contactform";



const AgentPage = () => {

  const [activeTab, setActiveTab] = useState("all");
  const [openAgentUrl, setOpenAgentUrl] = useState(null);

  useEffect(() => {
    const handler = (event) => {

      const allowedOrigins = [
        "https://dqa.agents.nitcoinc.com",
        "https://askyourdata.nitco.io",
        "https://dma-ops.nitcoinc.ai"
      ];

      if (!allowedOrigins.includes(event.origin)) return;
      if (!event.data || !event.data.event) return;

      window.dataLayer = window.dataLayer || [];

      switch (event.data.event) {

        case "agent_page_view":
          window.dataLayer.push({
            event: "agent_page_view",
            agent: event.data.agent,
            path: event.data.path,
            full_url: event.data.full_url
          });
          break;

        case "agent_interaction":
          window.dataLayer.push({
            event: "agent_interaction",
            agent: event.data.agent,
            action: event.data.action,
            label: event.data.label || ""
          });
          break;

        case "agent_loaded":
          window.dataLayer.push({
            event: "agent_loaded",
            agent: event.data.agent
          });
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const agents = [
    {
      id: 1,
      title: "Data Quality Monitoring",
      shortTitle: "Data Quality Monitoring",
      desc: "An agent for governed data quality scoring, trends, and root-cause insights.",
      category: "data",
      featured: true,
      url: "https://dqa-agent.nitcoinc.com/",
      videoUrl: "https://player.vimeo.com/video/1157300947",
    },
    {
      id: 2,
      title: "Ask Your Data",
      shortTitle: "Ask Your Data",
      desc: "An agent for natural language data exploration that generates SQL, visualizes insights, and explains query logic.",
      category: "data",
      featured: true,
      url: "https://ayd-agent.nitcoinc.com/",
      videoUrl: "https://player.vimeo.com/video/1172175850",
    },
    {
      id: 3,
      title: "Intelligent Document Mapping Agent",
      shortTitle: "Intelligent Document Mapping Agent",
      desc: "An intelligent agent that extracts, maps, and standardizes data from documents, helping teams streamline workflows and improve data accuracy.",
      category: "data",
      featured: true,
      url: "https://dma-ops.nitcoinc.ai/",
      videoUrl: "https://player.vimeo.com/video/1180817877?h=5ce79c97a0",
    },
  ];

  const featuredAgents = agents.filter((a) => a.featured).slice(0, 2);

  const filteredAgents =
    activeTab === "all"
      ? agents
      : agents.filter((a) => a.category === activeTab);

  const exploreAgentsRef = useRef(null);

  return (
    <>
      {/* HERO */}
      <div className={styles.pagebannerContainer}>
        <Image
          src={Banner_image}
          alt="bannerImage"
          className={styles.pageBannerImg}
          priority
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerLeft}>
            <h2 className={styles.agentpagebannerdescription}>
              Operate AI Agents at Enterprise Scale
            </h2>
            <p className={styles.bannerSubText}>
              Centralized visibility, governance, and execution for
              production-ready AI agents that drive real business outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* SECOND BLOCK */}
      <section ref={exploreAgentsRef} className={styles.secondBlock}>

        <h3 className={styles.highDemandTitle}>
          High Demand <span>Agents</span>
        </h3>

        <div className={styles.featureGrid}>
          {featuredAgents.map((agent) => (
            <div key={agent.id} className={styles.featureCard}>
              <h2 className={styles.cardTitle}>
                {agent.shortTitle.split(" ")[0]} <br />
                <span>
                  {agent.shortTitle.split(" ").slice(1).join(" ")}
                </span>
              </h2>

              <p>{agent.desc}</p>

              {agent.url && (
                <div className={styles.buttonGroup}>

                  <button
                    className={styles.knowMoreBtn}
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        event: "agent_opened",
                        agent_name: agent.title,
                        agent_url: agent.url
                      });

                      setOpenAgentUrl(agent.url);
                    }}
                  >
                    Explore
                  </button>

                  {agent.videoUrl && (
                    <button
                      className={styles.watchVideoBtn}
                      onClick={() =>
                        setOpenAgentUrl(
                          agent.videoUrl.includes("?")
                            ? `${agent.videoUrl}&autoplay=1&muted=1`
                            : `${agent.videoUrl}?autoplay=1&muted=1`
                        )
                      }
                    >
                      Watch Video
                    </button>
                  )}

                  <a
                    href="https://nitcoinc.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={styles.talkExpertBtn}>
                      Talk to an Expert
                    </button>
                  </a>

                </div>
              )}
            </div>
          ))}
        </div>

        {/* EXPLORE AGENTS */}
        <h3 className={styles.exploreTitle}>
          Explore Our <span>AI Agents</span>
        </h3>

        <p className={styles.exploreSubText}>
          Production-ready AI agents designed for governed,
          enterprise-scale execution
        </p>

        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {["all", "data"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ""
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" ? "All Agents" : "Data"}
              </button>
            ))}
          </div>
          <div className={styles.tabsDivider} />
        </div>

        <div className={styles.agentGrid}>
          {filteredAgents.map((agent) => (
            <div key={agent.id} className={styles.agentCard}>
              <h4>{agent.title}</h4>
              <p>{agent.desc}</p>

              {agent.url && (
                <div className={styles.buttonGroupDark}>

                  {/* Explore */}
                  <button
                    className={styles.exploreBtnSmall}
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        event: "agent_opened",
                        agent_name: agent.title,
                        agent_url: agent.url
                      });

                      setOpenAgentUrl(agent.url);
                    }}
                  >
                    Explore
                  </button>

                  {/* Watch Video */}
                  {agent.videoUrl && (
                    <button
                      className={styles.watchVideoBtnDark}
                      onClick={() =>
                        setOpenAgentUrl(
                          agent.videoUrl.includes("?")
                            ? `${agent.videoUrl}&autoplay=1&muted=1`
                            : `${agent.videoUrl}?autoplay=1&muted=1`
                        )
                      }
                    >
                      Watch Video
                    </button>
                  )}

                  {/* Talk to Expert */}
                  <a
                    href="https://nitcoinc.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={styles.talkExpertBtnDark}>
                      Talk to an Expert
                    </button>
                  </a>

                </div>
              )}

            </div>
          ))}
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className={styles.exploreAgents}>
        <div className={styles.howItWorks}>
          <h3 className={styles.howTitle}>
            How Agent Command Center <span>Works</span>
          </h3>

          <p className={styles.howSubText}>
            From configuration to execution, managing AI agents through a
            single governed control layer.
          </p>

          <div className={styles.stepsWrapper}>

            <div className={styles.stepRow}>
              <div className={styles.iconCircle}>
                <Image src={SelectIcon} alt="Select" />
              </div>
              <div className={styles.stepContent}>
                <h4>Select</h4>
                <span className={styles.stepSubTitle}>
                  Identify the right AI agents
                </span>
                <p>
                  Define objectives and select production-ready AI agents.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.iconCircle}>
                <Image src={ConfigureIcon} alt="Configure" />
              </div>
              <div className={styles.stepContent}>
                <h4>Configure</h4>
                <span className={styles.stepSubTitle}>
                  Apply governance & controls
                </span>
                <p>
                  Configure rules, workflows, and guardrails.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.iconCircle}>
                <Image src={OperateIcon} alt="Operate" />
              </div>
              <div className={styles.stepContent}>
                <h4>Operate</h4>
                <span className={styles.stepSubTitle}>
                  Run and scale
                </span>
                <p>
                  Execute AI agents with real-time visibility.
                </p>
              </div>
            </div>

          </div>

          <div className={styles.ctaRow}>
            <button
              className={styles.primaryCta}
              onClick={() =>
                exploreAgentsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              Start Automating Now &gt;
            </button>
          </div>

        </div>
      </section>

      <Contactfrom
        title="Get In Touch"
        heading="Let us collaborate and co-create the future of AI-driven operations."
      />

      {/* MODAL POPUP */}

      {openAgentUrl && (
        <div
          className={styles.modalOverlay}
          onClick={() => setOpenAgentUrl(null)} // close on outside click
        >
          <div
            className={
              openAgentUrl.includes("vimeo")
                ? styles.videoModalContent
                : styles.agentModalContent
            }
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <button
              className={styles.closeModal}
              onClick={() => {
                window.dataLayer.push({
                  event: "agent_closed",
                  agent_url: openAgentUrl
                });

                setOpenAgentUrl(null);
              }}
            >
              ✕
            </button>

            <div className={styles.iframeWrapper}>
              <iframe
                src={openAgentUrl}
                className={styles.agentIframe}
                allow="autoplay; fullscreen"
                onLoad={() => {
                  window.dataLayer.push({
                    event: "iframe_loaded",
                    url: openAgentUrl
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default AgentPage;