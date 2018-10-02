import { PeriodeValideringErrorKey, PeriodeValideringsfeil } from '../../../redux/reducers/uttaksplanValideringReducer';
import { getUtsettelseFormVisibility } from '../../../components/utsettelse-form/utsettelseFormConfig';
import { ValiderPeriodePayload } from '../../../redux/actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import {
    Utsettelsesvariant,
    UtsettelseperiodeFormPeriodeType
} from '../../../components/utsettelse-form/UtsettelseForm';

export interface ValiderUtsettelsePayload extends ValiderPeriodePayload {
    variant?: Utsettelsesvariant;
    periode: UtsettelseperiodeFormPeriodeType;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

export const validerUtsettelsePeriode = (payload: ValiderUtsettelsePayload): PeriodeValideringsfeil[] | undefined => {
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
