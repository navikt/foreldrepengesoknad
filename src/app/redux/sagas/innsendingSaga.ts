import Api from '../../api/api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    ApiActionKeys,
    SendSøknadRequest
} from '../actions/api/apiActionDefinitions';

function* sendSøknad(action: SendSøknadRequest) {
    try {
        const response = yield call(
            Api.sendSøknad,
            action.søknad,
            action.vedlegg
        );
        yield put({ type: ApiActionKeys.SEND_SØKNAD_SUCCESS, response });
    } catch (error) {
        yield put({ type: ApiActionKeys.SEND_SØKNAD_FAILED, error });
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD_REQUEST, sendSøknad)]);
}
