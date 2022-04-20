import { Attachment } from 'app/types/Attachment';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Periode } from 'uttaksplan/types/Periode';
import AnnenForelder from './AnnenForelder';
import Barn from './Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import Søker from './Søker';
import Søkersituasjon from './Søkersituasjon';
import { Tilleggsopplysninger } from './Tilleggsopplysninger';

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
}
