export enum Tilretteleggingstype {
    'HEL' = 'hel',
    'DELVIS' = 'delvis',
    'INGEN' = 'ingen',
}

export enum Arbeidsforholdstype {
    'VIRKSOMHET' = 'virksomhet',
    'SELVSTENDIG' = 'selvstendig',
    'FRILANSER' = 'frilanser',
    'PRIVAT' = 'privat',
}

export interface ArbeidsforholdFrilans {
    type: Arbeidsforholdstype.FRILANSER;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

export interface ArbeidsforholdSelvstendig {
    type: Arbeidsforholdstype.SELVSTENDIG;
    risikoFaktorer?: string;
    tilretteleggingstiltak?: string;
}

export interface ArbeidsforholdPrivat {
    type: Arbeidsforholdstype.PRIVAT;
    id: string;
}

export interface ArbeidsforholdVirksomhet {
    type: Arbeidsforholdstype.VIRKSOMHET;
    id: string;
}
export const isArbeidsforholdVirksomhetDTO = (
    arbeidsforhold: Arbeidsforhold
): arbeidsforhold is ArbeidsforholdVirksomhet => {
    return arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET;
};

export type Arbeidsforhold =
    | ArbeidsforholdFrilans
    | ArbeidsforholdSelvstendig
    | ArbeidsforholdVirksomhet
    | ArbeidsforholdPrivat;

interface TilretteleggingBase {
    type: Tilretteleggingstype;
    behovForTilretteleggingFom: Date;
    arbeidsforhold: Arbeidsforhold;
    vedlegg: string[];
}

export interface HelTilrettelegging extends TilretteleggingBase {
    type: Tilretteleggingstype.HEL;
    tilrettelagtArbeidFom: Date;
}
export interface DelvisTilrettelegging extends TilretteleggingBase {
    type: Tilretteleggingstype.DELVIS;
    tilrettelagtArbeidFom: Date;
    stillingsprosent: number;
}

export interface IngenTilrettelegging extends TilretteleggingBase {
    type: Tilretteleggingstype.INGEN;
    slutteArbeidFom: Date;
}

export type Tilrettelegging = HelTilrettelegging | DelvisTilrettelegging | IngenTilrettelegging;
