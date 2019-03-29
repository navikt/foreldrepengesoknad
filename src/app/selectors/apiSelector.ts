import Arbeidsforhold from '../types/Arbeidsforhold';

import { createSelector } from 'reselect';
import { AppState } from '../redux/reducers';
import { ApiState } from '../redux/reducers/apiReducer';
import { Søkerinfo } from '../types/søkerinfo';
import { selectDekningsgrad } from './søknadSelector';

const apiSelector = (state: AppState): ApiState => state.api;

// API
export const selectTilgjengeligeStønadskontoer = createSelector(
    [apiSelector, selectDekningsgrad],
    (api, dekningsgrad) => (dekningsgrad! === '100' ? api.stønadskontoer100 : api.stønadskontoer80)
);

export const selectSøkerinfo = createSelector([apiSelector], (api): Søkerinfo | undefined => {
    if (api.søkerinfo) {
        return api.søkerinfo;
    }
    return undefined;
});

export const selectArbeidsforhold = createSelector([selectSøkerinfo], (søkerinfo): Arbeidsforhold[] => {
    if (søkerinfo) {
        return søkerinfo.arbeidsforhold || [];
    }
    return [];
});
