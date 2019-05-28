import { takeEvery, all, put, select } from 'redux-saga/effects';
import groupBy from 'lodash.groupby';
import { AppState } from '../reducers';
import { getUttaksstatus } from '../../util/uttaksplan/uttaksstatus';
import {
    setUttaksplanValidering,
    resetUttaksplanvalideringAction
} from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { UttaksplanValideringActionKeys } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { UttaksplanRegelTestresultat, RegelAvvik, RegelAlvorlighet } from '../../regler/uttaksplanValidering/types';
import { sjekkUttaksplanOppMotRegler, getRegelAvvik, hasRegelFeil } from '../../regler/uttaksplanValidering/regelUtils';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { selectPerioderSomSkalSendesInn } from 'app/selectors/søknadSelector';
import { Søknadsinfo } from 'app/selectors/types';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import Søknad from 'app/types/søknad/Søknad';

const stateSelector = (state: AppState) => state;

const alvorlighetSortOrder = {
    [RegelAlvorlighet.FEIL]: 0,
    [RegelAlvorlighet.ADVARSEL]: 1,
    [RegelAlvorlighet.INFO]: 2
};

export const sorterAvvik = (a1: RegelAvvik, a2: RegelAvvik): number => {
    if (a1.alvorlighet === a2.alvorlighet) {
        return 0;
    }
    return alvorlighetSortOrder[a1.alvorlighet] < alvorlighetSortOrder[a2.alvorlighet] ? -1 : 1;
};
const kjørUttaksplanRegler = (
    søknad: Søknad,
    søknadsinfo: Søknadsinfo,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    perioderSomSkalSendesInn: Periode[]
): UttaksplanRegelTestresultat => {
    const { eksisterendeSak } = søknad.ekstrainfo;
    const uttaksstatusStønadskontoer = getUttaksstatus(søknadsinfo, tilgjengeligeStønadskontoer, søknad.uttaksplan);

    const resultat = sjekkUttaksplanOppMotRegler({
        søknadsinfo,
        perioder: søknad.uttaksplan,
        uttaksstatusStønadskontoer,
        tilgjengeligeStønadskontoer,
        tilleggsopplysninger: søknad.tilleggsopplysninger,
        perioderSomSkalSendesInn,
        eksisterendeUttaksplan: eksisterendeSak ? eksisterendeSak.uttaksplan : undefined
    });

    const avvik = getRegelAvvik(resultat);
    const avvikPerPeriode = groupBy(avvik.filter((a) => a.periodeId !== undefined), (r) => r.periodeId);
    const harFeil = hasRegelFeil(avvik);
    return {
        resultat,
        avvik,
        avvikPerPeriode,
        harFeil
    };
};

function* validerUttaksplanSaga() {
    const state: AppState = yield select(stateSelector);
    const søknadsinfo = selectSøknadsinfo(state);
    const perioderSomSkalSendesInn = selectPerioderSomSkalSendesInn(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    if (søknadsinfo) {
        yield put(
            setUttaksplanValidering(
                kjørUttaksplanRegler(state.søknad, søknadsinfo, tilgjengeligeStønadskontoer, perioderSomSkalSendesInn)
            )
        );
    }
}

function* resetValideringSaga() {
    yield put(resetUttaksplanvalideringAction());
}

export default function* uttaksplanValideringSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG, validerUttaksplanSaga)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.SET_TILLEGGSOPPLYSNING, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_RESET_ENDRINGER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, resetValideringSaga)]);
}
