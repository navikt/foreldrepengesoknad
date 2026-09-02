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
            case 'BEL': // Belgia
            case 'BGR': // Bulgaria
            case 'DNK': // Danmark
            case 'EST': // Estland
            case 'FIN': // Finland
            case 'FRA': // Frankrike
            case 'GRC': // Hellas
            case 'IRL': // Irland
            case 'ISL': // Island
            case 'ITA': // Italia
            case 'HRV': // Kroatia
            case 'CYP': // Kypros
            case 'LVA': // Latvia
            case 'LIE': // Liechtenstein
            case 'LTU': // Litauen
            case 'LUX': // Luxembourg
            case 'MLT': // Malta
            case 'NLD': // Nederland
            case 'NOR': // Norge
            case 'POL': // Polen
            case 'PRT': // Portugal
            case 'ROU': // Romania
            case 'SVK': // Slovakia
            case 'SVN': // Slovenia
            case 'ESP': // Spania
            case 'CHE': // Sveits
            case 'SWE': // Sverige
            case 'CZE': // Tsjekkia
            case 'DEU': // Tyskland
            case 'HUN': // Ungarn
            case 'AUT': // Østerrike
                return true;
            default:
                return false;
        }
    } else {
        // Filter ut Antarktis
        return countryOptionValue !== 'ATA';
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
    // i18n-iso-countries sin alpha3-kode for Kosovo er 'XKK'. NAV bruker 'XXK'.
    // Slår derfor opp med biblioteket sin kode for å finne riktig landsnavn.
    if (alphaCode === 'XXK') {
        alphaCode = 'XKK';
    }
    return countries.getName(alphaCode, getLocaleKey(locale))!;
};

export const getAlpha3Code = (alpha2Code: string): string => {
    const normalisertAlpha2Code = alpha2Code.toUpperCase();

    // Faller tilbake til input uendret hvis biblioteket ikke har en alpha3-kode (f.eks. utgåtte koder
    // som ikke lenger finnes i ISO 3166-1, eller sentinelverdien 'UNDEFINED').
    const countryAlpha3Code = (countries.alpha2ToAlpha3(normalisertAlpha2Code) ?? normalisertAlpha2Code).toUpperCase();

    // i18n-iso-countries har brukt både 'XKX' (eldre versjoner) og 'XKK' (7.14.0) som alpha3-kode for Kosovo.
    // NAV bruker 'XXK'. Endrer til NAV sin kode for å sende riktig kode videre.
    return countryAlpha3Code === 'XKX' || countryAlpha3Code === 'XKK' ? 'XXK' : countryAlpha3Code;
};

export const countryIsMemberOfEøsOrEfta = (isoCode: string) => filteredListEØSCountries(isoCode.toUpperCase(), true);

const getCountries = () => countries;

export const createCountryOptions = (): Array<[string, string]> => {
    const lang = 'nb';
    const land = getCountries();

    const names = Object.entries(land.getNames(lang)).map(
        ([alpha2Code, name]) => [getAlpha3Code(alpha2Code), name] satisfies [string, string],
    );
    return names
        .sort((a, b) => a[1].localeCompare(b[1], lang))
        .filter((countryOptionValue) => filteredListEØSCountries(countryOptionValue[0], false));
};
