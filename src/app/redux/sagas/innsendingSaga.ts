import Api from '../../api/api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys, SendSøknad } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { Kvittering } from '../../types/Kvittering';
import routeConfig from '../../util/routing/routeConfig';

function* sendSøknad(action: SendSøknad) {
    try {
        yield put(apiActions.updateApi({ søknadSendingInProgress: true }));
        const response = yield call(Api.sendSøknad, action.søknad);
        const kvittering: Kvittering = response.data;
        if (kvittering) {
            action.history.push(`${routeConfig.APP_ROUTE_PREFIX}søknad-sendt`);
        }
        yield put(apiActions.updateApi({ kvittering, søknadHasBeenReceived: true }));
        yield put(apiActions.deleteStoredAppState());
    } catch (error) {
        yield put(apiActions.updateApi({ error }));
        action.history.push(`${routeConfig.APP_ROUTE_PREFIX}`);
    } finally {
        yield put(apiActions.updateApi({ søknadSendingInProgress: false }));
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD, sendSøknad)]);
}
