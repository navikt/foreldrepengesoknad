export { notEmpty, assertUnreachable, containsWhiteSpace } from './src/other/validation';
export { erGyldigNorskOrgnummer } from './src/other/orgnrValidation';
export {
    isRequired,
    isNotEqualValue,
    hasMinLength,
    hasMaxLength,
    hasLegalChars,
} from './src/form/generalFormValidation';
export {
    isValidNumber,
    isValidDecimal,
    isValidInteger,
    hasMaxValue,
    hasMinValue,
} from './src/form/numberFormValidation';
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
} from './src/form/dateFormValidation';
