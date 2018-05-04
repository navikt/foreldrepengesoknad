import Søknad from '../../types/søknad/Søknad';
import søknadReducer from './søknadReducer';
import commonReducer, { CommonState } from './commonReducer';

export interface AppState {
    søknad: Søknad;
    common: CommonState;
}

export default { søknad: søknadReducer, common: commonReducer };
