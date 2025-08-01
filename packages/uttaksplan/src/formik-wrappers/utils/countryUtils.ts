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

export const getAlpha3Code = (alpha2Code: string) => {
    const countryAlpha3Code = countries.alpha2ToAlpha3(alpha2Code);
    if (!countryAlpha3Code) {
        throw `countryUtils: getAlpha3Code:  ${alpha2Code}`;
    }

    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer i18n-iso-countries sin landkode til landkode som brukes i NAV for å sende riktig kode videre.
    return countryAlpha3Code === 'XKX' ? 'XXK' : countryAlpha3Code.toUpperCase();
};

export const getCountries = () => countries;
