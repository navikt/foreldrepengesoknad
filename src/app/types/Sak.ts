import { RegistrertAnnenForelder } from './Person';
import { DekningsgradDTO } from './DekningsgradDTO';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';
import { ÅpenBehandling } from './ÅpenBehandling';
import { BarnFraSak } from './BarnFraSak';
import { RettighetType } from './RettighetType';

export interface Sak {
    annenPart: RegistrertAnnenForelder;
    barn: BarnFraSak[];
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
    åpenBehandling: ÅpenBehandling;
    ønskerJustertUttakVedFødsel: boolean;
    sisteSøknadMottattDato: string;
}
