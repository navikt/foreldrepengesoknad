import { Barn } from './Barn';
import { Søker } from './Søker';

export interface Søknad {
    harGodkjentVilkår: boolean;
    barn: Barn;
    søker: Søker;
}
