"use client";

import { AnimationSequence, motion, stagger, useAnimate } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";

import { useActiveLinkIndexContext } from "@/contexts/ActiveLinkIndexContext";
import { useBreakpointsContext } from "@/contexts/BreakpointsContext";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import { classNames } from "@/utils/classNames";
import { debounce } from "@/utils/debounce";

import { Logo, MenuIcon } from "./Icons";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import Profile from "../profile/Profile";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";

import styles from "./Navbar.module.css";

const navLinks: { href: string; nameKey: string }[] = [
  { href: "#about", nameKey: "nav_links.about" },
  { href: "#skills", nameKey: "nav_links.skills" },
  { href: "#experience", nameKey: "nav_links.experience" },
  { href: "#education", nameKey: "nav_links.education" },
  { href: "#contact", nameKey: "nav_links.contact" },
] as const;

const Navbar: FC<{ className?: string }> = ({ className }) => {
  console.debug("[Render] 'Navbar' Component");

  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [navMarkerPositionY, setNavMarkerPositionY] = useState<number | null>(null);
  const navLinkRefs = useRef<HTMLLIElement[]>([]);
  const { activeLinkIndex } = useActiveLinkIndexContext();
  const { isLg } = useBreakpointsContext();
  const [scope, animate] = useAnimate();

  const handleLogoLinkClick = (event: MouseEvent) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
    });

    if (isOpen) setIsOpen(false);
  };

  const handleNavLinkClick = () => {
    if (!isLg) setIsOpen(false);
  };

  useEffect(() => {
    const updateNavMarkerPosition = () => {
      if (navLinkRefs.current[activeLinkIndex] && isLg) {
        const { offsetTop, offsetHeight } = navLinkRefs.current[activeLinkIndex];
        const navMarkerHeight = 8;

        setNavMarkerPositionY(offsetTop + offsetHeight / 2 - navMarkerHeight / 2);
      } else {
        setNavMarkerPositionY(null);
      }
    };

    const debouncedUpdateNavMarkerPosition = debounce(updateNavMarkerPosition, 200);

    updateNavMarkerPosition();

    window.addEventListener("resize", debouncedUpdateNavMarkerPosition);

    return () => {
      window.removeEventListener("resize", debouncedUpdateNavMarkerPosition);
    };
  }, [activeLinkIndex, isLg]);

  useEffect(() => {
    if (isLg && isOpen) setIsOpen(false);

    // eslint-disable-next-line
  }, [isLg]);

  useUpdateEffect(() => {
    const menuToggleAnimation: AnimationSequence = [
      [
        `.${styles["menu-icon"]} .top-line`,
        { d: isOpen ? "M 5.636039 18.363961 L 18.363961 5.636039" : "M 3 5.293 L 21 5.293" },
        { type: "spring", stiffness: 400, damping: 20 },
      ],
      [`.${styles["menu-icon"]} .middle-line`, { opacity: isOpen ? 0 : 1 }, { ease: "linear", duration: 0.1, at: "<" }],
      [
        `.${styles["menu-icon"]} .bottom-line`,
        { d: isOpen ? "M 5.636039 5.636039 L 18.363961 18.363961" : "M 3 18.707 L 21 18.707" },
        { type: "spring", stiffness: 400, damping: 20, at: "<" },
      ],
    ];

    const navLinksAnimation: AnimationSequence = isOpen
      ? [
          [
            `.${styles["nav-link"]}`,
            { scale: [0.5, 1], opacity: [0, 1] },
            { ease: "easeOut", duration: 0.2, delay: stagger(0.1) },
          ],
        ]
      : [];

    animate([...menuToggleAnimation, ...navLinksAnimation]);
  }, [isOpen]);

  return (
    <nav {...(className && { className })} ref={scope}>
      <div className={styles["container"]}>
        <Link href="#" onClick={handleLogoLinkClick} className={styles["logo-link"]}>
          <Logo className={styles["logo"]} aria-hidden="true" />
          <span className="sr-only">{t("back_to_top")}</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={styles["toggle"]}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon className={styles["menu-icon"]} aria-hidden="true" />
          <span className="sr-only">{isOpen ? t("mobile_menu_toggle.close") : t("mobile_menu_toggle.open")}</span>
        </button>
        <div
          className={classNames(styles["menu"], {
            [styles["menu--open"]]: isOpen,
          })}
        >
          <div>
            <Profile className={styles["profile"]} />
            <ul className={styles["nav-links"]}>
              {navLinks.map(({ href, nameKey }, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    navLinkRefs.current[index] = el!;
                  }}
                >
                  <Link
                    href={href}
                    onClick={handleNavLinkClick}
                    className={classNames(
                      styles["nav-link"],
                      "font-feature-custom",
                      activeLinkIndex === index ? styles["nav-link--active"] : styles["nav-link--inactive"]
                    )}
                    aria-current={activeLinkIndex === index ? "page" : undefined}
                  >
                    {t(nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <LanguageSwitcher className={styles["language-switcher"]} />
            <SocialMediaLinks className={styles["social-media-links"]} />
          </div>
        </div>
      </div>
      {navMarkerPositionY && (
        <motion.div
          initial={{ y: navMarkerPositionY }}
          animate={{ y: navMarkerPositionY }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          className={styles["nav-marker"]}
        ></motion.div>
      )}
    </nav>
  );
};

export default Navbar;
