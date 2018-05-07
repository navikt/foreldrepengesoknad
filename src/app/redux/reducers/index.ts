import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiReducerState } from './apiReducer';

export interface AppState {
    søknad: Søknad;
    common: CommonState;
    api: ApiReducerState;
}

export default { søknad, common, api };
