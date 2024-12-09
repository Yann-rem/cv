"use client";

import { useTranslations } from "next-intl";
import { FC, memo, ReactNode } from "react";

import styles from "./Footer.module.css";

const Footer: FC<{ className?: string }> = ({ className }) => {
  console.debug("[Render] 'Footer' Component");

  const t = useTranslations("footer");

  const components = {
    nextjs: (chunks: ReactNode) => (
      <a
        href="https://nextjs.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["external-link"]}
        aria-label={t("aria-label", { name: t("frameworks.next_js") })}
      >
        {chunks}
      </a>
    ),
    vercel: (chunks: ReactNode) => (
      <a
        href="https://vercel.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["external-link"]}
        aria-label={t("aria-label", { name: t("frameworks.vercel") })}
      >
        {chunks}
      </a>
    ),
  };

  return (
    <nav {...(className && { className })} aria-label="footer">
      <p className={styles["paragraph"]}>{t.rich("paragraph", components)}</p>
    </nav>
  );
};

export default memo(Footer);
