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

interface Arbeidsforhold {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
}

export interface FrilansInntekt extends AnnenInntekt {
    driverFosterhjem: boolean;
    harJobbetForNærVennEllerFamilieSiste12Mnd: boolean;
    nærVennEllerFamilieArbeidsforholdSiste12Mnd: Arbeidsforhold[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
export type FrilansInntektPartial = Partial<FrilansInntekt>;
