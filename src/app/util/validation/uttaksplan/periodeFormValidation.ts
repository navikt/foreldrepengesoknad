import moment from 'moment';
import { getVariantFromPeriode, UtsettelseFormPeriodeType } from '../../../components/utsettelse-form/UtsettelseForm';
import { getVelgbareStønadskontotyper } from '../../uttaksplan/stønadskontoer';
import {
    TilgjengeligStønadskonto,
    Periode,
    Periodetype,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from '../../../types/uttaksplan/periodetyper';
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
import { erUtsettelseÅrsakTypeGyldigForStartdato } from '../../uttaksplan/regler/erUtsettelseÅrsakGyldigForStartdato';
import { Søknadsinfo } from '../../../selectors/types';
import { getUttakSkjemaregler } from '../../../regler/uttak/uttakSkjemaregler';
import { getSøknadsperiode } from '../../../regler/s\u00F8knadsperioden/S\u00F8knadsperioden';

const erUtsettelsePgaArbeidEllerFerie = (periode: UtsettelseFormPeriodeType): periode is Utsettelsesperiode => {
    return (
        periode.type === Periodetype.Utsettelse &&
        (periode.årsak === UtsettelseÅrsakType.Ferie || periode.årsak === UtsettelseÅrsakType.Arbeid)
    );
};

const validerUtsettelseForm = (payload: UtsettelseFormPayload): PeriodeValideringsfeil[] | undefined => {
    const { periode, familiehendelsesdato } = payload;
    const { tidsperiode, årsak } = periode;

    let fom;
    if (tidsperiode) {
        fom = tidsperiode.fom;
    }

    const visibility = getUtsettelseFormVisibility(payload);
    if (isValidTidsperiode(tidsperiode) === false) {
        return [
            {
                feilKey: PeriodeValideringErrorKey.UGYLDIG_TIDSPERIODE
            }
        ];
    }
    if (erUtsettelsePgaArbeidEllerFerie(periode) && fom && årsak) {
        if (!erUtsettelseÅrsakTypeGyldigForStartdato(periode.årsak, fom as Date)) {
            return [
                {
                    feilKey: PeriodeValideringErrorKey.UGYLDIG_ÅRSAK_OG_TIDSPERIODE
                }
            ];
        }
    }

    if (moment(fom as Date).isBefore(moment(familiehendelsesdato))) {
        return [
            {
                feilKey: PeriodeValideringErrorKey.UTSETTELSE_FØR_FORELDREPENGER_FØR_FØDSEL
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
        const velgbareStønadskontotyper = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);
        return validerUttakForm({
            periode,
            velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer),
            kanEndreStønadskonto: true,
            søknadsinfo,
            skjemaregler: getUttakSkjemaregler(søknadsinfo, periode, velgbareStønadskontotyper),
            søknadsperiode: getSøknadsperiode(søknadsinfo, periode)
        });
    }
    return validerUtsettelseForm({
        periode,
        variant: getVariantFromPeriode(periode),
        søkerErAleneOmOmsorg: søknadsinfo.søker.erAleneOmOmsorg,
        søkerErFarEllerMedmor: søknadsinfo.søker.erFarEllerMedmor,
        annenForelderHarRettPåForeldrepenger: søknadsinfo.annenForelder.harRett,
        familiehendelsesdato: søknadsinfo.søknaden.familiehendelsesdato
    });
};
