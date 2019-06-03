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
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { fetchEksisterendeSak } from './sakerSaga';
import { opprettSøknadFraEksisterendeSak } from '../../util/eksisterendeSak/eksisterendeSakUtils';
import { søknadStegPath } from '../../steg/StegRoutes';
import { StegID } from '../../util/routing/stegConfig';
import { EksisterendeSak } from '../../types/EksisterendeSak';
import { getStønadskontoParams } from '../../util/uttaksplan/stønadskontoParams';
import Sak from 'app/types/søknad/Sak';
import { validerUttaksplanAction } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { ApiState } from '../reducers/apiReducer';

const stateSelector = (state: AppState) => state;

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga(action: AvbrytSøknad) {
    const appState: AppState = yield select(stateSelector);
    const newApiState: ApiState = { ...appState.api, stønadskontoer100: [], stønadskontoer80: [] };
    yield put(apiActions.updateApi(newApiState));
    yield put(apiActions.storeAppState());
}

function* startSøknad(action: StartSøknad) {
    const { erEndringssøknad, saksnummer } = action;
    const appState: AppState = yield select(stateSelector);

    if (erEndringssøknad && saksnummer && appState.api.sakForEndringssøknad) {
        yield call(startEndringssøknad, action, appState.api.sakForEndringssøknad);
        yield put(apiActions.storeAppState());
    } else {
        yield call(startFørstegangssøknad, action);
    }
}

function* startFørstegangssøknad(action: StartSøknad) {
    yield put(søknadActions.updateSøknad({ erEndringssøknad: false }));
    action.history.push(søknadStegPath(StegID.INNGANG));
}

function* startEndringssøknad(action: StartSøknad, sak: Sak) {
    const { saksnummer, søkerinfo, history } = action;
    const appState: AppState = yield select(stateSelector);
    const eksisterendeSak: EksisterendeSak | undefined = yield call(fetchEksisterendeSak, saksnummer);
    const søknad = eksisterendeSak ? opprettSøknadFraEksisterendeSak(søkerinfo, eksisterendeSak, sak) : undefined;

    if (eksisterendeSak === undefined || søknad === undefined) {
        yield call(startFallbackEndringssøknad, action);
    } else {
        yield put(
            søknadActions.updateSøknad({
                ...søknad,
                erEndringssøknad: true,
                saksnummer,
                ekstrainfo: {
                    ...appState.søknad.ekstrainfo,
                    eksisterendeSak,
                    erEnkelEndringssøknad: true,
                    erEnkelEndringssøknadMedUttaksplan: eksisterendeSak.uttaksplan !== undefined
                }
            })
        );
        const updatedAppState = yield select(stateSelector);
        const søknadsinfo = selectSøknadsinfo(updatedAppState);
        if (søknadsinfo) {
            yield call(
                getTilgjengeligeStønadskontoer,
                getStønadskontoParams(
                    søknadsinfo,
                    eksisterendeSak.grunnlag.familieHendelseDato,
                    eksisterendeSak.grunnlag
                ),
                history
            );
        }
        yield call(validerUttaksplanAction);
        yield put(søknadActionCreators.setCurrentSteg(StegID.UTTAKSPLAN));
    }
}

function* startFallbackEndringssøknad(action: StartSøknad) {
    yield put(
        søknadActions.updateSøknad({
            erEndringssøknad: true,
            saksnummer: action.saksnummer
        })
    );
    yield put(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
}

function* lagUttaksplanForslag() {
    const appState: AppState = yield select(stateSelector);
    const søknadsinfo = selectSøknadsinfo(appState);
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
