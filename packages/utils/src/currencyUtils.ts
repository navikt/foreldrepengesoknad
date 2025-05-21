import { getDecoratorLanguageCookie } from './cookieUtils';

export const formatCurrencyWithKr = (value: number | string): string => {
    const locale = getDecoratorLanguageCookie('decorator-language');
    const formattedValue = Number(value).toLocaleString(locale);

    if (locale !== 'en') {
        return `${formattedValue} kr`;
    }
    return `NOK ${formattedValue}`;
};

export const formatCurrency = (value: number | string): string => {
    const formattedValue = Number(value).toLocaleString('nb-NO');
    return `${formattedValue}`;
};
