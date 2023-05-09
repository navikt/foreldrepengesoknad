import dayjs from 'dayjs';
import DateHolidays, { HolidaysTypes } from 'date-holidays';
import { TidsperiodeDate } from '@navikt/fp-common';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const holidays = new DateHolidays('no');

export const getOffentligeFridager = (tidsperiode: TidsperiodeDate): HolidaysTypes.Holiday[] => {
    const fraÅr = tidsperiode.fom.getFullYear();
    const tilÅr = tidsperiode.tom.getFullYear();
    let days = [] as HolidaysTypes.Holiday[];
    if (fraÅr === tilÅr) {
        days = holidays.getHolidays(fraÅr);
    } else {
        let år = fraÅr;
        while (år <= tilÅr) {
            days = [...days, ...holidays.getHolidays(år)];
            år++;
        }
    }
    const start = dayjs.utc(tidsperiode.fom).subtract(24, 'hours');
    const slutt = dayjs.utc(tidsperiode.tom).add(24, 'hours');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => dayjs.utc(d.date).isAfter(start, 'day') && dayjs.utc(d.date).isBefore(slutt, 'day'));
};

export const getOffentligeFridagerIMåned = (måned: Date): HolidaysTypes.Holiday[] => {
    const days: HolidaysTypes.Holiday[] = holidays.getHolidays(måned.getFullYear());
    const start = dayjs.utc(måned).startOf('month');
    const slutt = dayjs.utc(måned).endOf('month');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => dayjs.utc(d.date).isAfter(start, 'day') && dayjs.utc(d.date).isBefore(slutt, 'day'));
};

/* Default - hente ut helligdager i default tidsrom */
export const fridager = getOffentligeFridager({
    fom: new Date(dayjs().subtract(4, 'years').toDate()),
    tom: new Date(dayjs().add(4, 'years').toDate()),
});

export const erFridag = (dato: Date): string | undefined => {
    const fridag = fridager.find((fr) => dayjs.utc(fr.date).isSame(dato, 'day'));
    return fridag ? fridag.name : undefined;
};
