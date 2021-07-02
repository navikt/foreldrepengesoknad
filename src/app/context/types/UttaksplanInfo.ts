interface UttaksplanInfo {}

export interface MorFødselUttaksplanInfo extends UttaksplanInfo {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean;
    fellesperiodeukerMor: number | undefined;
}

export interface MorFarAdopsjonUttaksplanInfo extends UttaksplanInfo {
    harAnnenForelderSøktFP: string;
    startdatoAdopsjonValg: string | undefined;
    annenStartdatoAdopsjon: string;
    morsSisteDag: string;
    farMedmorsFørsteDag: string;
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
