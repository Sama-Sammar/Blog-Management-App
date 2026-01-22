import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

function Header() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const isArabic = i18n.language === "ar";
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>{t("blog")}</div>

      <input type="checkbox" id="menu-toggle" className={styles.toggle} />

      <label htmlFor="menu-toggle" className={styles.hamburger}>
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {t("home")}
        </NavLink>

        <NavLink
          to="/blog/new"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {t("addBlog")}
        </NavLink>

        <button
          type="button"
          className={styles.langBtn}
          onClick={toggleLang}
        >
          {i18n.language === "en" ? "AR" : "EN"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
