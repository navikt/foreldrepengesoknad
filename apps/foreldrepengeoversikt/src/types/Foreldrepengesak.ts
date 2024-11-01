import { SaksperiodeNy } from '@navikt/fp-types';

import { Dekningsgrad } from './Dekningsgrad';
import { Familiehendelse } from './Familiehendelse';
import PersonFnrDTO from './PersonFnrDTO';
import { RettighetType } from './RettighetType';
import { Ytelse } from './Ytelse';
import { ÅpenBehandlingFP } from './ÅpenBehandling';

export interface ForeldrepengesakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    ønskerJustertUttakVedFødsel: boolean;
    rettighetType: RettighetType;
    annenPart: PersonFnrDTO;
    familiehendelse: Familiehendelse;
    gjeldendeVedtak?: {
        perioder: SaksperiodeNy[];
    };
    barn: PersonFnrDTO[];
    dekningsgrad: Dekningsgrad;
    åpenBehandling?: ÅpenBehandlingFP;
    oppdatertTidspunkt: string;
}

export interface Foreldrepengesak extends ForeldrepengesakDTO {
    ytelse: Ytelse.FORELDREPENGER;
}
