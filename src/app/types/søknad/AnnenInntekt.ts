import { Attachment } from 'common/storage/attachment/types/Attachment';
import {
    TidsperiodeMedValgfriSluttdato,
    TidsperiodeMedValgfriSluttdatoPartial
} from 'common/types';

export enum AnnenInntektType {
    'SLUTTPAKKE' = 'sluttpakke',
    'MILITÆRTJENESTE' = 'militærtjeneste',
    'LØNN_VED_VIDEREUTDANNING' = 'lønnVedVidereutdanning',
    'VENTELØNN' = 'ventelønn',
    'JOBB_I_UTLANDET' = 'jobbiutlandet',
    'SELVSTENDIG_NÆRINGSDRIVENDE' = 'selvstendigNæringsdrivende'
}

abstract class AnnenInntektBase {
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export class SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE;
}

export class MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export class LønnVedVidereutdanningInntekt extends AnnenInntektBase {
    type: AnnenInntektType.LØNN_VED_VIDEREUTDANNING;
}

export class JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
}

export class VentelønnInntekt extends AnnenInntektBase {
    type: AnnenInntektType.VENTELØNN;
}

export type AnnenInntekt =
    | SluttpakkeInntekt
    | MilitærtjenesteInntekt
    | LønnVedVidereutdanningInntekt
    | JobbIUtlandetInntekt
    | VentelønnInntekt;

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdatoPartial;
    pågående: boolean;
    vedlegg: Attachment[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
