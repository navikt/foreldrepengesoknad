import Barn from '@navikt/fp-common/src/common/types/Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import Søker from './Søker';
import {
    AnnenForelder,
    Attachment,
    Dekningsgrad,
    Periode,
    Søkersituasjon,
    Tilleggsopplysninger,
} from '@navikt/fp-common';

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
    harGodkjentOppsummering: boolean;
    vedlegg: Attachment[];
    tilleggsopplysninger: Tilleggsopplysninger;
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
}
