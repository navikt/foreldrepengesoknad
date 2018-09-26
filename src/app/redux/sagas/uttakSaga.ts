import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { default as apiActions, updateApi } from '../actions/api/apiActionCreators';
import { ApiActionKeys, GetTilgjengeligeStønadskontoer } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { StønadskontoerDTO } from '../../api/types/stønadskontoerDTO';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import søknadActionCreators from '../actions/søknad/søknadActionCreators';
import { AppState } from '../reducers';
import { getStønadskontoSortOrder } from '../../util/uttaksplan/stønadskontoer';
import { getAggregertUttaksplanInfo } from '../../util/uttaksplan/uttaksplanInfo';

function* getStønadskontoer(action: GetTilgjengeligeStønadskontoer) {
    try {
        yield put(updateApi({ isLoadingTilgjengeligeStønadskontoer: true }));
        const response = yield call(Api.getUttakskontoer, action.params);
        const stønadskontoer: StønadskontoerDTO = response.data;
        const tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[] = [];
        Object.keys(stønadskontoer.kontoer).map((konto) => {
            tilgjengeligeStønadskontoer.push({
                konto: konto as StønadskontoType,
                dager: stønadskontoer.kontoer[konto]
            });
        });
        yield put(
            apiActions.updateApi({
                isLoadingTilgjengeligeStønadskontoer: false,
                tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer.sort(
                    (a: TilgjengeligStønadskonto, b: TilgjengeligStønadskonto) =>
                        getStønadskontoSortOrder(a.konto) > getStønadskontoSortOrder(b.konto) ? 1 : -1
                )
            })
        );
    } catch (error) {
        yield put(
            apiActions.updateApi({
                tilgjengeligeStønadskontoer: [
                    { konto: StønadskontoType.Foreldrepenger, dager: 0 },
                    { konto: StønadskontoType.Fedrekvote, dager: 0 },
                    { konto: StønadskontoType.Fellesperiode, dager: 0 },
                    { konto: StønadskontoType.Flerbarnsuker, dager: 0 },
                    { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 0 },
                    { konto: StønadskontoType.Mødrekvote, dager: 0 }
                ],
                isLoadingTilgjengeligeStønadskontoer: false
            })
        );
    } finally {
        const stateSelector = (state: AppState) => state;
        const appState: AppState = yield select(stateSelector);
        yield put(
            søknadActionCreators.uttaksplanSetAggregertInfo(
                getAggregertUttaksplanInfo(appState.søknad, appState.api.søkerinfo!)
            )
        );
    }
}

function* getStønadskontoerAndLagUttaksplan(action: GetTilgjengeligeStønadskontoer) {
    yield put(søknadActionCreators.uttaksplanSetPerioder([]));
    yield all([getStønadskontoer(action)]);
    const tilgjengeligeKontoer: TilgjengeligStønadskonto[] = yield select(
        (state: AppState) => state.api.tilgjengeligeStønadskontoer
    );
    yield put(søknadActionCreators.uttaksplanLagForslag(tilgjengeligeKontoer));
    yield put(apiActions.storeAppState());
}

export default function* søknadskontoerSaga() {
    yield all([
        takeEvery(ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER, getStønadskontoer),
        takeEvery(
            ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER_AND_LAG_UTTAKSPLAN_FORSLAG,
            getStønadskontoerAndLagUttaksplan
        )
    ]);
}
