import { Attachment } from 'common/storage/attachment/types/Attachment';

abstract class BarnBase {
    antallBarn: number;
    erBarnetFødt: boolean;
}

export interface UfødtBarn extends BarnBase {
    termindato: Date;
    terminbekreftelseDato: Date;
    terminbekreftelse: Attachment[];
}

export interface FødtBarn extends BarnBase {
    fødselsdatoer: Date[];
    fødselsattest: Attachment[];
}

export interface Adopsjonsbarn extends BarnBase {
    fødselsdatoer: Date[];
    adopsjonsdato: Date;
    ankomstdato?: Date;
    adoptertIUtlandet?: boolean;
    omsorgsovertakelse: Attachment[];
    adopsjonAvEktefellesBarn: boolean;
}

export interface ForeldreansvarBarn extends BarnBase {
    fødselsdatoer: Date[];
    foreldreansvarsdato: Date;
    omsorgsovertakelse: Attachment[];
    adopsjonsvedtak: Attachment[];
}

export type Barn = UfødtBarn | FødtBarn | Adopsjonsbarn | ForeldreansvarBarn;

export type BarnPartial = Partial<Barn>;
export type FødtBarnPartial = Partial<FødtBarn>;
export type UfødtBarnPartial = Partial<UfødtBarn>;
export type AdopsjonsbarnPartial = Partial<Adopsjonsbarn>;
export type ForeldreansvarBarnPartial = Partial<ForeldreansvarBarn>;

export default Barn;
