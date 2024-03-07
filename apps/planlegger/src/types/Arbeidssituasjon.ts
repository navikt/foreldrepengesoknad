export type Arbeidssituasjon = {
    arbeidssituasjon?: ArbeidssituasjonEnum;
    arbeidssituasjonAnnenPart?: ArbeidssituasjonEnum;
};

export enum ArbeidssituasjonEnum {
    JOBBER = 'jobber',
    UFØR = 'ufør',
    INGEN = 'ingen',
}
