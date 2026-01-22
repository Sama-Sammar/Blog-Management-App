import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import router from "./configs/router-config";
import styles from "./components/Layout/Loader/Loader.module.css";

function RouterFallback() {
  const { t } = useTranslation();

  return (
    <div className={styles.backdrop}>
      <div className={styles.box}>
        <div className={styles.spinner} />
        <p className={styles.text}>{t("loadingBlogs")}</p>
      </div>
    </div>
  );
}

const App = () => {
  return <RouterProvider router={router} fallbackElement={<RouterFallback />} />;
};

export default App;
