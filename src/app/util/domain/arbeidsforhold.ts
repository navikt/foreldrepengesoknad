import Arbeidsforhold from '../../types/Arbeidsforhold';

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] | undefined): boolean => {
    if (arbeidsforhold === undefined || arbeidsforhold.length === 0) {
        return false;
    }
    return arbeidsforhold.find((a) => a.tom === undefined || a.tom === null) !== undefined;
};
