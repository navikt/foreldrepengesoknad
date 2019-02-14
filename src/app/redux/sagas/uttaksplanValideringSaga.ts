import get from 'lodash/get';
import { takeEvery, all, put, select } from 'redux-saga/effects';

import { AppState } from '../reducers';
import { begrunnelseForSenEndringErGyldig } from 'app/util/validation/uttaksplan/begrunnelseForSenEndringValidation';
import { erUttaksmengdeForFarMedmorForHøy } from 'app/util/validation/uttaksplan/erUttaksmengdeForFarMedmorForHøy';
import { getErDeltUttak } from '../../util/uttaksplan/forslag/util';
import { getErSøkerFarEllerMedmor } from 'app/util/domain/personUtil';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import { getUttaksstatus } from '../../util/uttaksplan/uttaksstatus';
import { harFarHarSøktUgyldigUttakFørsteSeksUker } from '../../util/validation/uttaksplan/uttakFarValidation';
import { harMorHarSøktUgyldigUttakFørsteSeksUker } from '../../util/validation/uttaksplan/uttakMorValidation';
import { hasPeriodeMissingAttachment } from '../../util/attachments/missingAttachmentUtil';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { Periodevalidering, ValidertPeriode, PeriodeAdvarselKey } from '../reducers/uttaksplanValideringReducer';
import { setUttaksplanValidering } from '../actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { SøknadActionKeys } from '../actions/søknad/søknadActionDefinitions';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { uttaksplanErBareOpphold } from 'app/util/validation/uttaksplan/uttaksplanErBareOpphold';
import { uttaksplanGraderingStørreEnnSamtidigUttak } from 'app/util/validation/uttaksplan/uttaksplanGraderingStørreEnnSamtidigUttak';
import { uttaksplanSlutterMedOpphold } from 'app/util/validation/uttaksplan/uttaksplanSlutterMedOpphold';
import { uttaksplanStarterMedOpphold } from 'app/util/validation/uttaksplan/uttaksplanStarterMedOpphold';
import { UttaksplanValideringActionKeys } from '../actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { validerPeriodeForm } from '../../util/validation/uttaksplan/periodeFormValidation';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { erSenUtsettelsePgaFerieEllerArbeid } from 'app/util/uttaksplan/uttakUtils';

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
    if (erSenUtsettelsePgaFerieEllerArbeid(periode)) {
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
                søknadsinfo!.søknaden.erDeltUttak
            ) || [],
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
            uttaksplanGraderingStørreEnnSamtidigUttak(uttaksplan),
            begrunnelseForSenEndringErGyldig(
                get(appState, 'søknad.tilleggsopplysninger.begrunnelseForSenEndring.tekst')
            )
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
    yield all([takeEvery(SøknadActionKeys.SET_TILLEGGSOPPLYSNING, validerUttaksplanSaga)]);
}
