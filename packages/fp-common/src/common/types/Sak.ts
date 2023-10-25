import { DekningsgradDTO } from './DekningsgradDTO';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';
import { ÅpenBehandling } from './ÅpenBehandling';
import { RettighetType } from './RettighetType';
import PersonFnrDTO from './PersonFnrDTO';

export interface Sak {
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
    annenPart?: PersonFnrDTO;
    barn?: PersonFnrDTO[];
}
