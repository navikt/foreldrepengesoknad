import {
    Period,
    PeriodType,
    SuspensionType
} from 'uttaksplan/timePlanner/types';

export const mockPeriods: Period[] = [
    {
        id: '1',
        startDate: new Date(2018, 7, 2),
        endDate: new Date(2018, 7, 28),
        type: PeriodType.Withdrawal
    },
    {
        id: '2',
        startDate: new Date(2018, 7, 30),
        endDate: new Date(2018, 8, 17),
        type: PeriodType.Withdrawal
    },
    {
        id: '3',
        startDate: new Date(2018, 8, 20),
        endDate: new Date(2018, 8, 24),
        type: PeriodType.Suspension,
        suspenstionType: SuspensionType.Holiday
    },
    {
        id: '4',
        startDate: new Date(2018, 8, 27),
        endDate: new Date(2018, 9, 28),
        type: PeriodType.Withdrawal
    }
];
