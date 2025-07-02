export type BarnetErFødt = {
    erBarnetFødt: true;
    antallBarn: number;
    fødselsdato: string;
    termindato: string;
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
    fødselsdatoer: Array<{
        dato: string;
    }>;
};

export type OmBarnet = Fødsel | Adopsjon;

export const erAdopsjon = (omBarnet: OmBarnet): omBarnet is Adopsjon => {
    return 'adopsjonsdato' in omBarnet;
};

export const harBarnetTermindato = (omBarnet: OmBarnet): omBarnet is BarnetErIkkeFødt => {
    return 'termindato' in omBarnet;
};

export const erBarnetFødt = (omBarnet: OmBarnet): omBarnet is BarnetErFødt => {
    return 'erBarnetFødt' in omBarnet && omBarnet.erBarnetFødt;
};
