import { AnnenForelder, Barn, Periode, Søkersituasjon } from '@navikt/fp-common';
import { Dekningsgrad } from '@navikt/fp-types';

import { VedleggDataType } from 'app/types/VedleggDataType';

import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import SøkerData from './SøkerData';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
    søker: SøkerData;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erEndringssøknad: boolean;
    dekningsgrad: Dekningsgrad;
    uttaksplan: Periode[];
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
