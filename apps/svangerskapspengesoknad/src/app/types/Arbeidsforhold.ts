import { Arbeidsforholdstype } from './Tilrettelegging';

export interface ArbeidsforholdFrilansDTO {
    type: Arbeidsforholdstype.FRILANSER;
    risikoFaktorer: string;
    tilretteleggingstiltak: string;
}

export interface ArbeidsforholdSelvstendigDTO {
    type: Arbeidsforholdstype.SELVSTENDIG;
    risikoFaktorer: string;
    tilretteleggingstiltak: string;
}

export interface ArbeidsforholdVirksomhetDTO {
    type: Arbeidsforholdstype.VIRKSOMHET;
    id: string;
}

export interface ArbeidsforholdPrivatDTO {
    type: Arbeidsforholdstype.PRIVAT;
    id: string;
}

export const isArbeidsforholdVirksomhetDTO = (
    arbeidsforhold: ArbeidsforholdDTO,
): arbeidsforhold is ArbeidsforholdVirksomhetDTO => {
    return arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET;
};

export type ArbeidsforholdDTO =
    | ArbeidsforholdFrilansDTO
    | ArbeidsforholdSelvstendigDTO
    | ArbeidsforholdVirksomhetDTO
    | ArbeidsforholdPrivatDTO;

interface Arbeidsforhold {
    id: string;
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: Date;
    tom?: Date;
    stillingsprosent: number;
}

export default Arbeidsforhold;
