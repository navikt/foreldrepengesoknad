import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { YesOrNo, DateRange } from '@navikt/sif-common-formik-ds/lib';

dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const dateToday = dayjs.utc().toDate();
export const date1YearFromNow = dayjs.utc().add(1, 'years').toDate();
export const date1YearAgo = dayjs.utc().subtract(1, 'years').toDate();
export const attenUkerTreDager = dayjs.utc().add(18, 'week').add(3, 'day').startOf('day').toDate();
export const sixMonthsAgo = dayjs.utc().subtract(6, 'month').startOf('day').toDate();
export const date21DaysAgo = dayjs.utc().subtract(21, 'days').startOf('day').toDate();

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

export const validateYesOrNoIsAnswered = (answer: YesOrNo, errorIntlKey: string): string | undefined => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return errorIntlKey;
    }

    return undefined;
};

export const validateRequiredField = (value: any, errorMsg: string): string | undefined => {
    if (!hasValue(value)) {
        return errorMsg;
    }

    return undefined;
};

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export const erMindreEnn3UkerSiden = (dato: string) => {
    const terminDato = dayjs.utc(dato);
    const datoFor3UkerSiden = dayjs.utc().startOf('day').subtract(21, 'days');
    return dayjs.max(terminDato, datoFor3UkerSiden) === terminDato;
};

export const etterDagensDato = (dato: string) => {
    return dayjs.utc(dato).isAfter(dayjs.utc(dateToday));
};

export const sisteDatoBarnetKanVæreFødt = (dato: string) => {
    return dayjs.utc(dato).isBefore(dayjs.utc(sixMonthsAgo));
};

export const sisteMuligeTermindato = (dato: string) => {
    return dayjs.utc(dato).isAfter(dayjs.utc(attenUkerTreDager));
};

export const barnetErUnder15årPåAdopsjonsdato = (dato: string, adopsjonsdato: string) => {
    const fødselsdato = dayjs.utc(dato);
    const adopsjonsDato = dayjs.utc(adopsjonsdato);
    const datoBarnetFyllerFemten = dayjs.utc(fødselsdato).startOf('day').add(15, 'year');
    return dayjs.utc(adopsjonsDato).isBetween(dayjs.utc(fødselsdato), dayjs.utc(datoBarnetFyllerFemten), null, '[]');
};

export const barnetErIkkeFødtFørAdopsjonsDato = (dato: string, adopsjonsdato: string) => {
    return dayjs.utc(adopsjonsdato).isBefore(dayjs.utc(dato));
};

export const sisteDatoAdoptertBarnKanVæreFødt = (dato: string, adopsjonsdato: string) => {
    const datoBarnetFyllerFemten = dayjs.utc(dato).add(15, 'year').startOf('day').toDate();
    return dayjs.utc(adopsjonsdato).isAfter(dayjs.utc(datoBarnetFyllerFemten));
};

export const sisteMuligeDatoForOvertaOmsorg = (dato: string) => {
    const sisteDatoForOvertaOmsorg = dayjs.utc().add(1, 'year').startOf('day').toDate();
    return dayjs.utc(dato).isAfter(dayjs.utc(sisteDatoForOvertaOmsorg));
};

export const erIUke22Pluss3 = (dato: string) => {
    const terminDato = dayjs.utc(dato);
    const uke22Pluss3 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(dayjs.utc().startOf('day'), uke22Pluss3.startOf('day')).isSame(dayjs.utc().startOf('day'));
};

export const utstedtDatoErIUke22 = (utstedtDatoString: string, terminDatoString: string) => {
    const utstedtDato = dayjs.utc(utstedtDatoString).startOf('day');
    const terminDato = dayjs.utc(terminDatoString).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(uke22, utstedtDato).isSame(dayjs.utc(utstedtDato));
};

export const idagEllerTidligere = (dato: string) => {
    const utstedtDato = dayjs.utc(dato).startOf('day');
    const tomorrow = dayjs.utc().add(1, 'day').startOf('day');
    return dayjs.max(utstedtDato, tomorrow) === tomorrow;
};

export const erMyndig = (fødselsdato: string) => {
    const now = dayjs.utc();
    const momentDate = dayjs.utc(fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};

export const getFørsteMuligeTermindato = () => dayjs.utc().subtract(21, 'days').startOf('day').toDate();

interface ItemWithFom {
    fom: string;
}

interface OpenDateRange {
    from: Date;
    to?: Date;
}

export const getSisteMuligeTermindato = () =>
    dayjs
        .utc()
        .add(dagerForTerminbekreftelse - 1, 'days')
        .endOf('day')
        .toDate();

export const getForsteMuligeTerminbekreftelsesdato = (termindato?: Date | string): Date => {
    return termindato
        ? dayjs
              .utc(termindato)
              .subtract(dagerForTerminbekreftelse - 1, 'days')
              .toDate()
        : dayjs.utc().subtract(1, 'years').startOf('day').toDate();
};

export const getSisteMuligeTerminbekreftelsesdato = () => dayjs.utc(new Date()).endOf('day').toDate();

export const dateRangesCollide = (ranges: DateRange[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = [...ranges].sort(sortDateRange);
        const hasOverlap = ranges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return dayjs.utc(d.to).isSameOrAfter(dayjs.utc(sortedDates[idx + 1].from));
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};

export const dateRangesExceedsRange = (ranges: DateRange[], allowedRange: DateRange): boolean => {
    if (ranges.length === 0) {
        return false;
    }
    const sortedRanges = [...ranges].sort(sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;

    if (
        !dayjs.utc(from).isBetween(dayjs.utc(allowedRange.from), dayjs.utc(allowedRange.to), 'day', '[]') ||
        !dayjs.utc(to).isBetween(dayjs.utc(allowedRange.from), dayjs.utc(allowedRange.to), 'day', '[]')
    ) {
        return true;
    }
    return false;
};

export const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (dayjs.utc(d1.from).isSameOrBefore(dayjs.utc(d2.from))) {
        return -1;
    }
    return 1;
};

export const sortItemsByFom = (a: ItemWithFom, b: ItemWithFom) =>
    sortOpenDateRange({ from: dayjs.utc(a.fom).toDate() }, { from: dayjs.utc(b.fom).toDate() });

export const sortOpenDateRange = (d1: OpenDateRange, d2: OpenDateRange): number => {
    if (dayjs.utc(d1.from).isSameOrBefore(dayjs.utc(d2.from))) {
        return -1;
    }
    return 1;
};
