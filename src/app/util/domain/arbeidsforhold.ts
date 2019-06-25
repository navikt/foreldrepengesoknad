import Arbeidsforhold from '../../types/Arbeidsforhold';
import moment from 'moment';

const tomDatoErFørEllerLikSisteDag = (tom: Date, sisteDag: Date): boolean => {
    return moment(sisteDag, 'day').isSameOrBefore(tom, 'day');
};

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] | undefined, sisteDag?: Date): boolean => {
    if (arbeidsforhold === undefined || arbeidsforhold.length === 0) {
        return false;
    }
    return (
        arbeidsforhold.find(
            (a) =>
                a.tom === undefined ||
                a.tom === null ||
                (sisteDag !== undefined && (sisteDag && tomDatoErFørEllerLikSisteDag(a.tom, sisteDag)))
        ) !== undefined
    );
};

const getArbeidsforholdFromOrgnummer = (
    orgnummer: string,
    arbeidsforhold: Arbeidsforhold[]
): Arbeidsforhold | undefined => {
    return arbeidsforhold.find((forhold) => forhold.arbeidsgiverId === orgnummer);
};

export const getSamletStillingsprosentForArbeidsforhold = (
    orgnumre: string[],
    arbeidsforhold: Arbeidsforhold[]
): number => {
    return orgnumre
        .map((orgnr) => getArbeidsforholdFromOrgnummer(orgnr, arbeidsforhold))
        .filter((forhold) => forhold !== undefined)
        .reduce((stillingsprosent, forhold) => {
            return stillingsprosent + (forhold ? forhold.stillingsprosent : 0);
        }, 0);
};
