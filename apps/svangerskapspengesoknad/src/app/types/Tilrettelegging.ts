import { DelivisTilretteleggingPeriodeType } from 'app/steps/tilrettelegging/tilretteleggingStepFormConfig';
import { ArbeidsforholdDTO } from './Arbeidsforhold';
import { Attachment } from './Attachment';

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

export interface ArbeidsforholdForTilrettelegging {
    arbeidsgiverId?: string;
    type: Arbeidsforholdstype;
    navn: string;
    opprinneligstillingsprosent: number;
    sluttdato?: string;
}

export enum TilOgMedDatoType {
    VALGFRI_DATO = 'VALGFRI_DATO',
    TRE_UKER_FØR_TERMIN = 'TRE_UKER_FØR_TERMIN',
}

export interface TilretteleggingPeriode {
    type: Tilretteleggingstype;
    behovForTilretteleggingFom: string;
    fom: string;
    tom: string;
    stillingsprosent: number;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    vedlegg: string[];
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
    behovForTilretteleggingFom: Date;
    arbeidsforhold: ArbeidsforholdDTO;
    vedlegg: string[];
}
export interface DelvisTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.DELVIS;
    tilrettelagtArbeidFom: Date;
    stillingsprosent: number;
}

export interface IngenTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.INGEN;
    slutteArbeidFom: Date;
}

export interface HelTilretteleggingDTO extends TilretteleggingDTOBase {
    type: Tilretteleggingstype.HEL;
    tilrettelagtArbeidFom: Date;
}

export type TilretteleggingDTO = DelvisTilretteleggingDTO | IngenTilretteleggingDTO | HelTilretteleggingDTO;

export default Tilrettelegging;