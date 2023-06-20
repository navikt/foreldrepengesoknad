import { Tidsperiode, TidsperiodeMedValgfriSluttdato } from './../types/Tidsperiode';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isISODateString } from '@navikt/ds-datepicker';

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

export const ISOStringToDate = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return dayjs.utc(dateString).toDate();
    }
    return undefined;
};
