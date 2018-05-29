import { Skjemadata } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøknad,
    UpdateVedlegg,
    UpdateUtenlandsopphold
} from './søknadActionDefinitions';
import {
    FødtBarnPartial,
    UfødtBarnPartial,
    AdopsjonsbarnPartial,
    ForeldreansvarBarnPartial
} from '../../../types/søknad/Barn';
import { SøknadsvedleggPartial } from '../../../types/søknad/Søknadsvedlegg';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { UtenlandsoppholdPartial } from '../../../types/søknad/Utenlandsopphold';

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

const updateSøknad = (payload: Skjemadata): UpdateSøknad => ({
    type: SøknadActionKeys.UPDATE_SØKNAD,
    payload
});

const updateVedlegg = (payload: SøknadsvedleggPartial): UpdateVedlegg => ({
    type: SøknadActionKeys.UPDATE_VEDLEGG,
    payload
});

export default {
    updateAnnenForelder,
    updateBarn,
    updateUtenlandsopphold,
    updateSøknad,
    updateVedlegg
};
