import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isoWeek);
dayjs.extend(utc);

export const UTTAKSDAGER_PER_UKE = 5;

export const Uttaksdagen = (dato: Date) => ({
    erUttaksdag: (): boolean => erUttaksdag(dato),
    forrige: (): Date => getUttaksdagFørDato(dato),
    neste: (): Date => getUttaksdagEtterDato(dato),
    denneEllerNeste: (): Date => getUttaksdagFraOgMedDato(dato),
    denneEllerForrige: (): Date => getUttaksdagTilOgMedDato(dato),
    trekkFra: (uttaksdager: number): Date => trekkUttaksdagerFraDato(dato, uttaksdager),
});

const getUkedag = (dato: Date): number => {
    return dayjs(dato).isoWeekday();
};

export const erUttaksdag = (dato: Date): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

const getUttaksdagFørDato = (dato: Date): Date => {
    return getUttaksdagTilOgMedDato(dayjs.utc(dato).subtract(24, 'hours').toDate());
};

const getUttaksdagTilOgMedDato = (dato: Date): Date => {
    const newDate = dato ? new Date(dato.getFullYear(), dato.getMonth(), dato.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).subtract(24, 'hours').startOf('day').toDate();
        case 7:
            return dayjs.utc(newDate).subtract(48, 'hours').startOf('day').toDate();
        default:
            return dato;
    }
};

const getUttaksdagEtterDato = (dato: Date): Date => {
    return getUttaksdagFraOgMedDato(dayjs.utc(dato).add(24, 'hours').toDate());
};

const getUttaksdagFraOgMedDato = (dato: Date): Date => {
    const newDate = dato ? new Date(dato.getFullYear(), dato.getMonth(), dato.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).add(48, 'hours').startOf('day').toDate();
        case 7:
            return dayjs.utc(newDate).add(24, 'hours').startOf('day').toDate();
        default:
            return dato;
    }
};

const trekkUttaksdagerFraDato = (dato: Date, uttaksdager: number): Date => {
    if (erUttaksdag(dato) === false) {
        throw new Error('trekkUttaksdagerFraDato: Dato må være uttaksdag');
    }
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = dayjs
            .utc(dato)
            .add(--dagteller * 24, 'hours')
            .toDate();
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
};
