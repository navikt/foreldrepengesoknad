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
import { selectPerioderSomSkalSendesInn } from 'app/selectors/søknadSelector';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import _ from 'lodash';

import { Språkkode } from 'common/intl/types';

const stateSelector = (state: AppState) => state;

const mapMissingAttachmentsOnEndringer = (
    perioderWithMissingAttachments: Periode[],
    endringer: Periode[]
): Periode[] => {
    return endringer.map((endring) => {
        const periode = perioderWithMissingAttachments.find((a) => a.id === endring.id);

        return periode !== undefined ? { ...endring, vedlegg: periode.vedlegg } : endring;
    });
};

const getSøknadsdataForInnsending = (
    originalSøknad: Søknad,
    missingAttachments: MissingAttachment[],
    endringerIUttaksplan: Periode[],
    språkkode: Språkkode
): SøknadForInnsending | EnkelEndringssøknadForInnsending => {
    console.log(språkkode);
    const søknad: Søknad = JSON.parse(JSON.stringify(originalSøknad));
    mapMissingAttachmentsOnSøknad(missingAttachments, søknad);

    if (søknad.ekstrainfo.erEnkelEndringssøknad) {
        const endringerIUttaksplanWithMissingAttachments = mapMissingAttachmentsOnEndringer(
            søknad.uttaksplan,
            endringerIUttaksplan
        );
        return cleanEnkelEndringssøknad(søknad, endringerIUttaksplanWithMissingAttachments);
    } else {
        return cleanUpSøknad(søknad);
    }
};

function* sendSøknad(action: SendSøknad) {
    try {
        yield put(apiActions.updateApi({ søknadSendingInProgress: true }));
        const state: AppState = yield select(stateSelector);
        const originalSøknad: Søknad = state.søknad;
        const søknadForInnsending = getSøknadsdataForInnsending(
            _.cloneDeep(originalSøknad),
            action.missingAttachments,
            _.cloneDeep(selectPerioderSomSkalSendesInn(state)),
            state.common.språkkode
        );
        const response = yield call(Api.sendSøknad, søknadForInnsending);
        const kvittering: Kvittering = response.data;
        if (kvittering) {
            action.history.push(`${routeConfig.APP_ROUTE_PREFIX}soknad-sendt`);
        }

        yield put(apiActions.updateApi({ kvittering, søknadHasBeenReceived: true }));
    } catch (error) {
        action.history.push(`${routeConfig.GENERELL_FEIL_URL}`, {
            errorMessage:
                error && error.response && error.response.status === 413 ? error.response.data.messages : undefined,
            uuid: extractUUID(error),
        });
    } finally {
        yield put(apiActions.updateApi({ søknadSendingInProgress: false }));
    }
}

export default function* innsendingSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SØKNAD, sendSøknad)]);
}
