import { takeEvery, all, put, select } from 'redux-saga/effects';
import { SøknadActionKeys, UttaksplanUpdatePeriode } from '../actions/søknad/søknadActionDefinitions';
import { ValiderUtsettelsePayload } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { AppState } from '../reducers';
import { erFarEllerMedmor } from '../../util/domain/personUtil';
import { validerUtsettelseAction } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { Periodetype } from '../../types/uttaksplan/periodetyper';
import { getVariantFromPeriode } from '../../components/utsettelse-form/UtsettelseForm';

function* validerPeriode(action: UttaksplanUpdatePeriode) {
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

export default function* storageSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerPeriode)]);
}
