import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { DateRange } from '../../types';
import { DatepickerLimitations } from '../formik-datepicker/FormikDatepicker';

dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

const sortDateRangeByToDate = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.to).isSameOrBefore(d2.to)) {
        return -1;
    }
    return 1;
};
export const getRangesStartingAfterDate = (date: Date, dateRanges: DateRange[] = []): DateRange[] => {
    return dateRanges.filter((dateRange) => dayjs(dateRange.from).isAfter(date, 'day'));
};

export const getRangesEndingBeforeDate = (date: Date, dateRanges: DateRange[] = []): DateRange[] => {
    return dateRanges.filter((dateRange) => dayjs(dateRange.to).isBefore(date, 'day'));
};

export const findClosestDateAfterDate = (fromDate: Date, dates: Date[]): Date | undefined => {
    const days = dates.map((d) => dayjs(d)).filter((m) => m.isAfter(fromDate, 'day'));
    return days.length > 0 ? dayjs.min(days)!.toDate() : undefined;
};

export const findClosestDateBeforeDate = (fromDate: Date, dates: Date[]): Date | undefined => {
    const days = dates.map((d) => dayjs(d)).filter((m) => m.isBefore(fromDate, 'day'));
    const maxDate = days.length > 0 ? dayjs.max(days)!.toDate() : undefined;
    return maxDate;
};

export const findClosestDateBeforeOrEqualDate = (fromDate: Date, dates: Date[]): Date | undefined => {
    const days = dates.map((d) => dayjs(d)).filter((m) => m.isSameOrBefore(fromDate, 'day'));
    const maxDate = days.length > 0 ? dayjs.max(days)!.toDate() : undefined;
    return maxDate;
};

export const getClosestDateRangeBeforeDate = (date: Date, ranges: DateRange[]): DateRange | undefined => {
    const rangesBeforeDate = getRangesEndingBeforeDate(date, ranges).sort(sortDateRangeByToDate).reverse();
    return rangesBeforeDate.length === 0 ? undefined : rangesBeforeDate[0];
};

export const getClosestDateRangeAfterDate = (date: Date, ranges: DateRange[]): DateRange | undefined => {
    const rangesAfterDate = getRangesStartingAfterDate(date, ranges).sort(sortDateRange);
    return rangesAfterDate.length === 0 ? undefined : rangesAfterDate[0];
};

const getFollowingDate = (
    dateRange: DateRange | undefined,
    allowRangesToStartAndStopOnSameDate?: boolean,
): Date | undefined => {
    if (!dateRange) {
        return undefined;
    }
    return allowRangesToStartAndStopOnSameDate ? dateRange.from : dayjs(dateRange.from).subtract(1, 'day').toDate();
};

