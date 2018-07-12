import Api from '../../api/api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys, SendSøknad } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';

function* sendSøknad(action: SendSøknad) {
    try {
        yield call(Api.sendSøknad, action.søknad);
        // todo: implement success handling
    } catch (error) {
        yield put(apiActions.updateApi({ error }));
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD, sendSøknad)]);
}
