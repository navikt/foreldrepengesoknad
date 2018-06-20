import { Attachment } from 'common/storage/attachment/types/Attachment';
import {
    TidsperiodeMedValgfriSluttdato,
    TidsperiodeMedValgfriSluttdatoPartial
} from 'common/types';

export enum AnnenInntektType {
    'SLUTTVEDERLAG' = 'sluttvederlag',
    'MILITÆRET' = 'militæret',
    'VIDEREUTDANNING' = 'videreutdanning',
    'VENTELØNN' = 'ventelønn',
    'JOBB_I_UTLANDET' = 'jobbiutlandet'
}

export interface AnnenInntekt {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdatoPartial;
    pågående: boolean;
    vedlegg: Attachment[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
