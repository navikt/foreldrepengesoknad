import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Søkersituasjon } from './Søknad';

abstract class BarnBase {
    antallBarn: number;
    erBarnetFødt: boolean;
    dokumentasjonAvAleneomsorg: Attachment[];
    datoForAleneomsorg: Date;
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

export const isUfødtBarn = (barn: Barn, situasjon: Søkersituasjon): barn is UfødtBarn =>
    situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === false;
export const isFødtBarn = (barn: Barn, situasjon: Søkersituasjon): barn is FødtBarn =>
    situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === true;
export const isAdopsjonsbarn = (barn: Barn, situasjon: Søkersituasjon): barn is Adopsjonsbarn =>
    situasjon === Søkersituasjon.ADOPSJON;
export const isForeldreansvarsbarn = (barn: Barn, situasjon: Søkersituasjon): barn is ForeldreansvarBarn =>
    situasjon === Søkersituasjon.FORELDREANSVAR;

export default Barn;
