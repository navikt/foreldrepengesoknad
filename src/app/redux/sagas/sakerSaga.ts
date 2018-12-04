import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { default as apiActions } from '../actions/api/apiActionCreators';
import Sak from '../../types/søknad/Sak';
import { skalKunneSøkeOmEndring } from '../../util/saker/sakerUtils';

function* getSaker() {
    try {
        yield put(apiActions.updateApi({ isLoadingSaker: true }));

        const response = yield call(Api.getSaker);
        const saker: Sak[] = response.data;
        const nyesteSak = saker.sort((a, b) => b.opprettet.localeCompare(a.opprettet))[0];

        if (skalKunneSøkeOmEndring(nyesteSak)) {
            yield put(
                apiActions.updateApi({
                    sakForEndringssøknad: nyesteSak
                })
            );
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            redirectToLogin();
        }
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingSaker: false
            })
        );
    }
}

export default function* sakerSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SAKER, getSaker)]);
}
