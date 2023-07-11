import { Barn } from './Barn';
import { Søker } from './Søker';
import { Tilrettelegging } from './Tilrettelegging';

export interface Søknad {
    harGodkjentVilkår: boolean;
    barn: Barn;
    søker: Søker;
    tilrettelegging: Tilrettelegging[];
}
