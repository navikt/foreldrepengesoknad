import { TidsperiodeMedValgfriSluttdato } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { TidsperiodeDTOMedValgfriSluttdato } from './TidsperiodeDTO';

export enum AnnenInntektType {
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

export interface ArbeidIUtlandetInput {
    fom: string;
    tom: string | undefined;
    pågående: YesOrNo;
    arbeidsgiverNavn: string;
    land: string;
}

export interface ArbeidIUtlandet {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
    arbeidsgiverNavn: string;
    land: string;
}

export interface ArbeidIUtlandetDTO extends Omit<ArbeidIUtlandet, 'tidsperiode' | 'pågående'> {
    tidsperiode: TidsperiodeDTOMedValgfriSluttdato;
}
