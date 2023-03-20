"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocaleForApi = exports.getBokmålLocale = exports.getNynorskLocale = exports.setLocaleInSessionStorage = exports.getLocaleFromSessionStorage = void 0;
const LocaleSessionKey = 'selectedLocale';
const getLocaleFromSessionStorage = () => {
    return sessionStorage.getItem(LocaleSessionKey) || 'nb';
};
exports.getLocaleFromSessionStorage = getLocaleFromSessionStorage;
const setLocaleInSessionStorage = (locale) => {
    sessionStorage.setItem(LocaleSessionKey, locale);
};
exports.setLocaleInSessionStorage = setLocaleInSessionStorage;
const getNynorskLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NN').length > 0) {
        return 'no-NN';
    }
    return 'nn';
};
exports.getNynorskLocale = getNynorskLocale;
const getBokmålLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NB').length > 0) {
        return 'no-NB';
    }
    return 'nb';
};
exports.getBokmålLocale = getBokmålLocale;
const getLocaleForApi = (locale) => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};
exports.getLocaleForApi = getLocaleForApi;
//# sourceMappingURL=localeUtils.js.map