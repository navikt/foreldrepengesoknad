import { all, put, call, takeLatest } from 'redux-saga/effects';
import { getSøkerinfo, sendSøknad } from '../../api/api';
import { Søkerinfo } from 'app/types/Søkerinfo';
import Kvittering from 'app/types/Kvittering';
import { ApiActionTypes, GetSøkerinfoRequest, SendSøknadRequest } from '../types/ApiAction';
import normalizeName from 'app/utils/normalizeName';
import { SøkerinfoDTOArbeidsforhold } from 'app/types/SøkerinfoArbeidsforholdDTO';
import { mapArbeidsforhold } from 'app/utils/arbeidsforholdUtils';

function* getSøkerInfoSaga(_: GetSøkerinfoRequest): any {
    try {
        const response = yield call(getSøkerinfo);
        const { søker } = response.data;
        const arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined =
            response.data !== undefined ? response.data.arbeidsforhold : [];
        const søkerinfo: Søkerinfo = {
            ...response.data,
            arbeidsforhold: mapArbeidsforhold(arbeidsforhold),
            søker: {
                ...søker,
                fornavn: normalizeName(søker.fornavn),
                mellomnavn: søker.mellomnavn ? normalizeName(søker.mellomnavn) : undefined,
                etternavn: normalizeName(søker.etternavn),
            },
        };

        yield put({ type: ApiActionTypes.GET_SØKERINFO_SUCCESS, payload: { søkerinfo } });
    } catch (error) {
        yield put({ type: ApiActionTypes.GET_SØKERINFO_FAILURE, payload: { error } });
    }
}

function* sendSøknadSaga(action: SendSøknadRequest): any {
    try {
        const response = yield call(sendSøknad, action.payload.søknad);
        const kvittering: Kvittering = response.data;

        yield put({ type: ApiActionTypes.SEND_SØKNAD_SUCCESS, payload: { kvittering } });
    } catch (error) {
        yield put({ type: ApiActionTypes.SEND_SØKNAD_FAILURE, payload: { error } });
    }
}

function* apiSaga() {
    yield all([takeLatest(ApiActionTypes.GET_SØKERINFO_REQUEST, getSøkerInfoSaga)]);
    yield all([takeLatest(ApiActionTypes.SEND_SØKNAD_REQUEST, sendSøknadSaga)]);
}

export default apiSaga;
