import { UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';

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
    startdatoPermisjon?: Date;
    morSinSisteUttaksdag?: Date;
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
    farSinFørsteUttaksdag?: Date;
    antallUkerFellesperiodeFarMedmor?: number;
    antallDagerFellesperiodeFarMedmor?: number;
    begrunnelseForUtsettelse?: UtsettelseÅrsakType;
    ønskerIkkeFlerePerioder?: boolean;
    ønskerTomPlan?: boolean;
}
