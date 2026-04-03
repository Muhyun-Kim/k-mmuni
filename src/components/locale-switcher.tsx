"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  ko: "한국어",
};

export function LocaleSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    // /ja/login → /ko/login
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  }

  return (
    <select
      value={lang}
      onChange={handleChange}
      className="text-xs border rounded px-2 py-1 bg-transparent cursor-pointer hover:bg-gray-100"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeLabels[locale]}
        </option>
      ))}
    </select>
  );
}
