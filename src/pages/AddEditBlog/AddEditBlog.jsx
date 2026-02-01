import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./AddEditBlog.module.css";

import { addBlog, getBlogById, updateBlog } from "../../services/blogsService";

function AddEditBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const isEditMode = useMemo(
    () => location.pathname.includes("/edit"),
    [location.pathname]
  );

  const titlePattern = useMemo(() => {
    if (isArabic) return /^[\p{Script=Arabic}\s]+$/u;
    return /^[A-Za-z ]+$/;
  }, [isArabic]);

  const descPattern = useMemo(() => {
    if (isArabic) return /^[\p{Script=Arabic}\s]+$/u;
    return /^[A-Za-z ]+$/;
  }, [isArabic]);

  const schema = useMemo(() => {
    const titleSchema = yup
      .string()
      .required(t("validation.titleRequired"))
      .max(50, t("validation.titleMax"))
      .matches(
        titlePattern,
        isArabic ? t("validation.titlePatternAr") : t("validation.titlePatternEn")
      )
      .test(
        "trim-not-empty",
        t("validation.titleRequired"),
        (val) => !!val && val.trim().length > 0
      );

    const titleWithCapital = isArabic
      ? titleSchema
      : titleSchema.test(
        "capital-first-letter",
        t("validation.titleCapital"),
        (val) => (val ? /^[A-Z]/.test(val.trim()) : false)
      );

    const descSchema = yup
      .string()
      .required(t("validation.descRequired"))
      .max(1000, t("validation.descMax"))
      .matches(
        descPattern,
        isArabic ? t("validation.descPatternAr") : t("validation.descPatternEn")
      )
      .test(
        "trim-not-empty",
        t("validation.descRequired"),
        (val) => !!val && val.trim().length > 0
      );

    return yup.object({
      title: titleWithCapital,
      description: descSchema,
    });
  }, [t, isArabic, titlePattern, descPattern]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  const [loadingBlog, setLoadingBlog] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      reset({ title: "", description: "" });
      return;
    }

    loadBlog();
  }, [isEditMode, params.id, reset, location.search, navigate, i18n.language]);

  async function loadBlog() {
    setLoadingBlog(true);
    try {
      const blog = await getBlogById(params.id);

      if (!blog) {
        const page = new URLSearchParams(location.search).get("page") || "1";
        const lang = i18n.language.startsWith("ar") ? "ar" : "en";
        navigate(`/?lang=${lang}&page=${page}`, { replace: true });
        return;
      }

      reset({
        title: blog.title || "",
        description: blog.description || "",
      });
    } finally {
      setLoadingBlog(false);
    }
  }

  const onSubmit = async (data) => {
    const title = data.title.trim();
    const description = data.description.trim();
    const page = new URLSearchParams(location.search).get("page") || "1";
    const lang = i18n.language.startsWith("ar") ? "ar" : "en";

    if (isEditMode) {
      await updateBlog(params.id, { title, description, lang: i18n.language });
      navigate(`/?lang=${lang}&page=${page}`);
    } else {
      await addBlog({ title, description, lang: i18n.language });
      navigate(`/?lang=${lang}&page=1`);
    }
  };

  if (isEditMode && loadingBlog) {
    return (
      <main className={styles.container}>
        <p>{t("loadingBlogs")}</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">
            {t("title")}
          </label>
          <input
            id="title"
            className={styles.input}
            type="text"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            {t("description")}
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            rows={6}
            {...register("description")}
          />
          {errors.description?.message && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <button className={styles.submit} type="submit" disabled={!isValid}>
          {isEditMode ? t("edit") : t("add")}
        </button>
      </form>
    </main>
  );
}

export default AddEditBlog;
