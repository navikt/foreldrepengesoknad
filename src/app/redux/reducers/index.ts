import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';

export interface AppState {
    søknad: Søknad;
    common: CommonState;
}

export default { søknad, common };
