export enum BarnType {
    'FØDT' = 'født',
    'UFØDT' = 'ufødt',
    'ADOPTERT_STEBARN' = 'adoptertStebarn',
    'ADOPTERT' = 'adoptert',
    'IKKE_UTFYLT' = 'ikkeUtfylt',
}

interface Common {
    antallBarn: string;
    dokumentasjonAvAleneomsorg?: any[];
    datoForAleneomsorg?: string;
    type: BarnType;
}

interface IkkeUtfyltBarn extends Common {
    type: BarnType.IKKE_UTFYLT;
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

interface AdoptertStebarn extends Common {
    type: BarnType.ADOPTERT_STEBARN;
    adopsjonsdato: string;
    fødselsdatoer: string[];
}

type Barn = FødtBarn | UfødtBarn | AdoptertStebarn | IkkeUtfyltBarn;

export const isFødtBarn = (barn: Barn): barn is FødtBarn => {
    return barn.type === BarnType.FØDT;
};

export const isUfødtBarn = (barn: Barn): barn is UfødtBarn => {
    return barn.type === BarnType.UFØDT;
};

export const isAdoptertStebarn = (barn: Barn): barn is AdoptertStebarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN;
};

export default Barn;
