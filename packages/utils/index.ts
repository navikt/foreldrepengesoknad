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
export { openPdfPreview } from './src/pdfUtils';
export { shouldChangeBrowser } from './src/browserUtils';
export { omitOne, omitMany } from './src/objectUtils';
export { overlapperTidsperioder } from './src/tidsperiodeUtils';
export { redirect, redirectToLogin } from './src/loginUtils';
export { default as useDocumentTitle } from './src/hooks/useDocumentTitle';
export { default as useBeforeUnload } from './src/hooks/useBeforeUnload';
export { default as bemUtils } from './src/bemUtils';
export { getFloatFromString } from './src/numberUtils';
export { capitalizeFirstLetter, getNavnGenitivEierform } from './src/stringUtils';
export { getOffentligeFridager } from './src/fridagerUtils';
export { getFamiliehendelsedato } from './src/barnUtils';
export { formatCurrencyWithKr } from './src/currencyUtils';
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
    formatDateMedUkedag,
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
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    formaterDatoUtenDag,
} from './src/dateUtils';

export * from './src/uttak/Uttaksdagen';
export * from './src/uttak/Tidsperioden';
export * from './src/uttak/uttakUtils';
