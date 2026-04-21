import React from 'react'
import styles from "./section3.module.css"
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Westandfor1 from "../../../../images/aboutus/Westandfor1.svg";
import Westandfor2 from "../../../../images/aboutus/Westandfor2.svg";
import Westandfor3 from "../../../../images/aboutus/Westandfor3.svg";



const StatCard = ({ value, label, inView, refCallback }) => (
  <div className={styles.card}>
    <h1 ref={refCallback} className={styles.title}>
      {inView ? <CountUp end={value} duration={3} separator="," /> : 0}+
    </h1>
    <p className={styles.description}>{label}</p>
  </div>
);
const Section3 = () => {
  const Numeric = [
    { value: 150, label: "Employees" },
    { value: 15, label: "Years of Experience" },
    { value: 100, label: "Enterprise Solutions" },
  ];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  return (
    <div
      style={{
        backgroundColor: "#25247b",
        paddingBottom: "80px",
        color: "#fff !important",
        paddingTop: "40px",
      }}
    >
      <div className={`container ${styles.flexContainer}`}>
        <h2 className={styles.leftSection}>Why NITCO Inc.</h2>
        <div className={styles.rightSection}>
          {Numeric.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              inView={inView}
              refCallback={ref}
            />
          ))}
        </div>
      </div>


      <div className={`container ${styles.flexContainer}`}>
        <h2 className={styles.leftSection}>What We Stand For</h2>
        <div className={styles.rightSection} >
          <div className={styles.wwsfCard}>
            <Image
              src={Westandfor1}
              className={styles.wwsfImage}
              alt="Customer-focused technology solutions"
            />
            <p style={{ fontSize: "15px", paddingTop: "15px" }}>
              Customer-focused and <br />
              customer-driven technology <br />
              solutions through <br />
              collaboration.
            </p>
          </div>
          <div className={styles.wwsfCard}>
            <Image
              src={Westandfor2}
              className={styles.wwsfImage}
              alt="Research and development"
            />
            <p style={{ fontSize: "15px", paddingTop: "15px" }}>
              Research and develop <br />
              next-generation <br />
              technologies.
            </p>
          </div>
          <div className={styles.wwsfCard}>
            <Image
              src={Westandfor3}
              className={styles.wwsfImage}
              alt="Employee development"
            />
            <p style={{ fontSize: "15px", paddingTop: "15px" }}>
              Foster employees with <br />
              technology, diversity, <br />
              creativity, and integrity.
            </p>
          </div>
        </div>
      </div>



      <div className={`container ${styles.flexContainerSec4}`}>
        <h2 className={styles.leftSideSec4}>Our Goal</h2>
        <div className={styles.rightSideSec4}>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            We provide the vision and experience...
          </span>
          <p style={{ fontSize: "15px" }}>
            to match your business needs to a customer-driven technical
            solution that powers your success. Our expertise within a wide
            range of organizational and technical domains, such as RPA, AI,
            ML, and Cloud services, just to name a few, means that we are
            adept at creating solutions that provide value quickly where our
            clients need it most.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Section3