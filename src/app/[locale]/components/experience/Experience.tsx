"use client";

import { useTranslations } from "next-intl";
import { FC, memo } from "react";

import { classNames } from "@/utils/classNames";

import { experienceItems } from "./experienceData";

import styles from "./Experience.module.css";

const Experience: FC = () => {
  console.debug("[Render] 'Experience' Component");

  const t = useTranslations("experience");

  return (
    <ol className="items">
      {experienceItems.map((item, index) => (
        <li key={index} className="item-wrapper">
          <div className="item-layout">
            <header className={classNames("item-date-range", "font-feature-custom")}>
              <time className="date-range">{t(item.dateRangeKey)}</time>
            </header>
            <div className="item-infos">
              <h2 className={classNames("item-title", "font-feature-custom")}>{t(item.titleKey)}</h2>
              <h3 className={classNames("item-organization", "font-feature-custom")}>{t(item.companyKey)}</h3>
              {item.descriptionKey && (
                <ul className={classNames(styles["item-descriptions"], styles["item-descriptions-list-style"])}>
                  {item.descriptionKey.map((desc, index) => (
                    <li key={index} className={styles["item-description"]}>
                      {t(desc)}
                    </li>
                  ))}
                </ul>
              )}
              {item.technologiesUsedKey && (
                <ul className={styles["item-technologies"]}>
                  {item.technologiesUsedKey.map((tech, index) => (
                    <li key={index} className={styles["item-technology-wrapper"]}>
                      <div className={styles["item-technology-badge"]}>{t(tech)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default memo(Experience);
