import { DekningsgradDTO } from './DekningsgradDTO';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';
import { ÅpenBehandling } from './ÅpenBehandling';
import { RettighetType } from './RettighetType';

export interface SakDTO {
    dekningsgrad: DekningsgradDTO;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak: GjeldendeVedtak;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    gjelderAdopsjon: boolean;
    kanSøkeOmEndring: boolean;
    morUføretrygd: boolean;
    rettighetType: RettighetType;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
    ønskerJustertUttakVedFødsel: boolean;
    sisteSøknadMottattDato: string;
    åpenBehandling?: ÅpenBehandling;
}
