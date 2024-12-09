import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const routes = [
    { path: "/", changeFrequency: "yearly", priority: 1 },
    { path: "/#about", changeFrequency: "yearly", priority: 0.8 },
    { path: "/#experience", changeFrequency: "yearly", priority: 0.8 },
    { path: "/#education", changeFrequency: "yearly", priority: 0.8 },
    { path: "/#skills", changeFrequency: "yearly", priority: 0.8 },
    { path: "/#contact", changeFrequency: "monthly", priority: 0.7 },
  ] as const;

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );
}
