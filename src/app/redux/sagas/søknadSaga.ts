import { takeEvery, all, put, call } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions, updateApi } from '../actions/api/apiActionCreators';
import { SøknadActionKeys, UpdateSøkerAndStorage, AvbrytSøknad } from '../actions/søknad/søknadActionDefinitions';
import { ApiActionKeys, GetUttaksplanForSak } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga(action: AvbrytSøknad) {
    yield put(apiActions.storeAppState());
}

function* getUttaksplanForSak(action: GetUttaksplanForSak) {
    try {
        const response = yield call(Api.getUttaksplanForSak, action.saksnummer);
        yield put(søknadActions.setEndringssakUttaksplan(response.data || []));
        yield put(updateApi({ isLoadingEndringUttaksplan: false }));
    } catch (error) {
        yield put(søknadActions.setEndringssakUttaksplan([]));
        yield put(updateApi({ isLoadingEndringUttaksplan: false }));
    }
}

export default function* søknadSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPDATE_SØKER_AND_STORAGE, updateSøkerAndStorage),
        takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, avbrytSøknadSaga),
        takeEvery(ApiActionKeys.GET_UTTAKSPLAN_FOR_SAK, getUttaksplanForSak)
    ]);
}
