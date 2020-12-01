import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import søknadActionCreators, { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as apiActions, getTilgjengeligeStønadskontoer } from '../actions/api/apiActionCreators';
import { SøknadActionKeys, UpdateSøkerAndStorage, StartSøknad } from '../actions/søknad/søknadActionDefinitions';
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
import { StønadskontoType } from 'common/types';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';
import { skalKunneViseMorsUttaksplanForFarEllerMedmor } from 'app/util/uttaksplan/uttakUtils';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

const stateSelector = (state: AppState) => state;

function* updateSøkerAndStorage(action: UpdateSøkerAndStorage) {
    yield put(søknadActions.updateSøker(action.payload));
    yield put(apiActions.storeAppState());
}

function* avbrytSøknadSaga() {
    const appState: AppState = yield select(stateSelector);
    const newApiState: ApiState = { ...appState.api, stønadskontoer100: [], stønadskontoer80: [] };
    yield put(apiActions.updateApi(newApiState));
    yield put(apiActions.deleteStoredAppState());
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

    const eksisterendeSak: EksisterendeSak | undefined =
        sak.type === SakType.FPSAK && saksnummer !== undefined
            ? yield call(fetchEksisterendeSak, saksnummer)
            : undefined;
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
                },
            })
        );
        const updatedAppState = yield select(stateSelector);
        const søknadsinfo = selectSøknadsinfo(updatedAppState);
        if (søknadsinfo) {
            const barn = updatedAppState.søknad.barn;
            yield call(
                getTilgjengeligeStønadskontoer,
                getStønadskontoParams(
                    søknadsinfo,
                    ISOStringToDate(eksisterendeSak.grunnlag.familieHendelseDato),
                    barn,
                    eksisterendeSak.grunnlag
                ),
                history
            );
        }
        yield call(validerUttaksplanAction);
        yield put(søknadActionCreators.setCurrentSteg(StegID.UTTAKSPLAN));
    }
}

function* getAnnenPartsSakForValgtBarn() {
    const appState: AppState = yield select(stateSelector);
    const { søknad } = appState;
    const { ekstrainfo } = søknad;
    const annenPartFnr = ekstrainfo.søknadenGjelderBarnValg
        ? getFødselsnummerForAnnenPartPåRegistrerteBarn(ekstrainfo.søknadenGjelderBarnValg.valgteBarn)
        : undefined;

    if (appState.søknad.erEndringssøknad || annenPartFnr === undefined || !selectSøkerErFarEllerMedmor(appState)) {
        return;
    }

    const sak: EksisterendeSak | undefined = yield call(fetchEksisterendeSakMedFnr, annenPartFnr);
    if (sak) {
        yield put(
            søknadActions.updateSøknad({
                dekningsgrad: sak.grunnlag.dekningsgrad,
            })
        );
        yield put(søknadActions.updateEkstrainfo({ eksisterendeSak: { ...sak, erAnnenPartsSak: true } }));
    }
}

function* startFallbackEndringssøknad(action: StartSøknad) {
    yield put(
        søknadActions.updateSøknad({
            erEndringssøknad: true,
            saksnummer: action.saksnummer,
        })
    );
    yield put(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
}

function* lagUttaksplanForslag() {
    const appState: AppState = yield select(stateSelector);
    const søknadsinfo = selectSøknadsinfo(appState);
    const { uttaksplanSkjema, eksisterendeSak } = appState.søknad.ekstrainfo;
    let tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(appState);

    const annenPartsSak = eksisterendeSak && eksisterendeSak.erAnnenPartsSak ? eksisterendeSak : undefined;
    if (annenPartsSak) {
        tilgjengeligeStønadskontoer = beregnGjenståendeUttaksdager(
            tilgjengeligeStønadskontoer,
            annenPartsSak.uttaksplan || [],
            false
        );
        const resterendeFellesperiode = tilgjengeligeStønadskontoer.find(
            (konto) => konto.konto === StønadskontoType.Fellesperiode
        );
        uttaksplanSkjema.antallDagerFellesperiodeFarMedmor = resterendeFellesperiode
            ? resterendeFellesperiode.dager
            : undefined;
    }

    if (søknadsinfo) {
        const {
            søknaden: { erDeltUttak, erEndringssøknad, erEnkelEndringssøknad, familiehendelsesdato, situasjon },
            annenForelder,
            søker,
        } = søknadsinfo;

        const { førsteUttaksdagEtterSeksUker } = søknadsinfo.uttaksdatoer.etterFødsel;

        const forslag = lagUttaksplan({
            annenForelderErUfør: annenForelder.erUfør,
            erDeltUttak,
            erEndringssøknad,
            familiehendelsesdato,
            situasjon,
            søkerErFarEllerMedmor: søker.erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            uttaksplanSkjema,
            erEnkelEndringssøknad,
            førsteUttaksdagEtterSeksUker,
            søkerHarMidlertidigOmsorg: søker.harMidlertidigOmsorg,
        });

        if (
            annenPartsSak &&
            annenPartsSak.uttaksplan &&
            skalKunneViseMorsUttaksplanForFarEllerMedmor(annenPartsSak.grunnlag, søknadsinfo)
        ) {
            forslag.push(...annenPartsSak.uttaksplan);
        }

        yield put(søknadActions.uttaksplanSetForslag(forslag.sort(sorterPerioder)));
    }
}

export default function* søknadSaga() {
    yield all([
        takeEvery(SøknadActionKeys.UPDATE_SØKER_AND_STORAGE, updateSøkerAndStorage),
        takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, avbrytSøknadSaga),
        takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, lagUttaksplanForslag),
        takeEvery(SøknadActionKeys.START_SØKNAD, startSøknad),
        takeEvery(ApiActionKeys.GET_ANNEN_PART_SIN_SAK, getAnnenPartsSakForValgtBarn),
    ]);
}
