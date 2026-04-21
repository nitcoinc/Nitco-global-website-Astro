import styles from "./contactform.module.css";

const Contactform = ({ title, heading }) => {
  return (
    <div className={styles.contactMain}>
      <h5 style={{ color: "#fff", fontSize: "24px" }}>
        {heading || "Together, we can drive AI-driven digital transformation."}
      </h5>

      <div className={styles.contBtn}>
        <button
          className={styles.contactButton}
          onClick={() => (window.location.href = "/contact")}
        >
          {title ? title : "Contact Us"}
        </button>
      </div>
    </div>
  );
};

export default Contactform;

