import { SøkerPartial } from '../../../types/søknad/Søknad';
import { SøknadActionKeys, UpdateSøker } from './søknadActionDefinitions';

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

export default { updateSøker };
