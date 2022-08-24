import { PersonV2, RegistrertBarnV2 } from './PersonV2';
import { DekningsgradV2 } from './DekningsgradV2';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';

export interface Saker {
    annenPart: PersonV2;
    barn: RegistrertBarnV2;
    dekningsgrad: DekningsgradV2;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak: GjeldendeVedtak;
    gjelderAdopsjon: boolean;
    kanSøkeOmEndring: boolean;
    morUføretrygd: boolean;
    rettighetType: any;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
}
