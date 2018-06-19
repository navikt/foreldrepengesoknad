import { Attachment } from 'common/storage/attachment/types/Attachment';

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
    tom?: Date;
    pågående: boolean;
    vedlegg: Attachment[];
}

export interface InntektVedJobbIUtlandet extends AnnenInntekt {
    navnPåArbeidsgiver: string;
    land: string;
    erDuOgArbeidsgiverNæreVennerEllerFamilie: boolean;
}

export type AnnenInntektPartial = Partial<AnnenInntekt>;
