import { all } from 'redux-saga/effects';
import personSaga from './personSaga';

export default function* rootSaga() {
    yield all([personSaga()]);
}
