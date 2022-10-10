import { DekningsgradV2 } from './Dekningsgradv2';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';
import { PersonV2 } from './Personv2';

export interface Sakv2 {
    annenPart: PersonV2;
    barn: PersonV2;
    dekningsgrad: DekningsgradV2;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak: GjeldendeVedtak;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    gjelderAdopsjon: boolean;
    kanSøkeOmEndring: boolean;
    morUføretrygd: boolean;
    rettighetType: any;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
    åpenBehandling: any;
    ønskerJustertUttakVedFødsel: boolean;
}
