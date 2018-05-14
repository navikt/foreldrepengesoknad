import moment from 'moment';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import Api from '../../api/api';
import { redirectToLogin } from '../../util/login';
import Person from '../../types/Person';

const erMyndig = (person: Person) => {
    const now = moment();
    const fødselsdatp = moment(person.fødselsdato);
    return now.diff(fødselsdatp, 'years') >= 18;
};

function* getPerson(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person = response.data;
        yield put({
            type: ApiActionKeys.GET_PERSON_SUCCESS,
            person: { ...person, erMyndig: erMyndig(person) }
        });
    } catch (error) {
        if (error.response) {
            error.response.status === 401
                ? redirectToLogin()
                : yield put({
                      type: ApiActionKeys.GET_PERSON_FAILED,
                      error
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
