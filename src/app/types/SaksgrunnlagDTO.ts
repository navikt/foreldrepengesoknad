export interface SaksgrunnlagDTO {
    annenForelderErInformert: boolean;
    antallBarn: number;
    dekningsgrad: 100 | 80;
    farMedmorErAleneOmOmsorg: boolean;
    farMedmorHarRett: boolean;
    fødselsdato?: string;
    morErAleneOmOmsorg: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    søkerErFarEllerMedmor: boolean;
    termindato?: string;
}
