import Barn from '@navikt/fp-common/src/common/types/Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { VedleggDataType } from 'app/types/VedleggDataType';
import SøkerData from './SøkerData';
import { AnnenForelder, Dekningsgrad, Periode, Søkersituasjon } from '@navikt/fp-common';

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
