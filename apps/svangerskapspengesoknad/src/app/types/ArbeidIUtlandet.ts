import { TidsperiodeDTOMedValgfriSluttdato } from './TidsperiodeDTO';

export enum AnnenInntektType {
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

export interface ArbeidIUtlandetInput {
    fom: string;
    tom: string | undefined;
    pågående: boolean;
    arbeidsgiverNavn: string;
    land: string;
}

export interface ArbeidIUtlandet {
    arbeidIUtlandet: ArbeidIUtlandetInput[];
}

export interface ArbeidIUtlandetDTO {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    tidsperiode: TidsperiodeDTOMedValgfriSluttdato;
    arbeidsgiverNavn: string;
    land: string;
}
