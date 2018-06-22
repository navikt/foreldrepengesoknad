import {
    Period,
    PeriodType,
    SuspensionType
} from 'uttaksplan/timePlanner/types';

export const mockPeriods: Period[] = [
    // {
    //     id: '1',
    //     range: {
    //         start: new Date(2018, 6, 30),
    //         end: new Date(2018, 7, 31)
    //     },
    //     type: PeriodType.Withdrawal
    // },
    {
        id: '2',
        range: {
            start: new Date(2018, 8, 3),
            end: new Date(2018, 8, 14)
        },
        type: PeriodType.Withdrawal
    },
    {
        id: '3',
        range: {
            start: new Date(2018, 8, 17),
            end: new Date(2018, 8, 28)
        },
        type: PeriodType.Suspension,
        suspenstionType: SuspensionType.Holiday
    },
    {
        id: '4',
        range: {
            start: new Date(2018, 9, 1),
            end: new Date(2018, 9, 26)
        },
        type: PeriodType.Withdrawal
    }
];
