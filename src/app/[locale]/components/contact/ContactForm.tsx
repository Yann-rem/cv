"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useUpdateEffect from "@/hooks/useUpdateEffect";
import contactSchema from "@/schemas/contactSchema";
import { classNames } from "@/utils/classNames";

import { DangerIcon, SpinnerIcon } from "./Icons";
import SuccessOverlay from "./SuccessOverlay";

import styles from "./Contact.module.css";

interface Input {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Field {
  id: string;
  label: string;
  name: keyof Input;
}

interface FieldError {
  field: keyof Input;
  message: string;
}

interface ErrorData {
  type: "server_configuration" | "validation" | "internal_error";
  message: string;
  errors?: FieldError[];
}

const fields: Field[] = [
  { id: "first-name", label: "labels.first_name", name: "firstName" },
  { id: "last-name", label: "labels.last_name", name: "lastName" },
  { id: "email", label: "labels.email", name: "email" },
  { id: "phone", label: "labels.phone", name: "phone" },
  { id: "subject", label: "labels.subject", name: "subject" },
  { id: "message", label: "labels.message", name: "message" },
] as const;

const shakeAnimation = {
  x: [0, 5, -5, 5, 0],
  transition: { ease: "linear", duration: 0.3 },
};

const ContactForm: FC = () => {
  console.debug("[Render] 'ContactForm' Component");

  const t = useTranslations("contact-form");

  const [status, setStatus] = useState<"idle" | "loading" | "server_configuration" | "internal_error" | "error">(
    "idle"
  );

  const [statusMessage, setStatusMessage] = useState<string>("labels.submit");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    trigger,
    reset,
    // } = useForm<Input>();
  } = useForm<Input>({ resolver: yupResolver(contactSchema()) });

  const onSubmit = async (data: Input) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("idle");
        setStatusMessage("labels.submit");
        reset();

        setTimeout(() => {
          setShowSuccessOverlay(true);
        }, 1000);
      } else {
        const errorData: ErrorData = await response.json();

        if (errorData.type === "server_configuration") {
          setStatus("server_configuration");
          setStatusMessage(errorData.message);
        } else if (errorData.type === "validation") {
          errorData.errors?.forEach(({ field, message }) => {
            setError(field, { type: "server", message: t(message) });
          });
        } else if (errorData.type === "internal_error") {
          setStatus("internal_error");
          setStatusMessage(errorData.message);
        } else {
          setStatus("error");
          setStatusMessage("submit_error.generic");
        }
      }
    } catch (error: unknown) {
      setStatus("error");
      setStatusMessage("submit_error.generic");
    }
  };

  useUpdateEffect(() => {
    console.debug("[Effet] État du statut");

    if (showSuccessOverlay) {
      timerRef.current = setTimeout(() => {
        setShowSuccessOverlay(false);
      }, 15000000000);
    }

    if (status === "server_configuration" || status === "internal_error" || status === "error") {
      timerRef.current = setTimeout(() => {
        setStatus("idle");
        setStatusMessage("labels.submit");
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [status, showSuccessOverlay]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["layout"]}>
        {fields.map(({ id, label, name }) => (
          <div
            key={id}
            className={classNames(
              { [styles["field--full-width"]]: id === "subject" || id === "message" },
              styles["field"]
            )}
          >
            <label htmlFor={id} className={classNames(styles["label"], "font-feature-custom")}>
              {t(label)}
            </label>
            {id !== "message" ? (
              <motion.div
                animate={errors[name] ? shakeAnimation : {}}
                className={classNames(
                  styles["input-container"],
                  errors[name] ? styles["input-container--border-error"] : styles["input-container--border-normal"]
                )}
              >
                <input
                  id={id}
                  type="text"
                  {...register(name)}
                  onBlur={() => trigger(name)}
                  aria-describedby={errors[name] ? `${id}-error` : undefined}
                  className={styles["input"]}
                />
              </motion.div>
            ) : (
              <motion.div
                animate={errors[name] ? shakeAnimation : {}}
                className={classNames(
                  styles["input-container"],
                  errors[name] ? styles["input-container--border-error"] : styles["input-container--border-normal"]
                )}
              >
                <textarea
                  id={id}
                  {...register(name)}
                  onBlur={() => trigger(name)}
                  rows={4}
                  className={styles["textarea"]}
                />
              </motion.div>
            )}
            <div className={styles["error-container"]}>
              {errors[name] && (
                <motion.div
                  role="alert"
                  id={`${id}-error`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: "easeOut", delay: 0.3, duration: 0.3 }}
                  className={styles["error-content"]}
                >
                  <DangerIcon className={styles["error-icon"]} aria-hidden="true" />
                  <span className={styles["error-message"]}>{t(errors[name].message)}</span>
                </motion.div>
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          disabled={status === "loading"}
          className={classNames(
            styles["field--full-width"],
            styles["button"],
            "font-feature-custom",
            status === "server_configuration" || status === "internal_error" || status === "error"
              ? styles["button--background-error"]
              : styles["button--background-normal"]
          )}
        >
          {(() => {
            switch (status) {
              case "idle":
              case "error":
              case "server_configuration":
              case "internal_error":
                return t(statusMessage);
              case "loading":
                return (
                  <motion.div animate={{ rotate: 360 }} transition={{ ease: "linear", repeat: Infinity, duration: 1 }}>
                    <SpinnerIcon className={styles["spinner-icon"]} />
                  </motion.div>
                );
              default:
                return null;
            }
          })()}
        </button>
      </form>
      <AnimatePresence>
        {showSuccessOverlay && <SuccessOverlay onClick={() => setShowSuccessOverlay(false)} />}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;
