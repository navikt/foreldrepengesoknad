import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const utilsMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export {
    filteredListEØSCountries,
    createCountryOptions,
    countryIsMemberOfEøsOrEfta,
    getAlpha3Code,
    getCountryName,
    getLocaleKey,
} from './src/countryUtils';
export { omitOne, omitMany } from './src/objectUtils';
export { redirect } from './src/loginUtils';

export { useAbortSignal } from './src/hooks/useAbortSignal';
export { useDocumentTitle } from './src/hooks/useDocumentTitle';
export { useBeforeUnload } from './src/hooks/useBeforeUnload';
export { useScrollBehaviour } from './src/hooks/useScrollBehaviour';
export { useMedia } from './src/hooks/useMedia';
export { trimNumberValue, getFloatFromString, getNumberFromNumberInputValue } from './src/numberUtils';
export {
    capitalizeFirstLetter,
    capitalizeFirstLetterInEveryWordOnly,
    getNavnGenitivEierform,
    replaceInvisibleCharsWithSpace,
    formatOppramsing,
} from './src/stringUtils';
export { getFamiliehendelsedato, getFamiliesituasjon, sorterPersonEtterEldstOgNavn } from './src/barnUtils';
export { formatCurrencyWithKr, formatCurrency } from './src/currencyUtils';
export { encodeToBase64, decodeBase64 } from './src/urlEncodingUtils';
export {
    getBokmålLocale,
    getLocaleForApi,
    getLocaleFromSessionStorage,
    getNynorskLocale,
    setLocaleInSessionStorage,
} from './src/localeUtils';
export {
    isValidDate,
    formatDate,
    formatDateIso,
    formatDateExtended,
    formatDateShortYear,
    formatDateMedUkedag,
    formatDateShortMonth,
    formatDateMedUkedagShortMonth,
    formatTime,
    dagenFør,
    treUkerSiden,
    femMånederSiden,
    fireUkerSiden,
    tiMånederSidenDato,
    isAfterToday,
    isBeforeToday,
    isSameOrAfterToday,
    isSameOrBeforeToday,
    isDateWithinRange,
    isToday,
    isDateRangesOverlapping,
    isDateAAfterDateB,
    isDateASameOrBeforeDateB,
    erMyndig,
    halvannetÅrSiden,
    etÅrSiden,
    enMånedSiden,
    niMånederFremITid,
    isISODateString,
    ISOStringToDate,
    dateToISOString,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    formaterDatoUtenDag,
    convertStringOrDateToDate,
} from './src/dateUtils';

export { UttaksdagenString, erUttaksdag } from './src/uttak/UttaksdagenString';
export { Uttaksperioden } from './src/uttak/Uttaksperioden';
export { TidsperiodenString } from './src/TidsperiodenString';
export * from './src/cookieUtils';
export { periodFormat } from './src/periodUtils';
