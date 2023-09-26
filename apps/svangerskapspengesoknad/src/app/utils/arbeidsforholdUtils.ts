import Arbeidsforhold from 'app/types/Arbeidsforhold';
import dayjs from 'dayjs';
import uniqBy from 'lodash/uniqBy';

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
