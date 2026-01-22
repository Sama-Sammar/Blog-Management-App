import { useTranslation } from "react-i18next";
import { resetBlogsStorage } from "../../../utils/blogsStorage";
import styles from "./Footer.module.css";

function Footer() {
  const { t } = useTranslation();

  const handleReset = () => {
    resetBlogsStorage();
    window.location.href = "/";
  };

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; 2025 — <a href="#">LinkedIn</a>
      </p>

      <button type="button" className={styles.resetBtn} onClick={handleReset}>
        {t("reset")}
      </button>
    </footer>
  );
}

export default Footer;
