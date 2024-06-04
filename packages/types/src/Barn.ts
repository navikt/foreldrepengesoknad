import { BarnType } from '@navikt/fp-constants';

interface Common {
    type: BarnType;
    antallBarn: number;
}

export interface IkkeUtfyltTypeBarn extends Common {
    type: BarnType.IKKE_UTFYLT;
    fødselsdatoer: string[];
    fnr?: string[];
}

export interface FødtBarn extends Common {
    type: BarnType.FØDT;
    fødselsdatoer: string[];
    termindato?: string;
    fnr?: string[];
}

export interface UfødtBarn extends Common {
    type: BarnType.UFØDT;
    termindato: string;
    terminbekreftelsedato?: string;
}

export interface AdoptertBarn extends Common {
    type: BarnType.ADOPTERT_STEBARN | BarnType.ADOPTERT_ANNET_BARN;
    adopsjonsdato: string;
    fødselsdatoer: string[];
    fnr?: string[];
}

export interface AdoptertStebarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_STEBARN;
}

export interface AdoptertAnnetBarn extends AdoptertBarn {
    type: BarnType.ADOPTERT_ANNET_BARN;
    adoptertIUtlandet: boolean;
    ankomstdato?: string;
}

export type Barn = FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn;

export interface BarnFraNesteSak {
    familiehendelsesdato: Date;
    startdatoFørsteStønadsperiode: Date;
    fnr: string[] | undefined;
    annenForelderFnr: string | undefined;
}

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

export const isAdoptertStebarn = (barn: Barn): barn is AdoptertStebarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN;
};

export const isAdoptertAnnetBarn = (barn: Barn): barn is AdoptertAnnetBarn => {
    return barn.type === BarnType.ADOPTERT_ANNET_BARN;
};

export const harFødselsdato = (barn: Barn): barn is IkkeUtfyltTypeBarn | FødtBarn | AdoptertBarn => {
    return (
        barn.type === BarnType.IKKE_UTFYLT ||
        barn.type === BarnType.FØDT ||
        barn.type === BarnType.ADOPTERT_STEBARN ||
        barn.type === BarnType.ADOPTERT_ANNET_BARN
    );
};

export default Barn;

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return barn.fødselsdatoer[0];
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
};
