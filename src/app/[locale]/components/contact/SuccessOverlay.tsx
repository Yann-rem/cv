"use client";

import { useAnimate, usePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { FC, useEffect } from "react";

import { classNames } from "@/utils/classNames";

import { CheckIcon } from "./Icons";

import styles from "./Contact.module.css";

const SuccessOverlay: FC<{ onClick: () => void }> = ({ onClick }) => {
  console.debug("[Render] 'SuccessOverlay' Component");

  const t = useTranslations("contact-form");
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    console.debug("[Effet] Animation du message de succès de l'envoi");

    if (isPresent) {
      document.body.classList.add("no-scroll");

      const enterAnimation = () => {
        animate([
          [scope.current, { opacity: 1 }, { ease: "easeOut", duration: 1 }],
          [
            `.${styles["success-icon"]} .check-line`,
            { strokeDashoffset: 0 },
            { ease: "circInOut", duration: 2, at: "+1" },
          ],
          [`.${styles["success-icon-container"]}`, { transform: "translate(0%)" }, { ease: "easeOut", duration: 2 }],
          [
            `.${styles["success-message-title"]}`,
            { transform: "translate(0%)", opacity: 1 },
            { ease: "easeOut", duration: 1 },
          ],
          [
            `.${styles["success-message-subtitle"]}`,
            { transform: "translate(0%)", opacity: 1 },
            { ease: "easeIn", duration: 1 },
          ],
        ]);
      };

      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(scope.current, { opacity: 0 }, { ease: "easeIn", duration: 0.5 });

        document.body.classList.remove("no-scroll");

        safeToRemove();
      };

      exitAnimation();
    }
    // eslint-disable-next-line
  }, [isPresent]);

  return (
    <div role="alert" onClick={onClick} aria-live="assertive" className={styles["container"]} ref={scope}>
      <div className={styles["content"]}>
        <div className={styles["success-icon-container"]}>
          <div className={styles["success-icon-box"]}>
            <CheckIcon className={styles["success-icon"]} aria-hidden="true" />
          </div>
        </div>
        <div className={styles["success-message-container"]}>
          <h1 className={classNames(styles["success-message-title"], "font-feature-custom")}>
            {t("submit_success.title")}
          </h1>
          <h2 className={classNames(styles["success-message-subtitle"], "font-feature-custom")}>
            {t("submit_success.subtitle")}
          </h2>
          <div className="sr-only">
            <p>
              {t("submit_success.title")}
              <br />
              {t("submit_success.subtitle")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessOverlay;
