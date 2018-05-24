import { SøkerPartial, Skjemadata } from '../../../types/søknad/Søknad';
import {
    SøknadActionKeys,
    UpdateBarn,
    UpdateSøker,
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
import { VedleggPartial } from '../../../types/søknad/Vedlegg';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { UtenlandsoppholdPartial } from '../../../types/søknad/Utenlandsopphold';

const updateSøker = (payload: SøkerPartial): UpdateSøker => ({
    type: SøknadActionKeys.UPDATE_SØKER,
    payload
});

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

const updateVedlegg = (payload: VedleggPartial): UpdateVedlegg => ({
    type: SøknadActionKeys.UPDATE_VEDLEGG,
    payload
});

export default {
    updateAnnenForelder,
    updateBarn,
    updateSøker,
    updateUtenlandsopphold,
    updateSøknad,
    updateVedlegg
};
