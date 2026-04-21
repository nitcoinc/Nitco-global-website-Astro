import styles from "./artificialinteligencesection3.module.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatCard = ({ value, label, inView, refCallback }) => (
  <div className={styles.card}>
    <h1 ref={refCallback} className={styles.title}>
      {inView ? <CountUp end={value} duration={3} separator="," /> : 0}+
    </h1>
    <p className={styles.description}>{label}</p>
  </div>
);
const ExpertiseBlock = ({ title, description }) => (
  <div className={styles.infoBlock}>
    <h6 className={styles.subHeading}>{title}</h6>
    <p className={styles.subDescription}>{description}</p>
  </div>
);
const ArtificialInteligencesection3 = ({data,expertiseAreas,Title,Numeric}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  return (
    <div className={styles.gradient}>
      <div className={`${styles.mainHead} container`}>
        <h5 className={styles.headingSect2}>{data.Title}</h5>
        <div className={styles.cardsMain}>
          {Numeric.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              inView={inView}
              refCallback={ref}
            />
          ))}
        </div>
        <div className={styles.expertiseData}>
          <h1 className={styles.headingSect2}>
            {Title}
          </h1>
          <div className={styles.responsiveContainer}>
            {expertiseAreas.map((area, index) => (
               <div className={styles.expertiseBlock} key={index}>
              <ExpertiseBlock
                key={index}
                title={area.title}
                description={area.description}
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArtificialInteligencesection3;
