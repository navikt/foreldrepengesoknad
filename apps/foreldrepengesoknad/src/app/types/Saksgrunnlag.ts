import { BarnFraSak } from './BarnFraSak';
import { Dekningsgrad } from './Dekningsgrad';
import { FamiliehendelseType } from './FamiliehendelseType';
import { RegistrertAnnenForelder } from './Person';

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
    barn: BarnFraSak[];
    annenPart?: RegistrertAnnenForelder;
}
