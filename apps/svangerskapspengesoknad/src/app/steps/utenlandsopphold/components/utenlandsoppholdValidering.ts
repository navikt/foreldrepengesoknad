import {
    SkjemaelementFeil,
    date1YearAgo,
    date1YearFromNow,
    dateRangesCollide,
    dateRangesExceedsRange,
    intlUtils,
} from '@navikt/fp-common';
import { BostedUtland } from 'app/types/BostedUtland';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateUtenlandsoppholdNeste12Mnd =
    (intl: IntlShape) =>
    (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
        if (utenlandsopphold.length === 0) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.neste12Måneder.ikkeRegistrert');
        }

        const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

        if (dateRangesCollide(dateRanges)) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.overlapp');
        }

        if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
            return intlUtils(intl, 'valideringsfeil.utenlandsoppholdUtenforPeriode');
        }

        return undefined;
    };

export const validateUtenlandsoppholdSiste12Mnd =
    (intl: IntlShape) =>
    (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
        if (utenlandsopphold.length === 0) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.siste12Måneder.ikkeRegistrert');
        }

        const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

        if (dateRangesCollide(dateRanges)) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.overlapp');
        }

        if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: new Date() })) {
            return intlUtils(intl, 'valideringsfeil.utenlandsoppholdUtenforPeriode');
        }

        return undefined;
    };
