import { PeriodeValideringErrorKey, Valideringsfeil } from '../../../redux/reducers/uttaksplanValideringReducer';
import { getUtsettelseFormVisibility } from '../../../components/utsettelse-form/utsettelseFormConfig';
import { ValiderUtsettelsePayload } from '../../../redux/actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';

export const validerUtsettelsePeriode = (payload: ValiderUtsettelsePayload): Valideringsfeil[] | undefined => {
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
