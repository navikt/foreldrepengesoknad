import { Arbeidsforholdstype } from 'types/Tilrettelegging';

export type AvtaltFerieDto = {
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
        feriePerioder: AvtaltFerieDto[];
        antallFeriePerioder: number;
    };
};
