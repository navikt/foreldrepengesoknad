import dayjs from 'dayjs';

export const niMånederFremITid = (dato: Date) => dayjs(dato).startOf('day').add(9, 'months').toDate();
export const etÅrSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(1, 'year').add(1, 'day').toDate();
export const enMånedSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(1, 'month').toDate();
export const halvannetÅrSiden = (dato: Date) =>
    dayjs(dato).startOf('day').subtract(1, 'year').subtract(6, 'months').toDate();
export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();
export const treUkerSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(3, 'weeks').toDate();
