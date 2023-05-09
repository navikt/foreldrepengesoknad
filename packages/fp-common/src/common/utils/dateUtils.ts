import { Tidsperiode, TidsperiodeMedValgfriSluttdato } from './../types/Tidsperiode';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const dateFormat = 'DD.MM.YYYY';
const dateFormatExtended = 'DD. MMM YYYY';

export const formatDate = (date: Date | string) => dayjs.utc(date).format(dateFormat);
export const formatDateExtended = (date: Date | string) => dayjs.utc(date).format(dateFormatExtended);

export const formatTidsperiode = (tidsperiode: Tidsperiode) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom)}`;
};

export const formatTidsperiodeMedValgfriSluttdato = (tidsperiode: TidsperiodeMedValgfriSluttdato) => {
    const tomString = tidsperiode.tom ? formatDate(tidsperiode.tom) : 'pågående';

    return `${formatDate(tidsperiode.fom)} - ${tomString}`;
};

export const doesTidsperiodeContainDate = (tidsperiode: Tidsperiode, date: string) => {
    return dayjs.utc(date).isBetween(dayjs.utc(tidsperiode.fom), dayjs.utc(tidsperiode.tom), 'day', '[]');
};

export const doesTidsperiodeMedValgfriSluttdatoContainDate = (
    tidsperiode: TidsperiodeMedValgfriSluttdato,
    date: string
) => {
    if (tidsperiode.tom === undefined) {
        return false;
    }

    return dayjs.utc(date).isBetween(dayjs.utc(tidsperiode.fom), dayjs.utc(tidsperiode.tom), 'day', '[]');
};
