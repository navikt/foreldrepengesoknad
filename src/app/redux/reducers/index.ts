import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiReducerState } from './apiReducer';
import uttaksplan from 'uttaksplan/redux/reducers';
import { UttaksplanState } from 'uttaksplan/redux/types';

export interface AppState {
    søknad: Søknad;
    common: CommonState;
    api: ApiReducerState;
    uttaksplan: UttaksplanState;
}

export default { søknad, common, api, uttaksplan };
