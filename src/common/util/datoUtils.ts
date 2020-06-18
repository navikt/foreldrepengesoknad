import moment, { Moment } from 'moment';

export function formaterDato(dato: Date | undefined, datoformat?: string): string {
    return moment.utc(dato).format(datoformat || 'dddd D. MMMM YYYY');
}

export function formaterStønadskontoParamsDatoer(dato: Date | undefined, datoformat?: string): string | undefined {
    return dato !== undefined ? moment.utc(dato).format(datoformat || 'dddd D. MMMM YYYY') : undefined;
}

export function formaterDatoKompakt(dato: Date): string {
    return formaterDato(dato, 'DD.MM.YYYY');
}

export function formaterDatoTall(dato: string, datoformat?: string): string {
    return moment.utc(dato).format(datoformat || 'DD.MM.YYYY');
}

export function formaterDatoUtenDag(dato: Date): string {
    return moment.utc(dato).format('D. MMMM YYYY');
}

export function år(dato: Moment): string {
    return moment.utc(dato).format('YYYY');
}

export function årToBokstaver(dato: Date): string {
    return moment.utc(dato).format('YY');
}

export function måned(dato: Moment): string {
    return moment.utc(dato).format('MMMM');
}

export function måned3bokstaver(dato: Moment): string {
    return dato.format('MMM').substr(0, 3);
}

export function dagOgMåned(dato: Date): string {
    return moment(dato).format('DD.MM');
}

export function mnd(dato: Moment): string {
    return dato.format('MMM');
}

export function ukedag(dato: Moment): string {
    return dato.format('dddd');
}

export function dagIMåned(dato: Moment): string {
    return dato.format('D.');
}

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

export const dateToISOFormattedDateString = (date?: Date) => (date ? moment.utc(date).format('YYYY-MM-DD') : undefined);
