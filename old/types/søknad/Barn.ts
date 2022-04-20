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

export interface BarnInnsendingCommonProps {
    antallBarn: number;
    erBarnetFødt: boolean;
    dokumentasjonAvAleneomsorg: Attachment[];
    datoForAleneomsorg: Date;
    terminbekreftelse: Attachment[];
}

export interface UfødtBarnInnsending extends BarnInnsendingCommonProps {
    termindato: Date;
    terminbekreftelseDato: Date;
}

export interface FødtBarnInnsending extends BarnInnsendingCommonProps {
    fødselsdatoer: Date[];
    fødselsattest: Attachment[];
    termindato: Date;
}

export interface AdopsjonsbarnInnsending extends BarnInnsendingCommonProps {
    fødselsdatoer: Date[];
    adopsjonsdato: Date;
    ankomstdato?: Date;
    adoptertIUtlandet?: boolean;
    omsorgsovertakelse: Attachment[];
    adopsjonAvEktefellesBarn: boolean;
}

export interface ForeldreansvarBarnInnsending extends BarnInnsendingCommonProps {
    fødselsdatoer: Date[];
    foreldreansvarsdato: Date;
    omsorgsovertakelse: Attachment[];
    adopsjonsvedtak: Attachment[];
}

export type Barn = UfødtBarn | FødtBarn | Adopsjonsbarn | ForeldreansvarBarn;
export type BarnInnsending =
    | UfødtBarnInnsending
    | FødtBarnInnsending
    | AdopsjonsbarnInnsending
    | ForeldreansvarBarnInnsending;

export const isUfødtBarn = (barn: Partial<Barn>, situasjon: Søkersituasjon): barn is UfødtBarn =>
    situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === false;
export const isFødtBarn = (barn: Partial<Barn>, situasjon: Søkersituasjon): barn is FødtBarn =>
    situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === true;
export const isAdopsjonsbarn = (_barn: Partial<Barn>, situasjon: Søkersituasjon): _barn is Adopsjonsbarn =>
    situasjon === Søkersituasjon.ADOPSJON;
export const isForeldreansvarsbarn = (_barn: Partial<Barn>, situasjon: Søkersituasjon): _barn is ForeldreansvarBarn =>
    situasjon === Søkersituasjon.FORELDREANSVAR;

export const isUfødtBarnInnsending = (
    barn: Partial<BarnInnsending>,
    situasjon: Søkersituasjon
): barn is UfødtBarnInnsending => situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === false;
export const isFødtBarnInnsending = (
    barn: Partial<BarnInnsending>,
    situasjon: Søkersituasjon
): barn is FødtBarnInnsending => situasjon === Søkersituasjon.FØDSEL && barn.erBarnetFødt === true;
export const isAdopsjonsbarnInnsending = (
    _barn: Partial<BarnInnsending>,
    situasjon: Søkersituasjon
): _barn is AdopsjonsbarnInnsending => situasjon === Søkersituasjon.ADOPSJON;
export const isForeldreansvarsbarnInnsending = (
    _barn: Partial<BarnInnsending>,
    situasjon: Søkersituasjon
): _barn is ForeldreansvarBarnInnsending => situasjon === Søkersituasjon.FORELDREANSVAR;

export default Barn;
