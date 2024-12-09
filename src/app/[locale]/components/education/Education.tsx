"use client";

import { useTranslations } from "next-intl";
import { FC, memo } from "react";

import { classNames } from "@/utils/classNames";

import { educationItems } from "./educationData";

const Education: FC = () => {
  console.debug("[Render] 'Education' Component");

  const t = useTranslations("education");

  return (
    <ol className="items">
      {educationItems.map((item, index) => (
        <li key={index} className="item-wrapper">
          <div className="item-layout">
            <header className={classNames("item-date-range", "font-feature-custom")}>
              <time className="date-range">{t(item.dateRangeKey)}</time>
            </header>
            <div className="item-infos">
              <h2 className={classNames("item-title", "font-feature-custom")}>{t(item.titleKey)}</h2>
              <h3 className={classNames("item-organization", "font-feature-custom")}>{t(item.schoolKey)}</h3>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default memo(Education);
