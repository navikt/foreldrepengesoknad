import { Arbeidsforholdstype, Stilling } from './Tilrettelegging';

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
    fom: string;
    tom?: string;
    stillingsprosent: number;
}

export interface UnikArbeidsforhold {
    id: string;
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillinger: Stilling[];
}

export default Arbeidsforhold;
