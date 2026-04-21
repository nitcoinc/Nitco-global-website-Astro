import { useState, useEffect } from "react";
import styles from "./attificialSection2.module.css";
import { IoIosArrowDropright,IoIosArrowDropleft } from "react-icons/io";
const ArtificialSection2 = ({section2Data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, section2Data.length - 1));
    }
  };
  const handleNameClick = (index) => {
    setCurrentIndex(index);
  };
    const handleClick = (data) => {
      window.location.href = `/${data}`;
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === section2Data.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={styles.gallerywrapper}>
      <div className={styles.imagecontainer}>
        <div className={styles.backGroundSec2}>
          <div className={`${styles.namebuttons} container`}>
            {section2Data.map((image, index) => (
              <a
                key={image.id}
                onClick={() => handleNameClick(index)}
                className={index === currentIndex ? styles.selected : styles.headHover}
              >
                {image.name}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.slide}>
          <img
            {...section2Data[currentIndex].src}
            alt={section2Data[currentIndex].name}
            className={styles.mainimage}
          />
          <div className={styles.textOverlay}>
            <div className="container">
              <div className={styles.textOnIt}>
                <h1 className={styles.headErSec2}>
                  {section2Data[currentIndex].Title}
                </h1>
                <div
                className={styles.description}
  dangerouslySetInnerHTML={{
    __html: section2Data[currentIndex]?.Description?.replace(/\n/g, '<br />')
  }}
/>
                <button
                  className={styles.knowMoreBtn}
                  onClick={() => handleClick(section2Data[currentIndex].link)}
                  id={section2Data[currentIndex].Id}
                >
                  Know more <span className={styles.knowArrow}>❯</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.buttonOverlay}>
            <IoIosArrowDropleft
              className={styles.arrowBtn}
              onClick={() => handleArrowClick("left")}
              disabled={currentIndex === 0}
            />
            <IoIosArrowDropright
              className={styles.arrowBtn}
              onClick={() => handleArrowClick("right")}
              disabled={currentIndex === section2Data.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtificialSection2;