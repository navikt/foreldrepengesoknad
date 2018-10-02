import { takeEvery, all, put, select } from 'redux-saga/effects';
import {
    SøknadActionKeys,
    UttaksplanUpdatePeriode,
    UttaksplanAddPeriode
} from '../actions/søknad/søknadActionDefinitions';
import { AppState } from '../reducers';
import { erFarEllerMedmor } from '../../util/domain/personUtil';
import {
    validerUttaksplanAction,
    setValidertPeriode,
    setValidertePerioder
} from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { Periodetype } from '../../types/uttaksplan/periodetyper';
import {
    getVariantFromPeriode,
    UtsettelseperiodeFormPeriodeType
} from '../../components/utsettelse-form/UtsettelseForm';
import { validerUtsettelsePeriode } from '../../util/validation/periode/utsettelse';
import {
    UttaksplanValideringActionKeys,
    ValidertPeriode
} from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { PeriodeValideringsfeil } from '../reducers/uttaksplanValideringReducer';
import { UttaksFormPeriodeType } from '../../components/uttaksperiode-form/uttakFormConfig';
import { validerUttakPeriode } from '../../util/validation/periode/uttak';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/st\u00F8nadskontoer';

const validerUtsettelseEllerOpphold = (
    periode: UtsettelseperiodeFormPeriodeType,
    state: AppState
): PeriodeValideringsfeil[] | undefined => {
    const { søknad } = state;
    return validerUtsettelsePeriode({
        perioder: søknad.uttaksplan,
        periode,
        variant: getVariantFromPeriode(periode),
        søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
        søkerErFarEllerMedmor: erFarEllerMedmor(søknad.søker.rolle)
    });
};

const validerUttakEllerOverføring = (
    periode: UttaksFormPeriodeType,
    state: AppState
): PeriodeValideringsfeil[] | undefined => {
    const { søknad } = state;
    return validerUttakPeriode({
        perioder: søknad.uttaksplan,
        periode,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer),
        kanEndreStøndskonto: false,
        annenForelderHarRett: søknad.annenForelder.harRettPåForeldrepenger,
        søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
        søkerErFarEllerMedmor: erFarEllerMedmor(søknad.søker.rolle)
    });
};

function* validerPeriode(action: UttaksplanUpdatePeriode | UttaksplanAddPeriode) {
    const stateSelector = (state: AppState) => state;
    const appState: AppState = yield select(stateSelector);
    const { periode } = action;
    const periodeId = periode.id;
    if (periodeId !== undefined && (periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold)) {
        yield put(
            setValidertPeriode({
                periodeId,
                valideringsfeil: validerUtsettelseEllerOpphold(periode, appState)
            })
        );
    } else if (
        periodeId !== undefined &&
        (periode.type === Periodetype.Uttak || periode.type === Periodetype.Overføring)
    ) {
        yield put(
            setValidertPeriode({
                periodeId,
                valideringsfeil: validerUttakEllerOverføring(periode, appState)
            })
        );
    }
}

function* validerUttaksplan() {
    const stateSelector = (state: AppState) => state;
    const appState: AppState = yield select(stateSelector);
    const validertePerioder: ValidertPeriode[] = [];
    appState.søknad.uttaksplan.forEach((periode) => {
        const periodeId = periode.id;
        if (
            periodeId !== undefined &&
            (periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold)
        ) {
            validertePerioder.push({
                periodeId,
                valideringsfeil: validerUtsettelseEllerOpphold(periode, appState)
            });
        } else if (
            periodeId !== undefined &&
            (periode.type === Periodetype.Uttak || periode.type === Periodetype.Overføring)
        ) {
            validertePerioder.push({
                periodeId,
                valideringsfeil: validerUttakEllerOverføring(periode, appState)
            });
        }
    });
    yield put(setValidertePerioder(validertePerioder));
}

export default function* storageSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerPeriode)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerPeriode)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanAction)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, validerUttaksplanAction)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplan)]);
}
