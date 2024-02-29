export type Arbeidssituasjon = {
    arbeidssituasjonAlene?: ArbeidssituasjonEnum;
    arbeidssituasjonFørste?: ArbeidssituasjonEnum;
    arbeidssituasjonAndre?: ArbeidssituasjonEnum;
};

export enum ArbeidssituasjonEnum {
    JOBBER = 'jobber',
    UFØR = 'ufør',
    INGEN = 'ingen',
}
