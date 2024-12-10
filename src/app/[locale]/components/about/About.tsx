"use client";

import { useTranslations } from "next-intl";
import { FC, memo } from "react";

import styles from "./About.module.css";

const About: FC = () => {
  console.debug("[Render] 'About' Component");

  const t = useTranslations("about");

  return (
    <div className={styles["paragraphs"]}>
      <p className="paragraph">{t("paragraph1")}</p>
      <p className="paragraph">{t("paragraph2")}</p>
      <p className="paragraph">{t("paragraph3")}</p>
    </div>
  );
};

export default memo(About);
