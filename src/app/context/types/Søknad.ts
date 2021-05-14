import AnnenForelder from './AnnenForelder';
import Barn from './Barn';
import Søkersituasjon from './Søkersituasjon';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
}
