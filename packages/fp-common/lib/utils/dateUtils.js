"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesTidsperiodeMedValgfriSluttdatoContainDate = exports.doesTidsperiodeContainDate = exports.formatTidsperiodeMedValgfriSluttdato = exports.formatTidsperiode = exports.formatDateExtended = exports.formatDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dateFormat = 'DD.MM.YYYY';
const dateFormatExtended = 'DD. MMM YYYY';
const formatDate = (date) => (0, dayjs_1.default)(date).format(dateFormat);
exports.formatDate = formatDate;
const formatDateExtended = (date) => (0, dayjs_1.default)(date).format(dateFormatExtended);
exports.formatDateExtended = formatDateExtended;
const formatTidsperiode = (tidsperiode) => {
    return `${(0, exports.formatDate)(tidsperiode.fom)} - ${(0, exports.formatDate)(tidsperiode.tom)}`;
};
exports.formatTidsperiode = formatTidsperiode;
const formatTidsperiodeMedValgfriSluttdato = (tidsperiode) => {
    const tomString = tidsperiode.tom ? (0, exports.formatDate)(tidsperiode.tom) : 'pågående';
    return `${(0, exports.formatDate)(tidsperiode.fom)} - ${tomString}`;
};
exports.formatTidsperiodeMedValgfriSluttdato = formatTidsperiodeMedValgfriSluttdato;
const doesTidsperiodeContainDate = (tidsperiode, date) => {
    return (0, dayjs_1.default)(date).isBetween(tidsperiode.fom, tidsperiode.tom, 'day', '[]');
};
exports.doesTidsperiodeContainDate = doesTidsperiodeContainDate;
const doesTidsperiodeMedValgfriSluttdatoContainDate = (tidsperiode, date) => {
    if (tidsperiode.tom === undefined) {
        return false;
    }
    return (0, dayjs_1.default)(date).isBetween(tidsperiode.fom, tidsperiode.tom, 'day', '[]');
};
exports.doesTidsperiodeMedValgfriSluttdatoContainDate = doesTidsperiodeMedValgfriSluttdatoContainDate;
//# sourceMappingURL=dateUtils.js.map