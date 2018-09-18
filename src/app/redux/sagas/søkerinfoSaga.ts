import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { ApiStatePartial } from '../reducers/apiReducer';

import { SøkerinfoDTO } from '../../api/types/sokerinfoDTO';
import { getSøkerinfoFromDTO } from '../../api/utils/søkerinfoUtils';
import { Søkerinfo } from '../../types/søkerinfo';

function shouldUseStoredDataIfTheyExist(søkerinfo?: Søkerinfo): boolean {
    if (!søkerinfo) {
        return false;
    }

    const { registrerteBarn } = søkerinfo;
    return !(registrerteBarn && registrerteBarn.length > 0);
}

function* getSøkerinfo(action: any) {
    try {
        const response = yield call(Api.getSøkerinfo, action.params);
        const søkerinfoDTO: SøkerinfoDTO = response.data;
        const nextApiState: ApiStatePartial = {
            søkerinfo: getSøkerinfoFromDTO(søkerinfoDTO),
            isLoadingSøkerinfo: false,
            isLoadingAppState: true
        };
        yield put(apiActions.updateApi(nextApiState));
        if (shouldUseStoredDataIfTheyExist(nextApiState.søkerinfo) || 1 === 1) {
            yield put(apiActions.getStoredAppState());
        } else {
            yield put(apiActions.deleteStoredAppState());
        }
    } catch (error) {
        if (error.response) {
            error.response.status === 401
                ? redirectToLogin()
                : yield put(
                      apiActions.updateApi({
                          isLoadingSøkerinfo: false,
                          error
                      })
                  );
        } else {
            yield put(
                apiActions.updateApi({
                    isLoadingSøkerinfo: false,
                    error: {
                        networkError: true
                    }
                })
            );
        }
    }
}

export default function* søkerinfoSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SØKERINFO, getSøkerinfo)]);
}
