import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages }) {
  const location = useLocation();
  const { t } = useTranslation();

  const makeTo = (page) => {
    const params = new URLSearchParams(location.search);
    if (!params.get("lang")) params.set("lang", "en");
    params.set("page", String(page));
    return `/?${params.toString()}`;
  };

  const prevTo = makeTo(Math.max(1, currentPage - 1));
  const nextTo = makeTo(Math.min(totalPages, currentPage + 1));

  return (
    <div className={styles.pagination}>
      {currentPage === 1 ? (
        <button type="button" className={styles.btn} disabled>
          {t("prev")}
        </button>
      ) : (
        <Link to={prevTo} className={styles.btn}>
          {t("prev")}
        </Link>
      )}

      <span className={styles.info}>
        {t("pageOf", { current: currentPage, total: totalPages })}
      </span>

      {currentPage === totalPages ? (
        <button type="button" className={styles.btn} disabled>
          {t("next")}
        </button>
      ) : (
        <Link to={nextTo} className={styles.btn}>
          {t("next")}
        </Link>
      )}
    </div>
  );
}

export default Pagination;
