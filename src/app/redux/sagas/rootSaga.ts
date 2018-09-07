import { all } from 'redux-saga/effects';
import søkerinfoSaga from './søkerinfoSaga';
import innsendingSaga from './innsendingSaga';
import attachmentSaga from './attachmentSaga';
import storageSaga from './storageSaga';
import søknadSaga from './søknadSaga';

export default function* rootSaga() {
    yield all([søkerinfoSaga(), innsendingSaga(), attachmentSaga(), storageSaga(), søknadSaga()]);
}
