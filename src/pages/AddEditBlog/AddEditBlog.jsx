import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const submitText = isEditMode ? t("edit") : t("add");

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
          {submitText}
        </button>
      </form>
    </main>
  );
}

export default AddEditBlog;
