import AnnenForelder from './AnnenForelder';
import Barn from './Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import Søker from './Søker';
import Søkersituasjon from './Søkersituasjon';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
    søker: Søker;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erEndringssøknad: boolean;
}
