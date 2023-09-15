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

export enum TilOgMedDatoType {
    VALGFRI_DATO = 'VALGFRI_DATO',
    TRE_UKER_FØR_TERMIN = 'TRE_UKER_FØR_TERMIN',
}
export interface PeriodeMedVariasjonInput {
    type: Tilretteleggingstype;
    tomType: TilOgMedDatoType;
    fom: string;
    tom?: string;
    stillingsprosent?: string;
}

export interface PeriodeMedTilrettelegging {
    type: Tilretteleggingstype;
    fom: string;
    tom?: string;
    stillingsprosent?: string;
}

export interface Tilrettelegging {
    id: string;
    behovForTilretteleggingFom?: string;
    arbeidsforhold: ArbeidsforholdForTilrettelegging;
    vedlegg?: string[];
    tilrettelegginger: PeriodeMedTilrettelegging[];
}

export default Tilrettelegging;
