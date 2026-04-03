export const locales = ["ja", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";
