import { Period, PeriodType } from 'uttaksplan/timePlanner/types';
import {
    TimelineItem,
    TimelineItemType,
    TimelineEvent,
    TimelineGap
} from 'uttaksplan/components/timeline/types';
import { tidsperioden } from 'uttaksplan/utils/dataUtils';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';

const mapWithdrawalToTimelineItem = (period: Period): TimelineEvent => ({
    title: 'Withdrawal',
    type: TimelineItemType.event,
    startDate: period.startDate,
    endDate: period.endDate,
    icons: [UttaksplanIkonKeys.uttak],
    days: tidsperioden({
        startdato: period.startDate,
        sluttdato: period.endDate
    }).getAntallUttaksdager(),
    personName: 'Withdrawal',
    data: period
});

const mapSuspensionToTimelineItem = (period: Period): TimelineEvent => ({
    title: 'Suspension',
    type: TimelineItemType.event,
    startDate: period.startDate,
    endDate: period.endDate,
    icons: [UttaksplanIkonKeys.ferie],
    days: tidsperioden({
        startdato: period.startDate,
        sluttdato: period.endDate
    }).getAntallUttaksdager(),
    personName: 'Suspension',
    data: period
});

const mapGapToTimelineItem = (period: Period): TimelineGap => ({
    type: TimelineItemType.gap,
    title: 'Gap',
    startDate: period.startDate,
    endDate: period.endDate,
    days: tidsperioden({
        startdato: period.startDate,
        sluttdato: period.endDate
    }).getAntallUttaksdager(),
    data: period
});
export const mapPeriodsToTimelineItems = (periods: Period[]): TimelineItem[] =>
    periods.map((period) => {
        switch (period.type) {
            case PeriodType.Withdrawal:
                return mapWithdrawalToTimelineItem(period);
            case PeriodType.Suspension:
                return mapSuspensionToTimelineItem(period);
            case PeriodType.Gap:
                return mapGapToTimelineItem(period);
        }
    });
