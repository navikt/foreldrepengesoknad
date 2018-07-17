import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/routing/login';
import { erMyndig } from '../../util/domain/personUtil';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { ApiStatePartial } from '../reducers/apiReducer';

function shouldUseStoredDataIfTheyExist(apiState: ApiStatePartial) {
    const { person } = apiState;
    if (person) {
        return !person.registrerteBarn || person.registrerteBarn.length <= 0;
    }
    return true;
}

function* getSøkerinfo(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person = response.data.søker;
        const arbeidsforhold = response.data.arbeidsforhold;
        const nextApiState: ApiStatePartial = {
            person: {
                ...person,
                erMyndig: erMyndig(person),
                registrerteBarn: response.data.søker.barn
            },
            isLoadingPerson: false,
            isLoadingAppState: true,
            arbeidsforhold
        };
        yield put(apiActions.updateApi(nextApiState));
        if (shouldUseStoredDataIfTheyExist(nextApiState)) {
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
