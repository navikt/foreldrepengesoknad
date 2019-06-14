import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import søknadActionCreators, { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions, getTilgjengeligeStønadskontoer } from '../actions/api/apiActionCreators';
import {
    SøknadActionKeys,
    UpdateSøkerAndStorage,
    AvbrytSøknad,
    StartSøknad,
    UpdateSøknadenGjelder
} from '../actions/søknad/søknadActionDefinitions';
import { lagUttaksplan } from '../../util/uttaksplan/forslag/lagUttaksplan';
import { AppState } from '../reducers';
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { fetchEksisterendeSak, fetchEksisterendeSakMedFnr } from './sakerSaga';
import { opprettSøknadFraEksisterendeSak } from '../../util/eksisterendeSak/eksisterendeSakUtils';
import { søknadStegPath } from '../../steg/StegRoutes';
import { StegID } from '../../util/routing/stegConfig';
import { EksisterendeSak } from '../../types/EksisterendeSak';
import { getStønadskontoParams } from '../../util/uttaksplan/stønadskontoParams';
import Sak, { SakType } from 'app/types/søknad/Sak';
import { validerUttaksplanAction } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { ApiState } from '../reducers/apiReducer';
import { getFødselsnummerForAnnenPartPåRegistrerteBarn } from '../util/fødselsnummerUtil';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';
import { selectSøkerErFarEllerMedmor } from 'app/selectors/utledetSøknadsinfoSelectors';

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

    const eksisterendeSak: EksisterendeSak | undefined = sak.type === SakType.FPSAK ? yield call(fetchEksisterendeSak, saksnummer) : undefined;
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

function* getAnnenPartSinSakForValgtBarn({ payload }: UpdateSøknadenGjelder) {
    const appState: AppState = yield select(stateSelector);
    const annenPartFnr = getFødselsnummerForAnnenPartPåRegistrerteBarn(payload.valgteBarn);
    if (appState.søknad.erEndringssøknad || annenPartFnr === undefined || !selectSøkerErFarEllerMedmor(appState)) {
        return;
    };

    const annenPartsEksisterendeSak: EksisterendeSak | undefined = yield call(fetchEksisterendeSakMedFnr, annenPartFnr);
    if (annenPartsEksisterendeSak) {
        const søknad = appState.søknad;
        yield put(
            søknadActions.updateSøknad({
                ...søknad,
                dekningsgrad: annenPartsEksisterendeSak.grunnlag.dekningsgrad,
                ekstrainfo: {
                    ...appState.søknad.ekstrainfo,
                    eksisterendeSakAnnenPart: {
                        ...annenPartsEksisterendeSak
                    }
                }
            })
        );
    };
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
    const { uttaksplanSkjema, eksisterendeSakAnnenPart } = appState.søknad.ekstrainfo;
    let tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(appState);
    if (eksisterendeSakAnnenPart) {
        tilgjengeligeStønadskontoer = beregnGjenståendeUttaksdager(
            tilgjengeligeStønadskontoer,
            eksisterendeSakAnnenPart!.uttaksplan!,
            false
        );
    };

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
        });

        if (eksisterendeSakAnnenPart && eksisterendeSakAnnenPart.uttaksplan) {
            forslag.push(...eksisterendeSakAnnenPart.uttaksplan);
        };
        
        yield put(søknadActions.uttaksplanSetForslag(forslag.sort(sorterPerioder)));
    }
}

export default function* søknadSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPDATE_SØKER_AND_STORAGE, updateSøkerAndStorage),
        takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, avbrytSøknadSaga),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, lagUttaksplanForslag),
        takeEvery(SøknadActionKeys.START_SØKNAD, startSøknad),
        takeEvery(SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN, getAnnenPartSinSakForValgtBarn)
    ]);
}
