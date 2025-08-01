import { Stilling } from './Tilrettelegging';

export interface UnikArbeidsforhold {
    id: string;
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillinger: Stilling[];
}
