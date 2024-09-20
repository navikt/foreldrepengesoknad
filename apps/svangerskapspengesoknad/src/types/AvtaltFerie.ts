import { Arbeidsforholdstype } from 'types/Tilrettelegging';

export type AvtaltFerie = {
    arbeidsforhold: {
        type: Arbeidsforholdstype;
        id: string;
    };
    fom: string;
    tom: string;
};

export type AvtaltFeriePerArbeidsgiver = {
    [arbeidsgiverId: string]: {
        skalHaFerie?: boolean;
        feriePerioder: AvtaltFerie[];
        antallFeriePerioder: number;
    };
};
