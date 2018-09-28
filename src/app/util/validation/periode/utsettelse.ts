import { getUtsettelseFormVisibility } from '../../../components/utsettelse-form/utsettelseFormConfig';
import { ValiderUtsettelsePayload } from '../../../redux/actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export const validerUtsettelsePeriode = (payload: ValiderUtsettelsePayload): Feil[] | undefined => {
    const { variant, periode, søkerErAleneOmOmsorg, søkerErFarEllerMedmor } = payload;
    const visibility = getUtsettelseFormVisibility(variant, periode, søkerErAleneOmOmsorg, søkerErFarEllerMedmor);
    if (visibility.areAllQuestionsAnswered()) {
        return undefined;
    }
    return [
        {
            tittel: 'whoa',
            feilmelding: 'Ikke alle felter er gylt ut'
        }
    ];
};
