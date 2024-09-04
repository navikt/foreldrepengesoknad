import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';

import { Uttaksdagen, isISODateString } from '@navikt/fp-utils';

import { TidsperiodeDate, Utsettelsesperiode } from '../types';
import { Tidsperiode } from './../types/Tidsperiode';
import { SkjemaelementFeil, hasValue } from './validationUtils';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

dayjs.extend(utc);
const dateFormat = 'DD.MM.YYYY';
const dateFormatExtended = 'DD. MMMM YYYY';

const formatDate = (date: Date | string) => dayjs(date).format(dateFormat);
const formatDateExtended = (date: Date | string) => dayjs(date).format(dateFormatExtended);

export const andreAugust2022ReglerGjelder = (familiehendelsesdato: string | Date): boolean => {
    const andreAugust2022 = new Date('2022-08-02');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs(new Date()).isSameOrAfter(andreAugust2022, 'day')
    );
};

export const førsteOktober2021ReglerGjelder = (familiehendelsesdato: string | Date): boolean => {
    const førsteOktober2021 = new Date('2021-10-01');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(førsteOktober2021, 'day') &&
        dayjs(new Date()).isSameOrAfter(førsteOktober2021, 'day')
    );
};

export const tidperiodeOverlapperDato = (tidsperiode: TidsperiodeDate, dato: string | Date): boolean => {
    return dayjs(tidsperiode.fom).isBefore(dato, 'day') && dayjs(tidsperiode.tom).isSameOrAfter(dato, 'day');
};

export const formaterDatoUtenDag = (dato: string | Date): string => {
    return dayjs(dato).format('D. MMMM YYYY');
};

export const formaterDatoKompakt = (dato: Date): string => {
    return formaterDato(dato, 'DD.MM.YYYY');
};

export const formaterDato = (dato: string | Date | undefined, datoformat?: string): string => {
    return dayjs(dato).format(datoformat ?? 'dddd D. MMMM YYYY');
};

export const ISOStringToDate = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return dayjs.utc(dateString).toDate();
    }
    return undefined;
};

export const convertTidsperiodeToTidsperiodeDate = (tidsperiode: Tidsperiode): TidsperiodeDate => {
    return {
        fom: ISOStringToDate(tidsperiode.fom)!,
        tom: ISOStringToDate(tidsperiode.tom)!,
    };
};

export const isDateToday = (date: string): boolean => {
    if (dayjs().isSame(date, 'day')) {
        return true;
    }

    return false;
};

export const isDateTodayOrInTheFuture = (date: string): boolean => {
    return isDateInTheFuture(date) || isDateToday(date);
};

export const isDateInTheFuture = (date: string): boolean => {
    if (dayjs().isBefore(date, 'day')) {
        return true;
    }

    return false;
};

export const isDateABeforeDateB = (a: string, b: string): boolean => {
    if (!hasValue(a) || !hasValue(b) || !isISODateString(a) || !isISODateString(b)) {
        return false;
    }

    if (dayjs(a).isBefore(b, 'day')) {
        return true;
    }

    return false;
};

export const måned = (dato: Dayjs): string => {
    return dato.format('MMMM');
};

export const måned3bokstaver = (dato: Dayjs): string => {
    return dato.format('MMM').substr(0, 3);
};

export const år = (dato: Dayjs): string => {
    return dato.format('YYYY');
};

type DateValue = Date | undefined;

export const dateIsSameOrBefore = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrBefore(otherDate, 'day');
    }
    return false;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return false;
};

export const dateIsBetween = (date: DateValue, fom: DateValue | string, tom: DateValue | string): boolean =>
    dayjs(date).isBetween(fom, tom, 'day', '[]');

export function getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato: Date) {
    return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
}

export const getToTetteReglerGjelder = (
    familiehendelsesdato: string | Date | undefined,
    familiehendelsesdatoNesteBarn: string | Date | undefined,
): boolean => {
    if (familiehendelsesdato === undefined || familiehendelsesdatoNesteBarn === undefined) {
        return false;
    }
    const familiehendelsePlus48Uker = dayjs(familiehendelsesdato).add(48, 'week');
    return (
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        andreAugust2022ReglerGjelder(familiehendelsesdatoNesteBarn) &&
        dayjs(familiehendelsePlus48Uker).isAfter(familiehendelsesdatoNesteBarn, 'day')
    );
};

