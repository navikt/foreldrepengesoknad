import moment from 'moment';
import { getVariantFromPeriode, UtsettelseFormPeriodeType } from '../../../components/utsettelse-form/UtsettelseForm';
import { getVelgbareStønadskontotyper } from '../../uttaksplan/stønadskontoer';
import {
    TilgjengeligStønadskonto,
    Periode,
    Periodetype,
    UtsettelseÅrsakType,
    Utsettelsesperiode,
    isUttaksperiode
} from '../../../types/uttaksplan/periodetyper';
import { PeriodeValideringsfeil, PeriodeValideringErrorKey } from '../../../redux/reducers/uttaksplanValideringReducer';
import {
    getUtsettelseFormVisibility,
    UtsettelseFormPayload
} from '../../../components/utsettelse-form/utsettelseFormConfig';
import { UttakFormPayload, getUttakFormVisibility } from '../../../components/uttak-form/uttakFormConfig';
import {
    uttakTidsperiodeErGyldig,
    periodeErInnenDeFørsteSeksUkene,
    utsettelseTidsperiodeErGyldig
} from './uttaksplanTidsperiodeValidation';
import { isValidTidsperiode } from '../../uttaksplan/Tidsperioden';
import { gradertUttaksperiodeErUgyldig } from './uttakGraderingValidation';
import { samtidigUttaksperiodeErUgyldig } from './uttakSamtidigUttakProsentValidation';
import { Søknadsinfo } from 'app/selectors/types';
import getUttakSkjemaregler from 'app/regler/uttak/uttaksskjema/uttakSkjemaregler';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';
import { Søkersituasjon } from 'app/types/søknad/Søknad';

const erUtsettelsePgaArbeidEllerFerie = (periode: UtsettelseFormPeriodeType): periode is Utsettelsesperiode => {
    return (
        periode.type === Periodetype.Utsettelse &&
        (periode.årsak === UtsettelseÅrsakType.Ferie || periode.årsak === UtsettelseÅrsakType.Arbeid)
    );
};

const validerUtsettelseForm = (payload: UtsettelseFormPayload): PeriodeValideringsfeil[] | undefined => {
    const { periode, søknadsinfo } = payload;
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
    if (utsettelseTidsperiodeErGyldig(periode, søknadsinfo.søknaden.familiehendelsesdato) === false) {
        return [{ feilKey: PeriodeValideringErrorKey.UGYLDIG_TIDSPERIODE }];
    }

    if (
        erUtsettelsePgaArbeidEllerFerie(periode) &&
        fom &&
        årsak &&
        søknadsinfo.søknaden.situasjon !== Søkersituasjon.ADOPSJON &&
        periodeErInnenDeFørsteSeksUkene(periode, søknadsinfo.søknaden.familiehendelsesdato)
    ) {
        return [
            {
                feilKey: PeriodeValideringErrorKey.UGYLDIG_ÅRSAK_OG_TIDSPERIODE
            }
        ];
    }

    if (moment(fom as Date).isBefore(moment(søknadsinfo.søknaden.familiehendelsesdato))) {
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
    const { periode, søknadsinfo } = payload;

    if (isUttaksperiode(periode) && periode.konto === undefined) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.STØNADSKONTO_MANGLER });
    }
    if (uttakTidsperiodeErGyldig(periode, søknadsinfo.søknaden.familiehendelsesdato) === false) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.UGYLDIG_TIDSPERIODE });
    }
    if (gradertUttaksperiodeErUgyldig(periode)) {
        valideringsfeil.push({ feilKey: PeriodeValideringErrorKey.UGYLDIG_GRADERING_VERDI });
    }
    if (samtidigUttaksperiodeErUgyldig(periode, søknadsinfo.søker.erFarEllerMedmor)) {
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
    const velgbareStønadskontotyper = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);
    if (periode.type === Periodetype.Hull) {
        return undefined;
    }
    if (
        periode.type === Periodetype.Overføring ||
        periode.type === Periodetype.Uttak ||
        periode.type === Periodetype.Opphold
    ) {
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
        søknadsinfo
    });
};
