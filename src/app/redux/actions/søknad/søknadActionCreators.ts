import { SøkerPartial, SøknadPartial } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøker,
    UpdateSøknad,
    UpdateUtenlandsopphold
} from './søknadActionDefinitions';
import { FødtBarnPartial, UfødtBarnPartial } from '../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { UtenlandsoppholdPartial } from '../../../types/søknad/Utenlandsopphold';

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

const updateUtenlandsopphold = (
    payload: UtenlandsoppholdPartial
): UpdateUtenlandsopphold => ({
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD,
    payload
});

const updateSøknad = (payload: SøknadPartial): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

export default {
    updateAnnenForelder,
    updateBarn,
    updateSøker,
    updateUtenlandsopphold,
    updateSøknad
};
