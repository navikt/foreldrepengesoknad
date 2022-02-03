import Api from 'app/api/api';
import { cleanUpSøknadsdataForInnsending } from 'app/api/apiUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { AxiosResponse } from 'axios';

export const storeAppState = (state: ForeldrepengesøknadContextState): Promise<AxiosResponse<any>> => {
    return Api.storeAppState(state, state.søkerinfo.person.fnr);
};

export const sendInnSøknad = (state: ForeldrepengesøknadContextState): Promise<AxiosResponse<any>> => {
    const cleanedSøknad = cleanUpSøknadsdataForInnsending(state.søknad);

    return Api.sendSøknad(cleanedSøknad, state.søkerinfo.person.fnr);
};
