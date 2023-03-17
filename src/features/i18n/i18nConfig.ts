export type LanguageCodes = 'en' | 'pl';

export type Languages = {
  [key in LanguageCodes]: string;
};

export const defaultLang = 'en';

/**
 * Supported languages, based on {@link LanguageCodes}
 */
export const languages: Languages = {
  en: 'English',
  pl: 'Polski',
};
