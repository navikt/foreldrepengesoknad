export enum PeriodeEnum {
    HUNDRE = '100',
    ÅTTI = '80',
}

export type Fordeling = {
    fordeling: string;
    value: string;
};

export type Periode = {
    periode: PeriodeEnum;
    fordeling: Fordeling;
};
