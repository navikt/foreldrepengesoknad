import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { erMyndig } from '../../util/domain/personUtil';

function* getSøkerinfo(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person = response.data.søker;
        const arbeidsforhold = response.data.arbeidsforhold;
        yield put({
            type: ApiActionKeys.GET_SØKERINFO_SUCCESS,
            person: {
                ...person,
                erMyndig: erMyndig(person),
                barn: response.data.søker.barn
            },
            arbeidsforhold
        });
    } catch (error) {
        if (error.response) {
            error.response.status === 401
                ? redirectToLogin()
                : yield put({
                      type: ApiActionKeys.GET_SØKERINFO_FAILED,
                      error
                  });
        } else {
            yield put({
                type: ApiActionKeys.GET_SØKERINFO_FAILED,
                error: {
                    networkError: true
                }
            });
        }
    }
}

export default function* personSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SØKERINFO_REQUEST, getSøkerinfo)]);
}
