import * as countries from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';

countries.registerLocale(langNB);
countries.registerLocale(langNN);

/** Kilde:
 * https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-utlandet/relatert-informasjon/eos-landene
 */
export const filteredListEØSCountries = (countryOptionValue: string, shouldFilter?: boolean) => {
    if (shouldFilter) {
        switch (countryOptionValue) {
            case 'BE': // Belgia
            case 'BG': // Bulgaria
            case 'DK': // Danmark
            case 'EE': // Estland
            case 'FI': // Finland
            case 'FR': // Frankrike
            case 'GR': // Hellas
            case 'IE': // Irland
            case 'IS': // Island
            case 'IT': // Italia
            case 'HR': // Kroatia
            case 'CY': // Kypros
            case 'LV': // Latvia
            case 'LI': // Liechtenstein
            case 'LT': // Litauen
            case 'LU': // Luxembourg
            case 'MT': // Malta
            case 'NL': // Nederland
            case 'NO': // Norge
            case 'PL': // Polen
            case 'PT': // Portugal
            case 'RO': // Romania
            case 'SK': // Slovakia
            case 'SI': // Slovenia
            case 'ES': // Spania
            case 'CH': // Sveits
            case 'SE': // Sverige
            case 'CZ': // Tsjekkia
            case 'DE': // Tyskland
            case 'HU': // Ungarn
            case 'AT': // Østerrike
                return true;
            default:
                return false;
        }
    } else {
        // Filter ut Antarktis
        return countryOptionValue !== 'AQ';
    }
};

export const getLocaleKey = (locale: string): string => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};

export const getCountryName = (alphaCode: string, locale: string): string => {
    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer NAV sin landkode av Kosovo til i18n-iso-countries sin landkode for å hente riktig landsnavn.
    if (alphaCode === 'XXK') {
        alphaCode = 'XKX';
    }
    return countries.getName(alphaCode, getLocaleKey(locale))!;
};

export const getAlpha3Code = (alpha2Code: string) => {
    const countryAlpha3Code = countries.alpha2ToAlpha3(alpha2Code)!.toUpperCase();

    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer i18n-iso-countries sin landkode til landkode som brukes i NAV for å sende riktig kode videre.
    return countryAlpha3Code === 'XKX' ? 'XXK' : countryAlpha3Code;
};

export const countryIsMemberOfEøsOrEfta = (isoCode: string) => {
    let isoCodeToUse = isoCode.toUpperCase();
    if (isoCodeToUse === 'XXK') {
        isoCodeToUse = 'XKX';
    }
    isoCodeToUse = isoCodeToUse.length === 2 ? isoCodeToUse : countries.alpha3ToAlpha2(isoCodeToUse)!;
    return filteredListEØSCountries(isoCodeToUse.toUpperCase(), true) === true;
};

export const getCountries = () => countries;

export const createCountryOptions = (): Record<string, any> => {
    const lang = 'nb';
    const countries = getCountries();

    const names: Array<[string, any]> = Object.entries(countries.getNames(lang));
    return names
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], lang))
        .filter((countryOptionValue: string[]) => filteredListEØSCountries(countryOptionValue[0], false));
};
