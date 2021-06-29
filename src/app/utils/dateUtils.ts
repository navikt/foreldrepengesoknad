import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';
import { formatDateExtended, hasValue, intlUtils } from '@navikt/fp-common';
import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';
import { RegistrertBarn } from 'app/types/Person';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Alder } from 'app/types/Alder';

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(minMax);

export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();

export const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};

const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean
) => {
    if (date === undefined) {
        if (isFomDate) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
        }
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        if (isFomDate) {
            return intlUtils(intl, 'valideringsfeil.dateOutsideRange.fom', {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            });
        }

        return intlUtils(intl, 'valideringsfeil.dateOutsideRange.tom', {
            fom: formatDateExtended(minDate),
            tom: formatDateExtended(maxDate),
        });
    }

    return undefined;
};

const validateFromDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    errorKey: string,
    toDate?: Date
): SkjemaelementFeil => {
    const error = validateDateInRange(intl, date, minDate, maxDate, true);

    if (error !== undefined) {
        return error;
    }

    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return intlUtils(intl, errorKey);
    }

    return undefined;
};

const validateToDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    errorKey: string,
    fromDate?: Date
): SkjemaelementFeil => {
    const error = validateDateInRange(intl, date, minDate, maxDate, false);

    if (error !== undefined) {
        return error;
    }

    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return intlUtils(intl, errorKey);
    }

    return undefined;
};

export const dateRangeValidation = {
    validateToDateInRange,
    validateFromDateInRange,
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

export const isDateInTheFuture = (date: string): boolean => {
    if (dayjs().isBefore(date)) {
        return true;
    }

    return false;
};

export const velgEldsteBarn = (registrerteBarn: RegistrertBarn[], valgteBarn: string[]) => {
    const filteredBarn = registrerteBarn.filter((regBarn) => valgteBarn.includes(regBarn.fnr));

    return filteredBarn.sort((a, b) =>
        isDateABeforeDateB(dateToISOString(a.fødselsdato)!, dateToISOString(b.fødselsdato)!) ? 1 : -1
    )[filteredBarn.length - 1];
};

type VarighetFormat = 'full' | 'normal';

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        }
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--${format}`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

export function formaterStønadskontoParamsDatoer(dato: string | undefined, datoformat?: string): string | undefined {
    return dato !== undefined ? dayjs.utc(dato).format(datoformat || 'dddd D. MMMM YYYY') : undefined;
}

export function formaterDato(dato: Date | undefined, datoformat?: string): string {
    return dayjs.utc(dato).format(datoformat || 'dddd D. MMMM YYYY');
}

export function formaterDatoUtenDag(dato: Date): string {
    return dayjs.utc(dato).format('D. MMMM YYYY');
}

type DateValue = Date | undefined;

export const dateIsSameOrBefore = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrBefore(dayjs(otherDate, 'day'));
    }
    return true;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return true;
};

export function formaterDatoKompakt(dato: Date): string {
    return formaterDato(dato, 'DD.MM.YYYY');
}

export const findEldsteDato = (dateArray: Date[]): DateValue => {
    if (dateArray.length > 0) {
        return dayjs.min(dateArray.map((date: Date) => dayjs(date))).toDate();
    }
    return undefined;
};

export const getAlderFraDato = (fødselsdato: Date): Alder => {
    const idag = dayjs();
    const dato = dayjs(fødselsdato);

    const år = idag.diff(dato, 'year');
    dato.add(år, 'years');
    const måneder = idag.diff(dato, 'months');
    dato.add(måneder, 'months');
    const dager = idag.diff(dato, 'days');

    return {
        år,
        måneder,
        dager,
    };
};
