import Slider from "react-slick";
import { useRef, useState } from "react";
import Image from "next/image";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./section4.module.css";
import GlobalFreightLogisticsProvider from "../../../../images/HomePage/GlobalFreightLogisticsProvider.svg";
import GlobalFoodandBeverageLeader from "../../../../images/HomePage/GlobalFoodandBeverageLeader.svg";
import GlobalEnergyCompany from "../../../../images/HomePage/GlobalEnergyCompany.svg";
import CruiseHospitalityandWellness from "../../../../images/HomePage/CruiseHospitalityandWellness.svg";
import GlobalChemicalManufacturer  from "../../../../images/HomePage/GlobalChemicalManufacturer.svg"
import IndustrialEquipmentandMaterialHandlingCompany from "../../../../images/HomePage/IndustrialEquipmentandMaterialHandlingCompany.svg";
import LeadingBuildingMaterialsProvider from "../../../../images/HomePage/LeadingBuildingMaterialsProvider.svg";
import PropertyManagementCompany from "../../../../images/HomePage/PropertyManagementCompany.svg";
import Quotes from "../../../../images/HomePage/Quotes.svg";
const Section4 = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.25,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    ltr: true,
    centerMode: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const Clients = [
    {
      image: IndustrialEquipmentandMaterialHandlingCompany,
      Words:
        "NITCO did a tremendous job leading the integration and preparing us for go live. Their deep product knowledge, responsiveness, and commitment including weekend support were critical to the success of this highly visible implementation. This milestone will significantly improve our order to cash process and is a key reason we continue to partner with NITCO.",
      Designation: "Director of IT",
      Company: "Industrial Equipment and Material Handling Company",
    },
    {
      image: GlobalFreightLogisticsProvider,
      Words:
        "NITCO integrated our ERP and TMS platforms and automated our shipment workflows. We reduced manual effort, improved accuracy and now process global shipments faster than ever before.",
      Designation: "Sr. Director of Enterprise Applications",
      Company: "Global Freight & Logistics Provider",
    },
    {
      image: GlobalFoodandBeverageLeader,
      Words:
        "What used to be a tedious, error-prone process is now fully automated. RPA and document intelligence transformed how we handle high-volume invoices-faster cycles, fewer mistakes and real-time insights.",
      Designation: "Finance Manager",
      Company: "Global Food & Beverage Leader",
    },
    {
      image: GlobalEnergyCompany,
      Words:
        "Their team helped us turn raw operational data into real insights. With tailored models and custom solutions, we’ve improved forecasting, reduced downtime and made faster, data-backed decisions.",
      Designation: "Program Manager",
      Company: "Global Energy Company",
    },
    {
      image: GlobalChemicalManufacturer,
      Words:
        "Repetitive tasks that once slowed us down now run hands-free. With automation in place, our teams focus more on operations and less on paperwork.",
      Designation: "Automation Manager",
      Company: "Global Chemicals Manufacturer",
    },
    {
      image: LeadingBuildingMaterialsProvider,
      Words:
        "We brought together data from multiple systems into a single, reliable view. Integration simplified reporting, improved accuracy and gave our teams a clearer picture of performance across the business.",
      Designation: "IT Manager",
      Company: "Leading Building Materials Provider",
    },
    {
      image: PropertyManagementCompany,
      Words:
        "The virtual assistant made resident support available 24/7. It answers questions, handles requests and creates a more responsive, connected experience for our communities.",
      Designation: "Sr Manager",
      Company: "Property Management Company",
    },
    {
      image: CruiseHospitalityandWellness,
      Words:
        "Our virtual assistant transformed onboard operations-streamlining staff tasks, handling requests and saving time across voyages. It’s like having a digital crew member that never sleeps.",
      Designation: "Manager",
      Company: "Cruise Hospitality & Wellness",
    },
  ];
  return (
    <div style={{ backgroundColor: "#25247B" }}>
      <div className={`${styles.exploreMain} container`}>
        <div className={styles.heading}>
          <h1 style={{ fontSize: "28px", color: "#fff" }}>
            Trusted by{" "}
            <span style={{ color: "#ed1651" }}>Industry Leaders</span>
          </h1>
        </div>
        <div className={styles.secDesc}>
          <div className={styles.ourClient}>
            <Image src={Quotes} alt="Quotes" className={styles.quoteImage} />
            <h4 className={styles.leftSide}>
              What Our <br />
              Clients Are Saying
            </h4>
            <div className={styles.bothButtons}>
              <IoIosArrowDropleft
                onClick={() => sliderRef.current?.slickPrev()}
                className={styles.arrowButtonStyle}
              />
              <IoIosArrowDropright
                onClick={() => sliderRef.current?.slickNext()}
                className={styles.arrowButtonStyle}
              />
            </div>
          </div>
          <div dir="rtl" className={styles.sliderMain}>
            <Slider ref={sliderRef} {...settings}>
              {Clients.map((img, idx) => (
                <div key={idx} style={{ margin: "5px" }}>
                  <div className={styles.slideItem}>
                    <Image
                      src={img.image}
                      alt="icons"
                      style={{
                        height: "60px",
                        width: "80px",
                        marginBottom: "40px",
                      }}
                    />
                    <p className={styles.titleService}>{img.Words}</p>
                    <p className={styles.imageDescriptioStyle}>
                      {img.Designation},
                    </p>
                    <p className={styles.company}>{img.Company}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section4;