export const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const getMeldingOmOverlappendeUtsettelser = (
    utsettelserIPlan: Utsettelsesperiode[] | undefined,
    dato: Date | undefined,
    intl: IntlShape,
    periodeId: string | undefined,
): string | undefined => {
    if (dato === undefined || utsettelserIPlan === undefined) {
        return undefined;
    }
    const overlappendeUtsettelsesPerioder = utsettelserIPlan.filter(
        (up) =>
            dayjs(dato).isSameOrAfter(up.tidsperiode.fom, 'day') &&
            dayjs(dato).isSameOrBefore(up.tidsperiode.tom, 'day') &&
            up.id !== periodeId,
    );
    if (overlappendeUtsettelsesPerioder.length > 0) {
        return intl.formatMessage(
            { id: 'valideringsfeil.overlapperEnUtsettelse' },
            {
                fom: formatDate(overlappendeUtsettelsesPerioder[0].tidsperiode.fom),
                tom: formatDate(overlappendeUtsettelsesPerioder[0].tidsperiode.tom),
            },
        );
    }

    return undefined;
};

const validateDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean,
) => {
    if (date === undefined) {
        if (isFomDate) {
            return intl.formatMessage({ id: 'valideringsfeil.fraOgMedDato.gyldigDato' });
        }
        return intl.formatMessage({ id: 'valideringsfeil.tilOgMedDato.gyldigDato' });
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        if (isFomDate) {
            return intl.formatMessage(
                { id: 'valideringsfeil.dateOutsideRange.fom' },
                {
                    fom: formatDateExtended(minDate),
                    tom: formatDateExtended(maxDate),
                },
            );
        }

        return intl.formatMessage(
            { id: 'valideringsfeil.dateOutsideRange.tom' },
            {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            },
        );
    }

    return undefined;
};

const validateFromDateInRange = ({
    intl,
    date,
    minDate,
    maxDate,
    errorKey,
    disableWeekend,
    periodeId,
    utsettelserIPlan,
    toDate,
}: {
    intl: IntlShape;
    date: Date | undefined;
    minDate: Date;
    maxDate: Date;
    errorKey: string;
    disableWeekend: boolean;
    periodeId?: string;
    utsettelserIPlan?: Utsettelsesperiode[];
    toDate?: Date;
}): SkjemaelementFeil => {
    if (toDate && date && dayjs(date).isAfter(toDate, 'day')) {
        return intl.formatMessage({ id: errorKey });
    }

    const error = validateDateInRange(intl, date, minDate, maxDate, true);

    if (disableWeekend && (dayjs(date).day() === 0 || dayjs(date).day() === 6)) {
        return intl.formatMessage({ id: 'valideringsfeil.fraDatoErHelgedag' });
    }

    if (error !== undefined) {
        return error;
    }

    return getMeldingOmOverlappendeUtsettelser(utsettelserIPlan, date, intl, periodeId);
};

const validateToDateInRange = ({
    intl,
    date,
    minDate,
    maxDate,
    errorKey,
    disableWeekend,
    periodeId,
    utsettelserIPlan,
    fromDate,
}: {
    intl: IntlShape;
    date: Date | undefined;
    minDate: Date;
    maxDate: Date;
    errorKey: string;
    disableWeekend: boolean;
    periodeId?: string;
    utsettelserIPlan?: Utsettelsesperiode[];
    fromDate?: Date;
}): SkjemaelementFeil => {
    if (fromDate && date && dayjs(date).isBefore(fromDate, 'day')) {
        return intl.formatMessage({ id: errorKey });
    }

    const error = validateDateInRange(intl, date, minDate, maxDate, false);

    if (error !== undefined) {
        return error;
    }

    if (disableWeekend && (dayjs(date).day() === 0 || dayjs(date).day() === 6)) {
        return intl.formatMessage({ id: 'valideringsfeil.tilDatoErHelgedag' });
    }

    return getMeldingOmOverlappendeUtsettelser(utsettelserIPlan, date, intl, periodeId);
};

export const dateRangeValidation = {
    validateToDateInRange,
    validateFromDateInRange,
};
