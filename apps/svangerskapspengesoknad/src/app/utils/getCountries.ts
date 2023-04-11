/* eslint-disable */

import * as countries from 'i18n-iso-countries';

// prettier-ignore
const countriesInEøs = [
    'BE', 'BG', 'DK', 'EE', 'FI', 'FR', 'GR', 'IE', 'IS', 'IT', 'HR', 'CY', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'GB', 'SE', 'CZ', 'DE', 'HU', 'AT', 'CH'];

const isCountryInEøs = (countryCode: string) => countriesInEøs.includes(countryCode);
const isCountryNorge = (countryCode: string) => countryCode === 'NO';

export type Countries = [string, string][];

export const getCountries = (visLandUtenforEøs: boolean, visNorge: boolean, locale: string): Countries => {
    const countryNames: [string, string][] = Object.entries(countries.getNames(locale));
    const namesDescending = (a: string[], b: string[]) => a[1].localeCompare(b[1], locale);
    const applyFilters = ([countryCode]: string[]) => {
        const keepNorway = visNorge || !isCountryNorge(countryCode);
        const keepEøsCountry = visLandUtenforEøs || isCountryInEøs(countryCode);

        return keepNorway && keepEøsCountry;
    };

    return [...countryNames].sort(namesDescending).filter(applyFilters);
};

export const getContryName = (countryList: Countries, contrycode: string): string | undefined => {
    const country = countryList.find((c) => c[0] === contrycode);
    return country ? country[1] : undefined;
};

export default getCountries;
