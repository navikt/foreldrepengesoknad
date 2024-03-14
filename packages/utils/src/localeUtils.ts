import { LocaleAll } from '@navikt/fp-types';

const LocaleSessionKey = 'selectedLocale';

export const getLocaleFromSessionStorage = <T extends LocaleAll>(): T => {
    return (sessionStorage.getItem(LocaleSessionKey) as T) || 'nb';
};

export const setLocaleInSessionStorage = (locale: LocaleAll): void => {
    sessionStorage.setItem(LocaleSessionKey, locale);
};

export const getNynorskLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NN').length > 0) {
        return 'no-NN';
    }
    return 'nn';
};

export const getBokmålLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NB').length > 0) {
        return 'no-NB';
    }
    return 'nb';
};

export const getLocaleForApi = (locale: string): LocaleAll => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};
