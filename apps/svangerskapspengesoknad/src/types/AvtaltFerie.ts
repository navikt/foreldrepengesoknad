import { Arbeidsforholdstype } from 'types/Tilrettelegging';

export type AvtaltFerie = {
    arbeidsforhold: {
        type: Arbeidsforholdstype;
        id: string;
    };
    fom: string;
    tom: string;
};
