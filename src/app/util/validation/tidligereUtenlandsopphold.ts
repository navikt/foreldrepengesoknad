import { Avgrensninger } from 'nav-datovelger';
import { date1YearAgo, today } from './values';

export const getFraAvgrensninger = (tilDate?: Date): Avgrensninger => {
    let maksDato = tilDate || today.toDate();
    return {
        minDato: date1YearAgo.toDate(),
        maksDato
    };
};

export const getTilAvgrensninger = (fraDate?: Date): Avgrensninger => {
    const minDato = fraDate || today.toDate();
    return {
        minDato,
        maksDato: today.toDate()
    };
};
