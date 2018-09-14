import { takeEvery, all, put, call } from 'redux-saga/effects';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { ApiActionKeys, GetTilgjengeligeStønadskontoer } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { StønadskontoerDTO } from '../../api/types/stønadskontoerDTO';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../types/uttaksplan/periodetyper';

function* getStønadskontoer(action: GetTilgjengeligeStønadskontoer) {
    try {
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
                tilgjengeligeStønadskontoer
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
    }
}

export default function* søknadskontoerSaga() {
    yield all([takeEvery(ApiActionKeys.GET_TILGJENGELIGE_STØNADSKONTOER, getStønadskontoer)]);
}
