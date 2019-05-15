import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import søknadActionCreators, { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions, getTilgjengeligeStønadskontoer } from '../actions/api/apiActionCreators';
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
import { fetchEksisterendeUttak } from './sakerSaga';
import { opprettSøknadFraEksisterendeUttak } from '../../util/eksisterendeSak/eksisterendeSakUtils';
import { søknadStegPath } from '../../connected-components/steg/StegRoutes';
import { StegID } from '../../util/routing/stegConfig';
import { isFeatureEnabled, Feature } from '../../Feature';
import { EksisterendeUttak, Uttaksgrunnlag } from '../../types/EksisterendeUttak';
import { getStønadskontoParams } from '../../util/uttaksplan/st\u00F8nadskontoParams';
import Sak from 'app/types/søknad/Sak';

const stateSelector = (state: AppState) => state;

const søkerKanFåEnkelEndringssøknad = (grunnlag: Uttaksgrunnlag): boolean => {
    return grunnlag.erBarnetFødt === true;
};

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga(action: AvbrytSøknad) {
    yield put(apiActions.storeAppState());
}

function* startSøknad(action: StartSøknad) {
    const { erEndringssøknad, saksnummer } = action;
    const appState: AppState = yield select(stateSelector);

    if (erEndringssøknad && saksnummer && appState.api.sakForEndringssøknad) {
        if (isFeatureEnabled(Feature.hentEksisterendeSak)) {
            yield call(startEnkelEndringssøknad, action, appState.api.sakForEndringssøknad);
        } else {
            yield call(startVanligEndringssøknad, action);
        }
        yield put(apiActions.storeAppState());
    } else {
        yield call(startFørstegangssøknad, action);
    }
}

function* startFørstegangssøknad(action: StartSøknad) {
    yield put(søknadActions.updateSøknad({ erEndringssøknad: false }));
    action.history.push(søknadStegPath(StegID.INNGANG));
}

function* startVanligEndringssøknad(action: StartSøknad) {
    yield put(
        søknadActions.updateSøknad({
            erEndringssøknad: true,
            saksnummer: action.saksnummer
        })
    );
    yield put(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
}

function* startEnkelEndringssøknad(action: StartSøknad, sak: Sak) {
    const { saksnummer, søkerinfo, history } = action;
    const appState: AppState = yield select(stateSelector);

    const eksisterendeUttak: EksisterendeUttak | undefined = yield call(fetchEksisterendeUttak, saksnummer);
    const søknad = eksisterendeUttak
        ? opprettSøknadFraEksisterendeUttak(søkerinfo, eksisterendeUttak, sak, appState.søknad)
        : undefined;

    if (
        eksisterendeUttak === undefined ||
        søkerKanFåEnkelEndringssøknad(eksisterendeUttak.grunnlag) === false ||
        søknad === undefined
    ) {
        yield call(startVanligEndringssøknad, action);
    } else {
        yield put(søknadActions.updateSøknad(søknad));
        const updatedAppState = yield select(stateSelector);
        const søknadsinfo = getSøknadsinfo(updatedAppState);
        if (søknadsinfo) {
            yield call(
                getTilgjengeligeStønadskontoer,
                getStønadskontoParams(
                    søknadsinfo,
                    eksisterendeUttak.grunnlag.familieHendelseDato,
                    eksisterendeUttak.grunnlag
                ),
                history
            );
        }
        yield put(søknadActionCreators.setCurrentSteg(StegID.UTTAKSPLAN));
    }
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
