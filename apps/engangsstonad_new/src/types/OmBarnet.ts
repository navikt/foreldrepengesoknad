type BarnetErFødt = {
    erBarnetFødt: true;
    antallBarn: number;
    fødselsdatoer: {
        dato: string;
    }[];
};

export type BarnetErIkkeFødt = {
    erBarnetFødt: false;
    antallBarn: number;
    termindato: string;
};

export type Fødsel = BarnetErFødt | BarnetErIkkeFødt;

export type Adopsjon = {
    adopsjonAvEktefellesBarn: boolean;
    adopsjonsdato: string;
    antallBarn: number;
    søkerAdopsjonAlene?: boolean;
    fødselsdatoer: {
        dato: string;
    }[];
};

export type OmBarnet = Fødsel | Adopsjon;

export const erAdopsjon = (omBarnet: OmBarnet): omBarnet is Adopsjon => {
    if ((omBarnet as Adopsjon).adopsjonsdato) {
        return true;
    }
    return false;
};

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
