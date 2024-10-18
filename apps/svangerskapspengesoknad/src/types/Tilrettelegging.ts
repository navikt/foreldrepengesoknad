import { Attachment } from '@navikt/fp-types';

import { ArbeidsforholdDTO } from './Arbeidsforhold';

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

export interface ArbeidsforholdForTilrettelegging {
    arbeidsgiverId?: string;
    type: Arbeidsforholdstype;
    navn?: string;
    stillinger: Stilling[];
    startdato: string;
    sluttdato?: string;
}

export enum TilOgMedDatoType {
    VALGFRI_DATO = 'VALGFRI_DATO',
    SISTE_DAG_MED_SVP = 'SISTE_DAG_MED_SVP',
}

export type TilretteleggingPeriode = {
    type: Tilretteleggingstype;
    fom: string;
    stillingsprosent?: number;
};

export interface PeriodeMedVariasjon {
    type: Tilretteleggingstype;
    tomType: TilOgMedDatoType;
    fom: string;
    tom?: string;
    stillingsprosent: string;
}

export type TilretteleggingPerioder = {
    varierendePerioder: PeriodeMedVariasjon[];
};

export type TilretteleggingNew = {
    behovForTilretteleggingFom: string;
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
    enPeriodeMedTilretteleggingTomType: TilOgMedDatoType;
    enPeriodeMedTilretteleggingTilbakeIJobbDato?: string;
};

export type DelvisTilrettelegging = {
    type: Tilretteleggingstype.DELVIS;
    delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType;
    enPeriodeMedTilretteleggingStillingsprosent?: string;
    enPeriodeMedTilretteleggingFom?: string;
} & TilretteleggingNew;

export type IngenTilrettelegging = {
    type: Tilretteleggingstype.INGEN;
    enPeriodeMedTilretteleggingFom: string;
} & TilretteleggingNew;

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    type: Tilretteleggingstype;
    enPeriodeMedTilretteleggingFom?: string;
    enPeriodeMedTilretteleggingStillingsprosent?: string;
    enPeriodeMedTilretteleggingTomType?: TilOgMedDatoType;
    enPeriodeMedTilretteleggingTilbakeIJobbDato?: string;
    vedlegg: Attachment[];
    delvisTilretteleggingPeriodeType?: DelivisTilretteleggingPeriodeType;
    varierendePerioder?: PeriodeMedVariasjon[];
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
}

interface TilretteleggingDTOBase {
    type: Tilretteleggingstype;
    behovForTilretteleggingFom: string;
    arbeidsforhold: ArbeidsforholdDTO;
}
export interface DelvisTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.DELVIS;
    tilrettelagtArbeidFom: string;
    stillingsprosent: number;
}

export interface IngenTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.INGEN;
    slutteArbeidFom: string;
}

export interface HelTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.HEL;
    tilrettelagtArbeidFom: string;
}

export type TilretteleggingDTO = DelvisTilretteleggingDTO | IngenTilretteleggingDTO | HelTilretteleggingDTO;

export default Tilrettelegging;
