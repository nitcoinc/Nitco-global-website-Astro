import { useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./section3.module.css";
import Automation from "../../../../images/HomePage/automationHomePlatform.webp";
import AWS from "../../../../images/HomePage/awsHomePlatform.webp";
import Blueprism from "../../../../images/HomePage/BlueprismHomePlatform.webp";
import Boomi from "../../../../images/HomePage/BoomiHomePlatform.webp";
import Celigo from "../../../../images/HomePage/CeligoHomePlatform.webp";
import IBM from "../../../../images/HomePage/IBMHomePlatform.webp";
import Jitter from "../../../../images/HomePage/JitterHomePlatform.webp";
import Kore from "../../../../images/HomePage/KoreHomePlatform.webp";
import MicroSoft from "../../../../images/HomePage/MicroSoftHomePlatform.webp";
import Tray from "../../../../images/HomePage/TrayHomePlatform.webp";
import UI from "../../../../images/HomePage/UIHomePlatform.webp";
import Workato from "../../../../images/HomePage/WorkatoHomePlatform.webp";
import Saidot from "../../../../images/HomePage/saidot-home.png";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";



const Section3 = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    ltr: true,
    centerMode: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const partners = [
    { image: AWS },
    { image: Automation},
    { image: Blueprism },
    { image: Boomi },
    { image: Celigo },
    { image: Saidot },
    { image: IBM },
    { image: Jitter, className: "jitter" },
    { image: Kore },
    { image: MicroSoft },
    { image: Tray }, 
    { image: UI },
    { image: Workato },
  
  ];
  return (
    <div className={styles.backgroundImg}>
      <div className={`container ${styles.main}`}>
        <h1 className={styles.heading}>
          Powered by <span style={{ color: "#ed1651" }}>Platforms</span>
        </h1>
        <p className={styles.paragraph}>
          We work alongside a diverse network of global technology partners to
          co-create solutions that are scalable, secure and future-focused.
          These collaborations enable us to deliver smarter systems, faster
          outcomes and greater value for every client.
        </p>
        <div dir="rtl" className={styles.sliderMain}>
          <Slider ref={sliderRef} {...settings}>
            {partners.map((img, idx) => (
              <div className={styles.logoWrapper}>
                <Image
                  src={img.image}
                  alt="platform logo"
                  fill
                  className={`${styles.logo} ${img.className ? styles[img.className] : ""}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <button
          className={styles.button}
          onClick={() => (window.location.href = "platform")}
          id="Home-Platform"
        >
          View All <MdKeyboardArrowRight className={styles.knowMoreArw} />
        </button>
      </div>
    </div>
  );
};
export default Section3;
