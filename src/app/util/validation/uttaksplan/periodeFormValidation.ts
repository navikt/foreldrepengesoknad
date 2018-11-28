import { getVariantFromPeriode } from '../../../components/utsettelse-form/UtsettelseForm';
import { getVelgbareStønadskontotyper } from '../../uttaksplan/stønadskontoer';
import { TilgjengeligStønadskonto, Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import { PeriodeValideringsfeil, PeriodeValideringErrorKey } from '../../../redux/reducers/uttaksplanValideringReducer';
import {
    getUtsettelseFormVisibility,
    UtsettelseFormPayload
} from '../../../components/utsettelse-form/utsettelseFormConfig';
import { UttakFormPayload, getUttakFormVisibility } from '../../../components/uttak-form/uttakFormConfig';
import { uttakTidsperiodeErGyldig } from './uttakTidsperiodeValidation';
import { isValidTidsperiode } from '../../uttaksplan/Tidsperioden';
import { gradertUttaksperiodeErUgyldig } from './uttakGraderingValidation';
import { samtidigUttaksperiodeErUgyldig } from './uttakSamtidigUttakProsentValidation';
import { Søknadsinfo } from '../../../selectors/søknadsinfoSelector';
import { getUttakFormRegler } from '../../../regler/uttakForm/uttakFormRegler';

const validerUtsettelseForm = (payload: UtsettelseFormPayload): PeriodeValideringsfeil[] | undefined => {
    const visibility = getUtsettelseFormVisibility(payload);
    if (isValidTidsperiode(payload.periode.tidsperiode) === false) {
        return [
            {
                feilKey: PeriodeValideringErrorKey.UGYLDIG_TIDSPERIODE
            }
        ];
    }
    if (visibility.areAllQuestionsAnswered()) {
        return undefined;
    }
    return [
        {
            feilKey: PeriodeValideringErrorKey.SKJEMA_IKKE_KOMPLETT
        }
    ];
};

const validerUttakForm = (payload: UttakFormPayload): PeriodeValideringsfeil[] | undefined => {
    const visibility = getUttakFormVisibility(payload);
    const valideringsfeil: PeriodeValideringsfeil[] = [];

    if (uttakTidsperiodeErGyldig(payload.periode, payload.søknadsinfo.søknaden.familiehendelsesdato) === false) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.UGYLDIG_TIDSPERIODE });
    }
    if (gradertUttaksperiodeErUgyldig(payload.periode)) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.UGYLDIG_GRADERING_VERDI });
    }
    if (samtidigUttaksperiodeErUgyldig(payload.periode)) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.UGYLDIG_SAMTIDIG_UTTAK_PROSENT });
    }
    if (visibility.areAllQuestionsAnswered() === false) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.SKJEMA_IKKE_KOMPLETT });
    }
    return valideringsfeil.length === 0 ? undefined : valideringsfeil;
};

export const validerPeriodeForm = (
    periode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    søknadsinfo: Søknadsinfo
): PeriodeValideringsfeil[] | undefined => {
    if (periode.type === Periodetype.Hull) {
        return undefined;
    }
    if (periode.type === Periodetype.Overføring || periode.type === Periodetype.Uttak) {
        return validerUttakForm({
            periode,
            velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer),
            kanEndreStønadskonto: true,
            søknadsinfo,
            regler: getUttakFormRegler(søknadsinfo)
        });
    }
    return validerUtsettelseForm({
        periode,
        variant: getVariantFromPeriode(periode),
        søkerErAleneOmOmsorg: søknadsinfo.søker.erAleneOmOmsorg,
        søkerErFarEllerMedmor: søknadsinfo.søker.erFarEllerMedmor,
        annenForelderHarRettPåForeldrepenger: søknadsinfo.annenForelder.harRett
    });
};
