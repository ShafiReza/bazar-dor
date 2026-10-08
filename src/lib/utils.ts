import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert English number to Bengali digits */
export function toBengaliDigits(num: number | string): string {
  const map: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
    ",": ",",
    "-": "-",
  };
  return String(num)
    .replace(/,/g, "")
    .split("")
    .map((c) => map[c] || c)
    .join("");
}

/** Format price with Bengali digits + টাকা */
export function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-IN");
  return `${toBengaliDigits(formatted)} টাকা`;
}

/** Format percentage change */
export function formatChange(pct: number, dir: string): string {
  const abs = Math.abs(pct);
  const bn = toBengaliDigits(abs.toFixed(1));
  if (dir === "up") return `▲ ${bn}%`;
  if (dir === "down") return `▼ ${bn}%`;
  return `— ${bn}%`;
}

/** Get unit label in Bengali */
export function getUnitLabel(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };
  return map[unit?.toLowerCase()] || `প্রতি ${unit}`;
}

/** Parse Bengali or English number for sorting */
export function parsePrice(val: number | string): number {
  if (typeof val === "number") return val;
  const en = val.replace(/[০-৯]/g, (d) =>
    String("০১২৩৪৫৬৭৮৯".indexOf(d))
  );
  return parseFloat(en.replace(/,/g, "")) || 0;
}

/** Get current Bangla date */
export function getBanglaDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "beng",
  };
  try {
    return now.toLocaleDateString("bn-BD", options);
  } catch {
    // Fallback
    const months = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];
    return `${toBengaliDigits(now.getDate())} ${months[now.getMonth()]} ${toBengaliDigits(now.getFullYear())}`;
  }
}
