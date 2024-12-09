"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { classNames } from "@/utils/classNames";

import styles from "./NotFound.module.css";

const NotFoundPage = () => {
  console.debug("[Render] 'NotFoundPage' Component");

  const t = useTranslations("not-found-page");

  return (
    <div className={styles["container"]}>
      <h1 className={classNames(styles["status"], "font-feature-custom")}>{t("status")}</h1>
      <h2 className={classNames(styles["title"], "font-feature-custom")}>{t("title")}</h2>
      <p className={styles["description"]}>{t("description")}</p>
      <Link href="/" className={styles["link"]}>
        {t("back_to_home")}
      </Link>
    </div>
  );
};

export default NotFoundPage;
