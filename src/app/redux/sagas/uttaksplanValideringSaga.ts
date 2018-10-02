import { takeEvery, all, put, select } from 'redux-saga/effects';
import {
    SøknadActionKeys,
    UttaksplanUpdatePeriode,
    UttaksplanAddPeriode
} from '../actions/søknad/søknadActionDefinitions';
import { AppState } from '../reducers';
import {
    validerUttaksplanAction,
    setValidertPeriode,
    setValidertePerioder
} from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { Periode } from '../../types/uttaksplan/periodetyper';
import {
    UttaksplanValideringActionKeys,
    ValidertPeriode
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { validerPeriodeForm } from '../../util/validation/uttaksplan/periodeFormValidation';

const stateSelector = (state: AppState) => state;

const validerPeriode = (appState: AppState, periode: Periode): ValidertPeriode => {
    const { søker, annenForelder } = appState.søknad;
    const { tilgjengeligeStønadskontoer } = appState.api;
    return {
        periodeId: periode.id,
        valideringsfeil: validerPeriodeForm(periode, søker, annenForelder, tilgjengeligeStønadskontoer)
    };
};

function* validerPeriodeSaga(action: UttaksplanUpdatePeriode | UttaksplanAddPeriode) {
    const appState: AppState = yield select(stateSelector);
    yield put(setValidertPeriode(validerPeriode(appState, action.periode)));
}

function* validerUttaksplanSaga() {
    const appState: AppState = yield select(stateSelector);
    const validertePerioder: ValidertPeriode[] = [];
    appState.søknad.uttaksplan.forEach((periode) => {
        validertePerioder.push(validerPeriode(appState, periode));
    });
    yield put(setValidertePerioder(validertePerioder));
}

export default function* storageSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerPeriodeSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerPeriodeSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanAction)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, validerUttaksplanAction)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
}
