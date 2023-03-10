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

export const dateToday = dayjs().toDate();
export const date1YearFromNow = dayjs().add(1, 'years').toDate();
export const date1YearAgo = dayjs().subtract(1, 'years').toDate();
export const attenUkerTreDager = dayjs().add(18, 'week').add(3, 'day').startOf('day').toDate();
export const sixMonthsAgo = dayjs().subtract(6, 'month').startOf('day').toDate();
export const date21DaysAgo = dayjs().subtract(21, 'days').startOf('day').toDate();

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
    const terminDato = dayjs(dato);
    const datoFor3UkerSiden = dayjs().startOf('day').subtract(21, 'days');
    return dayjs.max(terminDato, datoFor3UkerSiden) === terminDato;
};

export const etterDagensDato = (dato: string) => {
    return dayjs(dato).isAfter(dateToday);
};

export const sisteDatoBarnetKanVæreFødt = (dato: string) => {
    return dayjs(dato).isBefore(sixMonthsAgo);
};

export const sisteMuligeTermindato = (dato: string) => {
    return dayjs(dato).isAfter(attenUkerTreDager);
};

export const barnetErUnder15årPåAdopsjonsdato = (dato: string, adopsjonsdato: string) => {
    const fødselsdato = dayjs(dato);
    const adopsjonsDato = dayjs(adopsjonsdato);
    const datoBarnetFyllerFemten = dayjs(fødselsdato).startOf('day').add(15, 'year');
    return dayjs(adopsjonsDato).isBetween(fødselsdato, datoBarnetFyllerFemten, null, '[]');
};

export const barnetErIkkeFødtFørAdopsjonsDato = (dato: string, adopsjonsdato: string) => {
    return dayjs(adopsjonsdato).isBefore(dato);
};

export const sisteDatoAdoptertBarnKanVæreFødt = (dato: string, adopsjonsdato: string) => {
    const datoBarnetFyllerFemten = dayjs(dato).add(15, 'year').startOf('day').toDate();
    return dayjs(adopsjonsdato).isAfter(datoBarnetFyllerFemten);
};

export const sisteMuligeDatoForOvertaOmsorg = (dato: string) => {
    const sisteDatoForOvertaOmsorg = dayjs().add(1, 'year').startOf('day').toDate();
    return dayjs(dato).isAfter(sisteDatoForOvertaOmsorg);
};

export const erIUke22Pluss3 = (dato: string) => {
    const terminDato = dayjs(dato);
    const uke22Pluss3 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(dayjs().startOf('day'), uke22Pluss3.startOf('day')).isSame(dayjs().startOf('day'));
};

export const utstedtDatoErIUke22 = (utstedtDatoString: string, terminDatoString: string) => {
    const utstedtDato = dayjs(utstedtDatoString).startOf('day');
    const terminDato = dayjs(terminDatoString).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(uke22, utstedtDato).isSame(utstedtDato);
};

export const idagEllerTidligere = (dato: string) => {
    const utstedtDato = dayjs(dato).startOf('day');
    const tomorrow = dayjs().add(1, 'day').startOf('day');
    return dayjs.max(utstedtDato, tomorrow) === tomorrow;
};

export const erMyndig = (fødselsdato: string) => {
    const now = dayjs();
    const momentDate = dayjs(fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};

export const getFørsteMuligeTermindato = () => dayjs().subtract(21, 'days').startOf('day').toDate();

interface ItemWithFom {
    fom: string;
}

interface OpenDateRange {
    from: Date;
    to?: Date;
}

export const getSisteMuligeTermindato = () =>
    dayjs()
        .add(dagerForTerminbekreftelse - 1, 'days')
        .endOf('day')
        .toDate();

export const getForsteMuligeTerminbekreftelsesdato = (termindato?: Date | string): Date => {
    return termindato
        ? dayjs(termindato)
              .subtract(dagerForTerminbekreftelse - 1, 'days')
              .toDate()
        : dayjs().subtract(1, 'years').startOf('day').toDate();
};

export const getSisteMuligeTerminbekreftelsesdato = () => dayjs(new Date()).endOf('day').toDate();

export const dateRangesCollide = (ranges: DateRange[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = ranges.sort(sortDateRange);
        const hasOverlap = ranges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1].from);
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
    const sortedRanges = ranges.sort(sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;

    if (
        !dayjs(from).isBetween(allowedRange.from, allowedRange.to, 'day', '[]') ||
        !dayjs(to).isBetween(allowedRange.from, allowedRange.to, 'day', '[]')
    ) {
        return true;
    }
    return false;
};

export const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

export const sortItemsByFom = (a: ItemWithFom, b: ItemWithFom) =>
    sortOpenDateRange({ from: dayjs(a.fom).toDate() }, { from: dayjs(b.fom).toDate() });

export const sortOpenDateRange = (d1: OpenDateRange, d2: OpenDateRange): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};
