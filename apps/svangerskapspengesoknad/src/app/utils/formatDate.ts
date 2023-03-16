import moment from 'moment';
import { Tidsperiode } from 'common/types';

export const dateToHours = (date: Date) => moment(date).format('HH:mm');

type FormatDateOverloads = {
    (dato: string): string;
    (dato: string | undefined): string | undefined;
};

export const formatDate: FormatDateOverloads = (dato: string | undefined): any => {
    if (dato) {
        const parsetDato = moment(dato);
        return parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
    }
    return dato;
};

export const prettifyTidsperiode = (tidsperiode: Partial<Tidsperiode>) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom) || 'pågående'}`;
};
