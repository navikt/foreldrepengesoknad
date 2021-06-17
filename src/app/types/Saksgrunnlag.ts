import { Dekningsgrad } from './Dekningsgrad';

export interface Saksgrunnlag {
    annenForelderErInformert: boolean;
    antallBarn: number;
    dekningsgrad: Dekningsgrad;
    farMedmorErAleneOmOmsorg: boolean;
    farMedmorHarRett: boolean;
    fødselsdato?: string;
    morErAleneOmOmsorg: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    omsorgsovertakelsesdato?: string;
    søkerErFarEllerMedmor: boolean;
    termindato?: string;
}
