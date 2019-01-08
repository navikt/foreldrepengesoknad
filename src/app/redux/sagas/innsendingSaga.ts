import Api from '../../api/api';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys, SendSøknad } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { Kvittering } from '../../types/Kvittering';
import routeConfig from '../../util/routing/routeConfig';
import { cleanUpSøknad } from '../../util/cleanup/cleanupSøknad';
import { AppState } from '../reducers';
import { mapMissingAttachmentsOnSøknad } from '../../util/attachments/missingAttachmentUtil';

function* sendSøknad(action: SendSøknad) {
    try {
        yield put(apiActions.updateApi({ søknadSendingInProgress: true }));
        const orignalSøknad = yield select((state: AppState) => state.søknad);
        const søknadCopy = JSON.parse(JSON.stringify(orignalSøknad));
        mapMissingAttachmentsOnSøknad(action.missingAttachments, søknadCopy);

        const response = yield call(Api.sendSøknad, cleanUpSøknad(søknadCopy));
        const kvittering: Kvittering = response.data;
        if (kvittering) {
            action.history.push(`${routeConfig.APP_ROUTE_PREFIX}soknad-sendt`);
        }

        yield put(apiActions.updateApi({ kvittering, søknadHasBeenReceived: true }));
        yield put(apiActions.deleteStoredAppState());
    } catch (error) {
        action.history.push(`${routeConfig.GENERELL_FEIL_URL}`, {
            errorMessage:
                error && error.response && error.response.status === 413 ? error.response.data.message : undefined,
            uuid:
                error && error.response && error.response.data && error.response.data.uuid
                    ? error.response.data.uuid
                    : undefined
        });
    } finally {
        yield put(apiActions.updateApi({ søknadSendingInProgress: false }));
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD, sendSøknad)]);
}
