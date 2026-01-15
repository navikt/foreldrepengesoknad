import { getDecoratorLanguageCookie } from './cookieUtils';

export const formatCurrencyWithKr = (value: number | string): string => {
    const locale = getDecoratorLanguageCookie('decorator-language');

    const kronerSomTall = Number(value);
    const intlLocale = locale === 'en' ? 'en-US' : 'nb-NO';

    return Intl.NumberFormat(intlLocale, {
        style: 'currency',
        currency: 'NOK',
        minimumFractionDigits: kronerSomTall % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
    }).format(kronerSomTall);
};

export const formatCurrency = (value: number | string): string => {
    const formattedValue = Number(value).toLocaleString('nb-NO');
    return `${formattedValue}`;
};
