import React from "react";
import Image from "next/image";
import styles from "./platformPage.module.css";
import aws from "../../images/platform/Awsplatform.webp";
import Automation from "../../images/platform/automationAnywhereplatform.webp";
import Blueprism from "../../images/platform/blueprismplatform.webp";
import BoomiPlatform from "../../images/platform/BoomiPlatform.webp";
import CeligoPlatform from "../../images/platform/CeligoPlatform.webp";
import IBMplatfome from "../../images/platform/IBMplatfome.webp";
import jitterbitplatform from "../../images/platform/jitterbitplatform.webp";
import korePlatform from "../../images/platform/korePlatform.webp";
import MicroSoftPlatform from "../../images/platform/MicroSoftPlatform.webp";
import trayplatform from "../../images/platform/trayplatform.webp";
import uipath from "../../images/platform/uipathplatform.webp";
import workatopPlatform from "../../images/platform/workatoPlatform.webp";
import SaidotPlatform from "../../images/platform/saidot-platform.webp";


const Powerplatform = () => {
    const Keyimages = [{ Image: aws },
    { Image: IBMplatfome }, { Image: MicroSoftPlatform },
    { Image: BoomiPlatform }, { Image: CeligoPlatform },
    { Image: workatopPlatform }, { Image: trayplatform },
    { Image: jitterbitplatform }, { Image: uipath }, { Image: korePlatform },
    { Image: Blueprism }, { Image: Automation }, { Image: SaidotPlatform }
    ]
    return (
        <div className={styles.sectionStart}>
            <div className="container">
                <h1 className={styles.heading}>
                    Powered by <span style={{ color: "#ED1651 !important" }}>Platforms</span>
                </h1>
                <p className={styles.powerdescription}> We work alongside a diverse network of global technology partners to co-create solutions that are scalable,
                    secure, and future-focused. These collaborations enable us to deliver smarter systems, faster outcomes, and
                    greater value for every client.</p>


                <div className={styles.imageGrid}>
                    {Keyimages.map((src, index) => (
                        <Image key={index} src={src.Image} alt={src.Image} />
                    ))}
                </div>
            </div>
        </div>)
}
export default Powerplatform;