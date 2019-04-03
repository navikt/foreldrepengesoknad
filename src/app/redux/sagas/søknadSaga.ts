import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions } from '../actions/api/apiActionCreators';
import {
    SøknadActionKeys,
    UpdateSøkerAndStorage,
    AvbrytSøknad,
    StartSøknad
} from '../actions/søknad/søknadActionDefinitions';
import { lagUttaksplan } from '../../util/uttaksplan/forslag/lagUttaksplan';
import { AppState } from '../reducers';
import { getSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { fetchSakForEndring } from './sakerSaga';
import { opprettSøknadFraSakForEndring } from '../../util/sakForEndring/sakForEndringUtils';
import { søknadStegPath } from '../../connected-components/steg/StegRoutes';
import { StegID } from '../../util/routing/stegConfig';

const stateSelector = (state: AppState) => state;

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga(action: AvbrytSøknad) {
    yield put(apiActions.storeAppState());
}

function* startSøknad(action: StartSøknad) {
    const { erEndringssøknad, saksnummer, søkerinfo, history } = action;
    if (erEndringssøknad && saksnummer) {
        const sakForEndring = yield call(fetchSakForEndring, saksnummer);
        const søknad = opprettSøknadFraSakForEndring(søkerinfo, sakForEndring);
        yield put(
            søknadActions.updateSøknad({
                ...søknad,
                erEndringssøknad,
                saksnummer
            })
        );
    } else {
        yield put(søknadActions.updateSøknad({ erEndringssøknad: false }));
    }
    history.push(søknadStegPath(StegID.RELASJON_TIL_BARN_FØDSEL));
}

function* lagUttaksplanForslag() {
    const appState: AppState = yield select(stateSelector);
    const søknadsinfo = getSøknadsinfo(appState);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(appState);
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
        takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, lagUttaksplanForslag),
        takeEvery(SøknadActionKeys.START_SØKNAD, startSøknad)
    ]);
}
