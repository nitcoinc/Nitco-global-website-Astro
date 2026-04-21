import Slider from "react-slick";
import { useRef, useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./servicePageSection5.module.css";
import otherService1 from "../../../images/services-image/otherService1.webp";
import otherService2 from "../../../images/services-image/otherService2.webp";
import otherService3 from "../../../images/services-image/otherService3.webp";
import otherService4 from "../../../images/services-image/otherService4.webp";
import otherService5 from "../../../images/services-image/other-services-ai-governance.webp";
const ServicePageSection5 = ({ Title }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heading, setHeading] = useState(Title);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1.15,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    ltr: true,
    centerMode: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const images = [
    {
      Image: otherService2,
      Name: "Data",
      link: "/services/data-services",
      Description:
        "Your future is data-driven. We help you build that future with intelligent data platforms, solid governance, and AI-powered insights-turning every byte into business value.",
    },
    {
      Image: otherService3,
      Name: "Integration",
      link: "/services/integration-services",
      Description:
        "We help you move from data silos to data synergy. With modern EDI, enterprise-wide integrations, and API-first architectures, we turn your systems into a connected, intelligent foundation for innovation and growth.",
    },
    {
      Image: otherService1,
      Name: "Automation",
      link: "/services/automation-services",
      Description:
        "We turn time-consuming processes into seamless workflows that save time, reduce cost, and scale with your business. Whether it's RPA, AI-driven automation, or autonomous agents, we make it work-fast and reliably.",
    },
    {
      Image: otherService4,
      Name: "Artificial Intelligence",
      link: "/services/artificial-intelligence-services",
      Description:
        "Unlock the power of AI to transform how you operate, innovate, and grow. From machine learning and generative models to intelligent automation, we help organizations harness the full potential of artificial intelligence - with impact, at scale, and with a human touch.",
    },
    {
      Image: otherService5,
      Name: "AI Governance",
      link: "/services/artificial-intelligence-governance",
      Description:
        "Build trust, manage risk, and scale AI responsibly with enterprise-grade governance frameworks and monitoring.",
    },
  ];
  const FilteredData = images.filter((img) => img.Name !== heading);
  return (
    <div className={`${styles.exploreMain} container`}>
      <h1 className={styles.heading}>
        Explore <span className={styles.otherService}>Other Services</span>
      </h1>
      <div className={styles.sliderStart}>
        <div dir="rtl" className={styles.sliderMain}>
          <Slider ref={sliderRef} {...settings}>
            {images
              .filter((img) => img.Name !== heading)
              .map((img, idx) => (
                <div key={idx}>
                  <div className={styles.slideItem}>
                    <div className={styles.imageMain}>
                      <img
                        {...img.Image}
                        alt={`slide-${idx}`}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.ImageTitleandDescription}>
                      <div>
                        <h6 className={styles.titleService}>{img.Name}</h6>
                        <p className={styles.imageDescriptioStyle}>
                          {img.Description.slice(0, 180) + "..." + " "}
                          <a
                            id={`${heading}Service-${img.Name}service`}
                            href={img.link}
                            className={styles.knowMoreButton}
                          >
                            Know More
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div className={styles.bothButtons}>
          <IoIosArrowDropleft
            onClick={() => sliderRef.current?.slickPrev()}
            className={styles.arrowButtonStyle}
          />
          <span className={styles.pagination}>
            {currentSlide + 1} / {FilteredData.length}
          </span>
          <IoIosArrowDropright
            onClick={() => sliderRef.current?.slickNext()}
            className={styles.arrowButtonStyle}
          />
        </div>
      </div>
    </div>
  );
};
export default ServicePageSection5;
