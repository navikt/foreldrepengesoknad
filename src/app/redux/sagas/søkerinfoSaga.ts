import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { ApiStatePartial } from '../reducers/apiReducer';
import { getSøkerinfoFromDTO } from '../../api/utils/søkerinfoUtils';
import { Søkerinfo } from '../../types/søkerinfo';
import { redirectToGenerellFeil } from '../../util/routing/generellFeil';

function shouldUseStoredDataIfTheyExist(søkerinfo?: Søkerinfo): boolean {
    if (!søkerinfo) {
        return false;
    }

    const { registrerteBarn } = søkerinfo;
    return !(registrerteBarn && registrerteBarn.length > 0);
}

function* getSøkerinfo() {
    try {
        const response = yield call(Api.getSøkerinfo);
        const søkerinfo: Søkerinfo = getSøkerinfoFromDTO(response.data);
        const useStorage = shouldUseStoredDataIfTheyExist(søkerinfo) || 1 === 1;
        const nextApiState: ApiStatePartial = {
            søkerinfo,
            isLoadingSøkerinfo: true,
            isLoadingAppState: true
        };
        yield put(apiActions.updateApi(nextApiState));
        if (useStorage) {
            yield put(apiActions.getStoredAppState());
        } else {
            yield put(apiActions.deleteStoredAppState());
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            redirectToLogin();
        } else {
            redirectToGenerellFeil();
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
