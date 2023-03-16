import { all } from 'redux-saga/effects';
import apiSaga from './apiSaga';
import attachmentSaga from './attachmentSaga';

function* rootSaga() {
    yield all([apiSaga(), attachmentSaga()]);
}

export default rootSaga;
