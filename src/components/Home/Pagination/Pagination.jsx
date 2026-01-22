import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const goToPage = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };

  const handlePrev = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.btn}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {t("prev")}
      </button>

      <span className={styles.info}>
        {t("pageOf", { current: currentPage, total: totalPages })}
      </span>

      <button
        type="button"
        className={styles.btn}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {t("next")}
      </button>
    </div>
  );
}

export default Pagination;
