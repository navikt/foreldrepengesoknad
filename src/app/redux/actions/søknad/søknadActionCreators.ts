import Søknad, { UtenlandsoppholdData } from '../../../types/søknad/Søknad';
import {
    ListActionEvent,
    SøknadActionKeys,
    UpdateSøknadState,
    UpdateUtenlandsopphold
} from './søknadActionDefinitions';

const updateSøknadState = (payload: Søknad): UpdateSøknadState => ({
    type: SøknadActionKeys.UPDATE_SØKNAD_STATE,
    payload
});

export const updateUtenlandsopphold = (
    action: ListActionEvent,
    opphold: UtenlandsoppholdData
): UpdateUtenlandsopphold => ({
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD,
    payload: {
        action,
        utenlandsopphold: opphold
    }
});

export default { updateSøknadState, updateUtenlandsopphold };
