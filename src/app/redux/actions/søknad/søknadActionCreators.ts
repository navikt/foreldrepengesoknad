import { Skjemadata } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøknad,
    UpdateUtenlandsopphold,
    UpdateSøker
} from './søknadActionDefinitions';
import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from '../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { UtenlandsoppholdPartial } from '../../../types/søknad/Utenlandsopphold';
import { SøkerPartial } from '../../../types/søknad/Søker';

const updateBarn = (
    payload:
        | FødtBarnPartial
        | UfødtBarnPartial
        | AdopsjonsbarnPartial
        | ForeldreansvarBarnPartial
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

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

const updateSøknad = (payload: Skjemadata): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

export default {
    updateAnnenForelder,
    updateBarn,
    updateUtenlandsopphold,
    updateSøker,
    updateSøknad
};
