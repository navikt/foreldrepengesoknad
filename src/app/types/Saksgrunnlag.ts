import { Dekningsgrad } from './Dekningsgrad';
import { FamiliehendelseType } from './FamiliehendelseType';
import { PersonV2 } from './sakerv2/Personv2';

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
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    ønskerJustertUttakVedFødsel: boolean | undefined;
}

export interface SaksgrunnlagV2 {
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
    harAnnenForelderTilsvarendeRettEØS?: boolean;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    barn: PersonV2[];
    annenPart?: PersonV2;
}
