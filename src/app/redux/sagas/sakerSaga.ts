import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { default as apiActions } from '../actions/api/apiActionCreators';
import Sak from '../../types/søknad/Sak';
import { skalKunneSøkeOmEndring, harSakUnderBehandling } from '../../util/saker/sakerUtils';
import { getEksisterendeSakFromDTO } from '../../api/utils/eksisterendeSakApiUtils';

function* getSaker() {
    try {
        yield put(apiActions.updateApi({ isLoadingSaker: true }));

        const response = yield call(Api.getSaker);
        const saker: Sak[] = response.data;
        const nyesteSak = saker.sort((a, b) => b.opprettet.localeCompare(a.opprettet))[0];

        if (nyesteSak !== undefined) {
            if (skalKunneSøkeOmEndring(nyesteSak)) {
                yield put(
                    apiActions.updateApi({
                        sakForEndringssøknad: nyesteSak
                    })
                );
            }

            if (harSakUnderBehandling(nyesteSak) && !skalKunneSøkeOmEndring(nyesteSak)) {
                yield put(
                    apiActions.updateApi({
                        sakUnderBehandling: nyesteSak
                    })
                );
            }
        }
    } catch (error) {
        yield put(
            apiActions.updateApi({
                oppslagSakerFeilet: true
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingSaker: false
            })
        );
    }
}

export function* fetchEksisterendeSak(saksnummer: string) {
    try {
        yield put(apiActions.updateApi({ isLoadingEksisterendeSak: true }));
        const response = yield call(Api.getEksisterendeSak, saksnummer);
        return getEksisterendeSakFromDTO(response.data);
    } catch (error) {
        yield put(
            apiActions.updateApi({
                oppslagEksisterendeSakFeilet: true
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingEksisterendeSak: false
            })
        );
    }
}

export default function* sakerSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SAKER, getSaker)]);
}
