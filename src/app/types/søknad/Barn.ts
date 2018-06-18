export enum BarnType {
    'FødtBarn' = 'fødtBarn',
    'UfødtBarn' = 'ufødtBarn',
    'Adopsjonsbarn' = 'adopsjonsbarn',
    'ForeldreansvarBarn' = 'omsorgsovertakelseBarn'
}

abstract class BarnBase {
    type: BarnType;
    antallBarn?: number;
    erBarnetFødt: boolean;
}

export interface UfødtBarn extends BarnBase {
    type: BarnType.UfødtBarn;
    termindato: Date;
    terminbekreftelseDato: Date;
}

export interface FødtBarn extends BarnBase {
    type: BarnType.FødtBarn;
    fødselsdatoer: Date[];
}

export interface Adopsjonsbarn extends BarnBase {
    type: BarnType.Adopsjonsbarn;
    fødselsdatoer: Date[];
    adopsjonsdato: Date;
    adoptertIUtlandet: boolean;
}

export interface ForeldreansvarBarn extends BarnBase {
    type: BarnType.ForeldreansvarBarn;
    fødselsdatoer: Date[];
    foreldreansvarsdato: Date;
}

export type Barn = UfødtBarn | FødtBarn | Adopsjonsbarn | ForeldreansvarBarn;

export type BarnPartial = Partial<Barn>;
export type FødtBarnPartial = Partial<FødtBarn>;
export type UfødtBarnPartial = Partial<UfødtBarn>;
export type AdopsjonsbarnPartial = Partial<Adopsjonsbarn>;
export type ForeldreansvarBarnPartial = Partial<ForeldreansvarBarn>;

export default Barn;
