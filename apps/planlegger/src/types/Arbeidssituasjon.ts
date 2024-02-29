export type Arbeidssituasjon = {
    arbeidssituasjonAlene?: ArbeidssituasjonEnum;
    arbeidssituasjonMedAndre?: ArbeidssituasjonEnum;
};

export enum ArbeidssituasjonEnum {
    JOBBER = 'jobber',
    UFØR = 'ufør',
    INGEN = 'ingen',
}
