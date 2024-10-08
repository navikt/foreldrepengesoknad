import { Attachment } from '@navikt/fp-types';

import { ArbeidsforholdDTO } from './Arbeidsforhold';

export enum DelivisTilretteleggingPeriodeType {
    'SAMMME_PERIODE_FREM_TIL_TERMIN' = 'SAMMME_PERIODE_FREM_TIL_TERMIN',
    'VARIERTE_PERIODER' = 'VARIERTE_PERIODER',
}

export enum TilretteleggingstypeOptions {
    'INGEN' = 'ingen',
    'DELVIS' = 'delvis',
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

export interface TilretteleggingPeriode {
    type: Tilretteleggingstype;
    behovForTilretteleggingFom: string;
    fom: string;
    tom: string;
    stillingsprosent: number;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    risikofaktorer?: string;
    tilretteleggingstiltak?: string;
}

export interface PeriodeMedVariasjon {
    type: TilretteleggingstypeOptions;
    tomType: TilOgMedDatoType;
    fom: string;
    tom?: string;
    stillingsprosent: string;
}

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    type: TilretteleggingstypeOptions;
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
