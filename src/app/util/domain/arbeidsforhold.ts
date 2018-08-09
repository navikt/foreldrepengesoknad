import Arbeidsforhold from '../../types/Arbeidsforhold';
import * as moment from 'moment';

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
    return (
        arbeidsforhold.find(
            (a) =>
                a.tom === undefined ||
                moment(dato).isBetween(a.fom, a.tom, 'days', '[]')
        ) !== undefined
    );
};
