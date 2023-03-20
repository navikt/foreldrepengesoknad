"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortOpenDateRange = exports.sortItemsByFom = exports.sortDateRange = exports.dateRangesExceedsRange = exports.dateRangesCollide = exports.getSisteMuligeTerminbekreftelsesdato = exports.getForsteMuligeTerminbekreftelsesdato = exports.getSisteMuligeTermindato = exports.getFørsteMuligeTermindato = exports.erMyndig = exports.idagEllerTidligere = exports.utstedtDatoErIUke22 = exports.erIUke22Pluss3 = exports.sisteMuligeDatoForOvertaOmsorg = exports.sisteDatoAdoptertBarnKanVæreFødt = exports.barnetErIkkeFødtFørAdopsjonsDato = exports.barnetErUnder15årPåAdopsjonsdato = exports.sisteMuligeTermindato = exports.sisteDatoBarnetKanVæreFødt = exports.etterDagensDato = exports.erMindreEnn3UkerSiden = exports.hasValue = exports.validateRequiredField = exports.validateYesOrNoIsAnswered = exports.date21DaysAgo = exports.sixMonthsAgo = exports.attenUkerTreDager = exports.date1YearAgo = exports.date1YearFromNow = exports.dateToday = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const minMax_1 = __importDefault(require("dayjs/plugin/minMax"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const lib_1 = require("@navikt/sif-common-formik-ds/lib");
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(minMax_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
exports.dateToday = (0, dayjs_1.default)().toDate();
exports.date1YearFromNow = (0, dayjs_1.default)().add(1, 'years').toDate();
exports.date1YearAgo = (0, dayjs_1.default)().subtract(1, 'years').toDate();
exports.attenUkerTreDager = (0, dayjs_1.default)().add(18, 'week').add(3, 'day').startOf('day').toDate();
exports.sixMonthsAgo = (0, dayjs_1.default)().subtract(6, 'month').startOf('day').toDate();
exports.date21DaysAgo = (0, dayjs_1.default)().subtract(21, 'days').startOf('day').toDate();
const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;
const validateYesOrNoIsAnswered = (answer, errorIntlKey) => {
    if (answer === lib_1.YesOrNo.UNANSWERED || answer === undefined) {
        return errorIntlKey;
    }
    return undefined;
};
exports.validateYesOrNoIsAnswered = validateYesOrNoIsAnswered;
const validateRequiredField = (value, errorMsg) => {
    if (!(0, exports.hasValue)(value)) {
        return errorMsg;
    }
    return undefined;
};
exports.validateRequiredField = validateRequiredField;
const hasValue = (v) => v !== '' && v !== undefined && v !== null;
exports.hasValue = hasValue;
const erMindreEnn3UkerSiden = (dato) => {
    const terminDato = (0, dayjs_1.default)(dato);
    const datoFor3UkerSiden = (0, dayjs_1.default)().startOf('day').subtract(21, 'days');
    return dayjs_1.default.max(terminDato, datoFor3UkerSiden) === terminDato;
};
exports.erMindreEnn3UkerSiden = erMindreEnn3UkerSiden;
const etterDagensDato = (dato) => {
    return (0, dayjs_1.default)(dato).isAfter(exports.dateToday);
};
exports.etterDagensDato = etterDagensDato;
const sisteDatoBarnetKanVæreFødt = (dato) => {
    return (0, dayjs_1.default)(dato).isBefore(exports.sixMonthsAgo);
};
exports.sisteDatoBarnetKanVæreFødt = sisteDatoBarnetKanVæreFødt;
const sisteMuligeTermindato = (dato) => {
    return (0, dayjs_1.default)(dato).isAfter(exports.attenUkerTreDager);
};
exports.sisteMuligeTermindato = sisteMuligeTermindato;
const barnetErUnder15årPåAdopsjonsdato = (dato, adopsjonsdato) => {
    const fødselsdato = (0, dayjs_1.default)(dato);
    const adopsjonsDato = (0, dayjs_1.default)(adopsjonsdato);
    const datoBarnetFyllerFemten = (0, dayjs_1.default)(fødselsdato).startOf('day').add(15, 'year');
    return (0, dayjs_1.default)(adopsjonsDato).isBetween(fødselsdato, datoBarnetFyllerFemten, null, '[]');
};
exports.barnetErUnder15årPåAdopsjonsdato = barnetErUnder15årPåAdopsjonsdato;
const barnetErIkkeFødtFørAdopsjonsDato = (dato, adopsjonsdato) => {
    return (0, dayjs_1.default)(adopsjonsdato).isBefore(dato);
};
exports.barnetErIkkeFødtFørAdopsjonsDato = barnetErIkkeFødtFørAdopsjonsDato;
const sisteDatoAdoptertBarnKanVæreFødt = (dato, adopsjonsdato) => {
    const datoBarnetFyllerFemten = (0, dayjs_1.default)(dato).add(15, 'year').startOf('day').toDate();
    return (0, dayjs_1.default)(adopsjonsdato).isAfter(datoBarnetFyllerFemten);
};
exports.sisteDatoAdoptertBarnKanVæreFødt = sisteDatoAdoptertBarnKanVæreFødt;
const sisteMuligeDatoForOvertaOmsorg = (dato) => {
    const sisteDatoForOvertaOmsorg = (0, dayjs_1.default)().add(1, 'year').startOf('day').toDate();
    return (0, dayjs_1.default)(dato).isAfter(sisteDatoForOvertaOmsorg);
};
exports.sisteMuligeDatoForOvertaOmsorg = sisteMuligeDatoForOvertaOmsorg;
const erIUke22Pluss3 = (dato) => {
    const terminDato = (0, dayjs_1.default)(dato);
    const uke22Pluss3 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs_1.default.max((0, dayjs_1.default)().startOf('day'), uke22Pluss3.startOf('day')).isSame((0, dayjs_1.default)().startOf('day'));
};
exports.erIUke22Pluss3 = erIUke22Pluss3;
const utstedtDatoErIUke22 = (utstedtDatoString, terminDatoString) => {
    const utstedtDato = (0, dayjs_1.default)(utstedtDatoString).startOf('day');
    const terminDato = (0, dayjs_1.default)(terminDatoString).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs_1.default.max(uke22, utstedtDato).isSame(utstedtDato);
};
exports.utstedtDatoErIUke22 = utstedtDatoErIUke22;
const idagEllerTidligere = (dato) => {
    const utstedtDato = (0, dayjs_1.default)(dato).startOf('day');
    const tomorrow = (0, dayjs_1.default)().add(1, 'day').startOf('day');
    return dayjs_1.default.max(utstedtDato, tomorrow) === tomorrow;
};
exports.idagEllerTidligere = idagEllerTidligere;
const erMyndig = (fødselsdato) => {
    const now = (0, dayjs_1.default)();
    const momentDate = (0, dayjs_1.default)(fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};
exports.erMyndig = erMyndig;
const getFørsteMuligeTermindato = () => (0, dayjs_1.default)().subtract(21, 'days').startOf('day').toDate();
exports.getFørsteMuligeTermindato = getFørsteMuligeTermindato;
const getSisteMuligeTermindato = () => (0, dayjs_1.default)()
    .add(dagerForTerminbekreftelse - 1, 'days')
    .endOf('day')
    .toDate();
exports.getSisteMuligeTermindato = getSisteMuligeTermindato;
const getForsteMuligeTerminbekreftelsesdato = (termindato) => {
    return termindato
        ? (0, dayjs_1.default)(termindato)
            .subtract(dagerForTerminbekreftelse - 1, 'days')
            .toDate()
        : (0, dayjs_1.default)().subtract(1, 'years').startOf('day').toDate();
};
exports.getForsteMuligeTerminbekreftelsesdato = getForsteMuligeTerminbekreftelsesdato;
const getSisteMuligeTerminbekreftelsesdato = () => (0, dayjs_1.default)(new Date()).endOf('day').toDate();
exports.getSisteMuligeTerminbekreftelsesdato = getSisteMuligeTerminbekreftelsesdato;
const dateRangesCollide = (ranges) => {
    if (ranges.length > 0) {
        const sortedDates = ranges.sort(exports.sortDateRange);
        const hasOverlap = ranges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return (0, dayjs_1.default)(d.to).isSameOrAfter(sortedDates[idx + 1].from);
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};
exports.dateRangesCollide = dateRangesCollide;
const dateRangesExceedsRange = (ranges, allowedRange) => {
    if (ranges.length === 0) {
        return false;
    }
    const sortedRanges = ranges.sort(exports.sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;
    if (!(0, dayjs_1.default)(from).isBetween(allowedRange.from, allowedRange.to, 'day', '[]') ||
        !(0, dayjs_1.default)(to).isBetween(allowedRange.from, allowedRange.to, 'day', '[]')) {
        return true;
    }
    return false;
};
exports.dateRangesExceedsRange = dateRangesExceedsRange;
const sortDateRange = (d1, d2) => {
    if ((0, dayjs_1.default)(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};
exports.sortDateRange = sortDateRange;
const sortItemsByFom = (a, b) => (0, exports.sortOpenDateRange)({ from: (0, dayjs_1.default)(a.fom).toDate() }, { from: (0, dayjs_1.default)(b.fom).toDate() });
exports.sortItemsByFom = sortItemsByFom;
const sortOpenDateRange = (d1, d2) => {
    if ((0, dayjs_1.default)(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};
exports.sortOpenDateRange = sortOpenDateRange;
//# sourceMappingURL=validationUtils.js.map