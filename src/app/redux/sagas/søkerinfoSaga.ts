import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { ApiActionKeys, GetSøkerinfo } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { getSøkerinfoFromDTO } from '../../api/utils/søkerinfoUtils';
import { Søkerinfo } from '../../types/søkerinfo';
import { AppState } from '../reducers';

const stateSelector = (state: AppState) => state;

function shouldUseStoredDataIfTheyExist(søkerinfo?: Søkerinfo): boolean {
    if (!søkerinfo) {
        return false;
    }
    return true;
}

function* getSøkerinfo(action: GetSøkerinfo) {
    const appState: AppState = yield select(stateSelector);
    const søkerinfoLastetCounter = appState.api.søkerinfoLastetCounter + 1;
    try {
        yield put(apiActions.updateApi({ isLoadingSøkerinfo: true, søkerinfoLastetCounter }));
        const response = yield call(Api.getSøkerinfo);
        const søkerinfo: Søkerinfo = getSøkerinfoFromDTO(response.data);
        const useStorage = shouldUseStoredDataIfTheyExist(søkerinfo);

        yield put(
            apiActions.updateApi({
                søkerinfo,
            })
        );

        if (useStorage) {
            yield put(apiActions.getStorageData(action.history));
        } else {
            yield put(apiActions.deleteStoredAppState());
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            redirectToLogin();
        } else if (error.response && error.response.status === 403) {
            yield put(apiActions.updateApi({ isLoadingInitialAppData: false, påloggingsNivåLavereEnn4: true }));
        } else {
            if (søkerinfoLastetCounter <= 1) {
                yield put(apiActions.getSøkerinfo(action.history));
            } else {
                yield put(apiActions.updateApi({ isLoadingInitialAppData: false, systemerIkkeTilgjengelig: true }));
            }
        }
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingSøkerinfo: false,
            })
        );
    }
}

export default function* søkerinfoSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SØKERINFO, getSøkerinfo)]);
}
