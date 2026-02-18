export enum Arbeidsstatus {
    JOBBER = 'jobber',
    UFØR = 'ufør',
    INGEN = 'jobberIkke',
}

export type Arbeidssituasjon = {
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
};
