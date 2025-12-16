import { BarnType } from '@navikt/fp-constants';

interface Common {
    type: BarnType;
    antallBarn: number;
}

interface IkkeUtfyltTypeBarn extends Common {
    type: BarnType.IKKE_UTFYLT;
    fødselsdatoer: string[];
    fnr?: string[];
}

interface FødtBarn extends Common {
    type: BarnType.FØDT;
    fødselsdatoer: string[];
    termindato?: string;
    fnr?: string[];
}

interface UfødtBarn extends Common {
    type: BarnType.UFØDT;
    termindato: string;
    terminbekreftelsedato?: string;
}

interface AdoptertBarn extends Common {
    type: BarnType.ADOPTERT_STEBARN | BarnType.ADOPTERT_ANNET_BARN;
    adopsjonsdato: string;
    fødselsdatoer: string[];
    fnr?: string[];
}

interface AdoptertAnnetBarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_ANNET_BARN;
    adoptertIUtlandet: boolean;
    ankomstdato?: string;
}

export type Barn = FødtBarn | UfødtBarn | AdoptertBarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn;
export const isIkkeUtfyltTypeBarn = (barn: Barn): barn is IkkeUtfyltTypeBarn => {
    return barn.type === BarnType.IKKE_UTFYLT;
};

export const isFødtBarn = (barn: Barn): barn is FødtBarn => {
    return barn.type === BarnType.FØDT;
};

export const isUfødtBarn = (barn: Barn): barn is UfødtBarn => {
    return barn.type === BarnType.UFØDT;
};

export const isAdoptertBarn = (barn: Barn): barn is AdoptertBarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN || barn.type === BarnType.ADOPTERT_ANNET_BARN;
};