export const getMaxDateForRangeStart = ({
    fromDate,
    toDate,
    maxDate,
    otherRanges: dateRanges = [],
    allowRangesToStartAndStopOnSameDate,
}: {
    fromDate?: Date;
    toDate?: Date;
    maxDate?: Date;
    otherRanges?: DateRange[];
    allowRangesToStartAndStopOnSameDate?: boolean;
}): Date | undefined => {
    if (!fromDate) {
        return toDate || maxDate;
    }
    const follwingDateRange = getClosestDateRangeAfterDate(fromDate, dateRanges);
    const followingRangeDate = getFollowingDate(follwingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates: Date[] = [
        ...(toDate ? [toDate] : []),
        ...(maxDate ? [maxDate] : []),
        ...(followingRangeDate ? [followingRangeDate] : []),
    ];
    return findClosestDateAfterDate(fromDate, dates) || maxDate;
};
export const getMaxDateForRangeEnd = ({
    fromDate,
    toDate,
    maxDate,
    dateRanges = [],
    allowRangesToStartAndStopOnSameDate,
}: {
    fromDate?: Date;
    toDate?: Date;
    maxDate?: Date;
    dateRanges?: DateRange[];
    allowRangesToStartAndStopOnSameDate?: boolean;
}): Date | undefined => {
    const baseDate = fromDate || toDate;
    if (!baseDate) {
        return maxDate;
    }
    const follwingDateRange = getClosestDateRangeAfterDate(baseDate, dateRanges);
    const followingDate = getFollowingDate(follwingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates: Date[] = [...(maxDate ? [maxDate] : []), ...(followingDate ? [followingDate] : [])];
    return findClosestDateAfterDate(baseDate, dates) || maxDate;
};

const getPreceedingDate = (
    dateRange: DateRange | undefined,
    allowRangesToStartAndStopOnSameDate?: boolean,
): Date | undefined => {
    if (!dateRange) {
        return undefined;
    }
    return allowRangesToStartAndStopOnSameDate ? dateRange.to : dayjs(dateRange.to).add(1, 'day').toDate();
};

export const getMinDateForRangeStart = ({
    toDate,
    minDate,
    dateRanges = [],
    allowRangesToStartAndStopOnSameDate,
}: {
    toDate?: Date;
    minDate?: Date;
    dateRanges?: DateRange[];
    allowRangesToStartAndStopOnSameDate?: boolean;
}): Date | undefined => {
    if (!toDate) {
        return minDate;
    }
    const preceedingDateRange = getClosestDateRangeBeforeDate(toDate, dateRanges);
    const preceedingDate = getPreceedingDate(preceedingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates: Date[] = [...(minDate ? [minDate] : []), ...(preceedingDate ? [preceedingDate] : [])];

    return findClosestDateBeforeDate(toDate, dates) || minDate;
};

export const getMinDateForRangeEnd = ({
    fromDate,
    toDate,
    minDate,
    dateRanges: otherRanges = [],
    allowRangesToStartAndStopOnSameDate,
}: {
    fromDate?: Date;
    toDate?: Date;
    minDate?: Date;
    dateRanges?: DateRange[];
    allowRangesToStartAndStopOnSameDate?: boolean;
}): Date | undefined => {
    const baseDate = fromDate || toDate;
    if (!baseDate) {
        return minDate;
    }
    const preceedingDateRange = getClosestDateRangeBeforeDate(baseDate, otherRanges);
    const preceedingDate = getPreceedingDate(preceedingDateRange, allowRangesToStartAndStopOnSameDate);
    const dates: Date[] = [
        ...(fromDate ? [fromDate] : []),
        ...(minDate ? [minDate] : []),
        ...(preceedingDate ? [preceedingDate] : []),
    ];
    return findClosestDateBeforeOrEqualDate(baseDate, dates);
};

interface DateRangePickerLimitations {
    fromDateLimitations: DatepickerLimitations;
    toDateLimitations: DatepickerLimitations;
}

export const getDateRangePickerLimitations = (props: {
    /** Selected from date */
    fromDate?: Date;
    /** Selected to date */
    toDate?: Date;
    /** Min allowed date */
    minDate?: Date;
    /** Max allowed date */
    maxDate?: Date;
    /** Other date ranges which become disabled in the datepicker */
    dateRanges?: DateRange[];
    /** Disallow selection of saturday and sunday */
    disableWeekends?: boolean;
    /** Allow one dateRange to start on the same date another ends */
    allowRangesToStartAndStopOnSameDate?: boolean;
}): DateRangePickerLimitations => {
    return {
        fromDateLimitations: {
            minDate: getMinDateForRangeStart(props),
            maxDate: getMaxDateForRangeStart(props),
            disabledDateRanges: props.dateRanges,
            disableWeekends: props.disableWeekends,
        },
        toDateLimitations: {
            minDate: getMinDateForRangeEnd(props),
            maxDate: getMaxDateForRangeEnd(props),
            disabledDateRanges: props.dateRanges,
            disableWeekends: props.disableWeekends,
        },
    };
};
