import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

function Header() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const toggleLang = async () => {
    const newLang = i18n.language.startsWith("en") ? "ar" : "en";
    await i18n.changeLanguage(newLang);

    const params = new URLSearchParams(location.search);
    params.set("lang", newLang);
    params.set("page", "1");

    navigate(`/?${params.toString()}`);
  };

  useEffect(() => {
    const isArabic = i18n.language.startsWith("ar");
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [i18n.language]);

  const baseParams = new URLSearchParams(location.search);
  if (!baseParams.get("lang")) {
    baseParams.set("lang", i18n.language.startsWith("ar") ? "ar" : "en");
  }

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
          to={{ pathname: "/", search: baseParams.toString() }}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {t("home")}
        </NavLink>

        <NavLink
          to={{ pathname: "/blog/new", search: baseParams.toString() }}
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
