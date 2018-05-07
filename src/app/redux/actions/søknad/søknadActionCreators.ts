import { SøkerPartial } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøker
} from './søknadActionDefinitions';
import { BarnPartial } from '../../../types/søknad/Barn';

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

const updateRelasjonTilBarn = (payload: BarnPartial): UpdateBarn => ({
    type: SøknadActionKeys.UPDATE_BARN,
    payload
});

export default { updateRelasjonTilBarn, updateSøker };
