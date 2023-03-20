import { Locale } from '../types/Locale';
export declare const getLocaleFromSessionStorage: () => Locale;
export declare const setLocaleInSessionStorage: (locale: Locale) => void;
export declare const getNynorskLocale: () => "nn" | "no-NN";
export declare const getBokmålLocale: () => "nb" | "no-NB";
export declare const getLocaleForApi: (locale: string) => Locale;
