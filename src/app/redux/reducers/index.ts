import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiReducerState } from './apiReducer';
import uttaksplan from 'uttaksplan/redux/reducers';
import { UttaksplanAppState } from 'uttaksplan/redux/types';

interface MainState extends UttaksplanAppState {
    søknad: Søknad;
    common: CommonState;
    api: ApiReducerState;
}

export type AppState = MainState & UttaksplanAppState;

export default { søknad, common, api, uttaksplan };
