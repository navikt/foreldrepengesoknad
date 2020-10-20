import { takeEvery, all, call, put, select, throttle } from 'redux-saga/effects';
import _ from 'lodash';
import Api from '../../api/api';
import { ApiActionKeys, GetStorageData } from '../actions/api/apiActionDefinitions';
import { default as apiActions } from '../actions/api/apiActionCreators';
import { default as søknadActions } from '../actions/søknad/søknadActionCreators';
import { default as commonActions } from '../actions/common/commonActionCreators';
import { default as uttaksplanValideringActions } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { AppState } from '../reducers';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AxiosResponse } from 'axios';
import Søknad from '../../types/søknad/Søknad';
import { cleanInvalidSøknadData } from '../../util/storageCleanup/storageCleanup';
import { History } from 'history';
import routeConfig from '../../util/routing/routeConfig';
import StorageSagaUtils from '../../util/storageSagaUtils';
import { StorageKvittering } from '../../types/StorageKvittering';
import moment from 'moment';
import { FødtBarn } from 'app/types/søknad/Barn';

const stateSelector = (state: AppState) => state;

function* saveAppState() {
    try {
        const appState: AppState = yield select(stateSelector);
        const { sensitivInfoIkkeLagre, ...søknad } = appState.søknad;
        const cleanedAppState = {
            ...appState,
            søknad: søknad as Søknad,
        };

        yield call(Api.storeAppState, cleanedAppState);
    } catch (error) {
        const update = {
            isLoadingStoredAppState: false,
            ...(_.get(error, 'response.status') === 401 ? { sessionHasExpired: true } : {}),
        };

        yield put(apiActions.updateApi(update));
    }
}

function* getStorageData(action: GetStorageData) {
    try {
        put(apiActions.updateApi({ isLoadingStoredAppState: true }));
        const appStateResponse: AxiosResponse = yield call(Api.getStoredAppState);
        const storageKvitteringResponse = yield call(Api.getStorageKvittering);
        const appState: AppState = appStateResponse.data;
        const storageKvittering: StorageKvittering = storageKvitteringResponse.data;

        if (appState) {
            yield applyStoredStateToApp(appState, action.history);
        }

        if (storageKvittering) {
            yield put(apiActions.updateApi({ storageKvittering }));
        }
    } catch {
        yield put(apiActions.updateApi({ isLoadingStoredAppState: false }));
    } finally {
        yield put(apiActions.updateApi({ isLoadingStoredAppState: false, isLoadingInitialAppData: false }));
    }
}

function* applyStoredStateToApp(storedState: AppState, history: History) {
    if (Object.keys(storedState).length !== 0) {
        const appState: AppState = yield select(stateSelector);
        const søknad: Søknad = cleanInvalidSøknadData(storedState.søknad);
        const { søkerinfo } = appState.api;

        if (søknad.ekstrainfo.søknadenGjelderBarnValg === undefined) {
            søknad.ekstrainfo.søknadenGjelderBarnValg = {
                gjelderAnnetBarn: søknad.barn.erBarnetFødt !== undefined,
                valgteBarn: [],
            };
        }

        const valgteRegistrerteBarn = StorageSagaUtils.getValgteRegistrerteBarnISøknaden(søknad);
        const registrerteBarn = søkerinfo ? søkerinfo.registrerteBarn : undefined;

        if (
            søkerinfo === undefined ||
            søknad.ekstrainfo.currentStegID === undefined ||
            (valgteRegistrerteBarn !== undefined &&
                StorageSagaUtils.stemmerValgteBarnISøknadMedSøkersBarn(valgteRegistrerteBarn, registrerteBarn) ===
                    false)
        ) {
            yield put(commonActions.setSpråk(storedState.common.språkkode));
            yield put(søknadActions.avbrytSøknad());
            history.push(routeConfig.APP_ROUTE_PREFIX);
        } else {
            if (søknad.erEndringssøknad === undefined) {
                søknad.erEndringssøknad = false;
            }
            yield put(søknadActions.updateSøknad(søknad));

            if (valgteRegistrerteBarn) {
                const { barn } = søknad;
                yield put(
                    søknadActions.updateSøknadenGjelderBarn({
                        valgteBarn: valgteRegistrerteBarn,
                        termindato: (barn as FødtBarn).termindato.date,
                    })
                );
            }

            yield put(commonActions.setSpråk(storedState.common.språkkode));
            yield put(uttaksplanValideringActions.validerUttaksplanAction());
        }
    }
}

function* deleteStoredAppState() {
    try {
        yield put(apiActions.updateApi({ isLoadingStoredAppState: true }));
        yield call(Api.deleteStoredAppState);
    } catch {
        yield put(
            apiActions.updateApi({
                isLoadingStoredAppState: false,
            })
        );
    } finally {
        yield put(
            apiActions.updateApi({
                isLoadingStoredAppState: false,
                isLoadingInitialAppData: false,
            })
        );
    }
}

function* sendStorageKvittering() {
    yield call(Api.sendStorageKvittering, {
        innsendingstidspunkt: moment().format('YYYY-MM-DD'),
    });
}

const THROTTLE_INTERVAL_MS = 2500;

export default function* storageSaga() {
    yield all([
        takeEvery(ApiActionKeys.GET_STORAGE_DATA, getStorageData),
        takeEvery(ApiActionKeys.DELETE_STORED_APP_STATE, deleteStoredAppState),
        throttle(THROTTLE_INTERVAL_MS, ApiActionKeys.STORE_APP_STATE, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, saveAppState),
        throttle(THROTTLE_INTERVAL_MS, SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, saveAppState),
        throttle(
            THROTTLE_INTERVAL_MS,
            [
                SøknadActionKeys.UPDATE_SØKNAD,
                SøknadActionKeys.UPDATE_SØKER,
                SøknadActionKeys.UPDATE_BARN,
                SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD,
                SøknadActionKeys.UPDATE_SØKNADEN_GJELDER_BARN,
                SøknadActionKeys.UPDATE_ANNEN_FORELDER,
                SøknadActionKeys.SET_TILLEGGSOPPLYSNING,
            ],
            saveAppState
        ),
        takeEvery(ApiActionKeys.SEND_STORAGE_KVITTERING, sendStorageKvittering),
    ]);
}
