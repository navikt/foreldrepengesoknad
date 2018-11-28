import { takeEvery, all, put, select } from 'redux-saga/effects';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { AppState } from '../reducers';
import { setUttaksplanValidering } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { UttaksplanValideringActionKeys } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { validerPeriodeForm } from '../../util/validation/uttaksplan/periodeFormValidation';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Periodevalidering, ValidertPeriode, PeriodeAdvarselKey } from '../reducers/uttaksplanValideringReducer';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { getUttaksstatus } from '../../util/uttaksplan/uttaksstatus';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import { harMorHarSøktUgyldigUttakFørsteSeksUker } from '../../util/validation/uttaksplan/uttakMorValidation';
import { erUttaksmengdeForFarMedmorForHøy } from 'app/util/validation/uttaksplan/erUttaksmengdeForFarMedmorForHøy';
import { getErSøkerFarEllerMedmor } from 'app/util/domain/personUtil';
import { førsteUttakErInnenforKommendeSeksUker } from '../../util/validation/uttaksplan/datobegrensninger';
import { harFarHarSøktUgyldigUttakFørsteSeksUker } from '../../util/validation/uttaksplan/uttakFarValidation';
import { uttaksplanErBareOpphold } from 'app/util/validation/uttaksplan/uttaksplanErBareOpphold';
import { uttaksplanStarterMedOpphold } from 'app/util/validation/uttaksplan/uttaksplanStarterMedOpphold';
import { uttaksplanSlutterMedOpphold } from 'app/util/validation/uttaksplan/uttaksplanSlutterMedOpphold';
import { getErDeltUttak } from '../../util/uttaksplan/forslag/util';
import { uttaksplanGraderingStørreEnnSamtidigUttak } from 'app/util/validation/uttaksplan/uttaksplanGraderingStørreEnnSamtidigUttak';
import { hasPeriodeMissingAttachment } from '../../util/attachments/missingAttachmentUtil';
import { getSøknadsinfo } from '../../selectors/søknadsinfoSelector';

const stateSelector = (state: AppState) => state;

const validerPeriode = (appState: AppState, periode: Periode): ValidertPeriode => {
    const { søker } = appState.søknad;
    const { tilgjengeligeStønadskontoer } = appState.api;
    const advarsler = [];
    const søknadsinfo = getSøknadsinfo(appState);
    if (hasPeriodeMissingAttachment(periode, søker.rolle)) {
        advarsler.push({ advarselKey: PeriodeAdvarselKey.MANGLENDE_VEDLEGG });
    }
    return {
        periodeId: periode.id,
        valideringsfeil: validerPeriodeForm(periode, tilgjengeligeStønadskontoer, søknadsinfo!) || [],
        advarsler,
        overlappendePerioder: Periodene(appState.søknad.uttaksplan).finnOverlappendePerioder(periode)
    };
};

const getStønadskontoerMedForMyeUttak = (uttak: Stønadskontouttak[]) => {
    return uttak.filter((u) => u.antallDager < 0);
};

function* validerUttaksplanSaga() {
    const appState: AppState = yield select(stateSelector);
    const { uttaksplan, barn, situasjon, søker, erEndringssøknad } = appState.søknad;
    const validertePerioder: Periodevalidering = {};
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søker.rolle);
    const søkerErMor = søkerErFarEllerMedmor === false;
    let antallAktivePerioder = 0;
    uttaksplan.forEach((periode) => {
        validertePerioder[periode.id] = validerPeriode(appState, periode);
        if (periode.tidsperiode.fom !== undefined && periode.tidsperiode.tom !== undefined) {
            antallAktivePerioder++;
        }
    });
    const erDeltUttak = getErDeltUttak(appState.api.tilgjengeligeStønadskontoer);
    const uttaksstatus = getUttaksstatus(
        appState.api.tilgjengeligeStønadskontoer,
        uttaksplan,
        appState.søknad.søker.rolle,
        erEndringssøknad
    );
    yield put(
        setUttaksplanValidering(
            validertePerioder,
            antallAktivePerioder > 0,
            getStønadskontoerMedForMyeUttak(uttaksstatus),
            førsteUttakErInnenforKommendeSeksUker(uttaksplan),
            søkerErMor
                ? harMorHarSøktUgyldigUttakFørsteSeksUker(
                      uttaksplan,
                      getFamiliehendelsedato(barn, situasjon),
                      situasjon
                  )
                : false,
            søkerErFarEllerMedmor
                ? erDeltUttak &&
                  harFarHarSøktUgyldigUttakFørsteSeksUker(
                      uttaksplan,
                      getFamiliehendelsedato(barn, situasjon),
                      barn.antallBarn,
                      situasjon
                  )
                : false,
            erUttaksmengdeForFarMedmorForHøy(
                uttaksplan,
                appState.api.tilgjengeligeStønadskontoer,
                getErSøkerFarEllerMedmor(appState.søknad.søker.rolle)
            ),
            uttaksplanErBareOpphold(uttaksplan),
            uttaksplanStarterMedOpphold(uttaksplan),
            uttaksplanSlutterMedOpphold(uttaksplan),
            uttaksplanGraderingStørreEnnSamtidigUttak(uttaksplan)
        )
    );
}

export default function* uttaksplanValideringSaga() {
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_DELETE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_UPDATE_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_ADD_PERIODE, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_SET_PERIODER, validerUttaksplanSaga)]);
    yield all([takeEvery(SøknadActionKeys.UTTAKSPLAN_LAG_FORSLAG, validerUttaksplanSaga)]);
    yield all([takeEvery(UttaksplanValideringActionKeys.VALIDER_UTTAKSPLAN, validerUttaksplanSaga)]);
}
