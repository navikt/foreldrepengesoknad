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

export interface ArbeidsforholdForTilrettelegging {
    id?: string;
    type: Arbeidsforholdstype;
}

export interface DelvisTilretteleggingDTO {
    tilrettelagtArbeidFom: string;
    stillingsprosent: number;
}

export interface HelTilretteleggingDTO {
    tilrettelagtArbeidFom: string;
}

//TODO: Kan slettes?
export interface IngenTilretteleggingDTO {
    slutteArbeidFom: string;
}

export interface TilretteleggingInput {
    type: Tilretteleggingstype;
    fom: string;
    stillingsprosent: number;
}

export interface TilretteleggingDTO {
    id: string;
    behovForTilretteleggingFom: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    vedlegg: string[];
    helTilrettelegging?: HelTilretteleggingDTO[];
    delvisTilrettelegging?: DelvisTilretteleggingDTO[];
    ingenTilrettelegging?: IngenTilretteleggingDTO[];
}

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    vedlegg: string[];
    tilrettelegginger: TilretteleggingInput[];
}

export default Tilrettelegging;
