import { Period, PeriodType, Range } from 'uttaksplan/timePlanner/types';
import {
    TimelineItem,
    TimelineItemType,
    TimelineEvent,
    TimelineGap
} from 'uttaksplan/components/timeline/types';
import {
    tidsperioden,
    uttaksdagUtil,
    getTidsperiode
} from 'uttaksplan/utils/dataUtils';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import { isBefore, isAfter, isSameDay } from 'date-fns';

import Moment from 'moment';
import { extendMoment, DateRange } from 'moment-range';
import { guid } from 'nav-frontend-js-utils/lib';
import { Tidsperiode } from 'common/types';

const moment = extendMoment(Moment);

const mapWithdrawalToTimelineItem = (
    period: Period,
    selected?: boolean
): TimelineEvent => ({
    title: 'Withdrawal',
    type: TimelineItemType.event,
    startDate: period.range.start,
    endDate: period.range.end,
    icons: [UttaksplanIkonKeys.uttak],
    days: tidsperioden({
        startdato: period.range.start,
        sluttdato: period.range.end
    }).getAntallUttaksdager(),
    personName: 'Withdrawal',
    data: period,
    selected
});

const mapSuspensionToTimelineItem = (
    period: Period,
    selected?: boolean
): TimelineEvent => ({
    title: 'Suspension',
    type: TimelineItemType.event,
    startDate: period.range.start,
    endDate: period.range.end,
    icons: [UttaksplanIkonKeys.ferie],
    days: tidsperioden({
        startdato: period.range.start,
        sluttdato: period.range.end
    }).getAntallUttaksdager(),
    personName: 'Suspension',
    data: period,
    selected
});

const mapGapToTimelineItem = (
    period: Period,
    selected?: boolean
): TimelineGap => ({
    type: TimelineItemType.gap,
    title: 'Gap',
    startDate: period.range.start,
    endDate: period.range.end,
    days: tidsperioden({
        startdato: period.range.start,
        sluttdato: period.range.end
    }).getAntallUttaksdager(),
    data: period,
    selected
});
export const mapPeriodsToTimelineItems = (
    periods: Period[],
    selectedPeriod?: Period
): TimelineItem[] =>
    periods.map((period) => {
        const selected = selectedPeriod && selectedPeriod.id === period.id;
        switch (period.type) {
            case PeriodType.Withdrawal:
                return mapWithdrawalToTimelineItem(period, selected);
            case PeriodType.Suspension:
                return mapSuspensionToTimelineItem(period, selected);
            case PeriodType.Gap:
                return mapGapToTimelineItem(period, selected);
        }
    });

export const sortPeriods = (p1: Period, p2: Period) =>
    isBefore(p1.range.start, p2.range.start) ? -1 : 1;

export const insertPeriod = (
    period: Period,
    oldPeriods: Period[]
): Period[] => {
    const periods = Periods(oldPeriods);
    const { start } = period.range;

    const unaffectedPeriods = periods.getPeriodsBeforeDate(start);
    const periodContainingDate = periods.getPeriodContainingDate(start);
    const followingPeriods: Period[] = periods.getPeriodsAfterDate(start);

    let newPeriods: Period[] = [period];
    if (periodContainingDate) {
        if (periodContainingDate.type === PeriodType.Suspension) {
            throw new Error('Can not insert into an Suspension period');
        }
        newPeriods = instertPeriodIntoPeriod(periodContainingDate, period);
    }
    const uttaksdager = tidsperioden({
        startdato: period.range.start,
        sluttdato: period.range.end
    }).getAntallUttaksdager();

    return [
        ...unaffectedPeriods,
        ...newPeriods,
        ...shiftPeriods(followingPeriods, uttaksdager)
    ];
};

export const getRange = (range: Range): DateRange => {
    return moment.range(range.start, range.end);
};

export const Periods = (periods: Period[]) => ({
    getPeriodContainingDate: (date: Date) =>
        periods.find((period) => getRange(period.range).contains(date)),
    getPeriodsBeforeDate: (date: Date): Period[] =>
        periods.filter((period) => isBefore(period.range.end, date)),
    getPeriodsAfterDate: (date: Date): Period[] =>
        periods.filter((period) => isAfter(period.range.start, date))
});

export const instertPeriodIntoPeriod = (
    periodToSplit: Period,
    periodToInsert: Period
): Period[] => {
    if (isSameDay(periodToSplit.range.start, periodToInsert.range.start)) {
        return [periodToInsert, periodToSplit];
    }
    const spSplit = tidsperioden({
        startdato: periodToSplit.range.start,
        sluttdato: periodToSplit.range.end
    });
    const uttaksdagerSplit = spSplit.getAntallUttaksdager();
    const r1: Range = {
        start: periodToSplit.range.start,
        end: uttaksdagUtil(periodToInsert.range.start).forrige()
    };
    const r1Uttak = tidsperioden({
        startdato: r1.start,
        sluttdato: r1.end
    }).getAntallUttaksdager();
    const startR3 = uttaksdagUtil(periodToInsert.range.end).neste();
    const r3: Range = {
        start: startR3,
        end: uttaksdagUtil(startR3).leggTil(uttaksdagerSplit - r1Uttak - 1)
    };

    const periods: Period[] = [
        {
            ...periodToSplit,
            range: r1
        },
        periodToInsert,
        {
            ...periodToSplit,
            id: guid(),
            range: r3
        }
    ];

    return periods;
};

export const shiftPeriods = (
    periods: Period[],
    uttaksdager: number
): Period[] => {
    // const suspensions = periods.filter((p) => p.type === PeriodType.Suspension);
    // const withdrawals = resetPeriodDates(
    //     periods.filter((p) => p.type === PeriodType.Withdrawal)
    // );
    const startDate = uttaksdagUtil(periods[0].range.start).leggTil(
        uttaksdager
    );
    return resetPeriodDatesFromDate(periods, startDate);
};

export const resetPeriodDatesFromDate = (
    periods: Period[],
    start: Date
): Period[] => {
    const resetPeriods: Period[] = [];
    let lastEndDate: Date;
    periods.sort(sortPeriods).forEach((period, idx) => {
        let range: Range;
        if (idx === 0) {
            const tidsperiode = getTidsperiode(
                start,
                tidsperioden(
                    getTidsperiodeFromPeriod(period)
                ).getAntallUttaksdager()
            );
            range = {
                start: tidsperiode.startdato,
                end: tidsperiode.sluttdato
            };
        } else {
            const tidsperiode = getTidsperiode(
                uttaksdagUtil(lastEndDate).neste(),
                tidsperioden(
                    getTidsperiodeFromPeriod(period)
                ).getAntallUttaksdager()
            );
            range = {
                start: tidsperiode.startdato,
                end: tidsperiode.sluttdato
            };
        }
        lastEndDate = range.end;
        resetPeriods.push({
            ...period,
            range
        });
    });

    return resetPeriods;
};

const getTidsperiodeFromPeriod = (period: Period): Tidsperiode => ({
    startdato: period.range.start,
    sluttdato: period.range.end
});
