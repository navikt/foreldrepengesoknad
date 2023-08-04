import { SkjemaelementFeil, intlUtils } from '@navikt/fp-common';
import { BostedUtland } from 'app/types/BostedUtland';
import { IntlShape } from 'react-intl';

export const validateUtenlandsoppholdNeste12Mnd =
    (intl: IntlShape) =>
    (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
        if (utenlandsopphold.length === 0) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.neste12Måneder.ikkeRegistrert');
        }

        return undefined;
    };

export const validateUtenlandsoppholdSiste12Mnd =
    (intl: IntlShape) =>
    (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
        if (utenlandsopphold.length === 0) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.siste12Måneder.ikkeRegistrert');
        }

        return undefined;
    };
