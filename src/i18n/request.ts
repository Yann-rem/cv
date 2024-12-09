import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const namespaces = [
    "about",
    "contact-form",
    "education",
    "experience",
    "footer",
    "language-switcher",
    "manifest",
    "metadata",
    "navbar",
    "not-found-page",
    "page",
    "profile",
    "skills",
    "social-media-links",
  ] as const;

  type Namespace = (typeof namespaces)[number];
  type Messages = Record<Namespace, Record<string, string>>;

  const messages: Messages = {} as Messages;

  for (const namespace of namespaces) {
    messages[namespace] = (await import(`../../messages/${namespace}/${locale}.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
