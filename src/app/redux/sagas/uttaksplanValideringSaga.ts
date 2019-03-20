import { takeEvery, all, put, select } from 'redux-saga/effects';
import groupBy from 'lodash.groupby';
import { AppState } from '../reducers';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
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
import { Feature, isFeatureEnabled } from 'app/Feature';
import { UttaksplanRegelTestresultat, RegelAlvorlighet } from '../../regler/uttaksplanValidering/types';
import { sjekkUttaksplanOppMotRegler, getRegelAvvik } from '../../regler/uttaksplanValidering/regelUtils';

const stateSelector = (state: AppState) => state;

const validerPeriode = (appState: AppState, periode: Periode): ValidertPeriode => {
    const { søker, annenForelder, barn, situasjon } = appState.søknad;
    const { tilgjengeligeStønadskontoer } = appState.api;
    const søknadsinfo = getSøknadsinfo(appState);
    const familiehendelsesdato = getFamiliehendelsedato(barn, situasjon);
    const advarsler = [];

    if (hasPeriodeMissingAttachment(periode, søker.rolle, annenForelder)) {
        advarsler.push({ advarselKey: PeriodeAdvarselKey.MANGLENDE_VEDLEGG });
    }
    if (isFeatureEnabled(Feature.ferieOgArbeidTilbakeITid) && erSenUtsettelsePgaFerieEllerArbeid(periode)) {
        advarsler.push({ advarselKey: PeriodeAdvarselKey.SEN_ÅRSAK_OG_TIDSPERIODE });
    }

    return {
        periodeId: periode.id,
        valideringsfeil:
            validerPeriodeForm(
                periode,
                søker,
                annenForelder,
                tilgjengeligeStønadskontoer,
                familiehendelsesdato,
                situasjon,
                søknadsinfo!.søknaden.erDeltUttak,
                søknadsinfo!.søknaden.erFlerbarnssøknad
            ) || [],
        advarsler,
        overlappendePerioder: Periodene(appState.søknad.uttaksplan).finnOverlappendePerioder(periode)
    };
};

const kjørUttaksplanRegler = (appState: AppState): UttaksplanRegelTestresultat | undefined => {
    const søknadsinfo = getSøknadsinfo(appState);
    const perioder = appState.søknad.uttaksplan;
    const { tilgjengeligeStønadskontoer } = appState.api;

    if (!søknadsinfo) {
        return undefined;
    }

    const uttaksstatusStønadskontoer = getUttaksstatus(
        tilgjengeligeStønadskontoer,
        perioder,
        søknadsinfo.søker.rolle,
        søknadsinfo.søknaden.erEndringssøknad
    );

    const resultat = sjekkUttaksplanOppMotRegler({
        søknadsinfo,
        perioder,
        uttaksstatusStønadskontoer,
        tilgjengeligeStønadskontoer,
        tilleggsopplysninger: appState.søknad.tilleggsopplysninger
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
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, validerUttaksplanSaga)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.SET_TILLEGGSOPPLYSNING, validerUttaksplanSaga)]);
}
