import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { DatoInputVerdi } from '../../../common/components/skjema/elements/dato-input/DatoInput';
import { Søkersituasjon } from './Søknad';

export interface BarnCommonProps {
    antallBarn: number;
    erBarnetFødt: boolean;
    dokumentasjonAvAleneomsorg: Attachment[];
    datoForAleneomsorg: DatoInputVerdi;
    terminbekreftelse: Attachment[];
}

export interface UfødtBarn extends BarnCommonProps {
    termindato: DatoInputVerdi;
    terminbekreftelseDato: DatoInputVerdi;
}

export interface FødtBarn extends BarnCommonProps {
    fødselsdatoer: DatoInputVerdi[];
    fødselsattest: Attachment[];
    termindato: DatoInputVerdi;
}

export interface Adopsjonsbarn extends BarnCommonProps {
    fødselsdatoer: DatoInputVerdi[];
    adopsjonsdato: DatoInputVerdi;
    ankomstdato?: DatoInputVerdi;
    adoptertIUtlandet?: boolean;
    omsorgsovertakelse: Attachment[];
    adopsjonAvEktefellesBarn: boolean;
}

export interface ForeldreansvarBarn extends BarnCommonProps {
    fødselsdatoer: DatoInputVerdi[];
    foreldreansvarsdato: DatoInputVerdi;
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
