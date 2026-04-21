import { useState } from "react";
import styles from "./artificialIntelligencesection4.module.css";
const ArtificialIntelligencesection4 = ({
  DataSection4,
  cardDataSection4,
  Title,
  technologyPartnerTitle,
  partnerCardWidth,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className={styles.mainHead}>
      <div className="container">
        <h1 className={styles.heading}>{Title}</h1>
        <div className={styles.mainSection1}>
          <div className={styles.leftDescription}>
            {DataSection4.map((item, index) => (
              <div key={index}>
                <div
                  onMouseEnter={() => setActiveIndex(index)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    fontWeight: activeIndex !== index ? "normal" : "bold",
                    borderBottom:
                      activeIndex !== index ? "1px solid #ccc" : "none",
                    color: activeIndex !== index ? "#fff" : "#ed1651",
                    fontSize: "18px",
                  }}
                >
                  {item.Title}
                </div>
                {activeIndex === index && (
                  <div className={styles.description}>
                    <img
                      {...item.image}
                      alt="Placeholder Image"
                      height="400px"
                      width="90%"
                      className={styles.imageShow}
                    />
                    {item.Description}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.rightImage}>
            {DataSection4[activeIndex] && (
              <img
                {...DataSection4[activeIndex].image}
                alt="Placeholder Image"
                className={styles.imageDropDown}
              />
            )}
          </div>
        </div>
        <div>
          <h5 className={styles.technologyPartner}>
            {technologyPartnerTitle || (
              <>
                AI with our{" "}
                <span className={styles.highLightColor}>technology partners</span>
              </>
            )}
          </h5>
        </div>
        <div className={styles.cardgrid}>
          {cardDataSection4.map((card) => (
            <div className={styles.card} key={card.id}
             style={partnerCardWidth ? { maxWidth: partnerCardWidth, margin: "0 auto" } : {}}
            >
              <div className={styles.titleOverlay}>
                <h5 className={styles.cardTitle}>{card.title}</h5>
              </div>
              <div className={styles.imageContainer}>
                <img {...card.Image} alt="image" className={styles.cardImage} />
              </div>
              <div className={styles.cardText}>
                <p>{card.Description}</p>
                <p>
                  <a
                    id={card.title}
                    href={card.link}
                    target="_blank"
                    className={styles.exploreOther}
                  >
                    Explore <span className={styles.arrowShown}>❯</span>
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ArtificialIntelligencesection4;