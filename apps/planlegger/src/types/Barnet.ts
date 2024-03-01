export type BarnetErFødt = {
    erFødsel: boolean;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato: string;
};

export type BarnetErIkkeFødt = {
    erFødsel: boolean;
    erBarnetFødt: boolean;
    termindato: string;
};

export type BarnetErAdoptert = {
    erAdoptert: boolean;
    hvorMange: string;
    adopsjonsdato: string;
    overtakelsesdato: string;
    fødselsdato: string;
};

export enum AdopsjonsEnum {
    ETT = 'ett',
    TO = 'to',
    FLERE = 'flere',
}

export type Fødsel = BarnetErFødt | BarnetErIkkeFødt;

export type OmBarnet = Fødsel | BarnetErAdoptert;

export const erBarnetIkkeFødt = (omBarnet: OmBarnet): omBarnet is BarnetErIkkeFødt => {
    if ((omBarnet as BarnetErIkkeFødt).termindato) {
        return true;
    }
    return false;
};

export const erBarnetFødt = (omBarnet: OmBarnet): omBarnet is BarnetErFødt => {
    if ((omBarnet as BarnetErFødt).erBarnetFødt === true) {
        return true;
    }
    return false;
};
export const erBarnetAdoptert = (omBarnet: OmBarnet): omBarnet is BarnetErAdoptert => {
    if ((omBarnet as BarnetErAdoptert).erAdoptert === true) {
        return true;
    }
    return false;
};
