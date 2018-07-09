import { all, put, takeLatest, select } from 'redux-saga/effects';
import { SummaryActionKeys } from '../actions/summary/summaryActionDefinitions';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AppState } from '../reducers';

function* approveStep(action: any) {
    yield put({ type: SummaryActionKeys.APPROVE_STEP, action });
}

function* flagStep(action: any) {
    const approvedSteg = yield select(
        (state: AppState) => state.summary.godkjenteSteg
    );
    if (approvedSteg[action.stegID] || true) {
        yield put({ type: SummaryActionKeys.FLAG_STEP, action });
    }
}

export default function* summarySaga() {
    yield all(
        Object.entries(SøknadActionKeys).map((søknadActionKey) =>
            takeLatest(søknadActionKey, flagStep)
        )
    );
    yield all([takeLatest(SummaryActionKeys.EXPAND_SUMMARY, approveStep)]);
}
