import moment from 'moment';
import DateHolidays, { Holiday } from 'date-holidays';
import { Tidsperiode } from 'common/types';

const holidays = DateHolidays('no');

export const getOffentligeFridager = (tidsperiode: Tidsperiode): Holiday[] => {
    const fraÅr = tidsperiode.fom.getFullYear();
    const tilÅr = tidsperiode.tom.getFullYear();
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
    const start = moment(tidsperiode.fom).subtract(1, 'days');
    const slutt = moment(tidsperiode.tom).add(1, 'days');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => moment(d.date).isAfter(start) && moment(d.date).isBefore(slutt));
};

export const getOffentligeFridagerIMåned = (måned: Date): Holiday[] => {
    const days: Holiday[] = holidays.getHolidays(måned.getFullYear());
    const start = moment(måned).startOf('month');
    const slutt = moment(måned).endOf('month');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => moment(d.date).isAfter(start) && moment(d.date).isBefore(slutt));
};

/* Default - hente ut helligdager i default tidsrom */
export const fridager = getOffentligeFridager({
    fom: new Date(2017, 0, 1),
    tom: new Date(2022, 0, 1)
});

export const erFridag = (dato: Date): string | undefined => {
    const fridag = fridager.find((fr) => moment(new Date(fr.date)).isSame(dato, 'day'));
    return fridag ? fridag.name : undefined;
};
