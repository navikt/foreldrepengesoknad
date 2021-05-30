import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';

export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();

export const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};
