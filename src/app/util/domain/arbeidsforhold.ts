import Arbeidsforhold from '../../types/Arbeidsforhold';
import moment from 'moment';

const tomDatoErFørEllerLikSisteDag = (tom: Date, sisteDag: Date): boolean => {
    return moment(sisteDag).isSameOrBefore(tom, 'days');
};

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] | undefined, sisteDag?: Date): boolean => {
    return arbeidsforhold === undefined
        ? false
        : arbeidsforhold.some(
              (a) =>
                  a.tom === undefined ||
                  a.tom === null ||
                  (sisteDag !== undefined && tomDatoErFørEllerLikSisteDag(a.tom, sisteDag))
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
