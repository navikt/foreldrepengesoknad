import DateHolidays, { HolidaysTypes } from 'date-holidays';
import dayjs from 'dayjs';

import { TidsperiodeDate } from '@navikt/fp-common';

const holidays = new DateHolidays('no');

export const getOffentligeFridager = (tidsperiode: TidsperiodeDate): HolidaysTypes.Holiday[] => {
    const fraÅr =
        typeof tidsperiode.fom === 'string' ? new Date(tidsperiode.fom).getFullYear() : tidsperiode.fom.getFullYear();
    const tilÅr =
        typeof tidsperiode.tom === 'string' ? new Date(tidsperiode.tom).getFullYear() : tidsperiode.tom.getFullYear();

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
    const start = dayjs(tidsperiode.fom).subtract(24, 'hours');
    const slutt = dayjs(tidsperiode.tom).add(24, 'hours');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => dayjs(d.date).isAfter(start, 'day') && dayjs(d.date).isBefore(slutt, 'day'));
};

export const getOffentligeFridagerIMåned = (måned: Date): HolidaysTypes.Holiday[] => {
    const days: HolidaysTypes.Holiday[] = holidays.getHolidays(måned.getFullYear());
    const start = dayjs(måned).startOf('month');
    const slutt = dayjs(måned).endOf('month');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => dayjs(d.date).isAfter(start, 'day') && dayjs(d.date).isBefore(slutt, 'day'));
};

/* Default - hente ut helligdager i default tidsrom */
const fridager = getOffentligeFridager({
    fom: new Date(dayjs().subtract(4, 'years').toDate()),
    tom: new Date(dayjs().add(4, 'years').toDate()),
});

export const erFridag = (dato: Date): string | undefined => {
    const fridag = fridager.find((fr) => dayjs(new Date(fr.date)).isSame(dato, 'day'));
    return fridag ? fridag.name : undefined;
};
