export enum BarnType {
    'FØDT' = 'født',
    'UFØDT' = 'ufødt',
    'ADOPTERT_STEBARN' = 'adoptertStebarn',
    'ADOPTERT' = 'adoptert',
}

interface Common {
    antallBarn: string;
    dokumentasjonAvAleneomsorg: any[];
    datoForAleneomsorg: string;
    type: BarnType;
}

interface FødtBarn extends Common {
    type: BarnType.FØDT;
    erBarnetFødt: boolean;
    fødselsdatoer: string[];
    termindato?: string;
}

interface UfødtBarn extends Common {
    type: BarnType.UFØDT;
    erBarnetFødt: boolean;
    termindato: string;
    terminbekreftelse: any[];
    terminbekreftelsedato?: string;
}

interface AdoptertStebarn extends Common {
    type: BarnType.ADOPTERT_STEBARN;
    adopsjonsdato: string;
    fødselsdatoer: string[];
}

type Barn = FødtBarn | UfødtBarn | AdoptertStebarn;

interface IsFødtBarnOverloads {
    (barn: FødtBarn): boolean;
    (barn: UfødtBarn): boolean;
    (barn: AdoptertStebarn): boolean;
}

export const isFødtBarn: IsFødtBarnOverloads = (barn: Barn): barn is FødtBarn => {
    return barn.type === BarnType.FØDT;
};

export const isUfødtBarn: IsFødtBarnOverloads = (barn: Barn): barn is UfødtBarn => {
    return barn.type === BarnType.UFØDT;
};

export const isAdoptertStebarn: IsFødtBarnOverloads = (barn: Barn): barn is AdoptertStebarn => {
    return barn.type === BarnType.ADOPTERT_STEBARN;
};

export default Barn;
