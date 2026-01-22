import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./Loader.module.css";

function Loader() {
  const loading = useSelector((state) => state.loader.loading);
  const { t } = useTranslation();

  if (!loading) return null;

  return (
  <div className={styles.backdrop}>
    <div className={styles.box}>
      <div className={styles.spinner} />
      <p className={styles.text}>{t("loadingBlogs")}</p>
    </div>
  </div>
);
}

export default Loader;
