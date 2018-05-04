import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/login';

// tslint:disable-next-line:no-any
function* getPerson(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person = response.data;
        yield put({ type: ApiActionKeys.GET_PERSON_SUCCESS, person });
    } catch (error) {
        if (error.response) {
            error.response.status === 401
                ? redirectToLogin()
                : yield put({
                      type: ApiActionKeys.GET_PERSON_FAILED,
                      error: {
                          response: error.response
                      }
                  });
        } else {
            yield put({
                type: ApiActionKeys.GET_PERSON_FAILED,
                error: {
                    networkError: true
                }
            });
        }
    }
}

export default function* personSaga() {
    yield all([takeLatest(ApiActionKeys.GET_PERSON, getPerson)]);
}
