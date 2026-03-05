import { CalendarPeriodColor } from './CalendarPeriodColor';

type CalendarPeriodBase = {
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText: string;
    isSelected?: boolean;
    isUpdated?: boolean;
};

type CalendarPeriodWithoutIcon = CalendarPeriodBase & {
    icon?: never;
    iconFull?: never;
};

type CalendarPeriodWithIcon = CalendarPeriodBase & {
    icon: React.ReactElement;
    iconFull: boolean;
};

export type CalendarPeriod = CalendarPeriodWithoutIcon | CalendarPeriodWithIcon;
