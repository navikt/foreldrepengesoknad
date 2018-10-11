import { takeEvery, all, put, select } from 'redux-saga/effects';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AppState } from '../reducers';
import { setUttaksplanValidering } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { UttaksplanValideringActionKeys } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { validerPeriodeForm } from '../../util/validation/uttaksplan/periodeFormValidation';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Periodevalidering, ValidertPeriode } from '../reducers/uttaksplanValideringReducer';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { getUttaksstatus } from '../../util/uttaksplan/uttaksstatus';

const stateSelector = (state: AppState) => state;

const validerPeriode = (appState: AppState, periode: Periode): ValidertPeriode => {
    const { søker, annenForelder } = appState.søknad;
    const { tilgjengeligeStønadskontoer } = appState.api;
    return {
        periodeId: periode.id,
        valideringsfeil: validerPeriodeForm(periode, søker, annenForelder, tilgjengeligeStønadskontoer) || [],
        overlappendePerioder: Periodene(appState.søknad.uttaksplan).finnOverlappendePerioder(periode)
    };
};

const getStønadskonterMedFormMyeUttak = (uttak: Stønadskontouttak[]) => {
    return uttak.filter((u) => u.dagerGjenstående < 0);
};

function* validerUttaksplanSaga(action: any) {
    const appState: AppState = yield select(stateSelector);
    const { uttaksplan } = appState.søknad;
    const validertePerioder: Periodevalidering = {};
    let antallAktivePerioder = 0;
    uttaksplan.forEach((periode) => {
        validertePerioder[periode.id] = validerPeriode(appState, periode);
        if (periode.tidsperiode.fom !== undefined && periode.tidsperiode.tom !== undefined) {
            antallAktivePerioder++;
        }
    });
    const uttaksstatus = getUttaksstatus(
        appState.api.tilgjengeligeStønadskontoer,
        uttaksplan,
        appState.søknad.søker.rolle
    );
    yield put(
        setUttaksplanValidering(
            validertePerioder,
            antallAktivePerioder > 0,
            getStønadskonterMedFormMyeUttak(uttaksstatus)
        )
    );
}

export default function* uttaksplanValideringSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, validerUttaksplanSaga)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
}
