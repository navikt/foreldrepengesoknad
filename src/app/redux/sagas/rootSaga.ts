import { all } from 'redux-saga/effects';
import personSaga from './personSaga';
import innsendingSaga from './innsendingSaga';
import attachmentSaga from './attachmentSaga';
import summarySaga from './summarySaga';
import storageSaga from './storageSaga';
import søknadSaga from './søknadSaga';

export default function* rootSaga() {
    yield all([
        personSaga(),
        innsendingSaga(),
        attachmentSaga(),
        summarySaga(),
        storageSaga(),
        søknadSaga()
    ]);
}
