import { Tidsperiode } from '../types';
import { isWithinRange } from 'date-fns';
import { erUttaksdag, getForsteUttaksdagFørDato } from './uttaksdagerUtils';
import { normaliserDato } from 'common/util/datoUtils';

export type DatoValideringsfeil =
    | 'ikkeUttaksdag'
    | 'utenforPerioder'
    | 'ugyldigDato'
    | 'innenforUlovligPeriode'
    | 'innenforForsteSeksUker'
    | undefined;

export const nyDato = (datostring?: string): Date =>
    normaliserDato(datostring ? new Date(datostring) : new Date());

export const erSammeDato = (dato1: Date, dato2: Date) =>
    normaliserDato(dato1).getTime() === normaliserDato(dato2).getTime();

export const separerTekstArray = (tekster: string[]): string => {
    const arr = [...tekster];
    const siste = arr.pop();
    return `${arr.join(', ')} og ${siste}`;
};

export const validerDato = (
    dato: Date,
    tidsrom: Tidsperiode,
    ugyldigePerioder: Tidsperiode[] = [],
    termindato?: Date
): DatoValideringsfeil => {
    if (!dato) {
        return 'ugyldigDato';
    }
    if (
        termindato &&
        isWithinRange(
            normaliserDato(dato),
            normaliserDato(termindato),
            normaliserDato(getForsteUttaksdagFørDato(tidsrom.startdato))
        )
    ) {
        return 'innenforForsteSeksUker';
    }
    if (
        !isWithinRange(
            normaliserDato(dato),
            normaliserDato(tidsrom.startdato),
            normaliserDato(tidsrom.sluttdato)
        )
    ) {
        return 'utenforPerioder';
    }
    if (!erUttaksdag(dato)) {
        return 'ikkeUttaksdag';
    }
    let gyldig: DatoValideringsfeil;
    ugyldigePerioder.forEach((p) => {
        if (gyldig && isWithinRange(dato, p.startdato, p.sluttdato)) {
            gyldig = 'innenforUlovligPeriode';
        }
    });
    return gyldig;
};
