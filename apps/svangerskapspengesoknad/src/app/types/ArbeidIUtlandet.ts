import { TidsperiodeMedValgfriSluttdato, TidsperiodeMedValgfriSluttdatoDate } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

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

export interface ArbeidIUtlandetInnsending extends Omit<ArbeidIUtlandet, 'tidsperiode'> {
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
}
