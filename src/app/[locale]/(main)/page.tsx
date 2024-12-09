"use client";

import { useTranslations } from "next-intl";
import { FC, useRef } from "react";

import { useActiveLinkIndexContext } from "@/contexts/ActiveLinkIndexContext";
import { useBreakpointsContext } from "@/contexts/BreakpointsContext";
import useFirstVisibleSection from "@/hooks/useFirstVisibleSection";
import { classNames } from "@/utils/classNames";

import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Education from "../components/education/Education";
import Experience from "../components/experience/Experience";
import Profile from "../components/profile/Profile";
import Skills from "../components/skills/Skills";
import SocialMediaLinks from "../components/socialMediaLinks/SocialMediaLinks";

import styles from "./Page.module.css";

interface Section {
  id: string;
  titleKey: string;
  Component: FC;
}

const sections: Section[] = [
  { id: "about", titleKey: "about", Component: About },
  { id: "skills", titleKey: "skills", Component: Skills },
  { id: "experience", titleKey: "experience", Component: Experience },
  { id: "education", titleKey: "education", Component: Education },
  { id: "contact", titleKey: "contact", Component: Contact },
] as const;

const Page: FC = () => {
  console.debug("[Render] 'Page' Component");

  const t = useTranslations("page");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { setActiveLinkIndex } = useActiveLinkIndexContext();
  const { isLg } = useBreakpointsContext();

  useFirstVisibleSection(sectionRefs.current, setActiveLinkIndex, isLg ? "-1px" : "23px");

  return (
    <>
      <section className={styles["hero-section"]}>
        <Profile />
        <SocialMediaLinks className={styles["social-media-links"]} />
      </section>
      {sections.map(({ id, titleKey, Component }, index) => (
        <section
          key={id}
          id={id}
          className={classNames(styles["section"], {
            [styles["about-section"]]: index === 0,
            [styles["contact-section"]]: index === sections.length - 1,
          })}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
        >
          <div
            className={classNames(styles["section-title-wrapper"], {
              [styles["section-title-wrapper--right"]]: index % 2 === 0,
            })}
          >
            <h1 className={classNames(styles["section-title"], "font-feature-custom")}>
              {t(titleKey)}
              <span className={styles["section-title-dot"]}>.</span>
            </h1>
            <div className={styles["section-divider"]}></div>
          </div>
          <Component />
        </section>
      ))}
    </>
  );
};

export default Page;
