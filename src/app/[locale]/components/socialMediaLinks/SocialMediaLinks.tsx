"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FC, memo, MouseEvent, SVGProps, useRef, useState } from "react";

import { FacebookIcon, GitHubIcon, LinkedInIcon, XIcon } from "./Icons";

import styles from "./SocialMediaLinks.module.css";

interface SocialMediaLink {
  href: string;
  name: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  active: boolean;
}

const socialMediaLinks: SocialMediaLink[] = [
  { href: "https://www.linkedin.com/in/remyyannick/", name: "LinkedIn", Icon: LinkedInIcon, active: true },
  { href: "https://github.com/Yann-rem", name: "GitHub", Icon: GitHubIcon, active: true },
  { href: "#", name: "X", Icon: XIcon, active: false },
  { href: "#", name: "Facebook", Icon: FacebookIcon, active: false },
] as const;

const SocialMediaLinks: FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations("social-media-links");
  const [linkName, setLinkName] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  const handleInactiveLinkClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  const handleLinkTouchStart = (name: string) => {
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
      {socialMediaLinks.map(({ href, name, Icon, active }) => (
        <li key={name} className={styles["link-wrapper"]}>
          {active ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={styles["link"]} aria-label={name}>
              <div>
                <Icon className={styles["icon"]} aria-hidden="true" />
              </div>
            </a>
          ) : (
            <a
              href="#"
              role="button"
              onClick={handleInactiveLinkClick}
              onTouchStart={() => handleLinkTouchStart(name)}
              onMouseEnter={() => handleLinkMouseEnter(name)}
              onMouseLeave={handleLinkMouseLeave}
              className={styles["link"]}
              aria-label={`${name} (lien inactif)`}
              tabIndex={0}
            >
              <div>
                <Icon className={styles["icon"]} aria-hidden="true" />
              </div>
            </a>
          )}

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
