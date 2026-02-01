import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { setCookie } from "../../../utils/cookies";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLang = async () => {
    const newLang = i18n.language.startsWith("en") ? "ar" : "en";
    await i18n.changeLanguage(newLang);
    setCookie("lang", newLang);

    navigate("/");
  };

  useEffect(() => {
    const isArabic = i18n.language.startsWith("ar");
    document.documentElement.lang = isArabic ? "ar" : "en";
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

        <button type="button" className={styles.langBtn} onClick={toggleLang}>
          {i18n.language.startsWith("en") ? "AR" : "EN"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
