"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FC, memo, MouseEvent, SVGProps } from "react";

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

const handleLinkClick = (event: MouseEvent) => {
  event.preventDefault();
};

const SocialMediaLinks: FC<{ className?: string }> = ({ className }) => {
  console.debug("[Render] 'SocialMediaLinks' Component");

  const t = useTranslations("social-media-links");

  return (
    <ul {...(className && { className })}>
      {socialMediaLinks.map(({ href, name, Icon }) => (
        <li key={name}>
          <Link
            href={href}
            onClick={handleLinkClick}
            className={styles["link"]}
            aria-label={t("aria_label", { name })}
            title={t("aria_label", { name })}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              <Icon className={styles["icon"]} aria-hidden="true" />
            </motion.div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(SocialMediaLinks);
