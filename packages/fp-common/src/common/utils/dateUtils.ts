import { Tidsperiode, TidsperiodeMedValgfriSluttdato } from './../types/Tidsperiode';
import { isISODateString } from '@navikt/ds-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';
import { Uttaksdagen } from './Uttaksdagen';
import { TidsperiodeDate } from '../types';
import uttaksConstants from '../constants/constants';

dayjs.extend(utc);

const dateFormat = 'DD.MM.YYYY';
const dateFormatExtended = 'DD. MMM YYYY';

export const formatDate = (date: Date | string) => dayjs(date).format(dateFormat);
export const formatDateExtended = (date: Date | string) => dayjs(date).format(dateFormatExtended);

export const formatTidsperiode = (tidsperiode: Tidsperiode) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom)}`;
};

export const formatTidsperiodeMedValgfriSluttdato = (tidsperiode: TidsperiodeMedValgfriSluttdato) => {
    const tomString = tidsperiode.tom ? formatDate(tidsperiode.tom) : 'pågående';

    return `${formatDate(tidsperiode.fom)} - ${tomString}`;
};

export const doesTidsperiodeContainDate = (tidsperiode: Tidsperiode, date: string) => {
    return dayjs(date).isBetween(tidsperiode.fom, tidsperiode.tom, 'day', '[]');
};

export const doesTidsperiodeMedValgfriSluttdatoContainDate = (
    tidsperiode: TidsperiodeMedValgfriSluttdato,
    date: string,
) => {
    if (tidsperiode.tom === undefined) {
        return false;
    }

    return dayjs(date).isBetween(tidsperiode.fom, tidsperiode.tom, 'day', '[]');
};

export const andreAugust2022ReglerGjelder = (familiehendelsesdato: Date): boolean => {
    const andreAugust2022 = new Date('2022-08-02');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs(new Date()).isSameOrAfter(andreAugust2022, 'day')
    );
};

export const førsteOktober2021ReglerGjelder = (familiehendelsesdato: Date): boolean => {
    const førsteOktober2021 = new Date('2021-10-01');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(førsteOktober2021, 'day') &&
        dayjs(new Date()).isSameOrAfter(førsteOktober2021, 'day')
    );
};

export const tidperiodeOverlapperDato = (tidsperiode: TidsperiodeDate, dato: Date): boolean => {
    return dayjs(tidsperiode.fom).isBefore(dato, 'day') && dayjs(tidsperiode.tom).isSameOrAfter(dato, 'day');
};

export const formaterDatoUtenDag = (dato: string | Date): string => {
    return dayjs(dato).format('D. MMMM YYYY');
};

export const formaterDatoKompakt = (dato: Date): string => {
    return formaterDato(dato, 'DD.MM.YYYY');
};

export const formaterDato = (dato: string | Date | undefined, datoformat?: string): string => {
    return dayjs(dato).format(datoformat || 'dddd D. MMMM YYYY');
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
        },
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
    return true;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return true;
};

export const dateIsBetween = (date: DateValue, fom: DateValue, tom: DateValue): boolean =>
    dayjs(date).isBetween(fom, tom, 'day', '[]');

export function getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato: Date) {
    return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
}

export function getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
}

export const getToTetteReglerGjelder = (
    familiehendelsesdato: Date | undefined,
    familiehendelsesdatoNesteBarn: Date | undefined,
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
