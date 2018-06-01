import { format, startOfDay } from 'date-fns';
import * as locale from 'date-fns/locale/nb';

export const normaliserDato = (dato: Date): Date => startOfDay(dato);

export function formaterDato(dato: Date, datoformat?: string): string {
    return format(dato, datoformat || 'dddd D. MMMM YYYY', { locale });
}

export function år(dato: Date): string {
    return format(dato, 'YYYY', { locale });
}

export function måned(dato: Date): string {
    return format(dato, 'MMMM', { locale });
}

export function mnd(dato: Date): string {
    return format(dato, 'MMM', { locale });
}

export function ukedag(dato: Date): string {
    return format(dato, 'dddd', { locale });
}

export function ukedagKort(dato: Date): string {
    return format(dato, 'ddd', { locale });
}

export function dagIMåned(dato: Date): string {
    return format(dato, 'D.', { locale });
}

export const getUkerOgDagerFromDager = (
    dager: number
): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker
    };
};
