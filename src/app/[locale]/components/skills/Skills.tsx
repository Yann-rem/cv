"use client";

import { useTranslations } from "next-intl";
import { FC, memo } from "react";

import { classNames } from "@/utils/classNames";

import { skillsItems } from "./skillsData";

import styles from "./Skills.module.css";

const Skills: FC = () => {
  console.debug("[Render] 'Skills' Component");

  const t = useTranslations("skills");

  return (
    <div className={styles["items"]}>
      {skillsItems.map((item, index) => (
        <div key={index}>
          <h2 className={classNames(styles["item-subtitle"], "font-feature-custom")}>{t(item.titleKey)}</h2>
          <p className="paragraph">{t(item.listKey)}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(Skills);
