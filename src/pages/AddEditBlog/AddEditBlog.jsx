import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useLocation, useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./AddEditBlog.module.css";

function AddEditBlog() {
  const location = useLocation();
  const submit = useSubmit();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  let loaderData = null;
  try {
    loaderData = useLoaderData();
  } catch {
    loaderData = null;
  }

  const blog = loaderData?.blog || null;

  const isEditMode = useMemo(
    () => location.pathname.includes("/edit"),
    [location.pathname]
  );

  const pageTitle = isEditMode ? t("editBlog") : t("addBlog");
  const submitText = isEditMode ? t("edit") : t("add");

  const titlePattern = useMemo(() => {
    if (isArabic) return /^[\p{Script=Arabic}\s]+$/u;
    return /^[A-Za-z ]+$/;
  }, [isArabic]);

  const descPattern = useMemo(() => {
    if (isArabic) return /^[\p{Script=Arabic}\s]+$/u;
    return /^[A-Za-z ]+$/;
  }, [isArabic]);

  const titleRules = useMemo(() => {
    const base = {
      required: t("validation.titleRequired"),
      maxLength: { value: 50, message: t("validation.titleMax") },
      pattern: {
        value: titlePattern,
        message: isArabic
          ? t("validation.titlePatternAr")
          : t("validation.titlePatternEn"),
      },
    };

    if (!isArabic) {
      base.validate = {
        capitalFirstLetter: (value) =>
          /^[A-Z]/.test(value) || t("validation.titleCapital"),
      };
    }

    return base;
  }, [t, isArabic, titlePattern]);

  const descriptionRules = useMemo(
    () => ({
      required: t("validation.descRequired"),
      maxLength: { value: 1000, message: t("validation.descMax") },
      pattern: {
        value: descPattern,
        message: isArabic
          ? t("validation.descPatternAr")
          : t("validation.descPatternEn"),
      },
    }),
    [t, isArabic, descPattern]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title || "",
        description: blog.description || "",
      });
    } else {
      reset({ title: "", description: "" });
    }
  }, [blog, reset]);

  const onSubmit = (data) => {
    const fd = new FormData();
    fd.append("title", data.title.trim());
    fd.append("description", data.description.trim());

    submit(fd, {
      method: "post",
      action: `${location.pathname}${location.search}`,
    });
  };

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
            {...register("title", titleRules)}
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
            {...register("description", descriptionRules)}
          />
          {errors.description?.message && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <button className={styles.submit} type="submit" disabled={!isValid}>
          {submitText}
        </button>
      </form>
    </main>
  );
}

export default AddEditBlog;
