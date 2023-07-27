import { TidsperiodeMedValgfriSluttdato, TidsperiodeMedValgfriSluttdatoDate } from '@navikt/fp-common';

export enum AnnenInntektType {
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

export interface AnnenInntektIUtlandet {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    arbeidsgiverNavn: string;
    land: string;
}

export interface AnnenInntektIUtlandetInnsending extends Omit<AnnenInntektIUtlandet, 'tidsperiode'> {
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
}
