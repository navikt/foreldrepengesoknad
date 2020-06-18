import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { Søkersituasjon } from './Søknad';

export interface BarnCommonProps {
    antallBarn: number;
    erBarnetFødt: boolean;
    dokumentasjonAvAleneomsorg: Attachment[];
    datoForAleneomsorg: Date;
    terminbekreftelse: Attachment[];
}

export interface UfødtBarn extends BarnCommonProps {
    termindato: Date;
    terminbekreftelseDato: Date;
}

export interface FødtBarn extends BarnCommonProps {
    fødselsdatoer: Date[];
    fødselsattest: Attachment[];
    termindato: Date;
}

export interface Adopsjonsbarn extends BarnCommonProps {
    fødselsdatoer: Date[];
    adopsjonsdato: Date;
    ankomstdato?: Date;
    adoptertIUtlandet?: boolean;
    omsorgsovertakelse: Attachment[];
    adopsjonAvEktefellesBarn: boolean;
}

export interface ForeldreansvarBarn extends BarnCommonProps {
    fødselsdatoer: Date[];
    foreldreansvarsdato: Date;
    omsorgsovertakelse: Attachment[];
    adopsjonsvedtak: Attachment[];
}

export type Barn = UfødtBarn | FødtBarn | Adopsjonsbarn | ForeldreansvarBarn;

export const isUfødtBarn = (barn: Partial<Barn>, situasjon: Søkersituasjon): barn is UfødtBarn =>
    situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === false;
export const isFødtBarn = (barn: Partial<Barn>, situasjon: Søkersituasjon): barn is FødtBarn =>
    situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === true;
export const isAdopsjonsbarn = (_barn: Partial<Barn>, situasjon: Søkersituasjon): _barn is Adopsjonsbarn =>
    situasjon === Søkersituasjon.ADOPSJON;
export const isForeldreansvarsbarn = (_barn: Partial<Barn>, situasjon: Søkersituasjon): _barn is ForeldreansvarBarn =>
    situasjon === Søkersituasjon.FORELDREANSVAR;

export default Barn;
