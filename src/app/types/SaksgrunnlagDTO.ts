export interface SaksgrunnlagDTO {
    annenForelderErInformert: boolean;
    antallBarn: number;
    dekningsgrad: number;
    farMedmorErAleneOmOmsorg: boolean;
    farMedmorHarRett: boolean;
    fødselsdato?: string;
    morErAleneOmOmsorg: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    omsorgsovertakelsesdato?: string;
    søkerErFarEllerMedmor: boolean;
    termindato?: string;
    gjelderAnnenPart: boolean;
}
