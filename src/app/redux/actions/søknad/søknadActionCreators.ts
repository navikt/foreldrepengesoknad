import { SøkerPartial, SøknadPartial } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøker,
    UpdateSøknad
} from './søknadActionDefinitions';
import { FødtBarnPartial, UfødtBarnPartial } from '../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';

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

const updateAnnenForelder = (payload: AnnenForelderPartial) => ({
    type: SøknadActionKeys.UPDATE_ANNEN_FORELDER,
    payload
});

const updateSøknad = (payload: SøknadPartial): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

export default { updateAnnenForelder, updateBarn, updateSøker, updateSøknad };
