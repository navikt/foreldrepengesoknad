import { StegID } from './stegConfig';
import Søknad from '../../types/søknad/Søknad';
import {
    søknadGjelderAdopsjon,
    søknadGjelderForeldreansvar,
    søknadGjelderFødsel,
    søknadGjelderStebarn
} from '../validation/situasjon';

const harGodkjentVilkår = (søknad: Søknad) => søknad.harGodkjentVilkår === true;

const isAvailable = (stegId: StegID, søknad: Søknad): boolean => {
    switch (stegId) {
        case StegID.INNGANG:
            return harGodkjentVilkår(søknad);

        case StegID.RELASJON_TIL_BARN_FØDSEL:
            return harGodkjentVilkår(søknad) && søknadGjelderFødsel(søknad);
        case StegID.RELASJON_TIL_BARN_ADOPSJON:
            return harGodkjentVilkår(søknad) && søknadGjelderAdopsjon(søknad);
        case StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON:
            return harGodkjentVilkår(søknad) && søknadGjelderStebarn(søknad);
        case StegID.RELASJON_TIL_BARN_FORELDREANSVAR:
            return (
                harGodkjentVilkår(søknad) && søknadGjelderForeldreansvar(søknad)
            );
        default:
            return false;
    }
};

export default isAvailable;
