import { CalendarPeriodColor } from './CalendarPeriodColor';

export type CalendarPeriod = {
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText: string;
    isSelected?: boolean;
    isUpdated?: boolean;
};
