import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|fonts/.*|favicon.ico|icon.svg|apple-icon.png|web-app-manifest-192x192.png|web-app-manifest-512x512.png|robots.txt|sitemap.xml|manifest.webmanifest).*)",
    "/(en|fr)/:path*",
  ],
};
