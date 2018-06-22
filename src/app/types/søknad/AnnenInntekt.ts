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
    'JOBB_I_UTLANDET' = 'jobbiutlandet',
    'FRILANS' = 'frilans',
    'SELVSTENDIG_NÆRINGSDRIVENDE' = 'selvstendigNæringsdrivende'
}

interface Arbeidsforhold {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
}

abstract class AnnenInntektBase {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export interface FrilansInntekt extends AnnenInntektBase {
    driverFosterhjem: boolean;
    harJobbetForNærVennEllerFamilieSiste12Mnd: boolean;
    nærVennEllerFamilieArbeidsforholdSiste12Mnd: Arbeidsforhold[];
}

export type AnnenInntekt = FrilansInntekt;

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdatoPartial;
    pågående: boolean;
    vedlegg: Attachment[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
export type FrilansInntektPartial = Partial<FrilansInntekt>;
