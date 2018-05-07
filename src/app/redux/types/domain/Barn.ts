abstract class Barn {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
}

// tslint:disable-next-line:max-classes-per-file
export class FodtBarn extends Barn {
    fødselsdatoer: string[];
}

// tslint:disable-next-line:max-classes-per-file
export class UfodtBarn extends Barn {
    termindato?: string | undefined;
    terminbekreftelseDato?: string | undefined;
}

export default Barn;
