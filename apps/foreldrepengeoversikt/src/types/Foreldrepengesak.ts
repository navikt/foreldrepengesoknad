import { RettighetType } from '@navikt/fp-common';
import { SaksperiodeNy } from '@navikt/fp-types';

import { DekningsgradDTO } from './DekningsgradDTO';
import { Familiehendelse } from './Familiehendelse';
import { Forelder } from './Forelder';
import PersonFnrDTO from './PersonFnrDTO';
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
    dekningsgrad: DekningsgradDTO;
    åpenBehandling?: ÅpenBehandlingFP;
    oppdatertTidspunkt: string;
    forelder: Forelder;
}

export interface Foreldrepengesak extends ForeldrepengesakDTO {
    ytelse: Ytelse.FORELDREPENGER;
}
