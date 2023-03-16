import { Attachment } from 'common/storage/attachment/types/Attachment';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';

export enum AnnenInntektType {
    'MILITÆRTJENESTE' = 'MILITÆR_ELLER_SIVILTJENESTE',
    'JOBB_I_UTLANDET' = 'JOBB_I_UTLANDET',
}

abstract class AnnenInntektBase {
    // @ts-ignore Fiks
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    // @ts-ignore Fiks
    pågående: boolean;
    // @ts-ignore Fiks
    vedlegg: Attachment[];
}

export class MilitærtjenesteInntekt extends AnnenInntektBase {
    // @ts-ignore Fiks
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export class JobbIUtlandetInntekt extends AnnenInntektBase {
    // @ts-ignore Fiks
    type: AnnenInntektType.JOBB_I_UTLANDET;
    // @ts-ignore Fiks
    arbeidsgiverNavn: string;
    // @ts-ignore Fiks
    land: string;
}

export type AnnenInntekt = MilitærtjenesteInntekt | JobbIUtlandetInntekt;

export interface AnnenInntektPartialInterface {
    type: AnnenInntektType;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    vedlegg: Attachment[];
}
