export type BarnetErFødt = {
    erFødsel: boolean;
    hvorMange: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato: string;
};

export type BarnetErIkkeFødt = {
    erFødsel: boolean;
    hvorMange: string;
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

export type Fødsel = BarnetErFødt | BarnetErIkkeFødt;

export type OmBarnet = Fødsel | BarnetErAdoptert;

export const erBarnetIkkeFødt = (omBarnet: OmBarnet): omBarnet is BarnetErIkkeFødt => {
    if ((omBarnet as BarnetErIkkeFødt).erBarnetFødt === false) {
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

export const erEttBarn = (omBarnet: OmBarnet): boolean => {
    return omBarnet.hvorMange === 'ett';
};

export const erToBarn = (omBarnet: OmBarnet): boolean => {
    return omBarnet.hvorMange === 'to';
};

export const erFlereEnnToBarn = (omBarnet: OmBarnet): boolean => {
    return omBarnet.hvorMange === 'flere';
};
