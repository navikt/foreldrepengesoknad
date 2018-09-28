import { takeEvery, all, put, select } from 'redux-saga/effects';
import {
    SøknadActionKeys,
    UttaksplanUpdatePeriode,
    UttaksplanAddPeriode
} from '../actions/søknad/søknadActionDefinitions';
import {
    ValiderUtsettelsePayload,
    UttaksplanValideringActionKeys
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { AppState } from '../reducers';
import { erFarEllerMedmor } from '../../util/domain/personUtil';
import {
    validerUtsettelseAction,
    validerUtsettelserAction
} from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { Periodetype } from '../../types/uttaksplan/periodetyper';
import { getVariantFromPeriode } from '../../components/utsettelse-form/UtsettelseForm';

function* validerPeriode(action: UttaksplanUpdatePeriode | UttaksplanAddPeriode) {
    const stateSelector = (state: AppState) => state;
    const appState: AppState = yield select(stateSelector);
    const { periode } = action;
    const { søknad, api } = appState;

    if (periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold) {
        const variant = getVariantFromPeriode(periode);
        const payload: ValiderUtsettelsePayload = {
            periode,
            variant,
            søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor: erFarEllerMedmor(api.søkerinfo!.person.kjønn, søknad.søker.rolle)
        };
        yield put(validerUtsettelseAction(payload));
    }
}

function* validerUttaksplan() {
    const stateSelector = (state: AppState) => state;
    const appState: AppState = yield select(stateSelector);
    const { søknad, api } = appState;
    const perioder = søknad.uttaksplan;

    const perioderToValidate: ValiderUtsettelsePayload[] = [];
    perioder.forEach((periode) => {
        if (periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold) {
            const variant = getVariantFromPeriode(periode);
            const payload: ValiderUtsettelsePayload = {
                periode,
                variant,
                søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
                søkerErFarEllerMedmor: erFarEllerMedmor(api.søkerinfo!.person.kjønn, søknad.søker.rolle)
            };
            perioderToValidate.push(payload);
        }
    });
    yield put(validerUtsettelserAction(perioderToValidate));
}

export default function* storageSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerPeriode)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerPeriode)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplan)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, validerUttaksplan)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplan)]);
}
