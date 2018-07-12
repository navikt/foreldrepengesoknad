import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { erMyndig } from '../../util/domain/personUtil';
import { default as apiActions } from '../actions/api/apiActionCreators';

function* getSøkerinfo(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person = response.data.søker;
        const arbeidsforhold = response.data.arbeidsforhold;
        yield put(
            apiActions.updateApi({
                person: {
                    ...person,
                    erMyndig: erMyndig(person),
                    barn: response.data.søker.barn
                },
                isLoadingPerson: false,
                arbeidsforhold
            })
        );
    } catch (error) {
        if (error.response) {
            error.response.status === 401
                ? redirectToLogin()
                : yield put(
                      apiActions.updateApi({
                          isLoadingPerson: false,
                          error
                      })
                  );
        } else {
            yield put(
                apiActions.updateApi({
                    isLoadingPerson: false,
                    error: {
                        networkError: true
                    }
                })
            );
        }
    }
}

export default function* personSaga() {
    yield all([takeLatest(ApiActionKeys.GET_SØKERINFO, getSøkerinfo)]);
}
