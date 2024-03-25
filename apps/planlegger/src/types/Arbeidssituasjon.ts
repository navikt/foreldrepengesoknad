export enum Arbeidsstatus {
    JOBBER = 'Jobber',
    UFØR = 'Ufør',
    INGEN = 'Jobber ikke',
}

export type Arbeidssituasjon = {
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
};
