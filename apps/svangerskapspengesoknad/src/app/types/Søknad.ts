import { Barn } from './Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { Søker } from './Søker';
import { Tilrettelegging } from './Tilrettelegging';

export interface Søknad {
    barn: Barn;
    harGodkjentVilkår: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    søker: Søker;
    tilrettelegging: Tilrettelegging[];
}
