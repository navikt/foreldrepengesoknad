export enum Tilretteleggingstype {
    'INGEN' = 'ingen',
    'DELVIS' = 'delvis',
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
    navn: string;
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
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
    tom?: string;
    stillingsprosent?: string;
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
    behovForTilretteleggingFom?: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    vedlegg?: string[];
    tilrettelegginger: TilretteleggingInput[];
}

export default Tilrettelegging;
