import { all } from 'redux-saga/effects';
import personSaga from './personSaga';
import innsendingSaga from './innsendingSaga';

export default function* rootSaga() {
    yield all([personSaga(), innsendingSaga()]);
}
