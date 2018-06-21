export interface Duration {
    startdate: Date;
    duration: number;
}

export enum PeriodType {
    'Withdrawal' = 'withdrawal',
    'Suspension' = 'suspension',
    'Gap' = 'gap'
}

export enum SuspensionType {
    'Holiday' = 'holiday',
    'Work' = 'work',
    'PlannedGap' = 'plannedGap'
}

export enum PersonType {
    'FirstParent' = 'firstParent',
    'SecondParent' = 'secondParent'
}

export interface BasePeriod {
    id?: string;
    type: PeriodType;
    startDate: Date;
    endDate: Date;
    duration?: number;
}

export interface Withdrawal extends BasePeriod {
    type: PeriodType.Withdrawal;
    person?: PersonType;
}

export interface Suspension extends BasePeriod {
    type: PeriodType.Suspension;
    suspenstionType?: SuspensionType;
    person?: PersonType;
}

export interface Gap extends BasePeriod {
    type: PeriodType.Gap;
}

export type Period = Withdrawal | Suspension | Gap;
