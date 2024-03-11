export type Arbeidssituasjon = {
    arbeidssituasjon?: ArbeidssituasjonEnum;
    arbeidssituasjonAnnenPart?: boolean;
};

export enum ArbeidssituasjonEnum {
    JOBBER = 'jobber',
    UFØR = 'ufør',
    INGEN = 'ingen',
}
