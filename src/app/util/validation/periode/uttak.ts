import { PeriodeValideringErrorKey, PeriodeValideringsfeil } from '../../../redux/reducers/uttaksplanValideringReducer';
import { ValiderPeriodePayload } from '../../../redux/actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { getUttakFormVisibility, UttakFormPayload } from '../../../components/uttaksperiode-form/uttakFormConfig';

export type ValiderUttakPayload = ValiderPeriodePayload & UttakFormPayload;

export const validerUttakPeriode = (payload: ValiderUttakPayload): PeriodeValideringsfeil[] | undefined => {
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
