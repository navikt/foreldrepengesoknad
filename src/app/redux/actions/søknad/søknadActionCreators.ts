import { SøkerPartial, SøknadPartial } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøker,
    UpdateSøknad
} from './søknadActionDefinitions';
import { FødtBarnPartial, UfødtBarnPartial } from '../../../types/søknad/Barn';

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

const updateBarn = (
    payload: FødtBarnPartial | UfødtBarnPartial
): UpdateBarn => ({
    type: SøknadActionKeys.UPDATE_BARN,
    payload
});

const updateSøknad = (payload: SøknadPartial): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

export default { updateBarn, updateSøker, updateSøknad };
