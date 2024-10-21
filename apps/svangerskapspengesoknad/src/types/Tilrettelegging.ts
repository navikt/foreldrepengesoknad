export enum DelivisTilretteleggingPeriodeType {
    'SAMMME_PERIODE_FREM_TIL_TERMIN' = 'SAMMME_PERIODE_FREM_TIL_TERMIN',
    'VARIERTE_PERIODER' = 'VARIERTE_PERIODER',
}

export enum Tilretteleggingstype {
    'INGEN' = 'ingen',
    'DELVIS' = 'delvis',
    'HEL' = 'hel',
}

export enum Arbeidsforholdstype {
    'VIRKSOMHET' = 'virksomhet',
    'SELVSTENDIG' = 'selvstendig',
    'FRILANSER' = 'frilanser',
    'PRIVAT' = 'privat',
}

export interface Stilling {
    fom: string;
    tom?: string;
    stillingsprosent: number;
}

export enum TilOgMedDatoType {
    VALGFRI_DATO = 'VALGFRI_DATO',
    SISTE_DAG_MED_SVP = 'SISTE_DAG_MED_SVP',
}

export type TilretteleggingPeriode = {
    type: Tilretteleggingstype;
    fom: string;
    tom: string;
    stillingsprosent?: number;
};

export type PeriodeMedVariasjon = {
    tomType: TilOgMedDatoType;
    fom: string;
    tom?: string;
    stillingsprosent: string;
};

type Tilrettelegging = {
    behovForTilretteleggingFom: string;
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
    enPeriodeMedTilretteleggingTilbakeIJobbDato?: string;
};

export type DelvisTilrettelegging = {
    type: Tilretteleggingstype.DELVIS;
    delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType;
    enPeriodeMedTilretteleggingStillingsprosent?: string;
    enPeriodeMedTilretteleggingTomType?: TilOgMedDatoType;
    enPeriodeMedTilretteleggingFom?: string;
} & Tilrettelegging;

export type IngenTilrettelegging = {
    type: Tilretteleggingstype.INGEN;
    enPeriodeMedTilretteleggingTomType: TilOgMedDatoType;
    enPeriodeMedTilretteleggingFom: string;
} & Tilrettelegging;
