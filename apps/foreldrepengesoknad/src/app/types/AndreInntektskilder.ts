export enum AnnenInntektType {
    SLUTTPAKKE = 'ETTERLØNN_SLUTTPAKKE',
    MILITÆRTJENESTE = 'MILITÆR_ELLER_SIVILTJENESTE',
    JOBB_I_UTLANDET = 'JOBB_I_UTLANDET',
}

interface AnnenInntektBase {
    type: AnnenInntektType;
    fom: string;
    tom: string;
}

export interface SluttpakkeInntekt extends AnnenInntektBase {
    type: AnnenInntektType.SLUTTPAKKE;
}

export interface MilitærtjenesteInntekt extends AnnenInntektBase {
    type: AnnenInntektType.MILITÆRTJENESTE;
    pågående: boolean;
}

export interface JobbIUtlandetInntekt extends AnnenInntektBase {
    type: AnnenInntektType.JOBB_I_UTLANDET;
    arbeidsgiverNavn: string;
    land: string;
    pågående: boolean;
}

export type AndreInntektskilder = SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt;
