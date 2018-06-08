export enum AnnenInntektType {
    'SLUTTVEDERLAG' = 'sluttvederlag',
    'MILITÆRET' = 'militæret',
    'VIDEREUTDANNING' = 'videreutdanning',
    'VENTELØNN' = 'ventelønn',
    'JOBB_I_UTLANDET' = 'jobbiutlandet'
}

export interface AnnenInntekt {
    type: AnnenInntektType;
    fom: Date;
    tom: Date;
}

export interface InntektVedJobbIUtlandet extends AnnenInntekt {
    navnPåArbeidsgiver: string;
    land: string;
    erDuOgArbeidsgiverNæreVennerEllerFamilie: boolean;
}

export type AnnenInntektPartial = Partial<AnnenInntekt>;
