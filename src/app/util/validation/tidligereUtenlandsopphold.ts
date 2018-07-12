import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger';
import { date1YearAgo, today } from './values';

export const getFraAvgrensninger = (tilDate?: Date): Avgrensninger => {
    const til = moment(tilDate);
    let maksDato = today.toDate();
    if (tilDate && til.isBetween(date1YearAgo, today)) {
        maksDato = tilDate;
    }
    return {
        minDato: date1YearAgo.toDate(),
        maksDato
    };
};

export const getTilAvgrensninger = (fraDate?: Date): Avgrensninger => {
    const fra = moment(fraDate);
    let minDato = today.toDate();
    if (fraDate && fra.isBetween(date1YearAgo, today)) {
        minDato = fraDate;
    }
    return {
        minDato,
        maksDato: today.toDate()
    };
};
