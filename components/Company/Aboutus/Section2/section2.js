import React from 'react'
import styles from "./section2.module.css";
import Storyimage1 from "../../../../images/aboutus/storyimage-1.jpg";
import Image from "next/image";
const Section2 = () => {
  return (
     <div className={styles.gradient}>
        <div className="container">
          <div className={styles.storyContainer}>
            <div className={styles.storyLeft}>
              <h2 style={{ color: "#2a2070" }}>Our Story</h2>
              <p className={styles.para1}>
                NITCO is a technology company, headquartered in Houston, Texas
                with a global footprint. Our team of certified developers and
                engineers has expertise in Robotic Process Automation (RPA),
                Artificial Intelligence (AI), Machine Learning (ML), Natural
                Language Processing (NLP), Cloud Services, Application
                Development and Integration, Infrastructure design, and
                implementation.
              </p>
              <p className={styles.para2}>
                The foundation of our leadership team is technical expertise
                with diverse industries, a winning combination that keeps us
                focused on our client's success throughout their digital
                transformation. Our goal is to bring the latest technology
                solutions to our clients through uncomplicated integrations that
                provide value quickly. Bringing further success to our clients
                motivates us to provide outstanding service and innovative
                solutions to business and technology problems. Our company was
                founded with the steadfast vision of aligning our clients'
                organization and technology goals. NITCO is continuously
                innovating to exceed client expectations!
              </p>
            </div>
            <div className={styles.storyRight}>
              <img {...Storyimage1} alt="Our Story" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Section2