import Api from 'app/api/api';
import { cleanUpSøknadsdataForInnsending } from 'app/api/apiUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';

export const storeAppState = (state: ForeldrepengesøknadContextState) => {
    Api.storeAppState(state, state.søkerinfo.person.fnr);
};

export const sendInnSøknad = (state: ForeldrepengesøknadContextState) => {
    const cleanedSøknad = cleanUpSøknadsdataForInnsending(state.søknad);

    Api.sendSøknad(cleanedSøknad, state.søkerinfo.person.fnr);
};
