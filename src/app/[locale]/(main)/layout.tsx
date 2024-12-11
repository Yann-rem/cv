import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { FC, ReactNode } from "react";

import { ActiveLinkIndexProvider } from "@/contexts/ActiveLinkIndexContext";
import { BreakpointsProvider } from "@/contexts/BreakpointsContext";
import { inter, interDisplay } from "@/lib/fonts";

import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

import "@/styles/global.css";
import styles from "./Layout.module.css";

export async function generateMetadata({ params: { locale } }: { params: { locale: any } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const MainLayout: FC<{ children: ReactNode; params: { locale: string } }> = async ({
  children,
  params: { locale },
}) => {
  console.debug("[Render] 'MainLayout' Component");

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} font-sans ${interDisplay.variable} font-display`}>
      <head></head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ActiveLinkIndexProvider>
            <BreakpointsProvider>
              <div className={styles["page-wrapper"]}>
                <div className={styles["page-layout"]}>
                  <Navbar className={styles["navbar"]} />
                  <div className={styles["main-footer-wrapper"]}>
                    <main>{children}</main>
                    <Footer className={styles["footer"]} />
                  </div>
                </div>
              </div>
            </BreakpointsProvider>
          </ActiveLinkIndexProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default MainLayout;
