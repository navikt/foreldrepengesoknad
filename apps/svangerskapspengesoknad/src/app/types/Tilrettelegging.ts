import { DelivisTilretteleggingPeriodeType } from 'app/steps/tilrettelegging/tilretteleggingStepFormConfig';
import { ArbeidsforholdDTO } from './Arbeidsforhold';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';

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
    arbeidsgiverId?: string;
    type: Arbeidsforholdstype;
    navn: string;
}

export enum TilOgMedDatoType {
    VALGFRI_DATO = 'VALGFRI_DATO',
    TRE_UKER_FØR_TERMIN = 'TRE_UKER_FØR_TERMIN',
}
export interface PeriodeMedVariasjon {
    type: Tilretteleggingstype;
    tomType: TilOgMedDatoType;
    fom: string;
    tom?: string;
    stillingsprosent?: string;
}

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom?: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    type?: Tilretteleggingstype;
    enPeriodeMedTilretteleggingFom?: string;
    enPeriodeMedTilretteleggingStillingsprosent?: string;
    enPeriodeMedTilretteleggingTomType?: TilOgMedDatoType;
    enPeriodeMedTilretteleggingTom?: string;
    vedlegg: Attachment[];
    delvisTilretteleggingPeriodeType?: DelivisTilretteleggingPeriodeType;
    variertePerioder?: PeriodeMedVariasjon[];
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

export type TilretteleggingDTO = DelvisTilretteleggingDTO | IngenTilretteleggingDTO;

export default Tilrettelegging;
