abstract class Barn {
    antallBarn?: number;
    erBarnetFødt: boolean;
}

export interface UfødtBarn extends Barn {
    termindato: Date;
    terminbekreftelseDato: Date;
}

export interface FødtBarn extends Barn {
    fødselsdatoer: Date[];
}

export interface Adopsjonsbarn extends FødtBarn {
    adopsjonsdato: Date;
    adoptertIUtlandet: boolean;
}

export interface ForeldreansvarBarn extends FødtBarn {
    foreldreansvarsdato: Date;
}

export type BarnPartial = Partial<Barn>;
export type FødtBarnPartial = Partial<FødtBarn>;
export type UfødtBarnPartial = Partial<UfødtBarn>;
export type AdopsjonsbarnPartial = Partial<Adopsjonsbarn>;
export type ForeldreansvarBarnPartial = Partial<ForeldreansvarBarn>;

export default Barn;
