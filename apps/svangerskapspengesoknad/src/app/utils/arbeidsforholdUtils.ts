import { intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søker } from 'app/types/Søker';
import dayjs from 'dayjs';
import uniqBy from 'lodash/uniqBy';
import { IntlShape } from 'react-intl';

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], termindato?: string): Arbeidsforhold[] => {
    if (termindato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.filter((arb) =>
        arb.tom ? dayjs(arb.tom).isSameOrAfter(dayjs(termindato).subtract(9, 'months')) : true,
    );
};

const getArbeidsgiverId = (arbeidsforhold: Arbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId !== undefined ? arbeidsforhold.arbeidsgiverId : '';
};

export const getUnikeArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined,
    termindato: string,
): Arbeidsforhold[] => {
    if (arbeidsforhold !== undefined && arbeidsforhold.length > 0) {
        const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

        return uniqBy(aktiveArbeidsforhold, getArbeidsgiverId).map((forhold) => ({
            ...forhold,
            fom: new Date(forhold.fom),
            tom: forhold.tom !== undefined ? new Date(forhold.tom) : undefined,
            guid: forhold.id,
            arbeidsgiverNavn: forhold.arbeidsgiverNavn,
            // forhold.arbeidsgiverNavn !== undefined ? normalizeName(forhold.arbeidsgiverNavn) : undefined,
        }));
    }

    return [];
};

export const søkerHarKunEtArbeid = (
    termindato: string,
    arbeidsforhold: Arbeidsforhold[],
    erFrilanser: boolean,
    harEgenNæring: boolean,
) => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);
    return (
        (aktiveArbeidsforhold.length === 1 && !erFrilanser && !harEgenNæring) ||
        (aktiveArbeidsforhold.length === 0 && erFrilanser && !harEgenNæring) ||
        (aktiveArbeidsforhold.length === 0 && !erFrilanser && harEgenNæring)
    );
};

export const getTekstOmManglendeArbeidsforhold = (søker: Søker, intl: IntlShape): string => {
    const erFrilanser = søker.harJobbetSomFrilans;
    const harNæring = søker.harJobbetSomSelvstendigNæringsdrivende;
    const harJobbetIUtlandet = søker.harHattAnnenInntekt;
    if (erFrilanser && !harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.harIkkeNæringEllerJobbIUtlandet');
    }
    if (!erFrilanser && harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.erIkkeFrilanserEllerJobbIUtlandet');
    }
    if (!erFrilanser && !harNæring && harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.erIkkeFrilanserEllerNæringsdrivende');
    }
    if (erFrilanser && harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.harIkkeJobbIUtlandet');
    }
    if (erFrilanser && !harNæring && harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.harIkkeNæring');
    }
    if (!erFrilanser && !harNæring && !harJobbetIUtlandet) {
        return intlUtils(intl, 'oppsummering.erIkkeFrilanserHarIkkeNæringJobbetIkkeIUtlandet');
    }
    return intlUtils(intl, 'oppsummering.erIkkeFrilanser');
};
