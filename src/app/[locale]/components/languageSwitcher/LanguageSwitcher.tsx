"use client";

import { useLocale, useTranslations } from "next-intl";
import { FC, memo, useEffect, useRef, useState } from "react";
import { Locale } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/routing";

import { useBreakpointsContext } from "@/contexts/BreakpointsContext";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useOnKeyDown from "@/hooks/useOnKeyDown";
import { classNames } from "@/utils/classNames";

import { CheckIcon, DownArrowIcon, GlobeIcon } from "./Icons";

import styles from "./LanguageSwitcher.module.css";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

const LanguageSwitcher: FC<{ className?: string }> = ({ className }) => {
  console.debug("[Render] 'LanguageSwitcher' Component");

  const t = useTranslations("language-switcher");
  const [isOpen, setIsOpen] = useState(false);
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  const { isLg } = useBreakpointsContext();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const currentLanguage = languages.find((language) => language.code === locale);
  const currentLanguageCode = currentLanguage?.code;
  const currentLanguageLabel = currentLanguage?.label;

  const handleChange = (code: LanguageCode) => {
    code !== currentLanguageCode && router.push(pathname, { locale: code });

    setIsOpen(false);
  };

  useEffect(() => {
    isOpen && setIsOpen(false);

    // eslint-disable-next-line
  }, [isLg]);

  useOnClickOutside(languageSwitcherRef, () => isOpen && setIsOpen(false));
  useOnKeyDown(["Escape"], () => isOpen && setIsOpen(false));

  return (
    <div {...(className && { className })} ref={languageSwitcherRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="language-dropdown-menu"
        className={classNames(
          styles["menu-button"],
          "font-feature-custom",
          isOpen ? styles["menu-button--active"] : styles["menu-button--inactive"]
        )}
      >
        <GlobeIcon className={styles["globe-icon"]} aria-hidden="true" />
        <div className={styles["current-language-label"]}>{currentLanguageLabel}</div>
        <DownArrowIcon className={styles["down-arrow-icon"]} aria-hidden="true" />
        <span className="sr-only">{isOpen ? t("close") : t("open")}</span>
      </button>
      {isOpen && (
        <ul role="menu" id="language-dropdown-menu" className={styles["menu"]}>
          {languages.map((language) => (
            <li key={language.code} role="menuitem" className={styles["language-wrapper"]}>
              <button type="button" onClick={() => handleChange(language.code)} className={styles["language-button"]}>
                {language.code === currentLanguageCode ? (
                  <CheckIcon className={styles["check-icon"]} aria-hidden="true" />
                ) : (
                  <span className={styles["check-icon"]}></span>
                )}
                <span>{language.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(LanguageSwitcher);
