import Arbeidsforhold from '../../types/Arbeidsforhold';

export const harArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined
): boolean => {
    return arbeidsforhold !== undefined && arbeidsforhold.length > 0;
};
