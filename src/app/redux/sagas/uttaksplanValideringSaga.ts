import { takeEvery, all, put, select } from 'redux-saga/effects';
import groupBy from 'lodash.groupby';
import { AppState } from '../reducers';
import { getUttaksstatus } from '../../util/uttaksplan/uttaksstatus';
import { hasPeriodeMissingAttachment } from '../../util/attachments/missingAttachmentUtil';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Periodevalidering, ValidertPeriode, PeriodeAdvarselKey } from '../reducers/uttaksplanValideringReducer';
import { setUttaksplanValidering } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { UttaksplanValideringActionKeys } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { validerPeriodeForm } from '../../util/validation/uttaksplan/periodeFormValidation';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { erSenUtsettelsePgaFerieEllerArbeid } from 'app/util/uttaksplan/uttakUtils';
import { UttaksplanRegelTestresultat, RegelAlvorlighet } from '../../regler/uttaksplanValidering/types';
import { sjekkUttaksplanOppMotRegler, getRegelAvvik } from '../../regler/uttaksplanValidering/regelUtils';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';

const stateSelector = (state: AppState) => state;

const validerPeriode = (state: AppState, periode: Periode): ValidertPeriode => {
    const søknadsinfo = getSøknadsinfo(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    const advarsler = [];

    if (hasPeriodeMissingAttachment(periode, søknadsinfo!)) {
        advarsler.push({ advarselKey: PeriodeAdvarselKey.MANGLENDE_VEDLEGG });
    }
    if (erSenUtsettelsePgaFerieEllerArbeid(periode)) {
        advarsler.push({ advarselKey: PeriodeAdvarselKey.SEN_ÅRSAK_OG_TIDSPERIODE });
    }

    return {
        periodeId: periode.id,
        valideringsfeil: validerPeriodeForm(periode, tilgjengeligeStønadskontoer, søknadsinfo!) || [],
        advarsler,
        overlappendePerioder: Periodene(state.søknad.uttaksplan).finnOverlappendePerioder(periode)
    };
};

const kjørUttaksplanRegler = (state: AppState): UttaksplanRegelTestresultat | undefined => {
    const søknadsinfo = getSøknadsinfo(state);
    const perioder = state.søknad.uttaksplan;
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    const eksisterendeUttaksplan = state.søknad.ekstrainfo.eksisterendeSak
        ? state.søknad.ekstrainfo.eksisterendeSak.uttaksplan
        : undefined;

    if (!søknadsinfo) {
        return undefined;
    }

    const uttaksstatusStønadskontoer = getUttaksstatus(søknadsinfo, tilgjengeligeStønadskontoer, perioder);

    const resultat = sjekkUttaksplanOppMotRegler({
        søknadsinfo,
        perioder,
        uttaksstatusStønadskontoer,
        tilgjengeligeStønadskontoer,
        tilleggsopplysninger: state.søknad.tilleggsopplysninger,
        eksisterendeUttaksplan
    });

    if (resultat) {
        const avvik = getRegelAvvik(resultat);
        const avvikPerPeriode = groupBy(avvik.filter((a) => a.periodeId !== undefined), (r) => r.periodeId);
        return {
            resultat,
            avvik,
            avvikPerPeriode,
            harFeil: avvik.filter((a) => a.alvorlighet === RegelAlvorlighet.FEIL).length > 0
        };
    }
    return undefined;
};
function* validerUttaksplanSaga() {
    const appState: AppState = yield select(stateSelector);
    const { uttaksplan } = appState.søknad;
    const validertePerioder: Periodevalidering = {};
    uttaksplan.forEach((periode) => {
        validertePerioder[periode.id] = validerPeriode(appState, periode);
    });
    const regelTestresultat = kjørUttaksplanRegler(appState);
    yield put(setUttaksplanValidering(validertePerioder, regelTestresultat));
}

export default function* uttaksplanValideringSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_FORSLAG, validerUttaksplanSaga)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.SET_TILLEGGSOPPLYSNING, validerUttaksplanSaga)]);
}
