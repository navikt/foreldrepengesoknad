import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { Søkersituasjon } from './Søknad';

export interface BarnCommonProps {
    antallBarn: number;
    erBarnetFødt: boolean;
    dokumentasjonAvAleneomsorg: Attachment[];
    datoForAleneomsorg: string;
    terminbekreftelse: Attachment[];
}

export interface UfødtBarn extends BarnCommonProps {
    termindato: string;
    terminbekreftelseDato: string;
}

export interface FødtBarn extends BarnCommonProps {
    fødselsdatoer: string[];
    fødselsattest: Attachment[];
    termindato: string;
}

export interface Adopsjonsbarn extends BarnCommonProps {
    fødselsdatoer: string[];
    adopsjonsdato: string;
    ankomstdato?: string;
    adoptertIUtlandet?: boolean;
    omsorgsovertakelse: Attachment[];
    adopsjonAvEktefellesBarn: boolean;
}

export interface ForeldreansvarBarn extends BarnCommonProps {
    fødselsdatoer: string[];
    foreldreansvarsdato: string;
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
