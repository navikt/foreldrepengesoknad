import { Dekningsgrad } from './Dekningsgrad';
import { FamiliehendelseType } from './FamiliehendelseType';

export interface Saksgrunnlag {
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    morErAleneOmOmsorg: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    farMedmorErAleneOmOmsorg: boolean;
    farMedmorHarRett: boolean;
    søkerErFarEllerMedmor: boolean;
    termindato?: string;
    fødselsdato?: string;
    omsorgsovertakelsesdato?: string;
    erDeltUttak: boolean;
    erBarnetFødt: boolean;
    familiehendelseDato: string;
    familiehendelseType: FamiliehendelseType;
}
