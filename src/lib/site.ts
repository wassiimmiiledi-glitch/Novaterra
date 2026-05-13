// Single source of truth for the public origin used by share links + QR codes.
// In development the QR will encode http://localhost:3000 — set
// NEXT_PUBLIC_SITE_URL in .env when deploying so the QR points to your real domain.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXTAUTH_URL ??
  "https://novaterra.cafe";

export function siteLink(path: string = "/") {
  const base = SITE_URL.replace(/\/$/, "");
  const route = path.startsWith("/") ? path : `/${path}`;
  return `${base}${route}`;
}
