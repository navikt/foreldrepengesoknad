interface IkkeUtfyltTypeBarn {
    fødselsdatoer: Array<{ dato?: string }>;
}

export interface FødtBarn {
    erBarnetFødt: true;
    antallBarn: number;
    antallBarnSelect?: string;
    fødselsdatoer: Array<{ dato: string }>;
    termindato?: string;
}

export interface UfødtBarn {
    erBarnetFødt: false;
    antallBarn: number;
    antallBarnSelect?: string;
    termindato: string;
    terminbekreftelsedato?: string;
}

interface AdoptertStebarn {
    adopsjonAvEktefellesBarn: true;
    adopsjonsdato: string;
    antallBarn: number;
    antallBarnSelect?: string;
    fødselsdatoer: Array<{ dato: string }>;
}

interface AdoptertAnnetBarn {
    adopsjonAvEktefellesBarn: false;
    adopsjonsdato: string;
    antallBarn: number;
    antallBarnSelect?: string;
    fødselsdatoer: Array<{ dato: string }>;
    adoptertIUtlandet: boolean;
    ankomstdato?: string;
}

export type BarnetFormValues = FødtBarn | UfødtBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn;

export const erFødtBarn = (barn: BarnetFormValues): barn is FødtBarn => 'erBarnetFødt' in barn && barn.erBarnetFødt;

export const erUfødtBarn = (barn: BarnetFormValues): barn is UfødtBarn => 'erBarnetFødt' in barn && !barn.erBarnetFødt;

export const erAdoptertStebarn = (barn: BarnetFormValues): barn is AdoptertStebarn =>
    'adopsjonAvEktefellesBarn' in barn && barn.adopsjonAvEktefellesBarn;

export const erAdoptertAnnetBarn = (barn: BarnetFormValues): barn is AdoptertAnnetBarn =>
    'adopsjonAvEktefellesBarn' in barn && !barn.adopsjonAvEktefellesBarn;
