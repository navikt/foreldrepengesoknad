import { Arbeidsforholdstype, Tilretteleggingstype } from './Tilrettelegging';

export type TilretteleggingDTO = {
    behovForTilretteleggingFom: string;
    arbeidsforhold: {
        id: string;
        type: Arbeidsforholdstype;
    };
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
    tilrettelegginger: Array<{
        type: Tilretteleggingstype;
        fom: string;
        stillingsprosent?: number;
    }>;
};
