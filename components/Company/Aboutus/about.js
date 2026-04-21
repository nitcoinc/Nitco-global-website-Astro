import AboutUsBanner from "../../../images/aboutus/AboutUsBanner.jpg";
import styles from "./about.module.css";
import Image from "next/image";
import Contactform from "../../Services/ContactForm/contactform";
import Section2 from "./Section2/section2";
import Section3 from "./Section3/section3";
import Section4 from "./Section4/section4";

const About = () => {
  return (
    <>
       <div className={styles.main}>     
      <div className={styles.pagebannerContainer}>
        <Image
          src={AboutUsBanner}
          alt="bannerImage"
          className={styles.pageBannerImg}
          priority
        />
        <div className={styles.pagebannerText}>

        <h1 className={styles.pagebannerdescription}>
            Meet the faces, values & vision behind NITCO Inc
          </h1>
        </div>
      </div>
      <Section2 />
      <Section3 />
      <Section4 />
      <Contactform title="Get In Touch" />
      </div>
    </>
  );
};
export default About;
