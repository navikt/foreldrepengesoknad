abstract class Barn {
    antallBarn?: number | undefined;
    erBarnetFødt: boolean;
}

export class FødtBarn extends Barn {
    fødselsdatoer: string[];
}

export class UfødtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelseDato?: string | undefined;
}

export type BarnPartial = Partial<Barn>;

export type FødtBarnPartial = Partial<FødtBarn>;
export type UfødtBarnPartial = Partial<UfødtBarn>;

export default Barn;
