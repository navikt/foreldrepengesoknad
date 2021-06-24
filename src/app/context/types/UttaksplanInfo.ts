interface UttaksplanInfo {
    dekningsgrad: number;
    fellesperiodeukerMor: number | undefined;
}

export interface MorFødselUttaksplanInfo extends UttaksplanInfo {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean;
}

export interface MorFarAdopsjonUttaksplanInfo extends UttaksplanInfo {
    harAnnenForelderSøktFP: string;
    startdatoAdopsjonValg: string | undefined;
    annenStartdatoAdopsjon: string;
    morsSisteDag: string;
    farMedmorsFørsteDag: string;
    antallUkerFellesperiode: string;
    antallDagerFellesperiode: string;
}

export default UttaksplanInfo;
