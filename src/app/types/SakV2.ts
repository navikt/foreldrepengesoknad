import { PersonV2 } from './PersonV2';
import { DekningsgradV2 } from './DekningsgradV2';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';

export interface SakV2 {
    annenPart: PersonV2;
    barn: PersonV2;
    dekningsgrad: DekningsgradV2;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak: GjeldendeVedtak;
    gjelderAdopsjon: boolean;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    kanSøkeOmEndring: boolean;
    morUføretrygd: boolean;
    rettighetType: any;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
    ønskerJustertUttakVedFødsel: boolean;
}
