import { useRouter } from "next/router";
import styles from "./buttonArea.module.css"


const ButtonsListArea = ({ }) => {
  const router = useRouter();
  const pathname = router.asPath;

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.insightButtons}>
      <button
        className={`${styles.filterbtn} ${pathname === "/insights/blogs" ? styles.active : ""
          }`}
        onClick={() => handleClick("/insights/blogs")}
      >
        Blogs
      </button>

      <button
        className={`${styles.filterbtn} ${pathname === "/insights/whitepapers" ? styles.active : ""
          }`}
        onClick={() => handleClick("/insights/whitepapers")}
      >
        White Papers
      </button>

      <button
        className={`${styles.filterbtn} ${pathname === "/insights/explainer-videos" ? styles.active : ""
          }`}
        onClick={() => handleClick("/insights/explainer-videos")}
      >
        Explainer Videos
      </button>

      <button
        className={`${styles.filterbtn} ${pathname === "/insights/webinar" ? styles.active : ""
          }`}
        onClick={() => handleClick("/insights/webinar")}
      >
        Webinars
      </button>

      <button
        className={`${styles.filterbtn} ${pathname === "/insights/case-studies" ? styles.active : ""
          }`}
        onClick={() => handleClick("/insights/case-studies")}
      >
        Case Studies
      </button>
    </div>

  );
};
export default ButtonsListArea;
