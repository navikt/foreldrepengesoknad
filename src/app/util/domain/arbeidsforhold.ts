import Arbeidsforhold from '../../types/Arbeidsforhold';

export const harArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined
): boolean => {
    return arbeidsforhold !== undefined && arbeidsforhold.length > 0;
};

export const harAktivtArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined,
    dato: Date
): boolean => {
    if (arbeidsforhold === undefined || arbeidsforhold.length === 0) {
        return false;
    }
    return arbeidsforhold.find((a) => a.tom === undefined) !== undefined;
};
