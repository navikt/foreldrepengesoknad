export type Arbeidssituasjon = {
    arbeidssituasjon?: ArbeidssituasjonEnum;
    arbeidssituasjonAnnenPart?: boolean;
};

export enum ArbeidssituasjonEnum {
    JOBBER = 'Jobber',
    UFØR = 'Ufør',
    INGEN = 'Jobber ikke',
}
