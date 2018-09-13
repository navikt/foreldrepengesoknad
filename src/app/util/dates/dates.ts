import { Alder } from '../../types/common';
import * as moment from 'moment';
import { Tidsperiode } from 'common/types';

export const getDateFromString = (dato?: string) => {
    if (dato) {
        return new Date(dato);
    }
    return undefined;
};

export const getAlderFraDato = (fødselsdato: Date): Alder => {
    const idag = moment().startOf('day');
    const dato = moment(fødselsdato).startOf('day');

    const år = idag.diff(dato, 'year');
    dato.add(år, 'years');
    const måneder = idag.diff(dato, 'months');
    dato.add(måneder, 'months');
    const dager = idag.diff(dato, 'days');

    return {
        år,
        måneder,
        dager
    };
};

export const formatDate = (dato?: Date | string) => {
    if (dato) {
        const parsetDato = moment(dato);
        return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
    }
    return dato;
};

export const prettifyTidsperiode = (tidsperiode: Partial<Tidsperiode>) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom) || 'pågående'}`;
};

export const findOldestDate = (dateArray: Date[]): Date | undefined => {
    if (dateArray.length > 0) {
        return moment.max(dateArray.map((date: Date) => moment(date))).toDate();
    }
    return undefined;
};
