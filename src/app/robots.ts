import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/contact/__tests__", "/favicon.ico", "/apple-icon.png", "/icon.svg"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
