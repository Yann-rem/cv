"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FC, memo, MouseEvent, SVGProps, TouchEvent, useRef, useState } from "react";

import { FacebookIcon, GitHubIcon, LinkedInIcon, XIcon } from "./Icons";

import styles from "./SocialMediaLinks.module.css";

interface SocialMediaLink {
  href: string;
  name: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

const socialMediaLinks: SocialMediaLink[] = [
  { href: "#!", name: "LinkedIn", Icon: LinkedInIcon },
  { href: "#!", name: "GitHub", Icon: GitHubIcon },
  { href: "#!", name: "X", Icon: XIcon },
  { href: "#!", name: "Facebook", Icon: FacebookIcon },
] as const;

const SocialMediaLinks: FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations("social-media-links");
  const [linkName, setLinkName] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  const handleLinkClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  const handleLinkTouchStart = (event: TouchEvent, name: string) => {
    event.preventDefault();

    setLinkName(name);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setLinkName("");

      timerRef.current = null;
    }, 2000);
  };

  const handleLinkMouseEnter = (name: string) => {
    setLinkName(name);
  };

  const handleLinkMouseLeave = () => {
    setLinkName("");
  };

  return (
    <ul {...(className && { className })}>
      {socialMediaLinks.map(({ href, name, Icon }) => (
        <li key={name} className={styles["link-wrapper"]}>
          <Link
            href={href}
            onClick={(event) => handleLinkClick(event)}
            onTouchStart={(event) => handleLinkTouchStart(event, name)}
            onMouseEnter={() => handleLinkMouseEnter(name)}
            onMouseLeave={handleLinkMouseLeave}
            className={styles["link"]}
            aria-label={t("aria_label", { name })}
            aria-disabled="true"
          >
            <div>
              <Icon className={styles["icon"]} aria-hidden="true" />
            </div>
          </Link>
          <AnimatePresence>
            {linkName === name && (
              <motion.div
                initial={{ y: "-140%", opacity: 0 }}
                animate={{ y: "-120%", opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
                className={styles["tooltip"]}
              >
                <span className={styles["tooltip-arrow"]}></span>
                {t("aria_label", { name })}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default memo(SocialMediaLinks);
