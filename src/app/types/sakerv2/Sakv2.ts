import { FagsakStatus } from '../Sak';
import { SaksperiodeDTO } from '../SaksperiodeDTO';
import { DekningsgradV2DTO } from './Dekningsgradv2DTO';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';
import { PersonV2 } from './Personv2';

export interface ÅpenBehandling {
    tilstand: FagsakStatus;
    søknadsperioder: SaksperiodeDTO[];
}

export interface Sakv2 {
    annenPart: PersonV2;
    barn: PersonV2[];
    dekningsgrad: DekningsgradV2DTO;
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
    åpenBehandling: ÅpenBehandling;
    ønskerJustertUttakVedFødsel: boolean;
}
