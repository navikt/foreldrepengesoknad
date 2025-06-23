import { TidsperiodeMedValgfriSluttdato } from '@navikt/fp-common';

export enum AnnenInntektType {
    SLUTTPAKKE = 'ETTERLØNN_SLUTTPAKKE',
    MILITÆRTJENESTE = 'MILITÆR_ELLER_SIVILTJENESTE',
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

interface AnnenInntektBase {
    type: AnnenInntektType;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE;
}

export interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
}

export interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
}

export type AnnenInntekt = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt;
