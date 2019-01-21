import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { StegID } from '../../../util/routing/stegConfig';

export const resolveStegToRender = (situasjon: Søkersituasjon): StegID | undefined => {
    if (situasjon === Søkersituasjon.FØDSEL) {
        return StegID.RELASJON_TIL_BARN_FØDSEL;
    } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        return StegID.RELASJON_TIL_BARN_FORELDREANSVAR;
    } else if (situasjon === Søkersituasjon.ADOPSJON) {
        return StegID.RELASJON_TIL_BARN_ADOPSJON;
    }
    return;
};
