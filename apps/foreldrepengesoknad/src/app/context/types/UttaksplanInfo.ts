import AdopsjonStartdatoValg from 'app/steps/uttaksplan-info/components/scenarios/mor-far-adopsjon/adopsjonStartdatoValg';

type UttaksplanInfo =
    | MorFødselUttaksplanInfo
    | MorFarAdopsjonUttaksplanInfo
    | FarMedmorAleneomsorgFødselUttaksplanInfo
    | FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo
    | FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo
    | FarMedmorFødselBeggeHarRettUttaksplanInfo
    | MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo
    | MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo;

export interface MorFødselUttaksplanInfo {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean;
    fellesperiodeukerMor: number | undefined;
}

export interface MorFarAdopsjonUttaksplanInfo {
    harAnnenForelderSøktFP: boolean;
    startdatoAdopsjonValg: AdopsjonStartdatoValg;
    annenStartdatoAdopsjon: string;
    annenForeldersSisteDag: string;
    søkersFørsteDag: string;
    antallUkerFellesperiode: string;
    antallDagerFellesperiode: string;
    fellesperiodeukerMor: number | undefined;
}

export interface FarMedmorAleneomsorgFødselUttaksplanInfo {
    startdatoUttak: string;
    fellesperiodeukerMor: number | undefined;
}

export interface FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo {
    permisjonStartdato: string;
}

export interface FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo {
    permisjonStartdato: string;
}

export interface FarMedmorFødselBeggeHarRettUttaksplanInfo {
    morsSisteDag: string;
    farMedmorsFørsteDag: string;
    antallUkerFellesperiode: string;
    antallDagerFellesperiode: string;
}

export interface MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo {
    startdatoAdopsjonValg: AdopsjonStartdatoValg;
    annenStartdatoAdopsjon: string | undefined;
}

export interface MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean | undefined;
}

export const isFarMedmorFødselBeggeHarRettUttaksplanInfo = (
    uttaksplanInfo: UttaksplanInfo,
): uttaksplanInfo is FarMedmorFødselBeggeHarRettUttaksplanInfo => {
    return 'morsSisteDag' in uttaksplanInfo;
};

export default UttaksplanInfo;
