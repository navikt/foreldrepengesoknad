import { getVariantFromPeriode } from '../../../components/utsettelse-form/UtsettelseForm';
import { erFarEllerMedmor } from '../../domain/personUtil';
import { getVelgbareStønadskontotyper } from '../../uttaksplan/stønadskontoer';
import { Søker } from '../../../types/søknad/Søker';
import { TilgjengeligStønadskonto, Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import { PeriodeValideringsfeil, PeriodeValideringErrorKey } from '../../../redux/reducers/uttaksplanValideringReducer';
import {
    getUtsettelseFormVisibility,
    UtsettelseFormPayload
} from '../../../components/utsettelse-form/utsettelseFormConfig';
import { UttakFormPayload, getUttakFormVisibility } from '../../../components/uttaksperiode-form/uttakFormConfig';

const validerUtsettelseForm = (payload: UtsettelseFormPayload): PeriodeValideringsfeil[] | undefined => {
    const { variant, periode, søkerErAleneOmOmsorg, søkerErFarEllerMedmor } = payload;
    const visibility = getUtsettelseFormVisibility(variant, periode, søkerErAleneOmOmsorg, søkerErFarEllerMedmor);
    if (visibility.areAllQuestionsAnswered()) {
        return undefined;
    }
    return [
        {
            feilKey: PeriodeValideringErrorKey.FORM_INCOMPLETE
        }
    ];
};

const validerUttakForm = (payload: UttakFormPayload): PeriodeValideringsfeil[] | undefined => {
    const {
        periode,
        søkerErAleneOmOmsorg,
        søkerErFarEllerMedmor,
        velgbareStønadskontotyper,
        annenForelderHarRett,
        kanEndreStøndskonto
    } = payload;
    const visibility = getUttakFormVisibility(
        periode,
        velgbareStønadskontotyper,
        kanEndreStøndskonto,
        søkerErAleneOmOmsorg,
        søkerErFarEllerMedmor,
        annenForelderHarRett
    );
    if (visibility.areAllQuestionsAnswered()) {
        return undefined;
    }
    return [
        {
            feilKey: PeriodeValideringErrorKey.FORM_INCOMPLETE
        }
    ];
};

export const validerPeriodeForm = (
    periode: Periode,
    søker: Søker,
    annenForelder: AnnenForelder,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
) => {
    if (periode.type === Periodetype.Overføring || periode.type === Periodetype.Uttak) {
        return validerUttakForm({
            periode,
            velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer),
            kanEndreStøndskonto: false,
            annenForelderHarRett: annenForelder.harRettPåForeldrepenger,
            søkerErAleneOmOmsorg: søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor: erFarEllerMedmor(søker.rolle)
        });
    }
    return validerUtsettelseForm({
        periode,
        variant: getVariantFromPeriode(periode),
        søkerErAleneOmOmsorg: søker.erAleneOmOmsorg,
        søkerErFarEllerMedmor: erFarEllerMedmor(søker.rolle)
    });
};
