import "server-only";

import ja from "./dictionaries/ja.json";
import ko from "./dictionaries/ko.json";

export type Dictionary = typeof ja;

const dictionaries = { ja, ko } satisfies Record<string, Dictionary>;

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale];
