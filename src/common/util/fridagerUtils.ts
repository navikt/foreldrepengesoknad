import DateHolidays, { Holiday } from 'date-holidays';
import {
    isBefore,
    isAfter,
    addDays,
    startOfMonth,
    endOfMonth,
    isEqual
} from 'date-fns';
import { normaliserDato } from 'common/util/datoUtils';
import { Tidsperiode } from 'nav-datovelger';

const holidays = DateHolidays('no');

export const getOffentligeFridager = (tidsperiode: Tidsperiode): Holiday[] => {
    const fraÅr = tidsperiode.startdato.getFullYear();
    const tilÅr = tidsperiode.sluttdato.getFullYear();
    let days = [] as Holiday[];
    if (fraÅr === tilÅr) {
        days = holidays.getHolidays(fraÅr);
    } else {
        let år = fraÅr;
        while (år <= tilÅr) {
            days = [...days, ...holidays.getHolidays(år)];
            år++;
        }
    }
    const start = addDays(tidsperiode.startdato, -1);
    const slutt = addDays(tidsperiode.sluttdato, 1);
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => isAfter(d.date, start) && isBefore(d.date, slutt));
};

export const getOffentligeFridagerIMåned = (måned: Date): Holiday[] => {
    const days: Holiday[] = holidays.getHolidays(måned.getFullYear());
    const start = startOfMonth(måned);
    const slutt = endOfMonth(måned);
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => isAfter(d.date, start) && isBefore(d.date, slutt));
};

/* Default - hente ut helligdager i default tidsrom */
export const fridager = getOffentligeFridager({
    startdato: new Date(2017, 0, 1),
    sluttdato: new Date(2022, 0, 1)
});

export const erFridag = (dato: Date): string | undefined => {
    const d = normaliserDato(dato);
    const fridag = fridager.find((fr) => isEqual(new Date(fr.date), d));
    return fridag ? fridag.name : undefined;
};
