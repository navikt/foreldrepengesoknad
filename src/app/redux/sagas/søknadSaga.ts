import { takeEvery, all, put } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { SøknadActionKeys, UpdateSøkerAndStorage, AvbrytSøknad } from '../actions/søknad/søknadActionDefinitions';

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga(action: AvbrytSøknad) {
    yield put(apiActions.storeAppState());
}

export default function* søknadSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPDATE_SØKER_AND_STORAGE, updateSøkerAndStorage),
        takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, avbrytSøknadSaga)
    ]);
}
