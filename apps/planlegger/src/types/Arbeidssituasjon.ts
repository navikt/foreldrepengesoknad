export enum ArbeidssituasjonEnum {
    JOBBER = 'jobber',
    JOBBER_IKKE = 'jobberIkke',
}

export type Arbeidssituasjon = {
    omArbeidssituasjon?: ArbeidssituasjonEnum;
};
