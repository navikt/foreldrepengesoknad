import { Period, PeriodType } from 'uttaksplan/timePlanner/types';
import {
    TimelineItem,
    TimelineItemType,
    TimelineEvent,
    TimelineGap
} from 'uttaksplan/components/timeline/types';
import { tidsperioden } from 'uttaksplan/utils/dataUtils';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import { isBefore } from 'date-fns';

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

export const insertPeriod = (period: Period, periods: Period[]): Period[] => {
    // const periodsContainer
    return periods;
};
