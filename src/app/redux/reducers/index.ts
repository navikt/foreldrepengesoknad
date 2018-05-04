import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';

export interface AppState {
    søknad: Søknad;
}

export default { søknad };
