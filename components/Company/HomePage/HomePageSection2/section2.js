import { useState } from "react";
import styles from "./section2.module.css";
import image1 from "../../../../images/services-image/AiImages/Deliver_AI.webp";
import AIIcon1 from "../../../../images/services-image/Icons/AI.gif";
import AIGIcon from "../../../../images/services-image/Aigimages/AI-Governance-Icon.gif";
import AIIcon2 from "../../../../images/services-image/Icons/Automation.gif";
import DataIcon1 from "../../../../images/services-image/Icons/Data.gif";
import Integration from "../../../../images/services-image/Icons/Intigration.gif";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

const Section2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div className={styles.sectionStart}>
      <div className="container">
        <div className={styles.main}>
          <h3 style={{ lineHeight: "40px", fontSize: "28px" }}>
            {" "}
            Technology that{" "}
            <span className={styles.colorChange}>
              listens, learns, and works
            </span>{" "}
            for you. At NITCO Inc., we blend innovation with intention-so every
            solution makes life better, not just faster.
          </h3>
        </div>

        <div className={styles.sectionSecond}>
          <div className={styles.leftImage}>
            <Image
              src={image1}
              alt="leftName"
              height={"auto"}
              width={"auto"}
              className={styles.imageSty}
            />
          </div>
          <div className={styles.rightside}>
            <h1 style={{ fontSize: "28px" }}>
              End-to-end <span style={{ color: "#ed1651" }}>service</span>
            </h1>
            <p className={styles.para}>
              From intelligent automation to enterprise data systems, NITCO Inc.
              delivers the full spectrum of services needed to modernize, scale
              and empower your business. We combine strategic thinking with deep
              technical expertise-building solutions that adapt, grow and drive
              impact long after implementation.
            </p>
            <button
              className={styles.button}
              onClick={() => (window.location.href = "/services")}
              id="Home-AllServicesPage"
            >
              Know More <MdKeyboardArrowRight className={styles.knowMoreArw} />
            </button>
            <div className={styles.serviceImages}>
              <div className={styles.iconsSec}>
                <Image
                  src={AIIcon1}
                  alt="Artificial"
                  className={styles.imageClass}
                />
                <p className={styles.textTitle}>AI</p>
              </div>
              <div className={styles.iconsSec}>
                <Image
                  src={AIGIcon}
                  alt="Governance"
                  className={styles.imageClass}
                />
                <p className={styles.textTitle}>AI Governance</p>
              </div>
              
              <div className={styles.iconsSec}>
                <Image
                  src={AIIcon2}
                  alt="Automation"
                  className={styles.imageClass}
                />
                <p className={styles.textTitle}>Automation</p>
              </div>
              <div className={styles.iconsSec}>
                <Image
                  src={Integration}
                  alt="Integration"
                  className={styles.imageClass}
                />
                <p className={styles.textTitle}>Integration</p>
              </div>
              <div className={styles.iconsSec}>
                <Image
                  src={DataIcon1}
                  alt="Data & Analytics"
                  className={styles.imageClass}
                />
                <p className={styles.textTitle}>Data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section2;
