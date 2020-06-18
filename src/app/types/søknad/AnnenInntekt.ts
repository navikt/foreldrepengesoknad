import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';

export enum AnnenInntektType {
    'SLUTTPAKKE' = 'ETTERLØNN_SLUTTPAKKE',
    'SLUTTPAKKE_V1' = 'ETTERLØNN_ARBEIDSGIVER',
    'MILITÆRTJENESTE' = 'MILITÆR_ELLER_SIVILTJENESTE',
    'VENTELØNN' = 'VENTELØNN_VARTPENGER',
    'VENTELØNN_V1' = 'VENTELØNN',
    'JOBB_I_UTLANDET' = 'JOBB_I_UTLANDET',
}

abstract class AnnenInntektBase {
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    vedlegg: Attachment[];
}

export class SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE | AnnenInntektType.SLUTTPAKKE_V1;
}

export class MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export class JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export class VentelønnInntekt extends AnnenInntektBase {
    type: AnnenInntektType.VENTELØNN | AnnenInntektType.VENTELØNN_V1;
}

export type AnnenInntekt = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt | VentelønnInntekt;

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    vedlegg: Attachment[];
}

export type AnnenInntektPartial = Partial<AnnenInntektPartialInterface>;
export type JobbIUtlandetInntektPartial = Partial<JobbIUtlandetInntekt>;
