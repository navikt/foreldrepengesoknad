import { all } from 'redux-saga/effects';
import personSaga from './personSaga';
import innsendingSaga from './innsendingSaga';
import attachmentSaga from './attachmentSaga';

export default function* rootSaga() {
    yield all([personSaga(), innsendingSaga(), attachmentSaga()]);
}
