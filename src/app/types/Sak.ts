import { RegistrertAnnenForelder } from './Person';
import { DekningsgradDTO } from './DekningsgradDTO';
import { Familiehendelse } from './Familiehendelse';
import { GjeldendeVedtak } from './GjeldendeVedtak';
import { ÅpenBehandling } from './ÅpenBehandling';
import { BarnFraSak } from './BarnFraSak';

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
    rettighetType: any;
    sakAvsluttet: boolean;
    sakTilhørerMor: boolean;
    saksnummer: string;
    åpenBehandling: ÅpenBehandling;
    ønskerJustertUttakVedFødsel: boolean;
}
