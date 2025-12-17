export enum DelivisTilretteleggingPeriodeType {
    'SAMMME_PERIODE_FREM_TIL_TERMIN' = 'SAMMME_PERIODE_FREM_TIL_TERMIN',
    'VARIERTE_PERIODER' = 'VARIERTE_PERIODER',
}

export type Tilretteleggingstype = 'ingen' | 'delvis' | 'hel';

export type Arbeidsforholdstype = 'virksomhet' | 'selvstendig' | 'frilanser' | 'privat';

export interface Stilling {
    fom: string;
    tom?: string;
    stillingsprosent: number;
}

export enum TilOgMedDatoType {
    VALGFRI_DATO = 'VALGFRI_DATO',
    SISTE_DAG_MED_SVP = 'SISTE_DAG_MED_SVP',
}

export type PeriodeMedVariasjon = {
    tomType: TilOgMedDatoType;
    fom: string;
    tom?: string;
    stillingsprosent: string;
};

export type PeriodeMedVariasjonFormValues = Partial<PeriodeMedVariasjon>;

type Tilrettelegging = {
    behovForTilretteleggingFom: string;
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
    enPeriodeMedTilretteleggingTilbakeIJobbDato?: string;
};

export type DelvisTilrettelegging = {
    type: 'delvis';
    delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType;
    enPeriodeMedTilretteleggingStillingsprosent?: string;
    enPeriodeMedTilretteleggingTomType?: TilOgMedDatoType;
    enPeriodeMedTilretteleggingFom?: string;
} & Tilrettelegging;

export type IngenTilrettelegging = {
    type: 'ingen';
    enPeriodeMedTilretteleggingTomType: TilOgMedDatoType;
    enPeriodeMedTilretteleggingFom: string;
} & Tilrettelegging;
