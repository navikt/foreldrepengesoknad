import Barn, {
    UfødtBarnInnsending,
    AdopsjonsbarnInnsending,
    ForeldreansvarBarnInnsending,
    BarnInnsending,
    FødtBarnInnsending,
    BarnCommonProps,
    isFødtBarnInnsending,
    isUfødtBarnInnsending,
    isAdopsjonsbarnInnsending,
    isForeldreansvarsbarnInnsending,
    UfødtBarn,
    FødtBarn,
    ForeldreansvarBarn,
    Adopsjonsbarn,
} from '../types/søknad/Barn';
import { Søkersituasjon } from '../types/søknad/Søknad';

const getBarnProps = (barn: Partial<Barn | UfødtBarn | Adopsjonsbarn | ForeldreansvarBarn>): Partial<BarnCommonProps> =>
    removeUndefinedProps({
        antallBarn: barn.antallBarn,
        datoForAleneomsorg: barn.datoForAleneomsorg,
        dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg,
        erBarnetFødt: barn.erBarnetFødt,
    });

export const getUfødtBarnProps = (barn: Partial<UfødtBarn>): Partial<UfødtBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        terminbekreftelse: barn.terminbekreftelse,
        terminbekreftelseDato: barn.terminbekreftelseDato,
        termindato: barn.termindato,
    });

export const getFødtBarnProps = (barn: Partial<FødtBarn>): Partial<FødtBarn> =>
    removeUndefinedProps({
        ...getBarnProps(barn),
        fødselsattest: barn.fødselsattest,
        fødselsdatoer: barn.fødselsdatoer,
        termindato: barn.termindato,
    });

const getBarnInnsendingProps = (
    barn: Partial<BarnInnsending | UfødtBarnInnsending | AdopsjonsbarnInnsending | ForeldreansvarBarnInnsending>
): Partial<BarnCommonProps> =>
    removeUndefinedProps({
        antallBarn: barn.antallBarn,
        datoForAleneomsorg: barn.datoForAleneomsorg,
        dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg,
        erBarnetFødt: barn.erBarnetFødt,
    });

export const getUfødtBarnInnsendingProps = (barn: Partial<UfødtBarnInnsending>): Partial<UfødtBarnInnsending> =>
    removeUndefinedProps({
        ...getBarnInnsendingProps(barn),
        terminbekreftelse: barn.terminbekreftelse,
        terminbekreftelseDato: barn.terminbekreftelseDato,
        termindato: barn.termindato,
    });

export const getFødtBarnInnsendingProps = (barn: Partial<FødtBarnInnsending>): Partial<FødtBarnInnsending> =>
    removeUndefinedProps({
        ...getBarnInnsendingProps(barn),
        fødselsattest: barn.fødselsattest,
        fødselsdatoer: barn.fødselsdatoer,
        termindato: barn.termindato,
    });

export const getAdopsjonsbarnInnsendingProps = (
    barn: Partial<AdopsjonsbarnInnsending>
): Partial<AdopsjonsbarnInnsending> =>
    removeUndefinedProps({
        ...getBarnInnsendingProps(barn),
        adopsjonAvEktefellesBarn: barn.adopsjonAvEktefellesBarn,
        adopsjonsdato: barn.adopsjonsdato,
        adoptertIUtlandet: barn.adoptertIUtlandet,
        ankomstdato: barn.ankomstdato,
        fødselsdatoer: barn.fødselsdatoer,
        omsorgsovertakelse: barn.omsorgsovertakelse,
    });

export const getForeldreansvarsbarnInnsendingProps = (
    barn: Partial<ForeldreansvarBarnInnsending>
): Partial<ForeldreansvarBarnInnsending> =>
    removeUndefinedProps({
        ...getBarnInnsendingProps(barn),
        adopsjonsvedtak: barn.adopsjonsvedtak,
        foreldreansvarsdato: barn.foreldreansvarsdato,
        fødselsdatoer: barn.fødselsdatoer,
        omsorgsovertakelse: barn.omsorgsovertakelse,
    });

export const cleanupBarn = (
    barn: Partial<BarnInnsending>,
    situasjon: Søkersituasjon
): Partial<BarnInnsending> | undefined => {
    if (isFødtBarnInnsending(barn, situasjon)) {
        return getFødtBarnInnsendingProps(barn);
    }
    if (isUfødtBarnInnsending(barn, situasjon)) {
        return getUfødtBarnInnsendingProps(barn);
    }
    if (isAdopsjonsbarnInnsending(barn, situasjon)) {
        return getAdopsjonsbarnInnsendingProps(barn);
    }
    if (isForeldreansvarsbarnInnsending(barn, situasjon)) {
        return getForeldreansvarsbarnInnsendingProps(barn);
    }
    return undefined;
};

const removeUndefinedProps = (barn: any): any => {
    const obj = {};
    Object.keys(barn).forEach((key) => {
        if (barn[key] !== undefined) {
            obj[key] = barn[key];
        }
    });
    return obj;
};
