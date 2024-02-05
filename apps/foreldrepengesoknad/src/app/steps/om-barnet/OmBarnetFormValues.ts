export interface IkkeUtfyltTypeBarn {
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

export interface AdoptertStebarn {
    adopsjonAvEktefellesBarn: true;
    adopsjonsdato: string;
    antallBarn: number;
    antallBarnSelect?: string;
    fødselsdatoer: Array<{ dato: string }>;
}

export interface AdoptertAnnetBarn {
    adopsjonAvEktefellesBarn: false;
    adopsjonsdato: string;
    antallBarn: number;
    antallBarnSelect?: string;
    fødselsdatoer: Array<{ dato: string }>;
    adoptertIUtlandet: boolean;
    ankomstdato?: string;
}

export type BarnetFormValues = FødtBarn | UfødtBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn;

export const erFødtBarn = (barn: BarnetFormValues): barn is FødtBarn => (barn as FødtBarn).erBarnetFødt;

export const erUfødtBarn = (barn: BarnetFormValues): barn is UfødtBarn => (barn as UfødtBarn).erBarnetFødt === false;

export const erAdoptertStebarn = (barn: BarnetFormValues): barn is AdoptertStebarn =>
    (barn as AdoptertStebarn).adopsjonAvEktefellesBarn;

export const erAdoptertAnnetBarn = (barn: BarnetFormValues): barn is AdoptertAnnetBarn =>
    (barn as AdoptertAnnetBarn).adopsjonAvEktefellesBarn === false;

export default BarnetFormValues;
