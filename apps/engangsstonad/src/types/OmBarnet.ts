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
