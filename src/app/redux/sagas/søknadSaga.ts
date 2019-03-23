import { takeEvery, all, put, select } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { SøknadActionKeys, UpdateSøkerAndStorage, AvbrytSøknad } from '../actions/søknad/søknadActionDefinitions';
import { lagUttaksplan } from '../../util/uttaksplan/forslag/lagUttaksplan';
import { AppState } from '../reducers';
import { getSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';

const stateSelector = (state: AppState) => state;

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga(action: AvbrytSøknad) {
    yield put(apiActions.storeAppState());
}

function* lagUttaksplanForslag() {
    const appState: AppState = yield select(stateSelector);
    const søknadsinfo = getSøknadsinfo(appState);
    const { tilgjengeligeStønadskontoer } = appState.api;
    const { uttaksplanSkjema } = appState.søknad.ekstrainfo;
    if (søknadsinfo) {
        const {
            søknaden: { erDeltUttak, erEndringssøknad, familiehendelsesdato, situasjon },
            annenForelder,
            søker
        } = søknadsinfo;
        const forslag = lagUttaksplan({
            annenForelderErUfør: annenForelder.erUfør,
            erDeltUttak,
            erEndringssøknad,
            familiehendelsesdato,
            situasjon,
            søkerErFarEllerMedmor: søker.erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            uttaksplanSkjema
        }).sort(sorterPerioder);
        yield put(søknadActions.uttaksplanSetForslag(forslag));
    }
}

export default function* søknadSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPDATE_SØKER_AND_STORAGE, updateSøkerAndStorage),
        takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, avbrytSøknadSaga),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, lagUttaksplanForslag)
    ]);
}
