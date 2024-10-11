import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

import { isISODateString } from '@navikt/fp-utils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const formaterDato = (dato: string | Date | undefined, datoformat?: string): string => {
    return dayjs(dato).format(datoformat || 'dddd D. MMMM YYYY');
};

export const formaterTid = (dato: Date): string => {
    return formaterDato(dato, 'KL.HH:mm');
};

export const ISOStringToDate = (dateString: string | undefined) => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return dayjs.utc(dateString).toDate();
    }
    return undefined;
};

export const getErDatoInnenEnDagFraAnnenDato = (dato1: Date | undefined, dato2: Date | undefined): boolean => {
    if (dato1 === undefined || dato2 === undefined) {
        return false;
    }
    return (
        dayjs(dato1).isSameOrAfter(dayjs(dato2).subtract(1, 'day'), 'day') &&
        dayjs(dato1).isSameOrBefore(dayjs(dato2).add(1, 'day'), 'day')
    );
};
