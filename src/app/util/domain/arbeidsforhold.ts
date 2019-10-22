import Arbeidsforhold from '../../types/Arbeidsforhold';
import { getAktiveArbeidsforhold } from 'app/api/utils/søkerinfoUtils';

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato?: Date): boolean => {
    return getAktiveArbeidsforhold(arbeidsforhold, fraDato).length > 0;
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
