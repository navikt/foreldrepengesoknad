import { SøkerPartial, SøknadPartial } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøker,
    UpdateSøknad
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

const updateSøknad = (payload: SøknadPartial): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

export default { updateRelasjonTilBarn, updateSøker, updateSøknad };
