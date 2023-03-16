export enum Tilretteleggingstype {
    'HEL' = 'hel',
    'DELVIS' = 'delvis',
    'INGEN' = 'ingen',
    'NOE' = 'noe',
}

export enum Arbeidsforholdstype {
    'VIRKSOMHET' = 'virksomhet',
    'SELVSTENDIG' = 'selvstendig',
    'FRILANSER' = 'frilanser',
    'PRIVAT' = 'privat',
}

export interface TilretteleggingArbeidsforhold {
    id?: string;
    type: Arbeidsforholdstype;
}

export interface DelvisTilrettelegging {
    tilrettelagtArbeidFom: string;
    stillingsprosent: number;
}

export interface HelTilrettelegging {
    tilrettelagtArbeidFom: string;
}

export interface IngenTilrettelegging {
    slutteArbeidFom: string;
}

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom: string;
    arbeidsforhold: TilretteleggingArbeidsforhold;
    vedlegg: string[];
    helTilrettelegging?: HelTilrettelegging[];
    delvisTilrettelegging?: DelvisTilrettelegging[];
    ingenTilrettelegging?: IngenTilrettelegging[];
}

export type UferdigTilrettelegging = Tilrettelegging & {
    behovForTilretteleggingFom?: string;
    type: Tilretteleggingstype[];
    helTilrettelegging?: [
        {
            tilrettelagtArbeidFom?: string;
        }
    ];
    delvisTilrettelegging?: DelvisTilrettelegging[];
    ingenTilrettelegging?: [
        {
            slutteArbeidFom?: string;
        }
    ];
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
};

export default Tilrettelegging;
