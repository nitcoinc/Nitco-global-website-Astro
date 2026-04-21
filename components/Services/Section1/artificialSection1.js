import { useState } from "react";
import styles from "./artificialSection1.module.css";
import Image from "next/image";
const ArtificialSection1 = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div className={`container ${styles.header} `}>
      <div className={styles.headerLeft}>
        <Image
          src={isHovered ? data.Icon1 : data.Icon}
          alt="Hoverable"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.imgHeaderLeft}
          priority={false}
        />
        <h1 className={styles.headerLeftTitle}>{data.Heading}</h1>
      </div>
      <div className={styles.headerRight}>
        <h5 style={{ fontSize: "28px", color: "#25247b" }}>{data.Title}</h5>
        <p className={styles.headerRightText}>{data.Description}</p>
      </div>
    </div>
  );
};
export default ArtificialSection1;
