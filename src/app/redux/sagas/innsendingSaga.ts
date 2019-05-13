import Api from '../../api/api';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys, SendSøknad } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { Kvittering } from '../../types/Kvittering';
import routeConfig from '../../util/routing/routeConfig';
import { cleanUpSøknad, cleanEnkelEndringssøknad } from '../../util/cleanup/cleanupSøknad';
import { AppState } from '../reducers';
import { mapMissingAttachmentsOnSøknad } from '../../util/attachments/missingAttachmentUtil';
import { extractUUID } from '../../api/utils/errorUtil';
import Søknad, { SøknadForInnsending, EnkelEndringssøknadForInnsending } from 'app/types/søknad/Søknad';
import { MissingAttachment } from 'app/types/MissingAttachment';

const getSøknadsdataForInnsending = (
    originalSøknad: Søknad,
    missingAttachments: MissingAttachment[]
): SøknadForInnsending | EnkelEndringssøknadForInnsending => {
    const søknad: Søknad = JSON.parse(JSON.stringify(originalSøknad));
    mapMissingAttachmentsOnSøknad(missingAttachments, søknad);
    if (søknad.ekstrainfo.eksisterendeSak !== undefined && søknad.ekstrainfo.eksisterendeSak.uttaksplan) {
        return cleanEnkelEndringssøknad(søknad, søknad.ekstrainfo.eksisterendeSak.uttaksplan);
    } else {
        return cleanUpSøknad(søknad);
    }
};

function* sendSøknad(action: SendSøknad) {
    try {
        yield put(apiActions.updateApi({ søknadSendingInProgress: true }));
        const originalSøknad: Søknad = yield select((state: AppState) => state.søknad);
        const response = yield call(
            Api.sendSøknad,
            getSøknadsdataForInnsending(originalSøknad, action.missingAttachments)
        );
        const kvittering: Kvittering = response.data;
        if (kvittering) {
            action.history.push(`${routeConfig.APP_ROUTE_PREFIX}soknad-sendt`);
        }

        yield put(apiActions.updateApi({ kvittering, søknadHasBeenReceived: true }));
        yield put(apiActions.deleteStoredAppState());
    } catch (error) {
        // tslint:disable-next-line: no-console
        console.log(error);

        action.history.push(`${routeConfig.GENERELL_FEIL_URL}`, {
            errorMessage:
                error && error.response && error.response.status === 413 ? error.response.data.message : undefined,
            uuid: extractUUID(error)
        });
    } finally {
        yield put(apiActions.updateApi({ søknadSendingInProgress: false }));
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD, sendSøknad)]);
}
