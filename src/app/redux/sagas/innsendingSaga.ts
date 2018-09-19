import Api from '../../api/api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys, SendSøknad } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { Kvittering } from '../../types/Kvittering';

function* sendSøknad(action: SendSøknad) {
    try {
        yield put(apiActions.updateApi({ søknadSendingInProgress: true }));
        const response = yield call(Api.sendSøknad, action.søknad);
        const kvittering: Kvittering = response.data;
        yield put(apiActions.updateApi({ kvittering, søknadSendingInProgress: false }));
    } catch (error) {
        yield put(apiActions.updateApi({ error }));
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD, sendSøknad)]);
}
