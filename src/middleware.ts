export { default } from "next-auth/middleware";

// Protect the admin panel.
//   "/admin"                  → the bare /admin overview (must be matched
//                               explicitly; the second pattern below only
//                               matches /admin/<something>)
//   "/admin/((?!login).*)"    → every nested admin route EXCEPT /admin/login
//                               (the login page itself must remain public)
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"]
};
