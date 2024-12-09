import { useTranslations } from "next-intl";
import { FC, memo } from "react";

import { classNames } from "@/utils/classNames";

import styles from "./Profile.module.css";

const Profile: FC<{ className?: string }> = ({ className }) => {
  console.debug("[Render] 'Profile' Component");

  const t = useTranslations("profile");

  return (
    <div {...(className && { className })}>
      <h1 className={classNames(styles["title"], "font-feature-custom")}>
        {t("name")}
        <span className={styles["title-dot"]}>.</span>
      </h1>
      <h2 className={classNames(styles["subtitle"], "font-feature-custom")}>{t("job_title")}</h2>
    </div>
  );
};

export default memo(Profile);
