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
    antallBarn: string;
    dokumentasjonAvAleneomsorg?: any[];
    datoForAleneomsorg?: string;
}

interface FødtBarn extends Common {
    type: BarnType.FØDT;
    fødselsdatoer: string[];
    termindato?: string;
}

interface UfødtBarn extends Common {
    type: BarnType.UFØDT;
    termindato: string;
    terminbekreftelse: any[];
    terminbekreftelsedato?: string;
}

export interface AdoptertBarn extends Common {
    type: BarnType.ADOPTERT_STEBARN | BarnType.ADOPTERT_ANNET_BARN;
    adopsjonsdato: string;
    fødselsdatoer: string[];
    omsorgsovertakelse: Attachment[];
}

export interface AdoptertStebarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_STEBARN;
}

export interface AdoptertAnnetBarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_ANNET_BARN;
    adoptertIUtlandet: boolean;
    ankomstdato?: string;
}

type Barn = FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn;

export const isFødtBarn = (barn: Barn): barn is FødtBarn => {
    return barn.type === BarnType.FØDT;
};

export const isUfødtBarn = (barn: Barn): barn is UfødtBarn => {
    return barn.type === BarnType.UFØDT;
};

export const isAdoptertBarn = (barn: Barn): barn is AdoptertBarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN || barn.type === BarnType.ADOPTERT_ANNET_BARN;
};

export const isAdoptertStebarn = (barn: Barn): barn is AdoptertStebarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN;
};

export const isAdoptertAnnetBarn = (barn: Barn): barn is AdoptertAnnetBarn => {
    return barn.type === BarnType.ADOPTERT_ANNET_BARN;
};

export default Barn;
