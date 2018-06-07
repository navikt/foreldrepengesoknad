export type AnnenInntektType =
    | 'sluttvederlag'
    | 'militæret'
    | 'videreutdanning'
    | 'ventelønn'
    | 'jobbiutlandet';

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
