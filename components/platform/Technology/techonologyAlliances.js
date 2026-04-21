import React from "react";
import styles from "./technologyAlliances.module.css";
const TechonologyAlliances = () => {
  return (
    <div >
      <div className="container">
        <h2 className={styles.heading}>
          Our <span style={{ color: "#ED1651 !important" }}>Technology</span>{" "}
          Alliances
        </h2>
        <p className={styles.description}>
          We maintain elite-level partnerships with the industry's most trusted
          technology providers. This ecosystem allows us to architect and deploy
          powerful, integrated solutions tailored to your unique enterprise
          needs.
        </p>
      </div>

      <div className="container" style={{paddingTop:"30px",paddingBottom:"30px"}}>
        <h5 className={styles.subHeading}>Cloud & AI Platforms</h5>

        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <p className={styles.supSubHeading}>Amazon Web Services (AWS)</p>
            <p className={styles.description}>
              Leveraging the breadth of AWS, we deploy AI and machine learning
              models that scale effortlessly, enabling faster time-to-value and
              operational efficiency.
            </p>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <p className={styles.supSubHeading}>Microsoft Azure</p>
            <p className={styles.description}>
              As a trusted partner, we harness the full suite of Azure AI and
              cloud services to build intelligent, enterprise-grade solutions
              that drive agility and innovation.
            </p>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <p className={styles.supSubHeading}>IBM</p>
            <p className={styles.description}>
              Our collaboration with IBM allows us to manage high-volume data
              exchanges with speed and security, ensuring reliability in
              mission-critical environments.
            </p>
          </div>
        </div>
      </div>

      <div style={{backgroundColor:"#f3f3ff",paddingTop:"30px",paddingBottom:"30px"}}>
        <div className="container">
          <h5 className={styles.subHeading}>
            Integration & Automation Platforms
          </h5>

          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>Boom</p>
              <p className={styles.description}>
                {" "}
                As a certified partner, we use Boomi's low-code platform to
                connect applications, data, and people, simplifying complex
                architectures.
              </p>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>Celigo</p>
              <p className={styles.description}>
                We leverage Celigo's iPaaS to unify ERP, CRM, and e-commerce
                applications, ensuring data consistency and simplifying system
                architectures.
              </p>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>Workato</p>
              <p className={styles.description}>
                We utilize Workato’s intelligent automation platform to blend
                integration with workflow automation, enabling agile process
                automation across business and IT.
              </p>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>Jitterbit & Tray.io</p>
              <p className={styles.description}>
                Through these partnerships, we use low-code platforms to
                orchestrate cloud and on-premise workflows, maintaining data
                consistency and accelerating deployments.
              </p>
            </div>
          </div>
        </div>
      </div>
     
        <div className="container" style={{paddingTop:"30px",paddingBottom:"30px"}}>
          <h5 className={styles.subHeading}>Intelligent Automation & RPA</h5>

          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>UiPath</p>
              <p className={styles.description}>
                As a premier partner, we deliver enterprise-grade RPA solutions
                that are fast and flexible, automating complex processes with
                precision.
              </p>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>Blue Prism</p>
              <p className={styles.description}>
                We leverage Blue Prism’s secure and intelligent automation to
                build robust digital workforces ideal for highly regulated and
                mission-critical environments.
              </p>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <p className={styles.supSubHeading}>Microsoft Power Automate</p>
              <p className={styles.description}>
                We streamline workflows across the Microsoft stack and beyond,
                rapidly connecting systems and integrating AI within your
                existing environment.
              </p>
            </div>
          </div>
        </div>
      
      <div style={{backgroundColor:"#f3f3ff",paddingTop:"30px",paddingBottom:"60px"}}>
      <div className="container">
        <h5 className={styles.subHeading}>Conversational AI</h5>

        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <p className={styles.supSubHeading}>Kore.ai</p>
            <p className={styles.description}>
              We specialize in Kore.ai’s advanced platform to design and deploy
              powerful virtual assistants that deliver human-like, context-aware
              experiences.
            </p>
          </div>
            <div className="col-12 col-md-6 mb-4">
            <p className={styles.supSubHeading}>Enterprise AI Governance</p>
            <p className={styles.description}>
             A structured, end-to-end approach to assess, design, implement, and manage AI governance at enterprise scale.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TechonologyAlliances;
