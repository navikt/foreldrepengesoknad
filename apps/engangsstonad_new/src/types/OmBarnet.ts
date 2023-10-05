type BarnetErFødt = {
    erBarnetFødt: true;
    antallBarn: number;
    fødselsdatoer: string[];
};

type BarnetErIkkeFødt = {
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
