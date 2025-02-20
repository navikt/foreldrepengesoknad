export { notEmpty, assertUnreachable, containsWhiteSpace } from './src/other/validation';
export { erGyldigNorskOrgnummer } from './src/other/orgnrValidation';
export {
    textRegex,
    textGyldigRegex,
    isRequired,
    isNotEqualValue,
    hasMinLength,
    hasMaxLength,
    hasLegalChars,
    isEmpty,
} from './src/form/generalFormValidation';
export {
    isValidNumberForm,
    isValidDecimal,
    isValidInteger,
    hasMaxValue,
    hasMinValue,
} from './src/form/numberFormValidation';
export { isValidNumber } from './src/other/numberValidation';
export {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isDatesNotTheSame,
    isLessThanThreeWeeksAgo,
    isMaxOneYearIntoTheFuture,
    isValidDate,
    isDateWithinRange,
    isBeforeOrSame,
    isBeforeDate,
    isAfterOrSame,
    isAfterDate,
    isPeriodNotOverlappingOthers,
    isLessThanOneAndHalfYearsAgo,
    isBeforeToday,
    terminbekreftelsedatoMåVæreUtstedetEtter22Svangerskapsuke as terminbekreftelsedatoIsValid,
    isWeekday,
} from './src/form/dateFormValidation';
