import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiState } from './apiReducer';
import uttaksplan from 'uttaksplan/redux/reducers';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import summary, { SummaryState } from './summaryReducer';

interface MainState extends UttaksplanAppState {
    søknad: Søknad;
    common: CommonState;
    api: ApiState;
    summary: SummaryState;
}

export type AppState = MainState & UttaksplanAppState;

export default { søknad, common, api, uttaksplan, summary };
