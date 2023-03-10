import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

export enum ValgalternativerAdopsjonStartdato {
    'ankomst' = 'ankomst',
    'omsorgsovertakelse' = 'omsorgsovertakelse',
    'annen' = 'annen',
}

export enum ValgalternativerAleneomsorgFarMedmor {
    'datoForAleneomsorg' = 'datoForAleneomsorg',
    'annen' = 'annen',
}

export interface UttaksplanSkjemadata {
    startdatoPermisjon?: string;
    morSinSisteUttaksdag?: string;
    skalStarteRettEtterMor?: boolean;
    skalIkkeHaUttakFørTermin?: boolean;
    harPlanlagtOppholdIUttak?: boolean;
    fellesperiodeukerMor?: number;
    forslagLaget?: boolean;
    harAnnenForelderSøktFP?: boolean;
    skalHaDelAvFellesperiode?: boolean;
    utsettelseEtterMorSkjemaValid?: boolean;
    planlagtOppholdSkjemaValid?: boolean;
    valgtAdopsjonStartdato?: ValgalternativerAdopsjonStartdato;
    valgtStartdatoAleneomsorgFarMedmor?: ValgalternativerAleneomsorgFarMedmor;
    farSinFørsteUttaksdag?: string;
    antallUkerFellesperiodeFarMedmor?: number;
    antallDagerFellesperiodeFarMedmor?: number;
    begrunnelseForUtsettelse?: UtsettelseÅrsakType;
    ønskerIkkeFlerePerioder?: boolean;
    ønskerTomPlan?: boolean;
}
