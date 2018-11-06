import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys, GetSøkerinfo } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { getSøkerinfoFromDTO } from '../../api/utils/søkerinfoUtils';
import { Søkerinfo } from '../../types/søkerinfo';
import routeConfig from '../../util/routing/routeConfig';

function shouldUseStoredDataIfTheyExist(søkerinfo?: Søkerinfo): boolean {
    if (!søkerinfo) {
        return false;
    }

    const { registrerteBarn } = søkerinfo;
    return !(registrerteBarn && registrerteBarn.length > 0);
}

function* getSøkerinfo(action: GetSøkerinfo) {
    try {
        yield put(apiActions.updateApi({ isLoadingSøkerinfo: true }));

        const response = yield call(Api.getSøkerinfo);
        const søkerinfo: Søkerinfo = getSøkerinfoFromDTO(response.data);
        const useStorage = shouldUseStoredDataIfTheyExist(søkerinfo);

        yield put(
            apiActions.updateApi({
                søkerinfo
            })
        );

        if (useStorage) {
            yield put(apiActions.getStoredAppState());
        } else {
            yield put(apiActions.deleteStoredAppState());
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            redirectToLogin();
        } else {
            action.history.push(routeConfig.GENERELL_FEIL_URL);
        }
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingSøkerinfo: false
            })
        );
    }
}

export default function* søkerinfoSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SØKERINFO, getSøkerinfo)]);
}
