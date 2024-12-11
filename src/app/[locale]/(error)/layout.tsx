import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { FC, ReactNode } from "react";

import { inter, interDisplay } from "@/lib/fonts";

import "@/styles/global.css";
import styles from "./Layout.module.css";

export async function generateMetadata({ params: { locale } }: { params: { locale: any } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const ErrorLayout: FC<{ children: ReactNode; params: { locale: string } }> = async ({
  children,
  params: { locale },
}) => {
  console.debug("[Render] 'ErrorLayout' Component");

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} font-sans ${interDisplay.variable} font-display`}>
      <head></head>
      <body className={styles["page-wrapper"]}>
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default ErrorLayout;
