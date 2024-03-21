export enum ArbeidssituasjonEnum {
    JOBBER = 'Jobber',
    UFØR = 'Ufør',
    INGEN = 'Jobber ikke',
}

export type Arbeidssituasjon = {
    arbeidssituasjon?: ArbeidssituasjonEnum;
    arbeidssituasjonAnnenPart?: boolean;
};
