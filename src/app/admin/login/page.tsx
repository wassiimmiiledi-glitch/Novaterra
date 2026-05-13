import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50" />}>
      <LoginClient />
    </Suspense>
  );
}
