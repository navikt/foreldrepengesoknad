/** Hvem av de to søkerne som starter permisjonen med foreldrepenger. Kun aktuelt ved adopsjon (likekjønnede par og mor/far). */
export type HvemStarterPermisjon = 'søker1' | 'søker2';

/** Planlegger-specific input type representing how the couple splits the fellesperiode */
export type FordelingPlanlegger = {
    antallDagerSøker1: number;
    hvemStarterPermisjon?: HvemStarterPermisjon;
};
