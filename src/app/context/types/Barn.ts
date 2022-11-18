import { Attachment } from 'app/types/Attachment';

export enum BarnType {
    FØDT = 'født',
    UFØDT = 'ufødt',
    ADOPTERT_STEBARN = 'adoptertStebarn',
    ADOPTERT_ANNET_BARN = 'adoptertAnnetBarn',
    IKKE_UTFYLT = 'ikkeUtfylt',
}

interface Common {
    type: BarnType;
    antallBarn: number;
    dokumentasjonAvAleneomsorg?: Attachment[];
    datoForAleneomsorg?: Date;
}

export interface IkkeUtfyltTypeBarn extends Common {
    type: BarnType.IKKE_UTFYLT;
    fødselsdatoer: Date[];
    fnr?: string[];
}

export interface FødtBarn extends Common {
    type: BarnType.FØDT;
    fødselsdatoer: Date[];
    termindato?: Date;
    fnr?: string[];
}

export interface UfødtBarn extends Common {
    type: BarnType.UFØDT;
    termindato: Date;
    terminbekreftelse?: Attachment[];
    terminbekreftelsedato?: Date;
}

export interface AdoptertBarn extends Common {
    type: BarnType.ADOPTERT_STEBARN | BarnType.ADOPTERT_ANNET_BARN;
    adopsjonsdato: Date;
    fødselsdatoer: Date[];
    omsorgsovertakelse: Attachment[];
    fnr?: string[];
}

export interface AdoptertStebarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_STEBARN;
}

export interface AdoptertAnnetBarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_ANNET_BARN;
    adoptertIUtlandet: boolean;
    ankomstdato?: Date;
}

export type Barn = FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn;

export interface BarnFraNesteSak extends Common {
    familiehendelsesdato: Date;
}

export const isIkkeUtfyltTypeBarn = (barn: Barn | BarnFraNesteSak): barn is IkkeUtfyltTypeBarn => {
    return barn.type === BarnType.IKKE_UTFYLT;
};

export const isFødtBarn = (barn: Barn | BarnFraNesteSak): barn is FødtBarn => {
    return barn.type === BarnType.FØDT;
};

export const isUfødtBarn = (barn: Barn | BarnFraNesteSak): barn is UfødtBarn => {
    return barn.type === BarnType.UFØDT;
};

export const isAdoptertBarn = (barn: Barn | BarnFraNesteSak): barn is AdoptertBarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN || barn.type === BarnType.ADOPTERT_ANNET_BARN;
};

export const isAdoptertStebarn = (barn: Barn | BarnFraNesteSak): barn is AdoptertStebarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN;
};

export const isAdoptertAnnetBarn = (barn: Barn | BarnFraNesteSak): barn is AdoptertAnnetBarn => {
    return barn.type === BarnType.ADOPTERT_ANNET_BARN;
};

export default Barn;
