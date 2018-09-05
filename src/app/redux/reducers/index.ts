import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiState } from './apiReducer';
import summary, { SummaryState } from './summaryReducer';

interface MainState {
    søknad: Søknad;
    common: CommonState;
    api: ApiState;
    summary: SummaryState;
}

export type AppState = MainState;

export default { søknad, common, api, summary };
