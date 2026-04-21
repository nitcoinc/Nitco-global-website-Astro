import React from "react";
import styles from "./platformPage.module.css";
import Banner_image from "../../images/platform/PlatformBannerImage.webp";
import Image from "next/image";
const PlatformPage = () => {
  return (
    <div>
<div className={styles.pagebannerContainer}>
                <Image
                    src={Banner_image}
                    alt="bannerImage"
                    className={styles.pageBannerImg}
                    priority
                />
                <div className={styles.pagebannerText}>
                 <h1 className={styles.pagebannerdescription}>
                     Powered by World-Class Platforms
                    </h1>
                </div>
            </div>

    </div>
  );
};
export default PlatformPage;
