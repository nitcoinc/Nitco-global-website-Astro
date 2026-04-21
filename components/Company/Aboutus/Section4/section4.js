import React from 'react'
import styles from "./section4.module.css";
import Image from "next/image";
import Chandra_Yatagiri from "../../../../images/aboutus/Chandra_Yatagiri.jpg";
import Lance_Shealy from "../../../../images/aboutus/Lance_Shealy.jpg";
import Shailender_Pinnapureddy from "../../../../images/aboutus/Shailender_Pinnapureddy.jpg";
import Shakeel_Muhammed from "../../../../images/aboutus/Shakeel_Muhammed.png";
import Ashish_Kashyap from "../../../../images/aboutus/Ashish_Kashyap.jpg";
import Brian_Heck from "../../../../images/aboutus/Brian_Heck.jpg";

const Section4 = () => {
  return (
    <div className={styles.gradient}>
      <div className="container">
        <h2> Our Leadership Team</h2>
        <div className={styles.flexContainerSec5}>
          <div className={styles.leftSideSec5}>
            <img
              {...Chandra_Yatagiri}
              className="img-fluid profile-img"
              style={{ borderRadius: "15px" }}
              alt="College Recruiting"
            />
          </div>
          <div className={styles.rightSideSec5}>
            <p className={styles.name}>Chandra Yatagiri</p>
            <p className={styles.designation}>CEO & Co-founder</p>
            <p className={styles.leadersDescription}>
              Chandra, a co-founder of NITCO in 2008, has worked in the
              enterprise applications and services field since 1998. He is
              responsible for the company’s vision and business execution.
            </p>
          </div>
        </div>
        <div
          className={styles.flexContainerSec5}
          style={{ borderTop: "2px solid grey" }}
        >
          <div className={styles.leftSideSec5}>
            <img
              {...Shailender_Pinnapureddy}
              className="img-fluid profile-img"
              alt="College Recruiting"
              style={{ borderRadius: "15px" }}
            />
          </div>
          <div className={styles.rightSideSec5}>
            <p className={styles.name}>Shailender Pinnapureddy</p>
            <p className={styles.designation}>
              Managing Partner & Co-Founder
            </p>
            <p className={styles.leadersDescription}>
              Shailender co-founded NITCO in 2008. He has more than 20 years
              of experience in the IT industry designing and building IT
              infrastructure for enterprise applications.
            </p>
          </div>
        </div>
        <div
          className={styles.flexContainerSec5}
          style={{ borderTop: "2px solid grey" }}
        >
          <div className={styles.leftSideSec5}>
            <img
              {...Shakeel_Muhammed}
              className="img-fluid profile-img"
              alt="College Recruiting"
              style={{ borderRadius: "15px" }}
            />
          </div>
          <div className={styles.rightSideSec5}>
            <p className={styles.name}>Shakeel Muhammad, PhD</p>
            <p className={styles.designation}>
              Chief AI Strategy Officer
            </p>
            <p className={styles.leadersDescription}>
              Shakeel is an accomplished Technology Leader with 20+ years of
              experience working at Fortune 500 companies across multiple
              industries.
            </p>
          </div>
        </div>
         <div
            className={styles.flexContainerSec5}
            style={{ borderTop: "2px solid grey" }}
          >
            <div className={styles.leftSideSec5}>
              <img
                {...Ashish_Kashyap}
                className="img-fluid profile-img"
                alt="College Recruiting"
                style={{ borderRadius: "15px" }}
              />
            </div>
            <div className={styles.rightSideSec5}>
              <p className={styles.name}>Ashish Kashyap</p>
              <p className={styles.designation}>
                Chief AI & Data Officer
              </p>
              <p className={styles.leadersDescription}>
                Ashish Kashyap brings extensive experience in AI, analytics, and data platform modernization, with a strong focus on generative AI and agent-based solutions. He has led data and AI initiatives across industries, enabling organizations to move from experimentation to real-world AI impact. At NITCO, Ashish is responsible for shaping and operationalizing AI-driven transformation for clients.
              </p>
            </div>
          </div>
        <div
          className={styles.flexContainerSec5}
          style={{ borderTop: "2px solid grey" }}
        >
          <div className={styles.leftSideSec5}>
            <img
              {...Lance_Shealy}
              className="img-fluid profile-img"
              alt="College Recruiting"
              style={{ borderRadius: "15px" }}
            />
          </div>
          <div className={styles.rightSideSec5}>
            <p className={styles.name}>Lance Shealy</p>
            <p className={styles.designation}>
              Sales Director
            </p>
            <p className={styles.leadersDescription}>
              Lance has extensive business development experience including
              Product Sales, Consulting Sales, Software Product Management,
              and Management Consulting.
            </p>
          </div>
        </div>
        <div
          className={styles.flexContainerSec5}
          style={{ borderTop: "2px solid grey" }}
        >
          <div className={styles.leftSideSec5}>
            <img
              {...Brian_Heck}
              className="img-fluid profile-img"
              alt="College Recruiting"
              style={{ borderRadius: "15px" }}
            />
          </div>
          <div className={styles.rightSideSec5}>
            <p className={styles.name}>Brian Heck</p>
            <p className={styles.designation}>
              Business Development Manager
            </p>
            <p className={styles.leadersDescription}>
              Brian has a strong background in technology sales and consulting, specializing in integration, EDI, RPA, and AI. He partners with organizations to deliver practical solutions that create lasting business value.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section4