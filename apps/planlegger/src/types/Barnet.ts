export type BarnetErFødt = {
    erFødsel: boolean;
    erBarnetFødt: boolean;
    fødselsdato: string;
};

export type BarnetErIkkeFødt = {
    erFødsel: boolean;
    erBarnetFødt: boolean;
    termindato: string;
};
export type BarnetErAdoptert = {
    erFødsel: boolean;
    adopsjonsdato: string;
    overtakelsesdato: string;
};

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
