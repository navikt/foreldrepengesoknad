import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiState } from './apiReducer';

interface MainState {
    søknad: Søknad;
    common: CommonState;
    api: ApiState;
}

export type AppState = MainState;

export default { søknad, common, api };
