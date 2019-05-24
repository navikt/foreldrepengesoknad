import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { default as apiActions } from '../actions/api/apiActionCreators';
import Sak, { FagsakStatus } from '../../types/søknad/Sak';
import { skalKunneSøkeOmEndring, harSakUnderBehandling, harEnAvsluttetBehandling } from '../../util/saker/sakerUtils';
import { getEksisterendeSakFromDTO } from 'app/util/eksisterendeSak/eksisterendeSakUtils';

function* getSaker() {
    try {
        yield put(apiActions.updateApi({ isLoadingSaker: true }));

        const response = yield call(Api.getSaker);
        const saker: Sak[] = response.data;
        const nyesteSakArray = saker.sort((a, b) => b.opprettet.localeCompare(a.opprettet));
        const nyesteRelevanteSak = nyesteSakArray.find(
            (sak) =>
                sak.status === FagsakStatus.LOPENDE || (harSakUnderBehandling(sak) && harEnAvsluttetBehandling(sak))
        );

        if (nyesteRelevanteSak !== undefined) {
            if (skalKunneSøkeOmEndring(nyesteRelevanteSak)) {
                yield put(
                    apiActions.updateApi({
                        sakForEndringssøknad: nyesteRelevanteSak
                    })
                );
            }

            if (harSakUnderBehandling(nyesteRelevanteSak) && !skalKunneSøkeOmEndring(nyesteRelevanteSak)) {
                yield put(
                    apiActions.updateApi({
                        sakUnderBehandling: nyesteRelevanteSak
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
