import AdopsjonStartdatoValg from 'app/steps/uttaksplan-info/components/scenarios/mor-far-adopsjon/adopsjonStartdatoValg';

interface UttaksplanInfo {}

export interface MorFødselUttaksplanInfo extends UttaksplanInfo {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean;
    fellesperiodeukerMor: number | undefined;
}

export interface MorFarAdopsjonUttaksplanInfo extends UttaksplanInfo {
    harAnnenForelderSøktFP: boolean;
    startdatoAdopsjonValg: AdopsjonStartdatoValg;
    annenStartdatoAdopsjon: string;
    annenForeldersSisteDag: string;
    søkersFørsteDag: string;
    antallUkerFellesperiode: string;
    antallDagerFellesperiode: string;
    fellesperiodeukerMor: number | undefined;
}

export interface FarMedmorAleneomsorgFødselUttaksplanInfo extends UttaksplanInfo {
    startdatoUttak: string;
    fellesperiodeukerMor: number | undefined;
}

export interface FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo extends UttaksplanInfo {
    permisjonStartdato: string;
}

export interface FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo extends UttaksplanInfo {
    permisjonStartdato: string;
}

export interface FarMedmorFødselBeggeHarRettUttaksplanInfo extends UttaksplanInfo {
    morsSisteDag: string;
    farMedmorsFørsteDag: string;
    antallUkerFellesperiode: string;
    antallDagerFellesperiode: string;
}

export default UttaksplanInfo;
