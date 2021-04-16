import { takeEvery, all, put, select } from 'redux-saga/effects';
import groupBy from 'lodash.groupby';
import { AppState } from '../reducers';
import { getUttaksstatus } from '../../util/uttaksplan/uttaksstatus';
import {
    setUttaksplanValidering,
    resetUttaksplanvalideringAction,
} from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { UttaksplanValideringActionKeys } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { UttaksplanRegelTestresultat, UttaksplanRegelgrunnlag } from '../../regler/uttaksplanValidering/types';
import { selectTilgjengeligeStønadskontoer, selectArbeidsforhold } from 'app/selectors/apiSelector';
import { selectPerioderSomSkalSendesInn } from 'app/selectors/søknadSelector';
import { Søknadsinfo } from 'app/selectors/types';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import Søknad from 'app/types/søknad/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import uttaksplanRegler from 'app/regler/uttaksplanValidering';
import { regelPasserer, regelHarAvvik, getRegelAvvik, hasRegelFeil } from 'shared/regler/regelUtils';
import { RegelStatus } from 'shared/regler/regelTypes';

const stateSelector = (state: AppState) => state;

const REGEL_INTL_PREFIX = 'uttaksplan.validering';

export const sjekkUttaksplanOppMotRegler = (regelgrunnlag: UttaksplanRegelgrunnlag): RegelStatus[] => {
    return uttaksplanRegler.map((regel) => {
        const resultat = regel.test(regelgrunnlag);
        return resultat.passerer
            ? regelPasserer(regel)
            : regelHarAvvik(regel, REGEL_INTL_PREFIX, resultat.info, resultat.periodeId);
    });
};

const kjørUttaksplanRegler = (
    søknad: Søknad,
    søknadsinfo: Søknadsinfo,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    perioderSomSkalSendesInn: Periode[],
    arbeidsforhold: Arbeidsforhold[]
): UttaksplanRegelTestresultat => {
    const { eksisterendeSak } = søknad.ekstrainfo;
    const uttaksstatus = getUttaksstatus(søknadsinfo, tilgjengeligeStønadskontoer, søknad.uttaksplan);

    const resultat = sjekkUttaksplanOppMotRegler({
        søknadsinfo,
        perioder: søknad.uttaksplan,
        uttaksstatus,
        tilgjengeligeStønadskontoer,
        tilleggsopplysninger: søknad.tilleggsopplysninger,
        perioderSomSkalSendesInn,
        eksisterendeUttaksplan: eksisterendeSak ? eksisterendeSak.uttaksplan : undefined,
        arbeidsforhold,
        eksisterendeSak,
    });

    const avvik = getRegelAvvik(resultat);
    const avvikPerPeriode = groupBy(
        avvik.filter((a) => a.periodeId !== undefined),
        (r) => r.periodeId
    );
    const harFeil = hasRegelFeil(avvik);
    return {
        resultat,
        avvik,
        avvikPerPeriode,
        harFeil,
    };
};

function* validerUttaksplanSaga() {
    const state: AppState = yield select(stateSelector);
    const søknadsinfo = selectSøknadsinfo(state);
    const perioderSomSkalSendesInn = selectPerioderSomSkalSendesInn(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    const arbeidsforhold = selectArbeidsforhold(state);
    if (søknadsinfo) {
        yield put(
            setUttaksplanValidering(
                kjørUttaksplanRegler(
                    state.søknad,
                    søknadsinfo,
                    tilgjengeligeStønadskontoer,
                    perioderSomSkalSendesInn,
                    arbeidsforhold
                )
            )
        );
    }
}

function* resetValideringSaga() {
    yield put(resetUttaksplanvalideringAction());
}

export default function* uttaksplanValideringSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG, validerUttaksplanSaga)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.SET_TILLEGGSOPPLYSNING, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_RESET_ENDRINGER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.AVBRYT_SØKNAD, resetValideringSaga)]);
}
