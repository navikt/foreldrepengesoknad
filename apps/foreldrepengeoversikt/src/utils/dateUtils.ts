import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

import { getDecoratorLanguageCookie } from '@navikt/fp-utils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

type DateType = string | undefined;

export const formaterDato = (dato: DateType, datoformat?: string) => {
    return dayjs(dato).format(datoformat || 'dddd D. MMMM YYYY');
};

export const formaterTid = (dato: DateType) => {
    return formaterDato(dato, 'KL.HH:mm');
};

export const getErDatoInnenEnDagFraAnnenDato = (dato1: string | undefined, dato2: string | undefined): boolean => {
    if (dato1 === undefined || dato2 === undefined) {
        return false;
    }
    return (
        dayjs(dato1).isSameOrAfter(dayjs(dato2).subtract(1, 'day'), 'day') &&
        dayjs(dato1).isSameOrBefore(dayjs(dato2).add(1, 'day'), 'day')
    );
};
