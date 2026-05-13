import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "TND") {
  // Trim trailing .00, keep one decimal when needed: 8 TND, 12.5 TND, 18 TND
  const formatted = Number.isInteger(amount)
    ? amount.toString()
    : amount.toFixed(2).replace(/0$/, "").replace(/\.$/, "");
  return `${formatted} ${currency}`;
}

export function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
