import { Attachment } from 'common/storage/attachment/types/Attachment';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';

export enum AnnenInntektType {
    'SLUTTPAKKE' = 'ETTERLØNN_ARBEIDSGIVER',
    'MILITÆRTJENESTE' = 'MILITÆR_ELLER_SIVILTJENESTE',
    'LØNN_VED_VIDEREUTDANNING' = 'LØNN_UNDER_UTDANNING',
    'VENTELØNN' = 'VENTELØNN',
    'JOBB_I_UTLANDET' = 'JOBB_I_UTLANDET'
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
    arbeidsgiverNavn: string;
    land: string;
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
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    pågående: boolean;
    vedlegg: Attachment[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
export type JobbIUtlandetInntektPartial = Partial<JobbIUtlandetInntekt>;
