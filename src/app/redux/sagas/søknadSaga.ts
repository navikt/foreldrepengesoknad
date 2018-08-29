import { takeEvery, all, put } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { SøknadActionKeys, UpdateSøkerAndStorage } from '../actions/søknad/søknadActionDefinitions';

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

export default function* søknadSaga() {
    yield all([takeEvery(SøknadActionKeys.UPDATE_SØKER_AND_STORAGE, updateSøkerAndStorage)]);
}
