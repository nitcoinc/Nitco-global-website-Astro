import Image from "next/image";
import styles from "./section1.module.css";

const Section1 = () => {
  return (
    <div>
      <div   className={styles.VideoHead} >
  <video
    className={styles.backgroundImages}
    preload="auto"
    autoPlay
    loop
     muted
     playsInline
      // controls 
    width="100%"
  >
    <source src="/Home_Page_Video_1.mp4" type="video/mp4" />
   
  </video>
</div>
      <div className={styles.colorall}>
        <div style={{ flex: "1", backgroundColor: "#eb1c52" }}></div>
        <div style={{ flex: "1", backgroundColor: "#fcd600" }}></div>
        <div style={{ flex: "1", backgroundColor: "#5ac7dd" }}></div>
        <div style={{ flex: "1", backgroundColor: "#39b45a" }}></div>
      </div>
    </div>
  );
};
export default Section1;
