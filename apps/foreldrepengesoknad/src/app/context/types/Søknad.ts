import Barn from '@navikt/fp-common/src/common/types/Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import Søker from './Søker';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { AnnenForelder, Dekningsgrad, Periode, Søkersituasjon } from '@navikt/fp-common';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
    søker: Søker;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erEndringssøknad: boolean;
    dekningsgrad: Dekningsgrad;
    uttaksplan: Periode[];
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
