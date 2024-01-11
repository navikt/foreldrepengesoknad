export enum ArbeidssituasjonEnum {
    JOBBER = 'jobber',
    JOBBER_IKKE = 'jobberIkke',
}

export type Arbeidssituasjon = {
    arbeidssituasjonMor?: boolean;
    arbeidssituasjonFar?: boolean;
    arbeidssituasjonMedmor?: boolean;
    arbeidssituasjonMedfar?: boolean;
};
