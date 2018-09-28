import moment from 'moment';

export const normaliserDato = (dato: Date): Date => {
    return moment.utc([dato.getFullYear(), dato.getMonth(), dato.getDate(), 12, 0, 0, 0]).toDate();
};

export function formaterDato(dato: Date, datoformat?: string): string {
    return moment(dato).format(datoformat || 'dddd D. MMMM YYYY');
}

export function formaterDatoUtenDag(dato: Date): string {
    return moment(dato).format('D. MMMM YYYY');
}

export function år(dato: Date): string {
    return moment(dato).format('YYYY');
}

export function måned(dato: Date): string {
    return moment(dato).format('MMMM');
}

export function måned3bokstaver(dato: Date): string {
    return moment(dato)
        .format('MMM')
        .substr(0, 3);
}

export function mnd(dato: Date): string {
    return moment(dato).format('MMM');
}

export function ukedag(dato: Date): string {
    return moment(dato).format('dddd');
}

export function ukedagKort(dato: Date): string {
    return moment(dato).format('ddd');
}

export function dagIMåned(dato: Date): string {
    return moment(dato).format('D.');
}

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker
    };
};
