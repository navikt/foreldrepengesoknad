import { CountryCode } from '@navikt/fp-types';

export enum AnnenInntektType {
    SLUTTPAKKE = 'ETTERLØNN_SLUTTPAKKE',
    MILITÆRTJENESTE = 'MILITÆR_ELLER_SIVILTJENESTE',
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

interface AnnenInntektBase {
    type: AnnenInntektType;
    fom: string;
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE;
    tom: string;
}

export interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
    pågående: boolean;
    tom?: string;
}

export interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: CountryCode;
    pågående: boolean;
    tom?: string;
}

export type AndreInntektskilder = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt;
